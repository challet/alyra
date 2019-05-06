const Hexa = require('./lib/hexa.js');
const Script = require('./lib/struct/script.js');
const Display = new (require('./lib/components/display.js'))();
const Processor = require('./lib/components/processor.js');

var data_out = Hexa.fromString(process.argv[2]);
var data_in = Hexa.fromString(process.argv[3]);

var script_out = Script.extractFrom(data_out);
var script_in = Script.extractFrom(data_in);

Display.one(script_out, '> Output');
Display.struct(script_out);
Display.one(script_in, '> Input');
Display.struct(script_in);

var proc = new Processor(script_out, script_in);
console.log('> Fusionne les scripts');
Display.struct(proc);

console.log("> Execute l'ensemble");
let resultat = proc.run();

Display.one(resultat, '> Résultat');