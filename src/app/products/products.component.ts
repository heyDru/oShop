import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription:Subscription;

  constructor(private productSevice: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) {

    productSevice.getAll().switchMap(products => {
      this.products = products;
      return route.queryParamMap
    }).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
    });
  }

  async ngOnInit() {
  this.subscription= (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
