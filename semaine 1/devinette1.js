// ordinateur choisi, humain devine
function devinette() {
  let solution = Math.ceil(Math.random() * 100);
  let essais = 0;
  let entree = null;
  
  do {
    entree = prompt(`Devinez le nombre entre 1 et 100 (essai: ${++essais})`);
  } while(entree != solution && entree != null);
  
  alert(entree != null ? "gagné" : `perdu (solution: ${solution})`);
}