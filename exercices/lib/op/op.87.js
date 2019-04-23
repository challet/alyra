const Op = require('./op.base.js');

module.exports = class Op87 extends Op {
  
  execute(stack) {
    var a = stack.pop();
    var b = stack.pop();
    stack.push(a.equals(b));
  }
  
}
