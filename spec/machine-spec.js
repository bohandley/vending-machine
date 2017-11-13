describe('Machine', function() {
	var machine;
  
	function insertQuarters(){
		machine.insertCoins(quarter);
		machine.insertCoins(quarter);
		machine.insertCoins(quarter);
		machine.insertCoins(quarter);
	}

	beforeEach(function(){
		// Define product objects
		cola  = new Product({name: 'Cola', price: 1.00});
		chips = new Product({name: 'Chips', price: 0.50});
		candy = new Product({name: 'Candy', price: 0.65});

		// Asssign inventory
		inventory = [];
		3 * (inventory.push(cola));
		3 * (inventory.push(chips));
		3 * (inventory.push(candy));
    
		// Define coin objects
		nickel  = new Coin({name: 'nickel'});
		dime    = new Coin({name: 'dime'});
		quarter = new Coin({name: 'quarter'});
		penny   = new Coin({name: 'penny'});

		// Assign coins
		coins = [nickel, dime, quarter];

		machine = new Machine({ inventory : inventory });  
		machine.loadCoins(coins);
	});

	describe('totalCoins', function(){
		it('has a collection of coins', function(){
			expect(machine.totalCoins).toEqual(coins);
		});
	});

	describe('inventory', function(){
		it('has an inventory of products', function(){
			expect(machine.inventory).toEqual(inventory);
		});
	});

	describe('insertedCoins', function(){
		it('has an empty insertedCoins when no coins are inserted', function(){
			expect(machine.insertedCoins).toEqual([]);
		});
	});

	describe('coinReturn', function(){
		it('starts with an empty coin return', function(){
			expect(machine.coinReturn).toEqual([]);
		});
	});

	describe('display', function(){
		it('Display is set to INSERT COIN upon rest', function(){
			expect(machine.display).toEqual('INSERT COIN');
		});
	});

	describe('it accepts nickels, dimes and quarters', function(){
		it('accepts dimes and places them in the insertedCoins', function(){
			machine.insertCoins(dime);
			expect(machine.insertedCoins).toEqual([dime]);
		});

		it('accepts nickels and places them in the insertedCoins', function(){
			machine.insertCoins(nickel);
			expect(machine.insertedCoins).toEqual([nickel]);
		});

		it('accepts quarters and places them in the insertedCoins', function(){
			machine.insertCoins(quarter);
			expect(machine.insertedCoins).toEqual([quarter]);
		});
	});
	describe('it rejects pennies', function(){
		it('does not accept pennies into the insertedCoins', function(){
			machine.insertCoins(penny);
			expect(machine.insertedCoins).toEqual([]);
		});

		it('returns pennies in the coinReturn', function(){
			machine.insertCoins(penny);
			expect(machine.coinReturn).toEqual([penny]);
		});
	});

	describe('identifies how much money has been inserted', function(){
		it('identifies a quarter is worth 25 cents', function(){
			machine.insertCoins(quarter);
			expect(machine.sumInsertedCoins()).toEqual(0.25);
		});

		it('sums the values of a nickel, dime and quarter', function(){
			machine.insertCoins(nickel);
			machine.insertCoins(dime);
			machine.insertCoins(quarter);
			expect(machine.sumInsertedCoins()).toEqual(0.40);
		});

		it('displays the inserted amount', function(){
			machine.insertCoins(quarter);
			machine.sumInsertedCoins();
			expect(machine.currentAmount).toEqual(0.25);
		});
	});

	describe('select a product', function(){
		it('displays the cost of the product if not enough money has been inserted', function(){
			machine.insertCoins(quarter);
			machine.selectProduct(cola);
			expect(machine.display).toEqual('PRICE: 1');
		});

		it('displays \'THANK YOU\' if enough money has been inserted', function(){
			insertQuarters();
			machine.selectProduct(cola);
			expect(machine.display).toEqual('THANK YOU');
		});

		it('returns a product if enough money has been inserted', function(){
			insertQuarters();
			machine.selectProduct(cola);
			expect(machine.productReturn).toEqual([cola]);
		});

		it('resets the currentAmount to 0.00 when enough money is inserted and a product is selected', function(){
			insertQuarters();
			machine.selectProduct(cola);
			expect(machine.currentAmount).toEqual(0.00);
		});

		it('resets the display to \'INSERT COIN\' when the product is removed', function(){
			insertQuarters();
			machine.selectProduct(cola);
			machine.removeProduct();
			expect(machine.display).toEqual('INSERT COIN');
		});

		it('deposits the inserted coins into the totalCoins when a product is chosen', function(){
			insertQuarters();
			var allTheCoins = machine.totalCoins.length;
			machine.selectProduct(cola);
			expect(machine.totalCoins.length).toEqual(allTheCoins + 4);
		});
	});

	describe('it makes change when a product is selected that costs less than the value inserted', function(){
		it('returns a nickel when the currentAmount is +0.05', function(){
			insertQuarters();
			machine.insertCoins(nickel);
			machine.selectProduct(cola);
			expect(machine.coinReturn).toEqual([nickel]);
		});

		it('returns a dime when the currentAmount is +0.10', function(){
			insertQuarters();
			machine.insertCoins(dime);
			machine.selectProduct(cola);
			expect(machine.coinReturn).toEqual([dime]);
		});
	});

	describe('it returns coins when the coin return button is pressed', function(){
		it('returns all the inserted coinscoins', function(){
			machine.insertCoins(quarter);
			var coins = machine.insertedCoins;
			machine.pressCoinReturn();
			expect(machine.coinReturn).toEqual(coins);
		});
	});
});