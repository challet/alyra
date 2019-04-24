// https://ecole.alyra.fr/mod/assign/view.php?id=71
const Hexa = require('./lib/hexa.js');
const date_locale_config = { 
  weekday: 'long', 
  month: 'long', 
  year: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

var quatre_octets = new Hexa(Buffer.alloc(4, 0xff));
var valeur_max = quatre_octets.toNumber();

console.log('Valeur maximum pour un entier codé sur 4 octets: ', valeur_max);

var timestamp = new Date(0);
// > Si un paramètre utilisé est en dehors des limites attendues, setSeconds() tentera de mettre à jour la date en conséquence. 
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/setSeconds#Description
timestamp.setSeconds(valeur_max);

var temps_lisible = timestamp.toLocaleString('fr-FR' , date_locale_config);
console.log("Un timestamp codé sur 4 octets atteindra sa limite le :", temps_lisible);
