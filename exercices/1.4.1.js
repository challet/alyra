const BASE = 16;


function caractere_hexa(chiffre) {
  switch (chiffre) {
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
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
  

  
  return result;
}

function format(hexa, format) {
  // extra 0 pour avoir un nombre de caractères multiple de 2
  if (hexa.length % 2 != 0) {
    hexa.unshift('0');
  }

  // order and/or add useful bytes
  switch (format) {
    case 'big': default:
      console.info('big endian');
      // rien de plus à faire : les octets sont déjà triés
    break;
    case 'little':
      console.info('little endian');
      hexa = format_little_endian(hexa);
    break;
    case 'varint':
      console.info('varInt');
      hexa = format_var_int(format_little_endian(hexa));
    break;
  }
  console.debug(hexa);
  // add a prefixe and intermediate spaces
  let bytes = [];
  while (hexa.length != 0) {
    bytes.push(hexa.splice(0, 2).join(''));
  }
  return `0x ${bytes.join(' ')}`;
}

function format_little_endian(hexa) {
  let bytes = [];
  while (hexa.length != 0) {
    bytes = bytes.concat(hexa.splice(-2, 2));
  }
  return bytes;
}

var entree = process.argv[2];
var hexa = entier_vers_hexa(entree);
console.log(hexa);
var sortie = format(hexa, process.argv[3]);
console.log(sortie);
