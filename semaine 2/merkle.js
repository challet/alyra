const program = require('commander');
const sha256 = require('crypto-js/sha256');

var inputData = [];

program
  .version("1.0.0")
  .arguments("<data...>")
  .action((data) => inputData = data)
  .parse(process.argv);


class Arbre {
  constructor(valeurs) {
    valeurs = valeurs.map( (valeur) => {
      return { raw: hash_raw(valeur), hash: hash_real(valeur)};
    } );
    
    // complete with next pow 2 length
    var pow2 = 2 ** Math.ceil(Math.log2(valeurs.length));
    this.valeurs = valeurs.concat(Array(pow2 - valeurs.length).fill(null));
    this.tree = this.computeLevels();
  }
  
  computeLevels() {
    let levels = [this.valeurs];
    let level = 1;
    let level_length = this.valeurs.length;
    
    do {
      levels[level] = [];
      var tmp = [];
      for (var i = 0; i < level_length; i += 2) {
        if (i + 1 < level_length) {
          levels[level].push({ 
            raw: hash_raw(levels[level - 1][i * 2].raw, levels[level - 1][i * 2 + 1].raw), 
            hash: hash_real(levels[level - 1][i * 2].hash, levels[level - 1][i * 2 + 1].hash)
          });
        }
      }
      level++;
      level_length = Math.ceil(level_length / 2);
      
    } while (level_length > 1);
    console.log(levels);
    return levels;
  }
  
}



var arbre = new Arbre(inputData);
console.log(arbre);
return;


function hash_raw(data1, data2) {
  return data;
} 

function hash_real(data1, data2) {
  return sha256(data).toString();
}







function id_level(indexn, initial_length) {
  var level = 0;
  while (index >= initial_length) {
    index -= initial_length;
    level++;
    initial_length = Math.ceil(initial_length / 2);
  }
  return level;
}

// construit l'arbre
let tree = inputData.map( (valeur) => { 
  return { raw: hash_raw(valeur), hash: hash_real(valeur)};
} );

let level_length = tree.length;
let shift = 0;

do {
  for (var i = 0; i < level_length; i += 2) {
    if (i + 1 < level_length) {
      var h = { 
        raw: hash_raw(tree[shift + i].raw + tree[shift + i + 1].raw), 
        hash: hash_real(tree[shift + i].hash + tree[shift + i + 1].hash)
      };
    } else {
      var h = { 
        raw: hash_raw(tree[shift + i].raw + "#"), 
        hash: hash_real(tree[shift + i].hash)
      };
    }
    tree.push(h);
  }
  shift += level_length;
  level_length = Math.ceil(level_length / 2);
} while (level_length > 1);

// affiche
for (var i = 0; i < tree.length; i++) {
  console.log(
    i.toString().padEnd(3),
    id_level(inputData.length, i).toString().padEnd(3),
    tree[i].hash,
    tree[i].raw
  );
}