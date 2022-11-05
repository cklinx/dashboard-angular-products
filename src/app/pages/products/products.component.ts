import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import HttpService from 'src/app/services/user-service/user-service';
import { Store, WrapperData } from 'src/app/services/user-service/user-service.types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  // providers: [HttpService],
})
export class ProductsComponent implements OnInit {
  
  products: WrapperData<ProductsComponent>[] = [];
  
  constructor(private httpService: HttpService) { }

  ngOnInit() {    
    this.getProducts();
  }

  getProducts(): void {
    this.httpService.getProducts()
    .pipe(
      tap((res) => console.log('result Products', res))
    ).subscribe((products: WrapperData<ProductsComponent>[]) => (this.products = products));
  }

}
