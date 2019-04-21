const Hexa = require('./lib/data/hexa.js');
const Display = new (require('./lib/component/display.js'))();

var entree = Hexa.fromString(process.argv[2]);

Display.one(entree, 'entree');

var transaction = entree.slice(0, 32);
var index       = entree.slice(32, 36);
var script_sig  = entree.slice(36, entree.length - 4);
var sequence    = entree.slice(- 4);

//var etalon = Hexa.etalon(Math.max(transaction.taille(), index.taille(), script_sig.taille(), sequence.taille()));

Display.one(transaction, 'transaction');
Display.one(index,       'index');
Display.one(script_sig,  'script_sig');
Display.one(sequence,    'sequence');


// console.log('-------');
// script_sig = script_sig.versLittleEndian();
// affiche('script_sig',  script_sig);
// script_sig.splitVarInt().map((field) => console.log(field.toString()));
