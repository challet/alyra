const Hexa = require('./lib/hexa.js');

var entree = process.argv[2];
var hexa = Hexa.depuisNombre(entree);

switch (process.argv[3]) {
  case 'big': default:
    hexa = hexa.versBigEndian();
  break;
  case 'little':
    hexa = hexa.versLittleEndian();
  break;
  case 'varint':
    hexa = hexa.versVarInt();
  break;
}

var sortie = hexa.toString();
console.log(sortie);
