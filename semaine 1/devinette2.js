// humain choisi, ordinateur devine
function devinette() {
  let solution = parseInt(prompt("Entrez un nombre entre 1 et 100"));
  let entree = null;
  let essais = 0;
  
  while(entree != solution) {
    entree = Math.ceil(Math.random() * 100);
    let symbole = entree == solution ? '=' : '≠';
    let gagne = entree == solution? 'gagné' : 'perdu';
    console.log(`essai ${++essais} : ${entree} ${symbole} ${solution}, ${gagne}`);
  }
}