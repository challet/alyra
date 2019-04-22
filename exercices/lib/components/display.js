const Struct = require('./../struct');

class Display {
  
  constructor() {
    this.options = {
      group_each: 2,
      group_separator: " ",
      data_size: 64,
      struct_details: 2, // 0 only full data, 1 only details, 2 both
      level_indicator: "# ",
      sizes: {
        label: 12,
        length: 4,
        constructor: 6
      }
    };
  }

  one(hexa, label) {
    var outputed = 0;
    while (outputed < hexa.length) {
      let body = '';
      
      if (this.options.group_each) {
        for (let i = 0; i < this.options.data_size / this.options.group_each; i++ ) {
          let chunk = hexa.toString(
            outputed + this.options.group_each * i, 
            outputed + this.options.group_each * (i + 1)
          );
          body += chunk + this.options.group_separator + (i % 4 == 3 ? this.options.group_separator : '');
        }
      } else {
        body = hexa.toString(outputed, outputed + this.options.data_size)
      }
      
      let header = outputed == 0;
      console.log(
        (header ? label :                   '').padEnd(this.options.sizes.label), 
        (header ? hexa.length.toString() :  '').padEnd(this.options.sizes.length),
        (header ? hexa.constructor.name :   '').padEnd(this.options.sizes.constructor),
        body
      );
      
      outputed += this.options.data_size;
    }
  }
  
  struct(struct, level) {
    
    if (!level) level = 0;
    
    struct.parts.forEach((part) => {
      
      let label = this.options.level_indicator.repeat(level) + part.name ;
      if (part.hexa instanceof Struct && this.options.struct_details != 0) {

        if (this.options.struct_details == 2) {
          this.one(part.hexa, label);
        }
        this.struct(part.hexa, level + 1);
      } else {
        this.one(part.hexa, label);
      }
    });
    
  }
  
}

module.exports = Display;