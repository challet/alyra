class Display {
  
  constructor() {
    this.options = {
      group_each: 2,
      group_separator: " ",
      data_size: 64,
      header_size: 20
    };
  }

  one(hexa, label) {
    var outputed = 0;
    while (outputed < hexa.length) {
      let header = outputed == 0 ? `${label} (${hexa.length})` : '';
      
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
      
      console.log(header.padEnd(this.options.header_size), body);
      
      outputed += this.options.data_size;
    }
  }
  
  struct(struct) {
    
    struct.parts.forEach((part) => {
      this.one(part.hexa, part.name);
    });
    
  }
  
}

module.exports = Display;