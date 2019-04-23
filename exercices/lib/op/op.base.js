const Hexa = require('./../hexa.js');

class Op extends Hexa {
  
  static factory(code, hexa) {
    return new (require(`./op.${code.toString(16)}.js`))(hexa);
  }
  
  execute(stack) {
    throw `${this.constructor.name} class must implement a execute method.`;
  }
  
}

module.exports = Op;
