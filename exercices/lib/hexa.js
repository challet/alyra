const BASE = 16;
const ENCODING = 'hex';

class Hexa {
  
  constructor(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw "this is not a Buffer";
    } else {
      this.buffer = buffer;
    }
  }
  
  get length() {
    return this.buffer.length;
  }
  
  static fromNumber(number) {
    number = new Number(number);
    return new this(Buffer.from(number.toString(BASE), ENCODING));
  }
  
  static fromString(string) {
    return new this(Buffer.from(string, ENCODING));
  }
  
  // fallback method for struct sequences parsing
  static extractFrom(hexa) {
    return new this(hexa.buffer);
  }
  
  toNumber() {
    return Number.parseInt(this.toString(), BASE);
  }
  
  toString(start, end) {
    return this.buffer.toString(ENCODING, start, end);
  }

  // return a new Hexa holding a reversed copy
  // of the current buffer
  // in order to not mutate this
  reverse() {
    let copy = Buffer.alloc(this.buffer.length);
    this.buffer.copy(copy);
    return new this.constructor(copy.reverse());
  }
  
  slice(start, end) {
    return new this.constructor(this.buffer.slice(start, end));
  }
  
  equals(hexa) {
    return this.buffer.equals(hexa.buffer);
  }
  
}

module.exports = Hexa;