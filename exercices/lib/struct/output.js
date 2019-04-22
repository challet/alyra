const Struct = require('./struct.base.js');
const Varint = require('./../varint.js');
const Hexa = require('./../hexa.js');
const Script = require('./script.js');

class Output extends Struct {
  
  static get bytesSequence() {
    return [
      { name: 'satoshis',    size: 8,                    constructor: Hexa   },
      { name: 'script_len',  size: Struct.VARINT_HEADER,  constructor: Varint },
      { name: 'script_dat',  size: Struct.VARINT_CONTENT, constructor: Script },
    ];
  }
  
}

module.exports = Output;
