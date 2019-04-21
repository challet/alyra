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
  
}

module.exports = Varint;
