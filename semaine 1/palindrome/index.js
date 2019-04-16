var program = require('commander');
program
  .version("1.0.0")
  .option("-r, --recursif")
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

let chaine = process.argv[2].split(' ').join('');

if(!program.recursif) {
  console.info("itératif");
  console.log(palindrome_iteratif(chaine));
} else {
  console.info("recursif");
  console.log(palindrome_recursif(chaine));
}
