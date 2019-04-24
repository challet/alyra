// https://ecole.alyra.fr/mod/assign/view.php?id=72&forceview=1
const Hexa = require('./lib/hexa.js');
const date_locale_config = { 
  month: 'numeric', 
  year: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short',
  timeZone: 'UTC'
};

const dix_minutes = 10 * 60 * 1000; // en ms
const taille_par_bloc = 80;
const mo = 1024 * 1024;

// timestamp 1231006505 : GMT Saturday 3 January 2009 18:15:05
// L'objet Date prend en argument le nombre de ms
var timestamp = new Date(1231006505 * 1000);
var maintenant = new Date(Date.now());
var nb_blocs = Math.ceil((maintenant - timestamp) / dix_minutes);
var poids = nb_blocs * taille_par_bloc;

console.log(
`Entre le ${timestamp.toLocaleString('fr-FR', date_locale_config)} et le ${maintenant.toLocaleString('fr-FR', date_locale_config)}, ${nb_blocs.toLocaleString('fr-FR')} blocs ont été créés. La taille totale des en-têtes est ${(poids / mo).toLocaleString('fr-FR')} Mo.`
);
