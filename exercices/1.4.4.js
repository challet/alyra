const Hexa = require('./lib/hexa.js');
const Transaction = require('./lib/struct/transaction.js');
const Display = new (require('./lib/components/display.js'))();

var data = Hexa.fromString(process.argv[2]);
var transaction = Transaction.extractFrom(data);

Display.struct(transaction);
