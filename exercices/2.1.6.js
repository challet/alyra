const valeur_initiale = 50;
const range = 210000;

const precision = Math.pow(10,8);

function recompenseBloc(hauteurBloc) {
    let bounty = valeur_initiale / Math.pow(2, Math.floor(hauteurBloc / range));
    return Math.trunc(bounty * precision) / precision;
}

function bitcoinsEnCirculation(hauteurBloc) {
    let nb_ranges = Math.floor(hauteurBloc / range);

    // count for completed ranges
    let total = 0;
    for (var i = 0; i < nb_ranges; i++) {
      total += recompenseBloc(i * range) * range;
    }    
    // count for current range
    total += recompenseBloc(hauteurBloc) * (hauteurBloc - (i * range) + 1);

    return total;
}

let entree = process.argv[2];
console.log('bloc', entree);
console.log('bitcoins en circulation', bitcoinsEnCirculation(entree));