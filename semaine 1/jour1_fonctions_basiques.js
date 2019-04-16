// exemple basique de fonction de hachage
function hachage(chaine) {
    let condensat = 0;
  
    for (let i = 0; i < chaine.length; i++) {
        condensat += chaine.charCodeAt(i) * 3 ** i;
    }
    
    return condensat % 65536;
}

// exemple basique de fonction de minage
function minage(chaine, target) {
    let condensat, nonce = -1;
    
    do {
        nonce++;
        condensat = hachage(chaine + nonce);
        console.log(`nonce = ${nonce}`, `condensat = ${condensat}`)
    } while(condensat >= target);
    
    return condensat;
}