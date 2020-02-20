import Store from './Store.js';
import Item from './Item.js';
import User from './User.js';
import items from './inventory.js';
var store = new Store(items);
var existingItems = store.items;
var cost;
var userBudget = new User(0);
var userAmount;
import tableHeader from './../templates/tableheaderTemplate.html';
import rechargeTemplate from './../templates/rechargeTemplate.html';
import pageheaderTemplate from './../templates/pageheaderTemplate.html';

//generating dynamic table of items
window.onload = function populateItems() {
	document.getElementById('items').innerHTML=tableHeader;
	document.getElementById('rechargeTable').innerHTML=rechargeTemplate;
	document.getElementById('heading').innerHTML=pageheaderTemplate;
	document.getElementById('cartDetails').innerHTML='My Basket: ' + cart.length;
	document.getElementById('walletDetails').innerHTML="My Wallet: Rs. " + userBudget.budget;
	document.getElementById('tblPlaceOrder').addEventListener('click',orderItems)
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

	document.getElementById('rechargeButton').addEventListener('click', () => {
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
}
var cart = new Array();
var currentTotal = 0;
//On click of add button this function adds items to global cart
export function populateCart(itemName, itemQuantity) {

	//1. The item selected should be existing
	var storeItem = store.items.find(function (currItem) {
		return currItem ? currItem.name == itemName : undefined;
	}
	);

	//2. The quantity ordered should be available					
	if (itemQuantity <= storeItem.quantity) {

		//3. Each item should have price per item
		if (!isNaN(storeItem.price) && storeItem.price > 0) {
			var purchasedItem = new Item(itemName, itemQuantity, storeItem.price);
			cart.push(purchasedItem);
			//document.getElementById('cartDetails').innerHTML=document.getElementById('cartDetails').innerHTML+'<br>'+purchasedItem.quantity+' '+purchasedItem.name;
			document.getElementById('cartDetails').innerHTML='MyBasket: ' + cart.length;
			currentTotal = currentTotal + (itemQuantity * storeItem.price);
			document.getElementById('currentTotal').innerHTML='Total Bill Rs. ' + currentTotal;
		} else {
			console.log("Price is not defined for the item");
		}
	} else {
		//alert("You cannot buy more than "+storeItem.quantity+itemName+" !!");
		document.getElementById('walletAmount').innerHTML="You cannot buy more than " + storeItem.quantity + itemName + " !!";
	}
}
function sortItems(itemName) {
	//logic to sort item. To be done later.
}
if (process.env.NODE_ENV == 'development') {
	sortItems('asdf');
}
//On click of place order button, the items in cart will be ordered
export function orderItems() {

	var totalPrice = 0;

	//1. Cart should contain atleast one item for order to be placed	
	if (cart.length == 0) {
		//alert("Please add items to Cart!"+cart);
		document.getElementById('walletAmount').innerHTML="Please add items to Cart!" + cart;
	} else {

		cart.forEach(function (item, index) {
			//2. Total price for items should be calculated and comapred with amount existing in the wallet
			totalPrice = totalPrice + (item.quantity * item.price);
			if (userBudget.budget == 0) {
				document.getElementById('walletAmount').innerHTML="Please recharge your wallet to proceed ";
			} else {
				if (totalPrice > userBudget.budget) {
					var shortAmount = totalPrice - userBudget.budget;
					document.getElementById('walletAmount').innerHTML="Recharge your wallet with Rs. " + shortAmount;
				} else {
				}


			}

		});

		//3. Place order if userBudget is greater than equal to totalPrice. After order is placed - update userBudget, clear the cart !
		if (userBudget.budget >= totalPrice && cart.length > 0 && totalPrice > 0) {
			//alert("Order placed successfully!Total bill amount is: "+totalPrice);
			userBudget.budget = userBudget.budget - totalPrice;
			document.getElementById('walletDetails').innerHTML="My Wallet: Rs. " + userBudget.budget;
			cart = [];
			document.getElementById('cartDetails').innerHTML='My Basket: ' + cart.length;
			document.getElementById('currentTotal').innerHTML='';
			document.getElementById('walletAmount').innerHTML="Order placed! Now your wallet has Rs. " + userBudget.budget;

			//document.getElementById('walletAmount').innerHTML='';
		}


	}

}