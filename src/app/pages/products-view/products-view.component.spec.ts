import { HttpClient, HttpHandler } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { MessageService } from 'src/app/services/message.service';
import HttpService from 'src/app/services/user-service/user-service';
import { ProductsViewComponent } from './products-view.component';


describe('ProductsViewComponent', () => {
  let component: ProductsViewComponent;
  let fixture: ComponentFixture<ProductsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsViewComponent ],
      providers: [
        HttpClient,
        HttpService,
        HttpHandler,
        HttpErrorHandler,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
