const fetch = require('node-fetch');

const satoshi = 0.00001;

async function fetch_messari(jeton) {
  try {
    const data = await fetch(`https://data.messari.io/api/v1/assets/${jeton}/metrics`);
    const json = await data.json();
    return Promise.resolve(json);
  } catch (e) {
    return Promise.reject(e);
  }
}

fetch_messari(process.argv[2])
  .catch(console.error)
  .then((res) => {
    console.log(`Informations [${process.argv[2]}]`);
    console.log(`${100 - res.data.all_time_high.percent_down} % de son prix maximum :`);
    console.log(`${res.data.market_data.price_usd} USD contre ${res.data.all_time_high.price} USD il y a ${res.data.all_time_high.days_since} jours`);
    console.log(`${100 * res.data.supply.circulating / res.data.supply.y_2050} % de la masse prévue en 2050 (${res.data.supply.circulating} / ${res.data.supply.y_2050}).`);
  });
  