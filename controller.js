var cola  = new Product({name: 'Cola', price: 100});
var chips = new Product({name: 'Chips', price: 50});
var candy = new Product({name: 'Candy', price: 65});

var nickel  = new Coin({name: 'nickel'});
var dime    = new Coin({name: 'dime'});
var quarter = new Coin({name: 'quarter'});
var penny   = new Coin({name: 'penny'});

var coinsForLoading = createCoins();
var inventory = createProducts();

var vendingMachine = new Machine({inventory: inventory});
vendingMachine.loadCoins(coinsForLoading);

var display = document.getElementById('display');
var currentAmount = document.getElementById('current-amount');
var productReturn = document.getElementById('product-return');
var coins = document.getElementById('coins');

var colaButton = document.getElementById('cola');
var chipsButton = document.getElementById('chips');
var candyButton = document.getElementById('candy');

var nickelButton = document.getElementById('nickel');
var dimeButton = document.getElementById('dime');
var quarterButton = document.getElementById('quarter');
var pennyButton = document.getElementById('penny');

setDisplayText();
setCurrentAmountText();

chooseProduct(colaButton, cola);
chooseProduct(chipsButton, chips);
chooseProduct(candyButton, candy);

insertCoin(nickelButton, nickel);
insertCoin(dimeButton, dime);
insertCoin(quarterButton, quarter);
insertCoin(pennyButton, penny);

pressCoinReturnButton();
takeCoins();
emptyAllCoins();
restockCoins();

takeProduct();
removeAllProducts();
restockProducts();

function createProducts(){
	var cola  = new Product({name: 'Cola', price: 100});
	var chips = new Product({name: 'Chips', price: 50});
	var candy = new Product({name: 'Candy', price: 65});
	var products = [
		cola,
		cola, 
		chips,
		chips, 
		candy,
		candy
	];
	return products;
}

function createCoins(){
	var nickel  = new Coin({name: 'nickel'});
	var dime    = new Coin({name: 'dime'});
	var quarter = new Coin({name: 'quarter'});
	var coins = [
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
	return coins;
}

function setDisplayText(){
	display.textContent = vendingMachine.display;
}

function setCurrentAmountText(){
	currentAmount.textContent = vendingMachine.currentAmount;
}

function chooseProduct(button, product){
	button.addEventListener('click', function(){
		vendingMachine.selectProduct(product);
		setDisplayText();
		setCurrentAmountText();
		productReturn.textContent = vendingMachine.productReturn.map(function(element){
			return element.name;
		});
		returnCoins();
	});
}

function insertCoin(coinButton, coin){
	coinButton.addEventListener('click', function(){
		vendingMachine.insertCoins(coin);
		setCurrentAmountText();
		if (coin === penny){
			returnCoins();
		}	
	});
}

function returnCoins(){
	coins.textContent = vendingMachine.coinReturn.map(function(element){
		return ' ' + element.name;
	});
}

function setInitialDisplayText(){
	display.textContent = vendingMachine.initialDisplay();
}

function pressCoinReturnButton(){
	var coinReturnButton = document.getElementById('coin-return-button');
	coinReturnButton.addEventListener('click', function(){
		vendingMachine.pressCoinReturn();
		returnCoins();
		setInitialDisplayText();
		setCurrentAmountText();
	});
}

function takeCoins(){
	var takeCoins = document.getElementById('take-coins');
	takeCoins.addEventListener('click', function(){
		vendingMachine.takeCoins();
		coins.textContent = '';
		setCurrentAmountText();
	});
}

function takeProduct(){
	var takeProduct = document.getElementById('take-product');
	takeProduct.addEventListener('click', function(){
		productReturn.textContent = '';
		vendingMachine.removeProduct();
		setDisplayText();
		vendingMachine.coinReturn;
		setCurrentAmountText();
	});
}

function restockProducts(){
	var restockInventory = document.getElementById('restock-inventory');
	var products = createProducts();
	restockInventory.addEventListener('click', function(){
		products.forEach(function(element){
			vendingMachine.inventory.push(element);	
		});
		setInitialDisplayText();
	});
}

function removeAllProducts(){
	var removeProducts = document.getElementById('remove-all-products-from-inventory');
	removeProducts.addEventListener('click', function(){
		productReturn.textContent = vendingMachine.inventory.map(function(element){
			return element.name;
		});
		vendingMachine.inventory = new Array;
	});
}

function restockCoins() {
	var restock = document.getElementById('restock-coins');
	restock.addEventListener('click', function() {
		vendingMachine.loadCoins(coinsForLoading);
		vendingMachine.setInitialDisplay();
		setDisplayText();
	});
}

function emptyAllCoins(){
	var emptyCoins = document.getElementById('empty-all-coins');
	emptyCoins.addEventListener('click', function(){
		coins.textContent = vendingMachine.totalCoins.map(function(element){
			return element.name;
		});
		vendingMachine.totalCoins = new Array;
		vendingMachine.setInitialDisplay();
		setDisplayText();
	}); 
}
