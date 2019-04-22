const Struct = require('./../../struct.js');
const Hexa = require('./../../hexa.js');
const Varint = require('./../../varint.js');

class Script extends Struct {

  static get bytesSequence() {
    return [
      { name: 'sig_len',    size: Struct.VARINT_HEADER,   constructor: Varint },
      { name: 'sig_dat',    size: Struct.VARINT_CONTENT,  constructor: Hexa   },
      { name: 'pubkey_len', size: Struct.VARINT_HEADER,   constructor: Varint },
      { name: 'pubkey_dat', size: Struct.VARINT_CONTENT,  constructor: Hexa   }
    ];
  }
  
}

module.exports = Script;
