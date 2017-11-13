var Machine = function(args) {
  this.totalCoins = args.totalCoins;
  this.currentAmount = [];
  this.coinReturn = [];
  this.inventory = args.inventory;
  this.display = ["INSERT COIN", 
                  "PRICE: ", 
                  "THANK YOU", 
                  "EXACT CHANGE"];
}