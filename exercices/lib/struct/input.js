const Struct = require('./struct.base.js');
const Varint = require('./../varint.js');
const Hexa = require('./../hexa.js');
const Script = require('./script.js');

class Input extends Struct {
  
  static get bytesSequence() {
    return [
      { name: 'transaction', size: 32,                    constructor: Hexa   },
      { name: 'index',       size: 4,                     constructor: Hexa   },
      { name: 'script_len',  size: Struct.VARINT_HEADER,  constructor: Varint },
      { name: 'script_dat',  size: Struct.VARINT_CONTENT, constructor: Script },
      { name: 'sequence',    size: 4,                     constructor: Hexa   }
    ];
  }
  
}

module.exports = Input;
