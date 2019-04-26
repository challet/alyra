const Struct = require('./../struct/struct.base.js');
const Varint = require('./../varint.js');
const Op     = require('./../op/op.base.js');

const Display = new (require('./display.js'))();

class Processor extends Struct {
  
  constructor(output, input) {
    super(Buffer.concat([output.buffer, input.buffer]), output.parts.concat(input.parts));
    this.hasRan = false;
  }

  run() {
    let stack = [];
    let instructions = this.parts.map( (part) => part.hexa );
    
    while (instructions.length) {
      let instr = instructions.shift();
      
      if (instr instanceof Varint) {
        // push operation : 1 -> 78, varint style
        let data = instructions.shift();
        if (data.length != instr.toNumber()) {
          throw `The data piece (${data.length}) has a size different than expected (${instr.toNumber()})`;
        }
        console.info(`Pushing next piece (${data.length}) to stack`);
        stack.push(data);
      } else if (instr instanceof Op){
        console.info(`Executing ${instr.constructor.name}`);
        // execute instruction
        instr.execute(stack);
      }
      
      console.info('Stack is now');
      stack.forEach( (i,j) => Display.one(i, j.toString()));
    }
    
    this.hasRan = true;
    this.result = stack.pop();
    return this.result;
  }
}

module.exports = Processor;
