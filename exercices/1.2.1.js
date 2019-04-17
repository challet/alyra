// https://ecole.alyra.fr/mod/assign/view.php?id=46

var program = require('commander');
program
  .version("1.0.0")
  .parse(process.argv);
  
function factorielle(nombre) {
  let result = 1;
  for (let i = 1; i <= nombre; i++) {
    result *= i;
    console.info(nombre, result);
  }
  return result;
}

console.log(factorielle(process.argv[2]));