const Struct = require('./../../struct.js');
const Hexa = require('./../../hexa.js');
const Varint = require('./../../varint.js');

class Script extends Struct {

  static get bytesSequence() {
    return [
      { name: 'sig_len',    size: null, constructor: Varint },
      { name: 'sig_dat',    size: null, constructor: Hexa   },
      { name: 'pubkey_len', size: null, constructor: Varint },
      { name: 'pubkey_dat', size: null, constructor: Hexa   }
    ];
  }
  
}

module.exports = Script;
