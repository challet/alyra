// https://ecole.alyra.fr/mod/assign/view.php?id=54

function chiffreCesar(chaine, cle) {
  let resultat = "";
  
  for (let i = 0; i < chaine.length; i++) {
    resultat += String.fromCharCode(
      chaine.charCodeAt(i) + cle
    );
  }
  
  return resultat;
}

var program = require('commander');
program
  .version("1.0.0")
  .option("-c, --cle [value]")
  .parse(process.argv);

const entree = process.argv[2];
const sortie = chiffreCesar(entree, program.cle ? parseInt(program.cle) : 1);

console.log(sortie);