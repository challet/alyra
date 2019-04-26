const Op = require('./op.base.js');

module.exports = class Op88 extends Op {
  
  execute(stack) {  
    this.constructor.factory(0x87, Buffer.from([0x87])).execute(stack);
    this.constructor.factory(0x69, Buffer.from([0x69])).execute(stack);
  }
  
}
