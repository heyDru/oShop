import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart { 

    items:ShoppingCartItem[] = [];

    constructor(public itemsMap:{[productId:string]:ShoppingCartItem}) {
       this.itemsMap = itemsMap || {};
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            let x = new ShoppingCartItem();
            Object.assign(x,item);
            x.$key = productId;
            this.items.push(x);
        }
    }

    get totalPrice() {
        let sum = 0;
        for(let productId in this.items ){
            sum +=this.items[productId].totalPrice ;
        }
        return sum;
    }

    get totalItemsCount () 
    {
        let shoppingCartItemCount=0;
      for (let productId in this.itemsMap) 
      shoppingCartItemCount += this.itemsMap[productId].quantity;
      return shoppingCartItemCount;
    }

    getQuantity(product:Product){
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
      }

}