const Hexa = require('./lib/hexa.js');
const Varint = require('./lib/varint.js');
const Input = require('./lib/struct/btc/input.js');
const Display = new (require('./lib/components/display.js'))();

var transaction = Hexa.fromString(process.argv[2]);
var version     = transaction.slice(0, 4).reverse();

//affiche('etalon', etalon);
Display.one(transaction, 'transaction');
Display.one(version, 'version');

var varint_e        = Varint.extractFrom(transaction.slice(4));
var decalage        = 4 + varint_e.length;
var nb_entrees      = varint_e.toNumber();



for (var i = 0; i < nb_entrees; i++ ) {
  console.log('aaa');
  console.log(Input.extractFrom(transaction.slice(decalage)));
  
  
}




Display.one(nb_entrees, 'nb_entrees');




