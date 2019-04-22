const Hexa = require('./hexa.js');

class Varint extends Hexa {
  
  static fromNumber(number) {
    // choisir une des tailles (1, 2 , 4, 8) et le préfixe la signalant
    if (number < 253) {
      var bytes = 1;
      var prefix = null;
    } else if (number < 65536 ) { // 64 ko
      var bytes = 3;
      var prefix = 0xfd;
    } else if (number < 16777216 ) { // 16 Mo
      var bytes = 5;
      var prefix = 0xfe;
    } else if (number < 4294967296) { // 4 Go
      var bytes = 9;
      var prefix = 0xff;
    } else {
      throw `${number} a une taille trop grande (> 8 bytes)`;
    }
    
    // the number is little-endian
    let raw_number = Hexa.fromNumber(number).reverse();
    
    if (prefix === null) {
      return new this(raw_number.buffer);
    } else {
      return new this(Buffer.concat([
        Buffer.alloc(1).fill(prefix),
        raw_number.buffer
      ], bytes));
    }
  }
  
  // try to get the varint at the beginning of an hexa buffer
  static extractFrom(hexa) {
    // calcul de la taille de l'en-tête à partir du premier octet
    let first_byte = hexa.buffer[0];
    
    if ([0xfd, 0xfe, 0xff].includes(first_byte)) {
      // l'en-tête est codée sur plusieurs octets, commençant après le premier
      var header_size = 2 ** (first_byte - 0xfc);
      return new this(hexa.buffer.slice(0, header_size + 1));
    } else {
      // l'en-tête est codée sur un octet et est le premier
      return new this(hexa.buffer.slice(0, 1));
    }
    
  }
  
  toNumber() {
    if (this.length == 1) {
      return new Hexa(this.buffer).toNumber();
    } else {
      return new Hexa(this.buffer.slice(1)).toNumber();
    }
  }

}

module.exports = Varint;
