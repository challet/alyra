module.exports = class Data {
  
  constructor(raw) {
    this.raw = raw;
  }
  
  toString() {
    return this.raw.toString();
  }
  
  cmp(data) {
    throw `${this.constructor.name} must implement a 'cmp' function`;
  }
  
}