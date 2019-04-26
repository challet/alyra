const Op = require('./op.base.js');
const Hexa = require('./../hexa.js');

module.exports = class OpAc extends Op {
  
  execute(stack) {
    stack.pop();
    stack.pop();
    stack.push(Hexa.fromString('01'));
  }
  
}
