import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  
  // @ViewChild('closebutton') closebutton!: ElementRef;
  
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
    // private activeModal: NgbActiveModal
    private toastService: ToastService
  ) { }

  ngOnInit() {    
    this.getProductsPaged();
    // this.formControl = new FormGroup<ProductForm>({
    //   title: new FormControl("", Validators.required),
    //   category: new FormControl("", Validators.required),
    //   price: new FormControl(0, Validators.required),
    //   employee: new FormControl(""),
    //   description: new FormControl(""),
    //   reviews: new FormControl([]),
    // });
    this.formGroup = ProductsComponentAdapter.fromDTOtoForm(null)
  }

  ngAfterViewInit() {
    // this.getProducts();
    // this.showToast(EventTypes.Success);
  }

  getProductsPaged(): void {
    this.isLoading = true;
    this.httpService.getProductsPaged(this.pageResult)
    .pipe(
      tap((res) => console.log('result Products', res))
    ).subscribe((products: WrapperDataList<WrapperData<Product>>) => {
      // this.products = products.list;
      this.products = this.products.concat(products.list);
      this.totProducts = products.length;

      console.log('pppppp', this.products);
      
      this.isLoading = false;
    });
  }

  open(content: any, type: string, selectedProduct: WrapperData<Product>): void {
    console.log('selectedProductselectedProduct', type, selectedProduct);
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
        // code block
    } 

    this.modalReference = this.modalService.open(content);
		// this.modalService.open(content);

    //only for edit and delete
    if(!isNil(selectedProduct)){
      this.selectedProduct = selectedProduct;
    }
	}

  deleteProduct(content: any, product: WrapperData<Product>): void{
    console.log('deleteProductdeleteProductdeleteProduct', product);
    // this.modalReference.close();
    // this.showToast(EventTypes.Success);
    // this.activeModal.close()
    // this.closebutton.nativeElement.click();
    this.httpService.deleteProduct(product.id)
    .pipe(
      tap((res) => console.log('result delete Products', res))
    )
    // .subscribe((next: data) => {
    //     this.status = 'Delete successful';
    //   },
    //   error: error => {
    //       this.errorMessage = error.message;
    //       console.error('There was an error!', error);
    //   });
    .subscribe({
      next: data => {
        this.modalReference.close();
        this.showToast(EventTypes.Success);
        this.products = this.products.filter(object => {
          return object.id !== product.id;
        });
        this.totProducts--;
          // this.status = 'Delete successful';
      },
      error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
        this.modalReference.close();
        this.showToast(EventTypes.Error);
      }
    });
  }

  saveProduct(content: any): void{
    console.log('saveProductsaveProduct');
    // this.modalReference.close();
    // this.showToast(EventTypes.Success);
    // this.activeModal.close()
    // this.closebutton.nativeElement.click();
    const productData: Product = this.formGroup.value as Product;
    const invalidField = ProductsComponentAdapter.validateForm(this.formGroup);
    console.log('invalidFieldinvalidField', invalidField);
     
    if(invalidField.length>0){
      let msg = "Insert mandatory fleds: ";
      invalidField.map(el => msg+=" - " + el)
      return this.showToast(EventTypes.Warning, msg);
    }

    this.httpService.setProduct(productData)
    .pipe(
      tap((res) => console.log('result set Products', res))
    )
    // .subscribe((next: data) => {
    //     this.status = 'Delete successful';
    //   },
    //   error: error => {
    //       this.errorMessage = error.message;
    //       console.error('There was an error!', error);
    //   });
    .subscribe({
      next: (data: string) => {
        this.modalReference.close();
        this.showToast(EventTypes.Success);
        const newProduct: WrapperData<Product> = {
          id: data,
          data: productData
        }
        this.products.unshift(newProduct);
        this.totProducts++;
          // this.status = 'Delete successful';
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
    console.log('showToast', type);
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

//   getRowById(index, row) {
//     console.log('getRowByIdgetRowById', index, this.totProductsEl-1);
//     if(index<this.totProductsEl-1){
//       console.log('getRowByIdgetRowById222', index, row);
//       this.pageResult++;
//       this.getProductsPaged();
//     }
//     // Return some unique primitive idenitifier (string, number, etc.)
//     return row['some unique property'];
//  }
  
  onScrollDown() {
    console.log('scrolled down!!', this.products.length, this.totProducts);
    if(this.products.length<this.totProducts){
      this.pageResult++;
      this.getProductsPaged()
    }
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }

  addReview(review: string){
    console.log('addReview', review);
    
    const reviews = this.formGroup.controls.reviews.value;
    reviews.push(review);
    this.formGroup.controls.reviews.setValue(reviews);

    console.log('addReview', review, reviews, this.formGroup.controls.reviews.value);
  }
}
