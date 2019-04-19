module.exports = class {
  constructor(nombre, options) {
    options = Object.assign({little: false, varint: false}, options || {});
    
    this.nombre        = nombre;
    this.hexa          = this.entier_vers_hexa(nombre);
    this.affichage     = this.formatter(options.little, options.varint);
  }
  
  entier_vers_hexa(nombre) {
    const BASE = 16;
    let result = [];
    let nombre_tampon = nombre;
  
    for (let i = 1; i < nombre; i *= BASE) {
      let chiffre = (nombre_tampon / i) % BASE;
      result.unshift(chiffre);
      nombre_tampon -= i * chiffre;
    }
  
    return result;
  }
  
  formatter(little, varint) {
    // validité des paramètres
    if (varint && !little) {
      throw "l'option --varint doit être utilisé avec l'option --little";
    }
    
    var hexa = this.hexa;
    
    // extra 0 pour avoir un nombre de caractères multiple de 2
    if (hexa.length % 2 != 0) {
      hexa.unshift(0);
    }

    // applique les options
    if (little === true) {
      hexa = this.inverser_endian(hexa);
    }
    if (varint === true) {
      hexa = this.ajouter_varint(hexa);
    }
  
    // transforme en caractères
    hexa = hexa.map(this.constructor.caractere_hexa);
  
    // ajoute un préfixe et des espaces inter-octets
    let bytes = [];
    while (hexa.length != 0) {
      bytes.push(hexa.splice(0, 2).join(''));
    }
    return `0x ${bytes.join(' ')}`;
  }
  
  toString() {
    return this.affichage;
  }
  
  inverser_endian(hexa) {
    let bytes = [];
    while (hexa.length != 0) {
      bytes = bytes.concat(hexa.splice(-2, 2));
    }
    return bytes;
  }
  
  ajouter_varint(hexa) {
    const nombre_octets = Math.ceil(hexa.length / 2)
  
    if (nombre_octets > 8) {
      throw `${hexa} a une taille trop grande (> 8 octets)`;
    } else if (nombre_octets > 4) {
      var nombre_final = 8;
    } else if (nombre_octets > 2) {
      var nombre_final = 4;
    } else if (Number.parseInt(hexa.join(''), 16) >= 253) {
      var nombre_final = 2;
    } else {
      var nombre_final = 1;
    }
  
    // remplir à droite les octets vides
    const nombre_manquant = 2 * nombre_final - hexa.length;
    if (nombre_manquant > 0) {
      hexa = hexa.concat(Array(nombre_manquant).fill(0));
    }
  
    // ajouter un préfixe signalant la taille
    switch (nombre_final) {
      case 8:
        hexa = [15, 15].concat(hexa);
      break;
      case 4:
        hexa = [15, 14].concat(hexa);
      break;
      case 2:
        hexa = [15, 13].concat(hexa);
      break;
    }
  
    return hexa;
  }
  
  static caractere_hexa(chiffre) {
    switch (chiffre) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
        return chiffre.toString();
      break;
      case 10:
        return 'A';
      break;
      case 11:
        return 'B';
      break;
      case 12:
        return 'C';
      break;
      case 13:
        return 'D';
      break;
      case 14:
        return 'E';
      break;
      case 15:
        return 'F';
      break;
      default:
        throw (`${chiffre} n'est pas une valeur valide`);
      break;
    }
  }
}