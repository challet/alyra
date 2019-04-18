class Noeud {
  
  constructor(valeur) {
    this.gauche = null;
    this.droite = null;
    this.valeur = valeur;
  }
  
  ajouter(valeur) {
    if(valeur < this.valeur) {
      if(this.gauche === null) {
        this.gauche = new Noeud(valeur);
      } else {
        this.gauche.ajouter(valeur);
      }
    } else {
      if(this.droite === null) {
        this.droite = new Noeud(valeur);
      } else {
        this.droite.ajouter(valeur);
      }
    }
  }
  
  trouver(valeur) {
    if (valeur == this.valeur) {
      console.log(`[${this.valeur}]`);
      return true;
    } else if (valeur < this.valeur && this.gauche != null && this.gauche.trouver(valeur)) {
      console.log(`< ${this.valeur}`);
      return true;
    } else if (valeur >= this.valeur && this.droite != null && this.droite.trouver(valeur)) {
      console.log(`${this.valeur} >`);
      return true;
    } else {
      return false;
    }
  }
  
}

class Arbre {
  
  constructor() {
    this.racine = null;
  }
  
  ajouter(valeur) {
    console.info('ajouter', valeur);
    if (this.racine == null) {
      this.racine = new Noeud(valeur);
    } else {
      this.racine.ajouter(valeur);
    }
  }
  
  ajouter_liste_trie(valeurs) {
    if (valeurs.length == 0) {
      return;
    }
    
    // ajouter la valeur au centre de la liste (= élément unique si tableau de 1 élément)
    const centre = Math.floor(valeurs.length / 2);
    this.ajouter(valeurs[centre]);
    
    // faire de même pour les 2 tableaux à gauche et à droite de l'élément central
    this.ajouter_liste_trie(valeurs.slice(0, centre));
    this.ajouter_liste_trie(valeurs.slice(centre + 1, valeurs.length));
  }
  
  trouver(valeur) {
    if (this.racine.trouver(valeur)) {
      console.log(`${valeur} a été trouvé par le parcours ci-dessus (bas en haut).`)
    } else {
      console.log(`${valeur} n'est pas présent dans l'arbre.`);
    }
  }
  
  afficher(mode) {
    switch (mode) {
      case 'infixe': default:
        
      break;
    }
  }
}

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// lire les données en entrée pour les insérer dans un arbre binaire
const valeurs = process.argv.slice(2).map( (v) => parseInt(v) );
const arbre = new Arbre();

valeurs.sort( (a,b) => a - b );
arbre.ajouter_liste_trie(valeurs);


rl.question(`Entrer une valeur à chercher: `, (entree) => {
  rl.pause();
  arbre.trouver(parseInt(entree));
});
