// https://ecole.alyra.fr/mod/quiz/view.php?id=206

var program = require('commander');
program
  .version("1.0.0")
  .option("-r, --recursif")
  .option("-e, --entree")
  .parse(process.argv);

function palindrome_iteratif(chaine) {
  const moitie = Math.ceil(chaine.length / 2);
  
  for (let i = 0; i < moitie; i++) {
    if (chaine.charAt(i) != chaine.charAt(chaine.length - 1 - i)) {
      return false;
    }
  }
  
  return true;
}

function palindrome_recursif(chaine) {
  const egalite = chaine.charAt(0) == chaine.charAt(chaine.length - 1);
  
  if(chaine.length <= 2 || !egalite) {
    return egalite;
  } else {
    return palindrome_recursif(chaine.substring(1, chaine.length - 1));
  }
}

// enlever les espaces
let chaine = process.argv[2].split(' ').join('');

if(!program.recursif) {
  // node 1.1.3.js "phrase a tester" 
  console.log(palindrome_iteratif(chaine));
} else {
  // node 1.1.3.js "phrase a tester" -r
  console.log(palindrome_recursif(chaine));
}
