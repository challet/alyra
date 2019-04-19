const program = require('commander');
program
  .version("1.0.0")
  .option("-l, --little")
  .option("-v, --varint")
  .parse(process.argv);

const Hexa = require('./lib/hexa.js');

var entree = process.argv[2];
var hexa = new Hexa(entree, { little: !!program.little, varint: !!program.varint});
console.log(hexa);

var sortie = hexa.toString();
console.log(sortie);
