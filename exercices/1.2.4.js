const orders = [
  { sell: { currency: 'Doge', amount: 84  }, buy: { currency: 'LTC',  amount: 32   }, rate: 0.381 },
  { sell: { currency: 'Doge', amount: 29  }, buy: { currency: 'ETH',  amount: 80   }, rate: 2.75  },
  { sell: { currency: 'ETH',  amount: 300 }, buy: { currency: 'BTC',  amount: 62   }, rate: 0.206 },
  { sell: { currency: 'LTC',  amount: 288 }, buy: { currency: 'ETH',  amount: 2304 }, rate: 8     },
  { sell: { currency: 'BTC',  amount: 27  }, buy: { currency: 'Doge', amount: 46   }, rate: 1.7   },
  { sell: { currency: 'BTC',  amount: 33  }, buy: { currency: 'LTC',  amount: 16   }, rate: 0.48  }
];

// const currencies = ;

class Order {
  constructor(data) {
    this.data = data;
    this.links = [];
  }
  
  testLinkToNextOrder(order) {
    // does the currency obtained by this order (this.buy) allow to buy the being-evaluated next one (order.sell) ?
    if (this.data.buy.currency == order.data.sell.currency) {
      this.links.push(order);
    } 
  }
  
  // recursively try routes
  // use [] as blacklist on the root element
  buildRoutes(blacklist) {
    let routes = [];
    
    console.info(`> ${this}`);
    blacklist.push(this);
    for (let next_order of this.links.filter( (link) => blacklist.indexOf(link) == -1) ) {
      for (let route of next_order.buildRoutes(blacklist)) {
        // append itself
        route.unshift(this);
        routes.push(route);
      }
    }
    
    // is it a leaf element
    if (routes.length == 0) {
      routes.push([this]);
    }
    
    return routes;
  }
  
  toString() {
    return `${this.data.sell.amount} ${this.data.sell.currency} -> ${this.data.buy.amount} ${this.data.buy.currency}`;
  }
}

function computeRouteBalance(route) {
  const balance = {
    'Doge': 0, 
    'ETH': 0,
    'LTC': 0,
    'BTC': 0
  };
  for (order of route) {
    balance[order.data.sell.currency] -= order.data.sell.amount;
    balance[order.data.buy.currency]  += order.data.buy.amount;
  }
  console.log(balance);
}

function run(orders_data) {
  // map the orders to Order objects
  const orders = orders_data.map( (data) => new Order(data) );
  
  // find and build links (linked graph)
  for (let i = 0; i < orders.length - 1; i++) {
    for (let j = i + 1; j < orders.length; j++) {
      orders[i].testLinkToNextOrder( orders[j] );
      orders[j].testLinkToNextOrder( orders[i] );
    } 
  }
  
  // get all the possible routes and test them
  orders.forEach( (order) => { 
    console.info(`>> buildRoutes from "${order}"`);
    for (route of order.buildRoutes([]) ) {
      computeRouteBalance(route);
    }
  });
}

run(orders);