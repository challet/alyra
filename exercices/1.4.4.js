const Hexa = require('./lib/hexa.js');
const lg = [11, 20]

// TODO : make this a Hexa.toString() option
function affiche(label, hexa) {
  console.log(
    label.padEnd(lg[0]),
    `${hexa.style} (${hexa.taille()})`.padEnd(lg[1]),
    hexa.toString()
  );
}


var transaction = Hexa.depuisChaine(process.argv[2]);
var version     = transaction.slice(0, 4, 'littleendian');

//affiche('etalon', etalon);
affiche('transaction', transaction);
affiche('version', version);

var entrees     = transaction.slice(4).identifierListe();
entrees.forEach((entree, index) => {
  affiche(`entree ${index}`, entree);
});


