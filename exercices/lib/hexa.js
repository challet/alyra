const BASE = 16;

class Hexa {
  
  constructor(hexa_array, style) {
    this.style        = ['bigendian', 'littleendian', 'varint'].includes(style) ? style : 'bigendian';
    this.hexa         = hexa_array;
    
    // données immutables pré-calculées
    this.cached = {};
    this.cached.taille = Math.ceil(this.hexa.length / 2);
    if (this.style == 'varint') {
      let entete = extraire_entete_varint(this.hexa);
      
      this.cached.taille_varint_entete = entete.taille() + (entete.taille() != 1 ? 1 : 0);
      this.cached.taille_varint_corps = entete.versNombre();
    }
    
    // autres vérifications
    if (this.style == 'varint' && !this.verifierVarInt()) {
      console.log(this.toString());
      console.log(this.cached);
      throw "La taille des données dépasse celle prévue par l'en-tête VarInt";
    }
  }
  
  static depuisNombre(nombre) {
    let result = [];
    let nombre_tampon = nombre;
  
    for (let i = 1; i < nombre; i *= BASE) {
      let chiffre = (nombre_tampon / i) % BASE;
      result.unshift(chiffre);
      nombre_tampon -= i * chiffre;
    }
    
    // compléter pour avoir un octet complet
    if (result.length % 2 == 1) {
      result.unshift(0);
    }
  
    return new this(result, 'bigendian');
  }
  
  static depuisChaine(chaine, style) {
    const regexp = /^(?:0x)?([0-9a-fA-F]+)$/;
    
    // enlever les espaces
    chaine = chaine.replace(' ', '');
    // tester la validité
    if (!regexp.test(chaine)) {
      throw `${chaine} n'est pas hexadécimal`;
    }
    
    // décomposer en caractères numériques
    var hexa = regexp.exec(chaine)[1].split('').map(car_hex_vers_dec);
    
    return new this(hexa, style);
  }
  
  // séquences d'octets indéxées par leur position (utilitaire)
  // taille en octets
  static etalon(taille) {
    let hexa = Array(taille * 2).fill().map((item, index) => {
      let octet = Math.floor(index / 2);
      if (index % 2 == 0) {
        return Math.floor(octet / 16) % 16;
      } else {
        return octet % 16;
      }
    });
    return new this(hexa);
  }
  
  versNombre() {
    return Number.parseInt(this.hexa.map(car_dec_vers_hexa).join(''), BASE);
  }
  
  versBigEndian() {
    switch (this.style) {
      case 'varint':
        return this.versLittleEndian().versBigEndian();
      break;
      case 'littleendian':
        return new this.constructor(inverser_endian(this.hexa), 'bigendian');
      break;
      default:
        return this;
      break;
    }
  }
  
  versLittleEndian() {
    switch (this.style) {
      case 'varint':
        return this.slice(this.tailleEnteteVarInt(), this.taille(), 'littleendian');
        break;
      case 'bigendian':
        return new this.constructor(inverser_endian(this.hexa), 'littleendian');
      break;
      default :
        return this;
      break;
    }
  }
  
  versVarInt() {
    switch (this.style) {
      case 'bigendian':
        return this.versLittleEndian().versVarInt();
      break;
      case 'littleendian':
        return new this.constructor(calculer_varint(this.hexa)).concat(this, 'varint');
      break;
      default:
        return this;
      break;
    }
  }
  
  toString() {
    // transforme en caractères
    var hexa = this.hexa.map(car_dec_vers_hexa);
  
    // ajoute des espaces inter-octets et un préfixe "0x", TODO : en faire des options
    let bytes = [];
    while (hexa.length != 0) {
      bytes.push(hexa.splice(0, 2).join(''));
    }
    return `0x ${bytes.join(' ')}`;
  }
  
  concat(suite, force_style) {
    if (typeof suite == this.constructor) {
      throw `'suite' doit être de type ${this.constructor}`;
    }
    
    return new this.constructor(this.hexa.concat(suite.hexa), force_style);
  }
  
  // debut et fin en octets
  slice(debut, fin, force_style) {
    return new this.constructor(
      this.hexa.slice(debut ? 2 * debut : undefined, fin ? 2 * fin : undefined),
      force_style
    );
  }
  
  // TODO : vérifier le fonctionnement (intialement tenté sur ScriptSig)
  // est-ce qu'il y a toujours un octets avec le nombre d'éléments ?
  identifierListe() {
    let fields = [];
    let hexa = this.hexa.slice() // copy;
    let nombre_attendu = null;
    
    do {
      let entete = extraire_entete_varint(hexa);
      console.log(entete);
      // le premier en-tête determine le nombre d'éléments suivants
      if (nombre_attendu === null) {
        nombre_attendu = entete.versNombre() + 1;
        hexa.splice(0, entete.taille() * 2);
        continue;
      } else {
        console.log(entete.taille(), entete.versNombre());
        let field = new this.constructor(
          hexa.splice(0, (entete.taille() + entete.versNombre()) * 2 + 1),
          'varint'
        );
        fields.push(field);
        
        //console.log(entete.taille(), entete.versNombre(), field.taille(), hexa.length/2);
        //console.log(this.constructor.etalon(field.taille()).toString());
        //console.log(field.toString());
      }
      
      
    } while (hexa.length != 0 && --nombre_attendu != 0);
    
    return fields;
  }
  
  // en octets
  taille() {
    return this.cached.taille;
  }
  
  // en octets
  // incluant le préfixe de 1 octet si présent
  tailleEnteteVarInt() {
    if (this.style != 'varint') {
      throw `Cette chaine n'est pas au format varint'`;
    } else {
      return this.cached.taille_varint_entete;
    }
  }
  
  // en octets
  tailleCorpsVarInt() {
    if (this.style != 'varint') {
      throw `Cette chaine n'est pas au format varint'`;
    } else {
      return this.cached.taille_varint_corps;
    }
  }
  
  verifierVarInt() {
    if (this.style != 'varint') {
      throw `Cette chaine n'est pas au format varint'`;
    } else {
      return this.cached.taille_varint_entete + this.cached.taille_varint_corps === this.cached.taille;
    }
  }
  
}

const inverser_endian = function(hexa) {
  let bytes = [];
  while (hexa.length != 0) {
    bytes = bytes.concat(hexa.splice(-2, 2));
  }
  return bytes;
}

const calculer_varint = function(hexa) {
  const octets_total = Math.ceil(hexa.length / 2)
  
  // choisir une des tailles (1, 2 , 4, 8) et le préfixe la signalant
  if (octets_total < 253) {
    var octets_varint = 1;
    var varint = new Hexa([]);
  } else if (octets_total < 65536 ) { // 64 ko
    var octets_varint = 3;
    var varint = new Hexa([15, 13]);
  } else if (octets_total < 16777216 ) { // 16 Mo
    var octets_varint = 5;
    var varint = new Hexa([15, 14]);
  } else if (octets_varint < 4294967296) { // 4 Go
    var varint = new Hexa([15, 15]);
    var octets_varint = 9;
  } else {
    throw `${hexa} a une taille trop grande (> 8 octets)`;
  }
  
  // ajouter la taille du contenu
  varint = varint.concat(Hexa.depuisNombre(octets_total).versLittleEndian(), 'littleendian');

  // remplir à droite les octets vides
  const nombre_manquant = 2 * octets_varint - varint.length;
  if (nombre_manquant > 0) {
    varint = varint.concat(Array(nombre_manquant).fill(0));
  }

  return varint.hexa;
}

const extraire_entete_varint = function (hexa) {
  // calcul de la taille de l'en-tête à partir du premier octet
  let premier_octet = Number.parseInt(hexa.slice(0, 2).map(car_dec_vers_hexa).join(''), BASE);
  // hexa[0] * 16 + hexa[1];
  
  if ([253, 254, 255].includes(premier_octet)) {
    // l'en-tête est codée sur plusieurs octets, commençant après le premier
    var taille_entete = 2 ** (premier_octet - 252);
    return new Hexa(hexa.slice(2, taille_entete * 2), 'littleendian');
  } else {
    // l'en-tête est codée sur un octet et est le premier
    return new Hexa(hexa.slice(0, 2), 'littleendian');
  }
}

const car_dec_vers_hexa = function(chiffre) {
  return chiffre.toString(BASE);
}

const car_hex_vers_dec = function(car) {
  return Number.parseInt(car, BASE);
}

module.exports = Hexa;