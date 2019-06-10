const fetch = require('node-fetch');

const limit = 10;
const satoshi = 0.00001;
const comparaison_croissante   = (a, b) => a.prix - b.prix;
const comparaison_decroissante = (a, b) => b.prix - a.prix;

async function fetch_bitmex() {
  try {
    const data = await fetch(`https://www.bitmex.com/api/v1/orderBook/L2?symbol=XBT&depth=${limit}`);
    const json = await data.json();
    //console.debug(json);
    const res = { ventes: [], achats: [] };
    
    json.forEach((order) => {
      const livre = res[order.side == 'Sell' ? 'ventes' : 'achats'];
      livre.push({ prix: order.price, quantite: order.size * satoshi });
    });
    res.achats.sort(comparaison_decroissante);
    res.ventes.sort(comparaison_decroissante);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}

async function fetch_bitfinex() {
  try {
    const data = await fetch(`https://api.bitfinex.com/v1/book/btcusd?limit_bids=${limit}&limit_asks=${limit}`);
    const json = await data.json();
    //console.debug(json);
    
    return Promise.resolve({
      ventes: json.asks
        .map( (ask) => {
          return { prix: parseFloat(ask.price) , quantite: parseFloat(ask.amount) };
        } )
        .sort(comparaison_decroissante),
      achats: json.bids
        .map( (bid) => {
          return { prix: parseFloat(bid.price), quantite: parseFloat(bid.amount) };
        } )
        .sort(comparaison_decroissante),
      
    });
  } catch (e) {
    return Promise.reject(e);
  }
}


function simuler_achat_btc(quantite_cible, ordres) {
  let quantite_totale = 0, prix = 0, i = ordres.length - 1;
  do {
    let quantite = Math.min(quantite_cible - quantite_totale, ordres[i].quantite);
    quantite_totale += quantite;
    prix += quantite * ordres[i].prix;
    i--;
  } while (quantite_totale < quantite_cible && i >= 0);
  
  if (quantite_cible != quantite_totale) {
    throw "Pas assez de liquidité";
  } else {
    return prix;
  }
}

function simuler_vente_usd(prix_cible, ordres) {
  let prix_total = 0, quantite = 0, i = ordres.length - 1;
  do {
    let prix = Math.min(prix_cible - prix_total, ordres[i].quantite * ordres[i].prix);
    prix_total += prix;
    quantite += prix / ordres[i].prix;
    i--;
  } while (prix_total < prix_cible && i >= 0);
  
  if (prix_cible != prix_total) {
    throw "Pas assez de liquidité";
  } else {
    return quantite;
  }
}


const program = require('commander').version('0.0.1');

Promise.all([fetch_bitmex(), fetch_bitfinex()])
  .catch(console.error)
  .then(([bitmex, bitfinex]) => {
    console.info('bitmex', bitmex);
    console.info('bitfinex', bitfinex);
    
    program
      .command('achatbtc <x>')
      .description('Trouver la meilleure offre afin d\'acheter <x> BTC')
      .action( (x) => {
        let prix = { bitmex: simuler_achat_btc(x, bitmex.ventes), bitfinex: simuler_achat_btc(x, bitfinex.ventes) };
        console.log(`Simulation d'achat de ${x} BTC`);
        console.log(`${prix.bitmex <= prix.bitfinex ? '*' : ' '}Bitmex:   ${prix.bitmex} USD`);
        console.log(`${prix.bitmex >= prix.bitfinex ? '*' : ' '}Bitfinex: ${prix.bitfinex} USD`);
      });
      
    program
      .command('venteusd <x>')
      .description('Trouver la meilleure offre afin de vendre <x> USD')
      .action( (x) => {
        let quantite = { bitmex: simuler_vente_usd(x, bitmex.ventes), bitfinex: simuler_vente_usd(x, bitfinex.ventes) };
        console.log(`Simulation de vente de ${x} USD`);
        console.log(`${quantite.bitmex >= quantite.bitfinex ? '*' : ' '}Bitmex:   ${quantite.bitmex} BTC`);
        console.log(`${quantite.bitmex <= quantite.bitfinex ? '*' : ' '}Bitfinex: ${quantite.bitfinex} BTC`);
      });

    program.parse(process.argv);
  });

