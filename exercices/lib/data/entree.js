const Hash = require('./hash.js');

module.exports = class Entree {
  
  constructor(transaction, index, script_sig, sequence) {
    this.transaction = transaction;
    this.index = index;
    this.script_sig = script_sig;
    this.sequence = sequence;
  }
  
  parse(data) {
    
    
    
  }
}