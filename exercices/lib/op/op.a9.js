const Op = require('./op.base.js');
const Hexa = require('./../hexa.js');

const crypto = require('crypto');
const sha256 = crypto.createHash('sha256');
const ripemd160 = crypto.createHash('ripemd160');

module.exports = class OpA9 extends Op {
  
  execute(stack) {
    var key = stack.pop().buffer;
    var sha = sha256.update(key).digest();
    var rip = ripemd160.update(sha).digest();
    var hash = new Hexa(rip, 'hex');
    
    stack.push(hash);
  }
  
}
