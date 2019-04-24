const Op = require('./op.base.js');
const Hexa = require('./../hexa.js');

const CryptoJS = require('crypto-js');
const sha256 = require('crypto-js/sha256');
const ripemd160 = require('crypto-js/ripemd160');

module.exports = class OpA9 extends Op {
  
  execute(stack) {
    var key = stack.pop().buffer;
    var sha = new Uint8Array(sha256(key).toString(CryptoJS.enc.Hex));
    var rip = new Uint8Array(ripemd160(sha).toString(CryptoJS.enc.Hex));
    console.log(key, sha, rip);
    var hash = new Hexa(Buffer.from(rip, 'hex'));
    
    
    stack.push(hash);
    return;
    stack.push(
      Hexa.fromString(
        ripemd160(sha256(stack.pop().toString()).toString()).toString()
      )
    );
  }
  
}
