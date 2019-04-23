function isOperateur(arg) {
  return ['AFFICHE','SUPPRIME'].includes(arg);
}

function appliqueOperation(operateur, stack) {
  switch (operateur) {
    case 'AFFICHE': 
      while (stack.length) {
        console.log(stack.pop());
      }
    break;
    case 'SUPPRIME':
      stack.pop();
    break;
    default: throw `operateur ${operateur} inconnu.`
  }
}

// tous les arguments après le script sont des entrées
var instructions = process.argv.slice(2, process.argv.length);
var stack = [];

while (instructions.length > 0) {
  let arg = instructions.shift();
  if (isOperateur(arg)) {
    // effectuer le calcul
    let result = appliqueOperation(arg, stack);
  } else {
    stack.push(arg);
  }
}
