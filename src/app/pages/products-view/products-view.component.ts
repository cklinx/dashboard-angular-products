import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ModeDialog, Product, ProductForm, WrapperData, WrapperDataList } from 'src/app/models/user-service.types';
import HttpService from 'src/app/services/user-service/user-service';
import { ProductsComponentAdapter } from '../products/adapter/product.component.adapter';
import { isNil } from 'lodash';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
  ) { }

  public products: WrapperData<Product>[] = [];
  public isLoading: boolean = true;
  public totProducts: number = 0;
  public isGridLayout: boolean =  true;
  public mode: ModeDialog = null;
  public formGroup: FormGroup<ProductForm>;
  public selectedProduct: WrapperData<Product>;
  
  private pageResult: number = 1;
  private modalReference: NgbModalRef;
  
  ngOnInit() {
    this.getProductsPaged();
  }

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

  swithBreakpoint(){  
    this.isGridLayout = !this.isGridLayout;
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
        // code block
    } 

    this.modalReference = this.modalService.open(content);

    //only for edit and delete
    if(!isNil(selectedProduct)){
      this.selectedProduct = selectedProduct;
      
    }
	}

}
