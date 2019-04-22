const Struct = require('./struct.js');
const Script = require('./script.js');
const Varint = require('./../varint.js');
const Hexa = require('./../hexa.js');

class Input extends Struct {
  
  static get bytesSequence() {
    return [
      { name: 'transaction', size: 32  , constructor: Hexa   },
      { name: 'index',       size: 4   , constructor: Hexa   },
      { name: 'script_len',  size: null, constructor: Varint },
      { name: 'script_dat',  size: null, constructor: Script },
      { name: 'sequence',    size: 4   , constructor: Hexa   }
    ];
  }
  
}

module.exports = Input;
