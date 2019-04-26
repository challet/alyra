const Hexa = require('./lib/hexa.js');
const Header = require('./lib/struct/header.js');
const Display = new (require('./lib/components/display.js'))();

var data = Hexa.fromString(process.argv[2]);
var header = Header.extractFrom(data);

Display.struct(header);
