// https://ecole.alyra.fr/mod/assign/view.php?id=47

var program = require('commander');
program
  .version("1.0.0")
  .option("-o, --optimise")
  .parse(process.argv);

const transactions = [
  { taille: 2000, pourboire: 13000 },
  { taille: 6000, pourboire:  9000 },
  { taille:  800, pourboire:  2000 },
  { taille:  700, pourboire:  1500 },
  { taille: 1200, pourboire:  3500 },
  { taille: 1000, pourboire:  2800 },
  { taille: 1300, pourboire:  5000 },
  { taille:  600, pourboire:  1500 }
];

function applique_masque(mask) {
  const result = { mask: mask, taille: 0, pourboire: 0 };

  for (let i = 0; i < transactions.length; i++) {
    if (mask & (2 ** i)) {
      result.taille     += transactions[i].taille;
      result.pourboire  += transactions[i].pourboire;
    }
  }

  return result;
}

// compléxité : O(2^n)
function cherche_exhaustif(taille_allouee) {
  const combinaisons = [];
  const nb_combinaisons = 2 ** transactions.length;
  
  // utiliser un masque binaire pour évaluer toutes les combinaisons
  for (let mask = 0; mask < nb_combinaisons; mask++) {
    combinaisons.push(applique_masque(mask));
  }
  
  return combinaisons
    // filtrer les combinaisons qui dépassent la taille allouée
    .filter( (comb) => comb.taille <= taille_allouee )
    // trier les combinaisons par pourboire gagné (croissant)
    .sort( (c1, c2) => c1.pourboire - c2.pourboire )
    // garder cella avec le plus grand pourboire
    .pop();
}

// compléxité : O(n)
function cherche_optimise(taille_allouee) {
  // trier les combinaisons par rendement (/!\ décroissant)
  transactions.sort( (c1, c2) =>  c2.pourboire / c2.taille - c1.pourboire / c1.taille);
  
  const result = { mask: 0, taille: 0, pourboire: 0 };
  // tenter d'ajouter les plus efficaces en premier
  transactions.forEach( (trans, i) => {
    if (trans.taille <= taille_allouee - result.taille) {
      result.taille     += trans.taille;
      result.pourboire  += trans.pourboire;
      result.mask       += 2 ** i;
    }
  });
  
  return result;
}


function affiche_combinaison(comb) {
  console.log('meilleure combinaison:', comb, 'avec les transactions suivantes :');
  for (let i = 0; i < 8; i++) {
    if (comb.mask & (2 ** i)) {
      console.log(transactions[i]);
    }
  }
}

const meilleure = !program.optimise ? cherche_exhaustif(process.argv[2]) : cherche_optimise(process.argv[2]);
affiche_combinaison(meilleure);
