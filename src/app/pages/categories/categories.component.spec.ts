import { HttpClient, HttpHandler } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { MessageService } from 'src/app/services/message.service';
import HttpService from 'src/app/services/user-service/user-service';
import { CategoriesComponent } from './categories.component';



describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
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
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
