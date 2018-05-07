import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
 // subscription:Subscription;

  constructor(private productSevice: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) {
   
  }

  async ngOnInit() { 
  // this.subscription=
  this.cart$ =  (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts(){
    this.productSevice
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category):
    this.products;
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
