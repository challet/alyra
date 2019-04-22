const Hexa = require('./lib/structures/hexa.js');
const Input = require('./lib/structures/btc/input.js');
const Display = new (require('./lib/components/display.js'))();

var data = Hexa.fromString(process.argv[2]);
var entree = Input.extractFrom(data);
var script = entree.parts.find((part) => part.name == 'script_dat');

Display.struct(entree);
console.log('---------------------');
Display.struct(script.hexa);