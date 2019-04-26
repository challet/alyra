const ASCII_A = 65;
const ASCII_Z = 90;

const MAX_ITERATION = 5000;

function chaineAlea(taille) {
  var chars = [];
  
  for (let i = 0; i < taille; i++) {
    chars.push(ASCII_A + Math.floor(Math.random() * (ASCII_Z - ASCII_A)));
  }
  
  return String.fromCharCode(...chars); 
}

function rechercheDebut(debut, taille) {
  const regexp = new RegExp(`^${debut}`);
  var i = 0;
  do {
    var test = chaineAlea(taille);
    console.log(i++, test);
  } while (!regexp.test(test) && i < MAX_ITERATION);
  
  return test;
}

let cible = process.argv[3];
let taille = process.argv[2];

console.log('chaine aléatoire:', chaineAlea(taille));

console.log(`Recherche "${cible}" `);
rechercheDebut(cible, taille);
