const fetch = require('node-fetch');

const satoshi = 0.00001;

async function fetch_dernier_echange() {
  try {
    const data = await fetch(`https://api.bitfinex.com/v1/trades/btcusd?limit_trades=1`);
    const json = await data.json();
    return Promise.resolve(json);
  } catch (e) {
    return Promise.reject(e);
  }
}

fetch_dernier_echange()
  .then(console.log)
  .catch(console.error);