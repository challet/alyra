// https://ecole.alyra.fr/mod/assign/view.php?id=55

function frequences(chaine) {
  var occurences = [];
  
  for (let i = 0; i < chaine.length; i++) {
    let code = chaine.charCodeAt(i);
    if (typeof occurences[code] == 'undefined') {
      occurences[code] = { code: code, compte: 0 };
    }
    occurences[code].compte++;
  }
  
  return occurences;
}

var program = require('commander');
program
  .version("1.0.0")
  .parse(process.argv);

const entree = process.argv[2];
const occurences = frequences(entree);
occurences.sort( (a,b) => b.compte - a.compte );

occurences.forEach( (freq) => {
  console.log(`"${String.fromCharCode(freq.code)}" [${freq.code}] est utilisé ${freq.compte} fois.`);
});
