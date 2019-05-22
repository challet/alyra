function dette_autorisee(deposit, collat, price) {
  return deposit * price / (collat / 100);
}


let deposit = process.argv[2]; // nombre d'ether
let collat = process.argv[3]; // dette en dai
let original_price = process.argv[4]; // prix de l'ether en dai
let final_price = process.argv[5]; // prix de l'ether en dai

// dépot initial
let debt = dette_autorisee(deposit, collat, original_price);
console.log(`Le dépot intitial de ${deposit} ETH permet d'émettre ${debt} DAI (collatéralisation ${collat} %, prix initial ${original_price} DAI/ETH)`);

// achat de nouveaux ETH avec la dette en DAI
let deposit2 = debt / original_price;
console.log(`La dette de ${debt} DAI permet d'acheter ${deposit2} ETH (prix initial ${original_price} DAI/ETH)`);

// le prix a augmenté
// achat de DAI avec ETH




/*
console.log(`Dépot intitial : ${deposit} ETH`);

let collateral = collateralisation(deposit, debt, original_price);
console.log(`Dépot de ${deposit} ETH garantissant une dette de ${debt} DAI (${arrondi(collateral * 100)} % collateral, prix ${original_price} DAI/ETH)`);

// calculer le prix de liquidation
let liquidation_price = compute_liquidation_price(deposit, debt);
console.log(`Prix de liquidation : ${liquidation_price} DAI/ETH`);


// paramètres liquidation 
let liquidateur_buy = debt / liquidation_price;
let liquidateur_bonus = debt / liquidation_price * 0.03;
let pool_back = debt / liquidation_price * 0.1;
let owner_remain = debt / liquidation_price * 0.37;

console.log(`Le liquidateur achète ${arrondi(liquidateur_buy)} ETH`);
console.log(`Le liquidateur a un bonus de ${arrondi(liquidateur_bonus)} ETH`);
console.log(`La pool récupère ${arrondi(pool_back)} ETH`);
console.log(`le proriétaire garde ${arrondi(owner_remain)} ETH`);

*/