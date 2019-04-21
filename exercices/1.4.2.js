const Hexa = require('./lib/data/hexa.js');
const Varint = require('./lib/data/varint.js');

var entree = process.argv[2];
var hexa = Hexa.fromNumber(entree);

console.log('entree', entree );
console.log('big endian', hexa.toString() );
console.log('little endian', hexa.reverse().toString() );


var varint = Varint.fromNumber(entree);
console.log('varint', varint.toString() );

