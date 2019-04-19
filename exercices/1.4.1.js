const BASE = 16;


function caractere_hexa(chiffre) {
  switch (chiffre) {
    case 0:case 1:case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
      return chiffre.toString();
    break;
    case 10:
      return 'A';
    break;
    case 11:
      return 'B';
    break;
    case 12:
      return 'C';
    break;
    case 13:
      return 'D';
    break;
    case 14:
      return 'E';
    break;
    case 15:
      return 'F';
    break;
    default:
      throw (`${chiffre} n'est pas une valeur valide`);
    break;
  }
}

function entier_vers_hexa(nombre) {
  let result = [];
  let nombre_tampon = nombre;
  
  for (let i = 1; i < nombre; i *= BASE) {
    let chiffre = (nombre_tampon / i) % BASE;
    result.unshift(caractere_hexa(chiffre));
    nombre_tampon -= i * chiffre;
  }
  
  // extra 0 pour avoir un nombre de caractères multiple de 2
  if (result.length % 2 != 0) {
    result.unshift('0');
  }
  
  return result;
}

function format_big_endian(hexa) {
  console.info('big endian');
  var chaine = "0x";
  for (let i = 0; i < hexa.length; i += 2) {
    chaine += " " + hexa.slice(i, i + 2).join('');
  }
  return chaine;
}

function format_little_endian(hexa) {
  console.info('little endian');
  var chaine = "0x";
  for (let i = hexa.length - 2; i >= 0; i -= 2) {
    chaine += " " + hexa.slice(i, i + 2).join('');
  }
  return chaine;
}

var program = require('commander');
program
  .version("1.0.0")
  .option("-l, --little")
  .parse(process.argv);

var entree = process.argv[2];
var hexa = entier_vers_hexa(entree);
console.log(hexa);
var sortie = !program.little ? format_big_endian(hexa) : format_little_endian(hexa);
console.log(sortie);
