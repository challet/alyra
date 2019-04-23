const Struct = require('./struct.base.js');
const Hexa = require('./../hexa.js');
const Varint = require('./../varint.js');
const Op = require('./../op/op.base.js');

class Script extends Struct {

  static extractFrom(hexa) {
    var shift = 0;
    var last_varint = null;
    var parts = [];
    
    while (shift < hexa.length) {
      var first = hexa.buffer[shift];
      
      // TODO : change this to handle special varint forms (see OP_PUSHDATA1 to OP_PUSHDATA4)
      if (first > 0x00 && first < 0x4c) {
        // it is a varint (smaller version of it) and then data
        parts.push({ name: 'varint', hexa: new Varint(hexa.buffer.slice(shift, shift + 1)) });
        shift += 1;
        parts.push({ name: 'data', hexa: new Hexa(hexa.buffer.slice(shift, shift + first)) });
        shift += first;
      } else {
        // it is an operation
        parts.push({ name: 'op', hexa: Op.factory(first, hexa.buffer.slice(shift, shift + 1)) });
        shift += 1;
      }
    }
      
    return new this(hexa.buffer, parts);
  }
  
}

module.exports = Script;
