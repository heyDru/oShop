import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product:Product;
  @Input ('shopping-cart') shoppingCart:any;

    constructor(private cartService:ShoppingCartService) { }
  
    ngOnInit() {
    }
  
  
    addToCart() {
     this.cartService.addToCart(this.product);
    }
  
    removeFromCart(){
      this.cartService.removeFromCart(this.product);
    }
}
