import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { MessageService } from 'src/app/services/message.service';
import HttpService from 'src/app/services/user-service/user-service';
import { ProductsComponent } from './products.component';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        HttpService,
        HttpClient,
        HttpHandler,
        HttpErrorHandler,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
