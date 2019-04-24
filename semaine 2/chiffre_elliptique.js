const crypto = require('crypto');
const sha256 = require('crypto-js/sha256');
const ripemd160 = require('crypto-js/ripemd160');
const bignum = require('bignum');

var public_curve = {
  a: bignum(0),
  b: bignum(7),
  g: { 
    x: bignum(380689),
    y: bignum(234885113)
  }
};

// vérifier les paramètres de cryptographie
function verifier_point_courbe(data) {
  // return data.g.y ** 2 == data.g.x ** 3 + data.a * data.g.x + data.b;
    console.error(data.g.y.pow(2).toString(), data.g.x.pow(3).add(data.g.x.mul(data.a)).add(data.b).toString());
    
  return data.g.y.pow(2).eq(data.g.x.pow(3).add(data.g.x.mul(data.a)).add(data.b));
}

// multiplication elliptique
function ec_2_multiplication(point) {
  // let m = (3 * point.x ** 2 + public_curve.a) / 2 * point.y;
  let m = point.x.pow(2).mul(3).add(public_curve.a).div(point.y.mul(2));
  // let x = m ** 2 - 2 * point.x;
  let x = m.pow(2).sub(point.x.mul(2));
  // let y = m * (point.x - x) - point.y;
  let y = m.mul(point.x.sub(x)).sub(point.y);
  return { x: x, y: y};
}

// addition elliptique
function ec_addition(point_a, point_b) {
  // let m = (point_b.y - point_a.y) / (point_b.x - point_b.y);
  let m = point_b.y.sub(point_a.y).div(point_b.x.sub(point_b.y));
  // let x = m ** 2 - point_b.x - point_a.x;
  let x = m.pow(2).sub(point_b.x).sub(point_a.x);
  // let y = m * (point_a.x - point_b.x) - point_a.x;
  let y = m.mul(point_a.x.sub(point_b.x)).sub(point_a.x);
  return { x: x, y: y};
}

// multiplication d'un point sur la courbe
function scalar_multiplication(nombre, point) {
  // precompute power 2 factors
  let bit_count = nombre.bitLength();
  console.log(nombre, bit_count);
  let factors = [point];
  for (var i = 1; i < bit_count; i++) {
    factors[i] = ec_2_multiplication(factors[i - 1]);
  }
  console.log(bit_count, factors);
  
  // applique les facteurs (masque binaire)
  var result = point;
  for (let i = 0; i < bit_count; i++) {
    if (nombre.and(2 ** i).neq(0)) {
      result = ec_addition(result, factors[i]);
    }
  }
  
  return result;
}

// générer une adresse à partir d'une clé publique;
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

if (!verifier_point_courbe(public_curve)) {
  throw `Le point [x=${public_curve.g.x}, y=${public_curve.g.y}] n'est pas sur la courbe [y² = x³ + ${public_curve.a}x + ${public_curve.b}].`;
}

let priv_key = parseInt(crypto.randomBytes(6).toString('hex'), 16);
let pub_key  = scalar_multiplication(priv_key, public_curve.g);
let btc_addr = adresse_bitcoin(pub_key);

console.log('priv_key', priv_key);
console.log('pub_key', pub_key);
console.log('btc_addr', btc_addr);
