const Hexa = require('./../hexa.js');
const Varint = require('./../varint.js');

class Struct extends Hexa {
  
  static extractFrom(hexa) {
    var shift = 0;
    var last_varint = null;
    var parts = [];
    
    for (let i = 0; i < this.bytesSequence.length; i++) {
      let seq = this.bytesSequence[i];
      
      if (Number.isInteger(seq.size) && seq.size > 0) {
        // if it is a fixed length part
        var part = hexa.slice(shift, shift + seq.size);
      } else {
        // varint chunks
        switch (seq.size) {
          case this.VARINT_HEADER:
            // this is a varint, of which usage will be known later
            var part = Varint.extractFrom(hexa.slice(shift));
            // temporary store it as an int
            last_varint = part.toNumber();
          break;
          case this.VARINT_CONTENT:
            if (last_varint == null) throw "A varint header is not known";
            // the previous varint specify the size
            var part = seq.constructor.extractFrom(hexa.slice(shift, shift + last_varint));
            last_varint = null;
          break;
          case this.VARINT_REPEAT:
            if (last_varint == null) throw "A varint header is not known";
            // the previous varint specify the iterations count
            var part = seq.constructor.extractFrom(hexa.slice(shift));
            if (--last_varint == 0) {
              last_varint = null;
            } else {
              i--; // new round of the same
            }
          break;
          default:
            throw `Unsuitable sequence : ${seq}`;
          break;
        }
      }
      shift += part.length;
      parts.push({ name: seq.name, hexa: part });
    }
    
    return new this(hexa.buffer.slice(0, shift), parts);
  }
  
  static get bytesSequence() {
    throw `${this.constructor} class must implement a bytesSequence method.`;
  }
  
  constructor(hexa, parts) {
    super(hexa);
    this.parts = parts;
  }
  
}

// add "constant like" class properties
Object.defineProperty(Struct, 'VARINT_HEADER',  { value: -1, writable : false, enumerable : true, configurable : false });
Object.defineProperty(Struct, 'VARINT_CONTENT', { value: -2, writable : false, enumerable : true, configurable : false });
Object.defineProperty(Struct, 'VARINT_REPEAT',  { value: -3, writable : false, enumerable : true, configurable : false });

module.exports = Struct;
