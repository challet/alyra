const Hexa = require('./lib/hexa.js');
const lg = [11, 20]

var entree = process.argv[2];
var hexa = Hexa.depuisChaine(entree, 'littleendian');

// TODO : make this a Hexa.toString() option
function affiche(label, hexa) {
  console.log(
    label.padEnd(lg[0]),
    `${hexa.style} (${hexa.taille()})`.padEnd(lg[1]),
    hexa.toString()
  );
}

var transaction = hexa.slice(0, 32);
var index       = hexa.slice(32, 36);
var script_sig  = hexa.slice(36, hexa.taille() - 4, 'varint');
var sequence    = hexa.slice(- 4);

var etalon = Hexa.etalon(Math.max(transaction.taille(), index.taille(), script_sig.taille(), sequence.taille()));

affiche('etalon', etalon);
console.log('-------');
affiche('transaction', transaction);
affiche('index',       index);
affiche('script_sig',  script_sig);
affiche('sequence',    sequence);

// console.log('-------');
// script_sig = script_sig.versLittleEndian();
// affiche('script_sig',  script_sig);
// script_sig.splitVarInt().map((field) => console.log(field.toString()));
