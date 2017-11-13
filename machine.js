var Machine = function(args) {
	this.totalCoins = args.totalCoins;
	this.insertedCoins = [];
  this.currentAmount = 0.00;
	this.coinReturn = [];
  this.productReturn = [];
	this.inventory = args.inventory;
	this.display = 'INSERT COIN'
};

var displays = ['INSERT COIN', 
    'PRICE: ', 
    'THANK YOU', 
    'EXACT CHANGE'];
Machine.prototype.insertCoins = function(coin) {
	if (coin.weight === 554) {
		this.coinReturn.push(coin);
	} else {
		this.insertedCoins.push(coin);
	}
};

Machine.prototype.loadCoins = function(args) {
  this.totalCoins = args.map(function(coin){
    coin.value = weights[coin.weight];
    return coin;
  });
}

Machine.prototype.sumInsertedCoins = function() {
	var weights = { 630: 0.05,
		415: 0.10,
		772: 0.25};

	var total = this.insertedCoins.map(function(x){
    // Assign a value to a coin 
    x.value = weights[x.weight];
		return weights[x.weight];
	});

	var sum = total.reduce(function(a,b) {
		return a + b;
	});

  this.currentAmount = sum;
	return sum;
};

Machine.prototype.selectProduct = function(product) { 
  this.sumInsertedCoins();

  if (this.currentAmount >= product.price) {
    // Display with HTML in future
    this.display = displays[2];
    
    // Identify which product to remove from inventory
    var i = this.inventory.findIndex(function(element){
      return element.name === product.name;
    });

    // Remove the product from the inventory
    var selectedProduct = this.inventory.splice(i, 1);

    // Add the coins to the totalCoins
    this.totalCoins = this.totalCoins.concat(this.insertedCoins);
    this.insertedCoins = [];

    // Reset the currentAmount display to 0.00
    this.currentAmount = 0.00
    // Drop the product into the product 
    this.productReturn.push(selectedProduct[0]);
  } else {
    // Display with HTML in future
    this.display = displays[1] + product.price;
  } 
}

Machine.prototype.removeProduct = function() {
  this.display = displays[0];

  return this.productReturn.unshift();
}

Machine.prototype.makeChange = function() {
  var valueReturned = this.currentAmount - product.price;
  if ( valueReturned === 0.05 ) {
    var i = this.totalCoins.findIndex(function(element){
      return coin.value === ;
    });
  }
}
