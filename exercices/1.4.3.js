const Hexa = require('./lib/hexa.js');
const Input = require('./lib/struct/input.js');
const Display = new (require('./lib/components/display.js'))();

var data = Hexa.fromString(process.argv[2]);
var entree = Input.extractFrom(data);

Display.struct(entree);
