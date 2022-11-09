import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { EventTypes } from 'src/app/models/event-types';
import { ModeDialog, Product, ProductForm, WrapperData, WrapperDataList } from 'src/app/models/user-service.types';
import { ToastService } from 'src/app/services/toast/toast.service';
import HttpService from 'src/app/services/user-service/user-service';
import { ProductsComponentAdapter } from './adapter/product.component.adapter';
import { isNil } from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbModal, NgbActiveModal],
})
export class ProductsComponent implements OnInit {
  
  public selectedProduct: WrapperData<Product>;
  public products: WrapperData<Product>[] = [];
  public isLoading: boolean = true;
  public totProducts: number = 0;
  public mode: ModeDialog = null;
  public formGroup: FormGroup<ProductForm>;

  private modalReference: NgbModalRef;
  private pageResult: number = 1;

  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) { }

  ngOnInit() {    
    this.getProductsPaged();
    this.formGroup = ProductsComponentAdapter.fromDTOtoForm(null)
  }

  ngAfterViewInit() {}

  getProductsPaged(): void {
    this.isLoading = true;
    this.httpService.getProductsPaged(this.pageResult)
    // .pipe(
    //   tap((res) => console.log('result Products', res))
    // )
    .subscribe((products: WrapperDataList<WrapperData<Product>>) => {
      this.products = this.products.concat(products.list);
      this.totProducts = products.length;   
      this.isLoading = false;
    });
  }

  open(content: any, type: string, selectedProduct: WrapperData<Product>): void {
      
    this.formGroup = ProductsComponentAdapter.fromDTOtoForm(selectedProduct?.data)

    switch(type) {
      case ModeDialog.Delete:
        this.mode = ModeDialog.Delete;
        break;
      case ModeDialog.Edit:
        this.mode = ModeDialog.Edit;
        break;
      case ModeDialog.New:
        this.mode = ModeDialog.New;
        break;
      case ModeDialog.View:
        this.mode = ModeDialog.View;
        break;
      default:
        this.mode = ModeDialog.View;
    } 

    this.modalReference = this.modalService.open(content, {size: 'lg'});

    //only for edit and delete
    if(!isNil(selectedProduct)){
      this.selectedProduct = selectedProduct;
    }
	}

  deleteProduct(content: any, product: WrapperData<Product>): void{
    this.httpService.deleteProduct(product.id)
    // .pipe(
    //   tap((res) => console.log('result delete Products', res))
    // )
    .subscribe({
      next: data => {
        this.modalReference.close();
        this.showToast(EventTypes.Success);
        this.products = this.products.filter(object => {
          return object.id !== product.id;
        });
        this.totProducts--;
      },
      error: error => {
        // console.error('There was an error!', error);
        this.modalReference.close();
        this.showToast(EventTypes.Error);
      }
    });
  }

  saveProduct(content: any): void{
    const productData: Product = this.formGroup.value as Product;
    const invalidField = ProductsComponentAdapter.validateForm(this.formGroup);
    
    if(invalidField.length>0){
      let msg = "Insert mandatory fleds: ";
      invalidField.map(el => msg+=" - " + el)
      return this.showToast(EventTypes.Warning, msg);
    }

    this.httpService.setProduct(productData)
    // .pipe(
    //   tap((res) => console.log('result set Products', res))
    // )
    .subscribe({
      next: (data: string) => {
        this.modalReference.close();
        this.showToast(EventTypes.Success);
        // const newProduct: WrapperData<Product> = {
        //   id: data,
        //   data: productData
        // }
        this.products = [];
        this.totProducts = 0;
        this.getProductsPaged();

        // this.totProducts++;
        // this.products.unshift(newProduct);
      },
      error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
        this.modalReference.close();
        this.showToast(EventTypes.Error);
      }
    });
  }
  
  showToast(type: EventTypes, message: string = "") {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast('Success', 'Operation success '+ message);
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast('Warning', 'Warning '+ message);
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast('Error', 'Error, something went wrong '+ message);
        break;
      default:
        this.toastService.showInfoToast('Info', 'Info '+ message);
        break;
    }
  }
  
  onScrollDown() {
    // console.log('scrolled down!!', this.products.length, this.totProducts);
    if(this.products.length<this.totProducts){
      this.pageResult++;
      this.getProductsPaged()
    }
  }

  onScrollUp() {
    // console.log('scrolled up!!');
  }

  addReview(review: string){
    if(review!=""){
      const reviews = this.formGroup.controls.reviews.value;
      reviews.push(review);
      this.formGroup.controls.reviews.setValue(reviews);
    }
   
  }

  deleteReview(index: number){
    
    const reviews = this.formGroup.controls.reviews.value;
    reviews.splice(index, 1);
    this.formGroup.controls.reviews.setValue(reviews);

  }
}
