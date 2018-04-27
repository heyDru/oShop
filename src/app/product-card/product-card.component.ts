import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
@Input('product') product:Product;
@Input('show-actions') showActions=true;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }


  addToCart(product) {
  // let cart = this.cartService.getOrCreateCart();
   this.cartService.addToCart(product);

    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      this.cartService.create().then(result=>{
        localStorage.setItem('cartId',result.key);
      });
    }
    else{
      
    }
  }

}
