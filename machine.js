var Machine = function(args) {
	this.totalCoins = args.totalCoins || [];
	this.insertedCoins = [];
	this.currentAmount = 0;
	this.coinReturn = [];
	this.productReturn = [];
	this.inventory = args.inventory || [];
	this.display = this.initialDisplay();
};

var weights = { 
	630: 5,
	415: 10,
	772: 25
};

var displays = [
	'INSERT COIN', 
	'PRICE: ', 
	'THANK YOU', 
	'EXACT CHANGE',
	'SOLD OUT'
];

var monies = [
	25,
	10,
	5
];

// Machine rejects pennies but accepts nickels, dimes and quarters
Machine.prototype.insertCoins = function(coin) {
	if (coin.weight === 554) {
		this.coinReturn.push(coin);
	} else {
		this.insertedCoins.push(coin);
	}
};

// Add value to each coin in a coin collection when loaded into the machine
Machine.prototype.loadCoins = function(coins) {
	this.totalCoins = coins.map(function(coin){
		coin.value = weights[coin.weight];
		coin.value;
		return coin;
	});
	this.setInitialDisplay();
};

Machine.prototype.setInitialDisplay = function(){
	this.display = this.initialDisplay();
};

Machine.prototype.selectProduct = function(product) { 
	// Add values to the coins and sum them when a product is selected
	this.sumInsertedCoins();
	// Check if enough money has been inserted
	var enoughMoney = this.checkMoneyInserted(product);
	var chosenProduct = this.getProductFromInventory(product);
	
	if ( enoughMoney && chosenProduct ){
		this.addInsertedCoinsToTotalCoins();
		this.makeChange(product);
		this.setDisplayToThankYou();
		this.returnProduct(chosenProduct);		
		this.resetCurrentAmountDisplay();
	} else if ( enoughMoney && !chosenProduct )	{
		this.setDisplayToSoldOut();
	} else {
		this.displayProductPrice(product);
		this.sumInsertedCoins();
	}
};

Machine.prototype.returnProduct = function(chosenProduct){
	this.productReturn.push(chosenProduct);
};

Machine.prototype.setDisplayToThankYou = function(){
	this.display = displays[2];
};

Machine.prototype.setDisplayToSoldOut = function(){
	this.display = displays[4];
};

Machine.prototype.displayProductPrice = function(product){
	this.display = displays[1] + product.price;
};

Machine.prototype.resetCurrentAmountDisplay = function(){
	this.currentAmount = 0;
};

Machine.prototype.addInsertedCoinsToTotalCoins = function(){
	this.totalCoins = this.totalCoins.concat(this.insertedCoins);
	this.insertedCoins = [];
};

Machine.prototype.checkMoneyInserted = function(product){
	return this.currentAmount >= product.price;
};

Machine.prototype.getProductFromInventory = function(product){
	var index = this.inventory.findIndex(function(element){
		return element.name == product.name;
	});
	switch( index ) {
	case -1 :
		return false;
	default :		
		return this.inventory.splice(index, 1)[0];
	}
};

// Iterate through inserted coins, set value attribute of each coin, 
// sum values, set currentAmount display
Machine.prototype.sumInsertedCoins = function() {
	this.currentAmount = this.insertedCoins.map(function(x){
		x.value = weights[x.weight];
		return x.value;
	}).reduce(function(a,b) {
		return a + b;
	},0);
};

Machine.prototype.makeChange = function(product) {
	// Identify how much change needs to be made
	var valueReturned = this.currentAmount - product.price;
	this.makeChangeAlgorithm(valueReturned);
};

// Make change by looping through the monies array. For each value, 25, 10, and 5,
// divide the valueReturned by the value of the coin(element) of the monies array. 
Machine.prototype.makeChangeAlgorithm = function(valueReturned){
	var machine = this;
	monies.map(function(coin){
		var times =  valueReturned / coin;
		times = Math.floor(times);
		var i=0;
		for (i; i < times; i++) {
			var index = this.totalCoins.findIndex(function(element){
				return element.value == coin;
			});
			this.coinReturn.push(this.totalCoins.splice(index, 1)[0]);
		}
		valueReturned = valueReturned - (times * coin);
	},machine);
};

// When a customer changes their mind before choosing a product, they can have their money returned
Machine.prototype.pressCoinReturn = function() {
	this.coinReturn = this.coinReturn.concat(this.insertedCoins);
	this.insertedCoins = new Array;
	this.resetCurrentAmountDisplay();
};

// Take a product that has been paid for from the product return
Machine.prototype.removeProduct = function() {
	this.display = this.initialDisplay();
	this.productReturn = new Array;
	this.resetCurrentAmountDisplay();
};

// Remove the coins from the coin return
Machine.prototype.takeCoins = function(){
	this.coinReturn = new Array;
	this.resetCurrentAmountDisplay();
};

// Sum the total amount of coins inside the machine 
Machine.prototype.sumTotalCoins = function() {
	return this.totalCoins.map(function(element){
		return element.value;
	}).reduce(function(a,b){
		return a + b;
	},0);
};

// Set the initial display of the machine to INSERT COIN or EXACT CHANGE
Machine.prototype.initialDisplay = function() {
	if ( this.sumTotalCoins() >= 100 ) {
		return displays[0];
	} else {
		return displays[3];
	}
};





