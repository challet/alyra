const Hexa = require('./lib/hexa.js');
const Transaction = require('./lib/struct/btc/transaction.js');
const Display = new (require('./lib/components/display.js'))();

var data = Hexa.fromString(process.argv[2]);
var transaction = Transaction.extractFrom(data);

Display.struct(transaction);

/*
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

*/