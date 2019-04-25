const Data = require('./data.base.js');

module.exports = class IntNode extends Data {
  
  cmp(data) {
    return this.raw - data.raw;
  }
  
}