// https://ecole.alyra.fr/mod/assign/view.php?id=36

var program = require('commander');
program
  .version("1.0.0")
  .parse(process.argv);

function devinette(solution) {
  let essais = 1;  
  let range = { min: 1, max: 100};
  let estimation = null;
  
  // recherche par dichotomie
  do {
    estimation = Math.round(range.min + (range.max - range.min) / 2);
    console.info(`estimation ${estimation} (essai n° ${essais++})`);
    if (estimation > solution) {
      range.max = estimation;
    } else {
      range.min = estimation;
    }
    
    // no solution
    if(range.min == range.max) {
      return null;
    }
    
  } while (estimation != solution);
  
  return estimation;
}

let solution = parseInt(process.argv[2]);
console.log('solution', solution);
console.log('résultat', devinette(solution));