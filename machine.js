var Machine = function(args) {
	this.totalCoins = args.totalCoins || [];
	this.insertedCoins = [];
	this.currentAmount = 0.00.toFixed(2);
	this.coinReturn = [];
	this.productReturn = [];
	this.inventory = args.inventory || [];
	this.display = this.initialDisplay();
};

var weights = { 
	630: 0.05,
	415: 0.10,
	772: 0.25
};

var displays = [
	'INSERT COIN', 
	'PRICE: ', 
	'THANK YOU', 
	'EXACT CHANGE',
	'SOLD OUT'
];

var monies = [
	0.25,
	0.10,
	0.05
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
		coin.value.toFixed(2);
		return coin;
	});
	this.setDisplay();
};

Machine.prototype.setDisplay = function(){
	this.display = this.initialDisplay();
};

Machine.prototype.selectProduct = function(product) { 
	// Add values to the coins and sum them when a product is selected
	this.sumInsertedCoins();
	// Check if enough money has been inserted
	var enoughMoney = this.checkMoneyInserted(product);
	var chosenProduct = this.getProductFromInventory(product);
	
	if ( enoughMoney && chosenProduct){
		this.addInsertedCoinsToTotalCoins();
		this.makeChange(product);
		this.setDisplayToThankYou();
		this.returnProduct(chosenProduct);		
		this.resetCurrentAmountDisplay();
	} else if ( enoughMoney && chosenProduct === undefined)	{
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
	this.display = displays[1] + product.price.toFixed(2);
};

Machine.prototype.resetCurrentAmountDisplay = function(){
	this.currentAmount = 0.00.toFixed(2);
};

Machine.prototype.addInsertedCoinsToTotalCoins = function(){
	this.totalCoins = this.totalCoins.concat(this.insertedCoins);
	this.insertedCoins = [];
};

Machine.prototype.checkMoneyInserted = function(product){
	return this.currentAmount >= product.price;
};

Machine.prototype.getProductFromInventory = function(product){
	return this.inventory.find(function(el){
		return el.name === product.name;
	});
};

// Sum inserted coins, set value attribute of each coin, set currentAmount display
Machine.prototype.sumInsertedCoins = function() {
	// Create an array of inserted coins
	var total = this.insertedCoins.map(function(x){
		// Assign a value to a coin when it is inserted
		x.value = weights[x.weight];
		return x.value;
	});
	// If the array is not empty, sum the array
	if ( total.length != 0 ) {
		var sum = total.reduce(function(a,b) {
			return a + b;
		});
		sum = sum.toFixed(2);
		// Set the currentAmount display to the amount of money inserted
		this.currentAmount = sum;
	} else {
		// Display 0.00 if nothing has been inserted
		this.currentAmount = 0.00.toFixed(2);
	}
};

// When a product is purchased that costs less than the amount inserted, the machine makes change
Machine.prototype.makeChange = function(product) {
	// Identify how much change needs to be made
	var valueReturned = this.currentAmount - product.price;
	valueReturned = valueReturned.toFixed(2);
	var machine = this;
	// Make change by looping through the monies array. For each value, 25, 10, and 5,
	// divide the valueReturned by the value of the coin(element) of the monies array. 
	monies.forEach(function(coin){
		var times =  valueReturned / coin;
		if ( times > 0.99 && times < 1 ) {
			times = 1;
		}
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
	this.currentAmount = 0.00.toFixed(2);
};

// Take a product that has been paid for from the product return
Machine.prototype.removeProduct = function() {
	this.display = this.initialDisplay();
	this.productReturn = new Array;
	this.currentAmount = 0.00.toFixed(2);
};

// Remove the coins from the coin return
Machine.prototype.takeCoins = function(){
	this.coinReturn = new Array;
	this.currentAmount = 0.00.toFixed(2);
};

// Sum the total amount of coins inside the machine
Machine.prototype.sumTotalCoins = function() {
	if ( this.totalCoins.length != 0 ) {
		var valueAmount = this.totalCoins.map(function(element){
			return element.value;
		});
		var total = valueAmount.reduce(function(a,b){
			return a + b;
		},0);
		return total;
	} else {
		[];
	}
};

// Set the initial display of the machine to INSERT COIN or EXACT CHANGE
Machine.prototype.initialDisplay = function() {
	if ( this.sumTotalCoins() >= 1 ) {
		return displays[0];
	} else {
		return displays[3];
	}
};





