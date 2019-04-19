const BASE = 16;

const inverser_endian = function(hexa) {
  let bytes = [];
  while (hexa.length != 0) {
    bytes = bytes.concat(hexa.splice(-2, 2));
  }
  return bytes;
}

const enlever_varint = function(hexa) {
  
}

const ajouter_varint = function(hexa) {
  const nombre_octets = Math.ceil(hexa.length / 2)

  if (nombre_octets > 8) {
    throw `${hexa} a une taille trop grande (> 8 octets)`;
  } else if (nombre_octets > 4) {
    var nombre_final = 8;
  } else if (nombre_octets > 2) {
    var nombre_final = 4;
  } else if (Number.parseInt(hexa.join(''), BASE) >= 253) {
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

// TODO : check if it can be replaced by number.toString(16)
const car_dec_vers_hexa = function(chiffre) {
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

const car_hex_vers_dec = function(car) {
  return  Number.parseInt(car, BASE);
}

module.exports = class Hexa {
  
  constructor(hexa, style) {
    this.style        = ['bigendian', 'littleendian', 'varint'].includes(style) ? style : 'bigendian';
    this.hexa         = hexa;
    
    // extra 0 pour avoir un nombre de caractères multiple de 2
    if (this.hexa.length % 2 != 0) {
      this.hexa.unshift(0);
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
  
    return new this(result, 'bigendian');
  }
  
  static depuisChaine(chaine, style) {
    const regexp = /^(?:0x)([0-9A-F]+)$/;
    
    // enlever les espaces
    chaine = chaine.replace(' ', '');
    // tester la validité
    if (!regexp.test(chaine)) {
      throw `${chaine} n'est pas hexadécimal`;
    }
    
    var hexa = regexp.exec(chaine)[1].split('').map(car_hex_vers_dec);
    
    return new this(hexa, style);
  }
  
  versNombre() {
    return Number.parseInt(this.versBigEndian().join(''), BASE);
  }
  
  versBigEndian() {
    var result = this;
    switch (this.style) {
      case 'varint':
        result = new this.constructor(enlever_varint(result.hexa), 'littleendian');
        // no break
      case 'littleendian':
        result = new this.constructor(inverser_endian(result.hexa), 'bigendian');
      break;
    }
    return result;
  }
  
  versLittleEndian() {
    switch (this.style) {
      case 'varint':
        return new this.constructor(enlever_varint(this.hexa), 'littleendian');
        break;
      case 'bigendian':
        return new this.constructor(inverser_endian(this.hexa), 'littleendian');
      break;
    }
  }
  
  versVarInt() {
    var result = this;
    switch (this.style) {
      case 'bigendian':
        result = new this.constructor(inverser_endian(result.hexa), 'littleendian');
        // no break
      case 'littleendian':
        result = new this.constructor(ajouter_varint(result.hexa), 'varint');
      break;
    }
    return result;
  }
  
  toString() {
    var hexa = this.hexa;
  
    // transforme en caractères
    hexa = hexa.map(car_dec_vers_hexa);
  
    // ajoute un préfixe et des espaces inter-octets
    let bytes = [];
    while (hexa.length != 0) {
      bytes.push(hexa.splice(0, 2).join(''));
    }
    return `0x ${bytes.join(' ')}`;
  }
    
}