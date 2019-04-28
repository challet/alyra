const Struct = require('./struct.base.js');
const Hexa = require('./../hexa.js');

const target_max = (BigInt(2) ** BigInt(16) - BigInt(1)) * BigInt(2) ** BigInt(208); 

class Bits extends Hexa {
  
  toTarget() {
    const exp   = BigInt(this.slice(0,1).toNumber());
    const coeff = BigInt(this.slice(1,4).toNumber()));
    
    return Hexa.fromNumber(coeff * BigInt(2) ** (BigInt(8) * (exp - BigInt(3))));
  }
  
  toDifficulty() {
    return target_max / this.toTarget().toNumber();
  }
  
  
}

module.exports = Header;
