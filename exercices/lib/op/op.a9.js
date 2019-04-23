const Op = require('./op.base.js');
const Hash = require('./../hexa.js');

const sha256 = require('crypto-js/sha256');
const ripemd160 = require('crypto-js/ripemd160');

module.exports = class OpA9 extends Op {
  
  execute(stack) {
    stack.push(
      Hash.fromString(
        ripemd160(sha256(stack.pop().reverse().toString())).toString()
      )
    );
  }
  
}
