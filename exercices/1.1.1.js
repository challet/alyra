// https://forum.alyra.fr/t/exercice-1-1-1-trouver-un-nombre-aleatoire/67/5

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let solution = Math.ceil(Math.random() * 100);
let essais = 0;

function devinette() {
  rl.question(`Devinez le nombre entre 1 et 100 (essai n° ${++essais}): `, (entree) => {
    rl.pause();
    
    if(entree === '') {
      console.log(`La solution était ${solution}`);
      rl.close();
      return;
    }
    
    if(entree != solution) {
      console.log('Perdu!');
      devinette();
    } else {
      console.log('Gagné!');
      rl.close();
      return;
    }
  });
}

devinette();
