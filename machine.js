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

Machine.prototype.insertCoins = function(coin) {
  if (coin.weight === 554) {
    this.coinReturn.push(coin);
  } else {
    this.currentAmount.push(coin);
  }
}

