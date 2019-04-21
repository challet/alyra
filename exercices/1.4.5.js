function isOperateur(arg) {
  return ['+','-','*','/','>','<','='].includes(arg);
}

function appliqueOperation(operateur, operandes) {
  switch (operateur) {
    case '+': return operandes[0]  +  operandes[1]; break;
    case '-': return operandes[0]  -  operandes[1]; break;
    case '*': return operandes[0]  *  operandes[1]; break;
    case '/': return operandes[0]  /  operandes[1]; break;
    case '>': return operandes[0]  >  operandes[1]; break;
    case '<': return operandes[0]  <  operandes[1]; break;
    case '=': return operandes[0] === operandes[1]; break;
    default: throw `operateur ${operateur} inconnu.`
  }
}

var stack = process.argv
  // tous les arguments après le script sont des entrées
  .slice(2, process.argv.length)
  // passer les arguments numériques en type entier
  .map((arg) => isOperateur(arg) ? arg : parseInt(arg))
  // inverser pour utiliser .pop()
  .reverse();

var operandes_stack = [];
while (stack.length > 0) {
  let arg = stack.pop();
  if (isOperateur(arg)) {
    // effectuer le calcul
    let result = appliqueOperation(arg, operandes_stack);
    // empiler le résultat
    stack.push(result);
    // remettre à zéro les opérandes
    operandes_stack = [];
  } else {
    // stocker les opérandes
    operandes_stack.push(arg);
  }
}

console.log(operandes_stack.pop());