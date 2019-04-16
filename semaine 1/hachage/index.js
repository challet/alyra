var program = require('commander');
program
  .version("1.0.0")
  .option("-m, --minage <cible>")
  .parse(process.argv);

// exemple basique de fonction de hachage
function hachage(chaine) {
    let condensat = 0;
  
    for (let i = 0; i < chaine.length; i++) {
        condensat = (condensat +chaine.charCodeAt(i) * 3 ** i) % 65536;
    }
    
    return condensat;
}

// exemple basique de fonction de minage
function minage(chaine, target) {
    let condensat, nonce = -1;
    
    do {
        nonce++;
        condensat = hachage(chaine + nonce);
        console.log(`chaine = ${chaine + nonce}, nonce = ${nonce}`, `condensat = ${condensat}`)
    } while(condensat >= target);
    
    return condensat;
}

if(program.minage) {
  console.log(minage(process.argv[4], program.minage));
} else {
  console.log(hachage(process.argv[2]));
}
