/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Item;
function Item(name, quantity, price, url) {
	this.name = name;
	this.quantity = quantity;
	this.price = price;
	this.url = url;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

module.exports = function () {
    return null;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.populateCart = populateCart;
exports.orderItems = orderItems;

var _Store = __webpack_require__(4);

var _Store2 = _interopRequireDefault(_Store);

var _Item = __webpack_require__(0);

var _Item2 = _interopRequireDefault(_Item);

var _User = __webpack_require__(5);

var _User2 = _interopRequireDefault(_User);

var _inventory = __webpack_require__(6);

var _inventory2 = _interopRequireDefault(_inventory);

var _tableheaderTemplate = __webpack_require__(10);

var _tableheaderTemplate2 = _interopRequireDefault(_tableheaderTemplate);

var _rechargeTemplate = __webpack_require__(11);

var _rechargeTemplate2 = _interopRequireDefault(_rechargeTemplate);

var _pageheaderTemplate = __webpack_require__(12);

var _pageheaderTemplate2 = _interopRequireDefault(_pageheaderTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _Store2.default(_inventory2.default);
var existingItems = store.items;
var cost;
var userBudget = new _User2.default(0);
var userAmount;


//generating dynamic table of items
window.onload = function populateItems() {
	document.getElementById('items').innerHTML = _tableheaderTemplate2.default;
	document.getElementById('rechargeTable').innerHTML = _rechargeTemplate2.default;
	document.getElementById('heading').innerHTML = _pageheaderTemplate2.default;
	document.getElementById('cartDetails').innerHTML = 'My Basket: ' + cart.length;
	document.getElementById('walletDetails').innerHTML = "My Wallet: Rs. " + userBudget.budget;
	document.getElementById('tblPlaceOrder').addEventListener('click', orderItems);
	var itemBody = document.getElementById('itemTable').appendChild(document.createElement('tbody'));
	for (var i = 0; i < existingItems.length; i++) {

		//1. For every item in the store we create row in table
		var itemRow = itemBody.appendChild(document.createElement('tr'));

		//2a. First cell will be image of the item.
		var imgUrl = existingItems[i].url;
		var img = document.createElement('img');
		img.setAttribute("src", imgUrl);
		img.setAttribute("height", 100);
		img.setAttribute("width", 150);
		var itemName = document.createElement('td');
		itemName.setAttribute("id", "itemNameCol");
		var itemImage = document.createElement('td');
		itemImage.setAttribute("id", "itemImageCol");

		//2b. Second cell will be  name of the item.		
		itemRow.appendChild(itemName).appendChild(document.createTextNode(existingItems[i].name));
		itemRow.appendChild(itemImage).appendChild(img);

		//3. Second cell is price per item
		var priceCol = document.createElement('td');
		itemRow.appendChild(priceCol).appendChild(document.createTextNode(existingItems[i].price));
		priceCol.setAttribute("id", "itemPriceCol");

		//4. Third cell will be quantity of the item.	
		var itemQuantity = document.createElement('input');
		itemQuantity.setAttribute('type', 'number');
		itemQuantity.setAttribute('min', 1);
		itemQuantity.setAttribute('value', 1);
		itemQuantity.setAttribute('id', 'quantityField');
		var quantityCol = document.createElement('td');
		quantityCol.setAttribute('id', 'qty');
		itemRow.appendChild(quantityCol).appendChild(itemQuantity);

		//4. Last cell will be option to add the item in cart.
		var addButton = document.createElement("input");
		addButton.setAttribute("type", "button");
		addButton.setAttribute("value", "ADD");
		addButton.setAttribute("id", "addButton");
		var addButtonCell = document.createElement('td');
		itemRow.appendChild(addButtonCell).appendChild(addButton);
		//5. On click of add button, item in that row will be added to the cart
		addButton.onclick = function () {
			//alert(this.parentNode.parentNode.firstChild.innerHTML+" "+this.parentNode.previousSibling.childNodes[0].value);
			populateCart(this.parentNode.parentNode.firstChild.innerHTML, this.parentNode.previousSibling.childNodes[0].value);
		};
		/*var removeButton = document.createElement("input");
  removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "-");
  
  
  var removeCell = document.createElement('td');
  
  itemRow.appendChild(removeCell).appendChild(removeButton);
  
  
  removeButton.onclick=function(){
  				
  };*/
	}

	//Recharging the wallet

	document.getElementById('rechargeButton').addEventListener('click', function () {
		var amount = document.getElementById('budget').value;
		userAmount = new Number(amount);
		userBudget.budget = userBudget.budget + userAmount.valueOf();
		if (userBudget.budget > 0) {
			document.getElementById('walletDetails').innerHTML = "MyWallet: Rs. " + userBudget.budget;
			document.getElementById('walletAmount').innerHTML = "Rs. " + userAmount + " added to the wallet!";
			document.getElementById('budget').value = '';
		} else {
			document.getElementById('walletAmount').innerHTML = 'Enter valid amount in wallet!';
		}
		return userBudget.budget;
	});
};
var cart = new Array();
var currentTotal = 0;
//On click of add button this function adds items to global cart
function populateCart(itemName, itemQuantity) {

	//1. The item selected should be existing
	var storeItem = store.items.find(function (currItem) {
		return currItem ? currItem.name == itemName : undefined;
	});

	//2. The quantity ordered should be available					
	if (itemQuantity <= storeItem.quantity) {

		//3. Each item should have price per item
		if (!isNaN(storeItem.price) && storeItem.price > 0) {
			var purchasedItem = new _Item2.default(itemName, itemQuantity, storeItem.price);
			cart.push(purchasedItem);
			//document.getElementById('cartDetails').innerHTML=document.getElementById('cartDetails').innerHTML+'<br>'+purchasedItem.quantity+' '+purchasedItem.name;
			document.getElementById('cartDetails').innerHTML = 'MyBasket: ' + cart.length;
			currentTotal = currentTotal + itemQuantity * storeItem.price;
			document.getElementById('currentTotal').innerHTML = 'Total Bill Rs. ' + currentTotal;
		} else {
			console.log("Price is not defined for the item");
		}
	} else {
		//alert("You cannot buy more than "+storeItem.quantity+itemName+" !!");
		document.getElementById('walletAmount').innerHTML = "You cannot buy more than " + storeItem.quantity + itemName + " !!";
	}
}
function sortItems(itemName) {
	//logic to sort item. To be done later.
}
if (true) {
	sortItems('asdf');
}
//On click of place order button, the items in cart will be ordered
function orderItems() {

	var totalPrice = 0;

	//1. Cart should contain atleast one item for order to be placed	
	if (cart.length == 0) {
		//alert("Please add items to Cart!"+cart);
		document.getElementById('walletAmount').innerHTML = "Please add items to Cart!" + cart;
	} else {

		cart.forEach(function (item, index) {
			//2. Total price for items should be calculated and comapred with amount existing in the wallet
			totalPrice = totalPrice + item.quantity * item.price;
			if (userBudget.budget == 0) {
				document.getElementById('walletAmount').innerHTML = "Please recharge your wallet to proceed ";
			} else {
				if (totalPrice > userBudget.budget) {
					var shortAmount = totalPrice - userBudget.budget;
					document.getElementById('walletAmount').innerHTML = "Recharge your wallet with Rs. " + shortAmount;
				} else {}
			}
		});

		//3. Place order if userBudget is greater than equal to totalPrice. After order is placed - update userBudget, clear the cart !
		if (userBudget.budget >= totalPrice && cart.length > 0 && totalPrice > 0) {
			//alert("Order placed successfully!Total bill amount is: "+totalPrice);
			userBudget.budget = userBudget.budget - totalPrice;
			document.getElementById('walletDetails').innerHTML = "My Wallet: Rs. " + userBudget.budget;
			cart = [];
			document.getElementById('cartDetails').innerHTML = 'My Basket: ' + cart.length;
			document.getElementById('currentTotal').innerHTML = '';
			document.getElementById('walletAmount').innerHTML = "Order placed! Now your wallet has Rs. " + userBudget.budget;

			//document.getElementById('walletAmount').innerHTML='';
		}
	}
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Store;
function Store(items) {
	this.items = items;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = User;
function User(budget) {
	this.budget = budget;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Item = __webpack_require__(0);

var _Item2 = _interopRequireDefault(_Item);

var _chocolate = __webpack_require__(7);

var _chocolate2 = _interopRequireDefault(_chocolate);

var _apple = __webpack_require__(8);

var _apple2 = _interopRequireDefault(_apple);

var _carrot = __webpack_require__(9);

var _carrot2 = _interopRequireDefault(_carrot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var item1 = new _Item2.default('Chocolates', 20, 100, _chocolate2.default);
var item2 = new _Item2.default('Apples', 50, 20, _apple2.default);
var item3 = new _Item2.default('Carrot', 50, 5, _carrot2.default);

var items = [item1, item2, item3];
console.log(items);
console.log("checking for HMR");

exports.default = items;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "37181511af50d5df1d8f07af5679fa09.jpg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "30d3d52600c1f5a29460e4cd3a39476a.jpg";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b40cb79ef9bd97aff3aacd48073c8756.jpg";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<table id='itemTable'>\r\n    <thead>\r\n        <tr id='tableHeader'>\r\n            <th colspan='2'>Item Details</th>\r\n            <th>Price</th>\r\n            <th>Quantity</th>\r\n            <th>Action</th>\r\n        </tr>\r\n    </thead>\r\n</table>";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<tr>\r\n\t\t\t<td>Recharge Wallet: <input type=\"text\" id='budget'></td>\r\n\t\t\t<td><input id='rechargeButton' type=\"button\" value=\"Recharge\" ></td>\r\n\t\t</tr>\r\n\t\t<tr>\t\t\r\n \t\t\t<td id='walletAmount'></td>\r\n \r\n </tr>";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<h1 class='header'>\r\n\t\r\n\t</a>Grocery e-Shop</h1>\r\n<div id='accountDetails'>\r\n\t<span id='cartDetails'></span>&nbsp;&nbsp;\r\n\t<span id='walletDetails'></span>&nbsp;&nbsp;\r\n\t<span id='currentTotal'></span>\r\n</div>";

/***/ })
/******/ ]);