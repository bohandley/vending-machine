$(document).ready(function(){
	var cola  = new Product({name: 'Cola', price: 1.00});
	var chips = new Product({name: 'Chips', price: 0.50});
	var candy = new Product({name: 'Candy', price: 0.65});
	var inventory = [cola, chips, candy]; 
	var nickel  = new Coin({name: 'nickel'});
	var dime    = new Coin({name: 'dime'});
	var quarter = new Coin({name: 'quarter'});
	var penny   = new Coin({name: 'penny'});
  
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
	var vendingMachine = new Machine({inventory: inventory});
	vendingMachine.loadCoins(coins);
	
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

	pressCoinReturnButton(vendingMachine, currentAmount, coins);
	
	takeCoins(vendingMachine, currentAmount, coins);
	takeProduct(vendingMachine, currentAmount, display, productReturn);
});

function chooseCola(vendingMachine, currentAmount, productReturn, coins, cola){
	var colaButton = document.getElementById('cola');
	colaButton.addEventListener('click', function(){
		vendingMachine.selectProduct(cola);
		display.textContent = vendingMachine.display;
		currentAmount.textContent = vendingMachine.currentAmount;
		// productReturn.textContent += vendingMachine.productReturn[0].name;
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
		// productReturn.textContent += vendingMachine.productReturn[0].name;
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
		productReturn.textContent += vendingMachine.productReturn[0].name;
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

function pressCoinReturnButton(vendingMachine, currentAmount, coins){
	var coinReturnButton = document.getElementById('coin-return-button');
	coinReturnButton.addEventListener('click', function(){
		vendingMachine.pressCoinReturn();
		coins.textContent = vendingMachine.coinReturn.map(function(element){
			return ' ' + element.name;
		});
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
