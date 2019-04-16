let solution = process.argv[2];
let entree = null;
let essais = 0;

while(entree != solution) {
  entree = Math.ceil(Math.random() * 100);
  let symbole = entree == solution ? '=' : '≠';
  let gagne = entree == solution? 'gagné' : 'perdu';
  console.info(`essai ${++essais} : ${entree} ${symbole} ${solution}, ${gagne}`);
}

console.log(`>> La réponse finale était ${entree}, trouvée en ${essais} essais`);