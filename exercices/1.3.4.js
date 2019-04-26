const Eccrypt = require('./lib/components/eccrypt.js');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


var courbe = new Eccrypt(process.argv[2] || 0, process.argv[3] || 7);
console.log(courbe.toString());

// voir https://andrea.corbellini.name/ecc/interactive/modk-mul.html pour les coordonnées
function test_prompt() {
  rl.question(`Entrer un point à tester (format "a,b"): `, (entree) => {
    rl.pause();

    if (entree == '') {
      rl.close();
    }
  
    let point = entree.split(',').map( (v) => parseFloat(v) );
    console.log(courbe.testPoint(point[0], point[1]));
    test_prompt();
  });
}
test_prompt();

// TODO : implment modulo functions in Eccrypt
