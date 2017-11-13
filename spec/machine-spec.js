describe("Machine", function() {
  var machine;

  beforeEach(function(){
    // Define product objects
    cola  = new Product({});
    chips = new Product({});
    candy = new Product({});

    // Asssign inventory
    inventory = []
    3 * (inventory.push(cola));
    3 * (inventory.push(chips));
    3 * (inventory.push(candy));
    
    // Define coin objects
    nickel  = new Coin({name: "nickel"});
    dime    = new Coin({name: "dime"});
    quarter = new Coin({name: "quarter"});
    penny   = new Coin({name: "penny"});

    // Assign coins
    coins = [nickel, dime, quarter];

    machine = new Machine({ totalCoins: coins, 
                            inventory : inventory })  
  });

  describe("totalCoins", function(){
    it("has a collection of coins", function(){
      expect(machine.totalCoins).toEqual(coins);
    });
  });

  describe("inventory", function(){
    it("has an inventory of products", function(){
      expect(machine.inventory).toEqual(inventory);
    });
  });

  describe("currentAmount", function(){
    it("has an empty currentAmount when no coins are inserted", function(){
      expect(machine.currentAmount).toEqual([]);
    });
  });

  describe("coinReturn", function(){
    it("starts with an empty coin return", function(){
      expect(machine.coinReturn).toEqual([]);
    });
  });

  describe("display", function(){
    it("has 4 possible displays", function(){
      expect(machine.display.length).toEqual(4);
    });
  });

  describe("it accepts nickels, dimes and quarters", function(){
    it("accepts dimes and places them in the currentAmount", function(){
      machine.insertCoins(dime);
      expect(machine.currentAmount).toEqual([dime]);
    });

    it("accepts nickels and places them in the currentAmount", function(){
      machine.insertCoins(nickel);
      expect(machine.currentAmount).toEqual([nickel]);
    });

    it("accepts quarters and places them in the currentAmount", function(){
      machine.insertCoins(quarter);
      expect(machine.currentAmount).toEqual([quarter]);
    });
  })
  describe("it rejects pennies", function(){
    it("does not accept pennies into the currentAmount", function(){
      machine.insertCoins(penny);
      expect(machine.currentAmount).toEqual([]);
    });

    it("returns pennies in the coinReturn", function(){
      machine.insertCoins(penny);
      expect(machine.coinReturn).toEqual([penny]);
    });
  });
});