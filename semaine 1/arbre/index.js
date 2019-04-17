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
        this.gauche.ajouter(valeur)
      }
    } else {
      if(this.droite === null) {
        this.droite = new Noeud(valeur);
      } else {
        this.droite.ajouter(valeur)
      }
    }
  }
  
}

class Arbre {
  
  constructor() {
    this.racine = null;
  }
  
  ajouter(valeur) {
    if (this.racine == null) {
      this.racine = new Noeud(valeur);
    } else {
      this.racine.ajouter(valeur);
    }
  }
  
}