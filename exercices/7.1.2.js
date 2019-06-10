const fetch = require('node-fetch');

const satoshi = 0.00001;

async function fetch_dernier_echange() {
  try {
    const data = await fetch(`https://api.bitfinex.com/v1/trades/btcusd?limit_trades=1`);
    const json = await data.json();
    
    console.log(json);
  } catch(e) {
    return Promise.reject(e);
  }
  
  
}

fetch_dernier_echange();