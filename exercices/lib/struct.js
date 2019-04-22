const Hexa = require('./hexa.js');
const Varint = require('./varint.js');

class Struct extends Hexa {
  
  static extractFrom(hexa) {
    var shift = 0;
    var last_varint = null;
    
    var parts = this.bytesSequence.map( (seq) => {
      if (Number.isInteger(seq.size)) {
        // if it is a fixed length part
        var part = hexa.slice(shift, shift + seq.size);
      } else if (last_varint != null) {
        // if the previous chunk was a varint
        var part = seq.constructor.extractFrom(hexa.slice(shift, shift + last_varint.toNumber()));
        last_varint = null;
      } else if (seq.size === null) {
        // if the length is unknown, use the extractFrom method
        var part = seq.constructor.extractFrom(hexa.slice(shift));
        // if it is a varint, store it for later use
        if (part instanceof Varint) {
          last_varint = part;
        } 
      } else {
        throw `Unsuitable sequence : ${seq}`;
      }
      
      shift += part.length;
      return { name: seq.name, hexa: part };
    });
    
    return new this(hexa.buffer.slice(0, shift), parts);
  }
  
  static get bytesSequence() {
    a+b;
    throw `${this.constructor} class must implement a bytesSequence method.`;
  }
  
  constructor(hexa, parts) {
    super(hexa);
    this.parts = parts;
  }
  
}

module.exports = Struct;
