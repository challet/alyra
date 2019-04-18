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
      console.log(`[${valeur}]`);
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
  
  infixe(acc) {
    if (this.gauche) {
      this.gauche.infixe(acc);
    }
    acc.push(this);
    if (this.droite) {
      this.droite.infixe(acc);
    }
    return acc;
  }
  
  supprimer(valeur) {
    // TODO
  }
  
  toString() {
    return this.valeur;
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
    return this.racine.trouver(valeur);
  }
  
  afficher(mode) {
    switch (mode) {
      case 'infixe': default:
        var list = this.racine.infixe([]);
      break;
    }
    console.log(
      list
        .map((n) => n.toString())
        .join(' ')
    );
  }
  
  supprimer(valeur) {
    if (!this.trouver(valeur)) {
      console.error(`${valeur} n'est pas présent et ne peut pas être supprimé`);
      return false;
    }
    
    return this.racine.supprimer(valeur);
  }
}

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// lire les données en entrée pour les insérer dans un arbre binaire
const valeurs = process.argv
  .slice(2)
  .map( (v) => parseInt(v) );
const arbre = new Arbre();

console.log("> Initialisation de l'arbre");
valeurs.sort( (a,b) => a - b );
arbre.ajouter_liste_trie(valeurs);

console.log("> Affichage infixe");
arbre.afficher();

rl.question(`Entrer une valeur à chercher: `, (entree) => {
  rl.pause();
  if (arbre.trouver(parseInt(entree))) {
    console.log(`> ${entree} a été trouvé par le parcours ci-dessus (bas en haut).`)
  } else {
    console.log(`> ${entree} n'est pas présent dans l'arbre.`);
  }
  
  // question suivante
  rl.question(`Entrer une valeur à supprimer: `, (entree) => {
    rl.pause();
    arbre.supprimer(entree);
  })
});
