const taille_table = 8;
const data = [
  { ville: "Amsterdam",       ip: "153.8.223.72"},
  { ville: "Chennai",         ip: "169.38.84.49"},
  { ville: "Dallas",          ip: "169.46.49.112"},
  { ville: "Dallas, TX, USA", ip: "184.173.213.155"},
  { ville: "Frankfurt",       ip: "184.173.213.155"},
  { ville: "Hong Kong ",      ip: "119.81.134.212"},
  { ville: "London",          ip: "5.10.5.200"},
  { ville: "London",          ip: "158.176.81.249"},
  { ville: "Melbourne",       ip: "168.1.168.251"},
  { ville: "Mexico City",     ip: "169.57.7.230"},
  { ville: "Milan",           ip: "159.122.142.111"},
  { ville: "Paris",           ip: "159.8.78.42" },
  { ville: "San Jose",        ip: "192.155.217.197"},
  { ville: "São Paulo",       ip: "169.57.163.228"},
  { ville: "Toronto",         ip: "169.56.184.72"},
  { ville: "Washington DC",   ip: "50.87.60.166"}
];

const MD5 = require('crypto-js/md5');
//const md5 = new Hashes.MD5();

// table de hash avec 8 entrées [0 -> 7]
var table = new Array(taille_table);
console.log(table);

// store the servers in the hash table
data.forEach( (serveur) => {
  var hash = Number(`0x${MD5(serveur.ip).toString().charAt(0)}`) % taille_table;
  if (typeof table[hash] == 'undefined') {
    table[hash] = [];
  }
  table[hash].push(serveur);
});

console.log(table);
