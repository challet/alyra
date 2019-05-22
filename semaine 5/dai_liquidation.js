const LIQUID_LIMIT = 1.5;

function collateralisation(deposit, debt, price) {
  return deposit * price / debt;
}

function compute_liquidation_price(deposit, debt) {
  return LIQUID_LIMIT * debt / deposit ;
}

function arrondi(prix) {
  return Math.round(prix * 100) / 100;
}


let deposit = process.argv[2]; // nombre d'ether
let debt = process.argv[3]; // dette en dai
let original_price = process.argv[4]; // prix de l'ether en dai

// dépot inital
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




