import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({ dateCteated: new Date().getTime() });
  }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x=>new ShoppingCart(x.items));
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    this.updateItem(product,1);
  }

 async  removeFromCart(product: Product) {
  this.updateItem(product,-1);
  }

  private async updateItem (product: Product,change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({
         title:product.title,
         imageUrl:product.imageUrl,
         price: product.price,
         quantity: (item.quantity || 0) + change
         })
    });
  }
}
