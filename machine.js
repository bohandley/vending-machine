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
	this.display = this.initialDisplay();
};

Machine.prototype.selectProduct = function(product) { 
	this.sumInsertedCoins();
	if (this.currentAmount >= product.price) {
		var found = false;
		
		for(var i = 0; i < this.inventory.length; i++) {
			if ( this.inventory[i].name === product.name ) {
				found = true;   
			}
		}
		
		if ( found == false) {
			return this.display = displays[4];
		} else {
			// Display with HTML in future
			this.display = displays[2];
			// Identify which product to remove from inventory
			var index = this.inventory.findIndex(function(element){
				return element.name === product.name;
			});
			// Remove the product from the inventory
			var selectedProduct = this.inventory.splice(index, 1);
			
			// Drop the product into the product 
			this.productReturn.push(selectedProduct[0]);
	
			// Add the coins to the totalCoins
			this.totalCoins = this.totalCoins.concat(this.insertedCoins);
			
			// Empty the inserted coin holder
			this.insertedCoins = [];
			
			// Return change if too much has been inserted
			this.makeChange(product);
	
			// Reset the currentAmount display to 0.00
			this.currentAmount = 0.00.toFixed(2);
		}
	} else {
		// Display with HTML in future
		this.display = displays[1] + product.price.toFixed(2);
		this.sumInsertedCoins();
	} 
};

// This function is execeted when a product is selected
Machine.prototype.sumInsertedCoins = function() {
	var total = this.insertedCoins.map(function(x){
		// Assign a value to a coin when it is inserted
		x.value = weights[x.weight];
		return weights[x.weight];
	});
	if ( total.length != 0 ) {
		var sum = total.reduce(function(a,b) {
			return a + b;
		});
		sum = sum.toFixed(2);
		this.currentAmount = sum;
	} else {
		this.currentAmount = 0.00.toFixed(2);
	}
};

// When a product is purchased that costs less than the amount inserted the machine makes change
Machine.prototype.makeChange = function(product) {
	var valueReturned = this.currentAmount - product.price;
	valueReturned = valueReturned.toFixed(2);
	var machine = this;
	
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

// Take a product that has been paid for
Machine.prototype.removeProduct = function() {
	this.display = this.initialDisplay();
	this.productReturn = new Array;
	this.currentAmount = 0.00.toFixed(2);
};

Machine.prototype.takeCoins = function(){
	this.coinReturn = new Array;
	this.currentAmount = 0.00.toFixed(2);
};

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

Machine.prototype.initialDisplay = function() {
	if ( this.sumTotalCoins() >= 1 ) {
		return displays[0];
	} else {
		return displays[3];
	}
};





