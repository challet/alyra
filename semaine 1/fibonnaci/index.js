var program = require('commander');
program
  .version("1.0.0")
  .option("-r, --recursif")
  .parse(process.argv);

function fibonacci_iteratif(generations) {
  let current = 1;
  let previous = 0;
  
  for (let i = 0; i < generations; i++) {
    const total = current + previous;
    previous = current;
    current = total;
  }
  
  return current;
}

function fibonacci_recursif(previous, current, generations) {
  if(generations == 0) {
    return current;
  } else {
    return fibonacci_recursif(current, previous + current, generations - 1);
  }
}

let generations = parseInt(process.argv[2]);

if(!program.recursif) {
  console.info("itératif");
  console.log(fibonacci_iteratif(generations));
} else {
  console.info("récursif");
  console.log(fibonacci_recursif(0, 1, generations));
}
