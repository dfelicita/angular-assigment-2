(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);

// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
  var list1 = this;
  
  // Use factory to create new shopping list service
  var shoppingList1 = ShoppingListFactory();
  
  list1.addItem = function (name, quantity) {
    shoppingList1.addItem(name, quantity);
  };

  list1.removeItem = function (itemIndex) {
    // console.log(ShoppingListController2.addItem);
    ShoppingListController2.list2.addItem(list1.items[itemIndex].name, list1.items[itemIndex].quantity);
    shoppingList1.removeItem(itemIndex);

  };
  
  list1.addItem('Cookies', 10);
  list1.addItem('Ginger Ale', 12);
  list1.addItem('Beers', 24);
  list1.addItem('Almond Milk', 2);
  list1.addItem('Burgers', 12);
  list1.addItem('Chocolate Bars', 5);
  list1.addItem('Portein Bars', 30);
  list1.addItem('Chips', 10);
  list1.addItem('Tomatoes', 15);
  list1.addItem('Onios', 5);
  list1.items = shoppingList1.getItems();

}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list2 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list2.items = shoppingList.getItems();

  list2.addItem = function (name, quantity) {
    shoppingList.addItem(name, quantity);
  }

  list2.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };

}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
