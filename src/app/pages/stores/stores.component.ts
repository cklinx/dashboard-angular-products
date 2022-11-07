import { Component, OnInit } from '@angular/core';
import { Store, WrapperData } from 'src/app/models/user-service.types';
import HttpService from 'src/app/services/user-service/user-service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  // providers: [HttpService],
})
export class StoresComponent implements OnInit {
  
  public stores: WrapperData<Store>[] = [];
  public isLoading: boolean = true;

  constructor(private httpService: HttpService) { }

  ngOnInit() {    
    this.getStores();
  }

  getStores(): void {
    this.isLoading = true;
    this.httpService.getStores()
    .pipe(
      // tap((res) => console.log('result Stores', res))
    ).subscribe((stores: WrapperData<Store>[]) => {
      this.isLoading = false;
      this.stores = stores;
    });
  }

}
