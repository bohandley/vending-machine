# vending-machine
This project's goal is to design a vending machine using only JavaScript.
The vending machine is deployed to heroku [here](https://vending-machine-bjo.herokuapp.com/index.html)
Try it out!

To access the vending machine, clone the repository.

`git clone https://github.com/bohandley/vending-machine.git`

To run the tests, navigate to the `vending-machine` directory. 

Type `open SpecRunner.html` in the terminal.

Future versions of vending-machine will use HTML5 as a user inteface with DOM manipulation 
and event handling to insert coins and purchase products. 

To interact with the program, navigate to the `vending-machine` directory. 

Type `open index.html` in the terminal.

Insert coins, choose products, receive change. Be careful, products sell out quickly!

## Updated 11/15/2017

vending-machine has a complete user-interface with administrative functions!

After cloning the repository, navigate to the directory and type `open index.html`

Explore the machine. Insert coins, choose products, collect change and more.

For further exploration of the vending-machine's capabilities, explore the administrative functions: 
  empty all coins
  restock coins
  empty inventory
  restock inventory

### Notes on development

#### Job 0 - Test Driven Development

  Set up Jasmine for machine.js, coin.js, product.js

#### Job 1 - Accept coins

Machine accepts valid coins
* nickels
* dimes
* quarters
  Machine reject invalid coins
* returns pennies
  
Coins have attributes
* known
   * size
   * weight
* unknown
   * value(assigned by machine which reads the weight of the coin and assigns a value)

#### Job 2 - Select a product
  
  User inserts coins(simulated by pressing buttons)
  User selects a product
* Cola - 1.00
* Chips - 0.50
* Candy - 0.65
  If enough coins have been inserted
* Display THANK YOU
* Remove product from inventory
* Dispense product
  If user inserts less than the cost of the chosen product  
* Machine displays 'PRICE: (cost of product)'

#### Job 3 - Make Change

  If user inserts more money than the cost of the product
* deposit proper amount of coins in coin collection
* return change

#### Job 4 - Return coins

  If button to return coins is pressed
* currentAmount is set to zero

#### Job 5 - Sold out

  if inventory item is sold out
* Display SOLD OUT

#### Job 6 - Exact change only

  if there is less than $1 in change in the machine
* Display EXACT CHANGE
  
