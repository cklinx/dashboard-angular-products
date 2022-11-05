import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import HttpService from 'src/app/services/user-service/user-service';
import {  WrapperData } from 'src/app/services/user-service/user-service.types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbModal],
})
export class ProductsComponent implements OnInit {
  
  products: WrapperData<ProductsComponent>[] = [];
  
  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    // public modal: NgbActiveModal
    ) { }

  ngOnInit() {    
    this.getProducts();
  }

  getProducts(): void {
    this.httpService.getProducts()
    .pipe(
      tap((res) => console.log('result Products', res))
    ).subscribe((products: WrapperData<ProductsComponent>[]) => (this.products = products));
  }

  open(content) {
		this.modalService.open(content);
	}
  
}
