$(document).ready(function(){
	 
	var cola  = new Product({name: 'Cola', price: 1.00});
	var chips = new Product({name: 'Chips', price: 0.50});
	var candy = new Product({name: 'Candy', price: 0.65});
	var inventory = [
		cola,
		cola, 
		chips,
		chips, 
		candy,
		candy
	];
	
	var nickel  = new Coin({name: 'nickel'});
	var dime    = new Coin({name: 'dime'});
	var quarter = new Coin({name: 'quarter'});
	var penny   = new Coin({name: 'penny'});
  
	var coinsForLoading = [
		nickel,   
		nickel, 
		nickel, 
		dime,     
		dime,   
		dime,
		quarter,  
		quarter, 
		quarter
	];

	var vendingMachine = new Machine({inventory: inventory});
	vendingMachine.loadCoins(coinsForLoading);
	
	var display = document.getElementById('display');
	var currentAmount = document.getElementById('current-amount');
	var productReturn = document.getElementById('product-return');
	var coins = document.getElementById('coins');
	
	display.textContent = vendingMachine.display;
	currentAmount.textContent = vendingMachine.currentAmount;
	
	chooseChips(vendingMachine, currentAmount, productReturn, coins, chips);
	chooseCola(vendingMachine, currentAmount, productReturn, coins, cola);
	chooseCandy(vendingMachine, currentAmount, productReturn, coins, candy);
  
	insertQuarter(vendingMachine, currentAmount, quarter);
	insertDime(vendingMachine, currentAmount, dime);
	insertNickel(vendingMachine, currentAmount, nickel);
	insertPenny(vendingMachine, currentAmount, coins, penny);

	pressCoinReturnButton(vendingMachine, currentAmount, coins, display);
	
	takeCoins(vendingMachine, currentAmount, coins);
	takeProduct(vendingMachine, currentAmount, display, productReturn);

	emptyAllCoins(vendingMachine, coins, display);
	restockCoins(vendingMachine, coinsForLoading, display);
	removeAllProducts(vendingMachine, productReturn);
	restockProducts(vendingMachine, display);
});

function removeAllProducts(vendingMachine, productReturn){
	var removeProducts = document.getElementById('remove-all-products-from-inventory');
	removeProducts.addEventListener('click', function(){
		productReturn.textContent = vendingMachine.inventory.map(function(element){
			return element.name;
		});
		vendingMachine.inventory = new Array;
	});
}

function restockProducts(vendingMachine, display){
	var restockInventory = document.getElementById('restock-inventory');
	var cola  = new Product({name: 'Cola', price: 1.00});
	var chips = new Product({name: 'Chips', price: 0.50});
	var candy = new Product({name: 'Candy', price: 0.65});
	var products = [
		cola,
		cola, 
		chips,
		chips, 
		candy,
		candy
	];
	restockInventory.addEventListener('click', function(){
		products.forEach(function(element){
			 vendingMachine.inventory.push(element);	
		});
		console.log(vendingMachine.inventory)
		display.textContent = vendingMachine.initialDisplay(); 
	});
}

function restockCoins(vendingMachine, coinsForLoading, display) {
	var restock = document.getElementById('restock-coins');
	restock.addEventListener('click', function() {
		vendingMachine.loadCoins(coinsForLoading);
		vendingMachine.display = vendingMachine.initialDisplay();
		display.textContent = vendingMachine.display;
	});
}

function emptyAllCoins(vendingMachine, coins, display){
	var emptyCoins = document.getElementById('empty-all-coins');
	emptyCoins.addEventListener('click', function(){
		coins.textContent = vendingMachine.totalCoins.map(function(element){
			return element.name;
		});
		vendingMachine.totalCoins = new Array;
		vendingMachine.display = vendingMachine.initialDisplay();
		display.textContent = vendingMachine.display;
	}); 
}

function chooseCola(vendingMachine, currentAmount, productReturn, coins, cola){
	var colaButton = document.getElementById('cola');
	colaButton.addEventListener('click', function(){
		vendingMachine.selectProduct(cola);
		display.textContent = vendingMachine.display;
		currentAmount.textContent = vendingMachine.currentAmount;
		productReturn.textContent = vendingMachine.productReturn.map(function(element){
			return element.name;
		});
		coins.textContent = vendingMachine.coinReturn.map(function(element){
			return element.name;
		});
	});
}


function chooseChips(vendingMachine, currentAmount, productReturn, coins, chips){
	var chipsButton = document.getElementById('chips');
	chipsButton.addEventListener('click', function(){
		vendingMachine.selectProduct(chips);
		display.textContent = vendingMachine.display;
		currentAmount.textContent = vendingMachine.currentAmount;
		productReturn.textContent = vendingMachine.productReturn.map(function(element){
			return element.name;
		});
		coins.textContent = vendingMachine.coinReturn.map(function(element){
			return element.name;
		});
	});
}

function chooseCandy(vendingMachine, currentAmount, productReturn, coins, candy){
	var candyButton = document.getElementById('candy');
	candyButton.addEventListener('click', function(){
		vendingMachine.selectProduct(candy);
		display.textContent = vendingMachine.display;
		currentAmount.textContent = vendingMachine.currentAmount;
		productReturn.textContent = vendingMachine.productReturn.map(function(element){
			return element.name;
		});
		coins.textContent = vendingMachine.coinReturn.map(function(element){
			return element.name;
		});
	});
}

function insertNickel(vendingMachine, currentAmount, nickel){
	var nickelButton = document.getElementById('nickel');
	nickelButton.addEventListener('click', function(){
		vendingMachine.insertCoins(nickel);
		currentAmount.textContent = vendingMachine.currentAmount;
	});
}

function insertDime(vendingMachine, currentAmount, dime){
	var dimeButton = document.getElementById('dime');
	dimeButton.addEventListener('click', function(){
		vendingMachine.insertCoins(dime);
		currentAmount.textContent = vendingMachine.currentAmount;
	});
}

function insertQuarter(vendingMachine, currentAmount, quarter){
	var quarterButton = document.getElementById('quarter');
	quarterButton.addEventListener('click', function(){
		vendingMachine.insertCoins(quarter);
		currentAmount.textContent = vendingMachine.currentAmount;
	});
}

function insertPenny(vendingMachine, currentAmount, coins, penny){
	var pennyButton = document.getElementById('penny');
	pennyButton.addEventListener('click', function(){
		vendingMachine.insertCoins(penny);
		currentAmount.textContent = vendingMachine.currentAmount;
		coins.textContent = vendingMachine.coinReturn.map(function(element){
			return ' ' + element.name;
		});
	});
}

function pressCoinReturnButton(vendingMachine, currentAmount, coins, display){
	var coinReturnButton = document.getElementById('coin-return-button');
	coinReturnButton.addEventListener('click', function(){
		vendingMachine.pressCoinReturn();
		coins.textContent = vendingMachine.coinReturn.map(function(element){
			return ' ' + element.name;
		});
		display.textContent = vendingMachine.initialDisplay();
		currentAmount.textContent = vendingMachine.currentAmount;
	});
}

function takeCoins(vendingMachine, currentAmount, coins){
	var takeCoins = document.getElementById('take-coins');
	takeCoins.addEventListener('click', function(){
		vendingMachine.takeCoins();
		coins.textContent = '';
		currentAmount.textContent = vendingMachine.currentAmount;
	});
}

function takeProduct(vendingMachine, currentAmount, display, productReturn){
	var takeProduct = document.getElementById('take-product');
	takeProduct.addEventListener('click', function(){
		productReturn.textContent = '';
		vendingMachine.removeProduct();
		display.textContent = vendingMachine.display;
		vendingMachine.coinReturn;
		currentAmount.textContent = vendingMachine.currentAmount;
	});
}
