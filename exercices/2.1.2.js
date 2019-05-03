const calculerCible = (bits) => {
    const buf = Buffer.from(bits, 'hex');
    const exp   = parseInt(buf.slice(0,1).toString('hex'), 16);
    const coeff = parseInt(buf.slice(1,4).toString('hex'), 16);
    const target = coeff * Math.pow(2, 8 * (exp - 3));
    return target;
};

const regexp = /^(?:0x)?(.*)$/;

const target_max = (Math.pow(2,16) - 1) * Math.pow(2, 208); 

const calculerDifficulte = (bits) => {
    return target_max / calculerCible(regexp.exec(bits)[1]);
};

const entree = process.argv[2];

console.log('entree', entree);
console.log('difficulté', calculerDifficulte(entree));
