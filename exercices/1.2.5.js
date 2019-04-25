const Tree = require('./lib/tree/tree.js');
const NodeInt = require('./lib/tree/data/int.js');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// lire les données en entrée pour les insérer dans un arbre binaire
const valeurs = process.argv.slice(2).map( (v) => new NodeInt(parseInt(v)) );
  
const arbre = new Tree();

console.log("> Initialisation de l'arbre");
arbre.addList(valeurs);

console.log("> Affichage infixe");
arbre.displayNodes(arbre.findAll(Tree.MODE_INFIX));

rl.question(`Entrer une valeur à chercher: `, (entree) => {
  rl.pause();
  let noeud_entree = arbre.find(new NodeInt(parseInt(entree)));
  if (noeud_entree) {
    console.log(`> ${entree} a été trouvé par le parcours ci-dessous.`);
    do {
      console.log(noeud_entree.toString());
      noeud_entree = noeud_entree.parent;
    } while(noeud_entree);
  } else {
    console.log(`> ${entree} n'est pas présent dans l'arbre.`);
  }
  
  // question suivante
  rl.question(`Entrer une valeur à supprimer: `, (entree) => {
    rl.pause();
    arbre.remove(new NodeInt(parseInt(entree)));
    arbre.displayNodes(arbre.findAll(Tree.MODE_INFIX));;
  })
});
