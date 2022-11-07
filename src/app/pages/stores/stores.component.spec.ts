import { HttpClient, HttpHandler } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { MessageService } from 'src/app/services/message.service';
import HttpService from 'src/app/services/user-service/user-service';
import { StoresComponent } from './stores.component';


describe('StoresComponent', () => {
  let component: StoresComponent;
  let fixture: ComponentFixture<StoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresComponent ],
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
    fixture = TestBed.createComponent(StoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
