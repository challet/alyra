const sha256 = require('crypto-js/sha256');
const ripemd160 = require('crypto-js/ripemd160');
const bs58 = require('bs58')

function adresse_bitcoin(nombre, reseau_test) {
  // double condensat
  let hash = ripemd160(sha256(nombre));
  // préfixe de réseau
  hash = (typeof reseau_test != 'undefined' && reseau_test === true ? '0x00' : '0x6f') + hash;
  // suffixe de contrôle
  hash = hash + sha256(sha256(hash).toString()).toString().slice(0, 4);
  // conversion en base 58
  const bytes = Buffer.from(hash);
  hash = bs58.encode(bytes);
  return hash;
}

console.log(adresse_bitcoin(process.argv[2]));
