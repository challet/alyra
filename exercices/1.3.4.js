class CourbeElliptique {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    
    if (4 * a ** 3 + 27 * b ** 2 == 0) {
      throw new Exception(`${this} n'est pas une coourbe valide`);
    }
  }
  
  eq(courbe) {
    return this.a == courbe.a && this.b == courbe.b;
  }
  
  testPoint(x, y) {
    return y ** 2 == x ** 3 + this.a * x + this.b;
  }
  
  toString() {
    return `(${this.a}, ${this.b})`;
  }
  
}

var program = require('commander');
program
  .version("1.0.0")
  .parse(process.argv);

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var courbe = new CourbeElliptique(process.argv[2], process.argv[3]);
console.log(courbe.toString());

function test_prompt() {
  rl.question(`Entrer un point à tester (format "a,b"): `, (entree) => {
    rl.pause();

    if (entree == '') {
      rl.close();
    }
  
    let point = entree.split(',').map( (v) => parseFloat(v) );
    console.log(courbe.testPoint(point[0], point[1]));
    test_prompt();
  });
}
test_prompt();
