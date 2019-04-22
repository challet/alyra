const Hexa = require('./lib/hexa.js');

var entree = process.argv[2];
var hexa = Hexa.fromNumber(entree);

console.log('entree', entree );
console.log('big endian', hexa.toString() );
console.log('little endian', hexa.reverse().toString() );

