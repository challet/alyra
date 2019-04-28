const decimal_precision = BigInt(1000);

const target_max = (BigInt(2) ** BigInt(16) - BigInt(1)) * BigInt(2) ** BigInt(208);

var target = BigInt(process.argv[2]);


console.log('difficulté: ', Number(decimal_precision * target_max / target) /  Number(decimal_precision));