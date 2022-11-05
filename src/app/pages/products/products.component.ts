import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { EventTypes } from 'src/app/models/event-types';
import { WrapperData } from 'src/app/models/user-service.types';
import { ToastService } from 'src/app/services/toast/toast.service';
import HttpService from 'src/app/services/user-service/user-service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbModal, NgbActiveModal],
})
export class ProductsComponent implements OnInit {
  
  // @ViewChild('closebutton') closebutton!: ElementRef;
  
  public selectedProduct: ProductsComponent;
  public products: WrapperData<ProductsComponent>[] = [];
  
  private modalReference: NgbModalRef;
  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    // private activeModal: NgbActiveModal
    private toastService: ToastService
    ) { }

  ngOnInit() {    
    this.getProducts();
  }

  ngAfterViewInit() {
    this.showToast(EventTypes.Error);
  }

  getProducts(): void {
    this.httpService.getProducts()
    .pipe(
      tap((res) => console.log('result Products', res))
    ).subscribe((products: WrapperData<ProductsComponent>[]) => (this.products = products));
  }

  open(content: any, selectedProduct: ProductsComponent): void {
    // console.log('selectedProductselectedProduct', selectedProduct);
    this.modalReference = this.modalService.open(content);
		// this.modalService.open(content);
    this.selectedProduct = selectedProduct;
	}

  deleteProduct(content: any, product: WrapperData<ProductsComponent>): void{
    console.log('deleteProductdeleteProductdeleteProduct', product);
    this.modalReference.close();
    this.showToast(EventTypes.Success);
    // this.activeModal.close()
    // this.closebutton.nativeElement.click();
    // this.httpService.deleteProduct(product.id)
    // .pipe(
    //   tap((res) => console.log('result delete Products', res))
    // )
    // // .subscribe((next: data) => {
    // //     this.status = 'Delete successful';
    // //   },
    // //   error: error => {
    // //       this.errorMessage = error.message;
    // //       console.error('There was an error!', error);
    // //   });
    // .subscribe({
    //   next: data => {
    //     this.modalReference.close();
    //       // this.status = 'Delete successful';
    //   },
    //   error: error => {
    //     // this.errorMessage = error.message;
    //     console.error('There was an error!', error);
    //     this.modalReference.close();
    //   }
    // });
  }
  
  showToast(type: EventTypes) {
    console.log('showToast', type);
    
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast('Success toast title', 'This is a success toast message.');
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast('Warning toast title', 'This is a warning toast message.');
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast('Error toast title', 'This is an error toast message.');
        break;
      default:
        this.toastService.showInfoToast('Info toast title', 'This is an info toast message.');
        break;
    }
  }
  
}
