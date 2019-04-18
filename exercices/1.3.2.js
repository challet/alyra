// https://ecole.alyra.fr/mod/assign/view.php?id=55

function frequences(chaine) {
  var occurences = {};
  
  for (let i = 0; i < chaine.length; i++) {
    let code = chaine.charCodeAt(i);
    if (typeof occurences[code] == 'undefined') {
      occurences[code] = 0;
    }
    
    occurences[code]++;
  }
  
  return occurences;
}

var program = require('commander');
program
  .version("1.0.0")
  .parse(process.argv);

const entree = process.argv[2];
const occurences = frequences(entree);
for (var code in occurences) {
  console.log(`"${String.fromCharCode(code)}" [${code}] est utilisé ${occurences[code]} fois.`);
}
