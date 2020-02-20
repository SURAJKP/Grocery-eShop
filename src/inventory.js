import Item from './Item.js';
import chocolate from './../images/chocolate.jpg'
import apples from './../images/apple.jpg';
import carrot from './../images/carrot.jpg';

var item1 = new Item('Chocolates',20,100,chocolate);
var item2 = new Item('Apples',50,20,apples);
var item3 = new Item('Carrot',50,5,carrot);

var items = [item1, item2,item3];
console.log(items);
console.log("checking for HMR")

export default items;
