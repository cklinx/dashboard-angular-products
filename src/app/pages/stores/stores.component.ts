import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import HttpService from 'src/app/services/user-service/user-service';
import { Store, WrapperData } from 'src/app/services/user-service/user-service.types';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  // providers: [HttpService],
})
export class StoresComponent implements OnInit {
  
  stores: WrapperData<Store>[] = [];
  
  constructor(private httpService: HttpService) { }

  ngOnInit() {    
    this.getStores();
  }

  getStores(): void {
    this.httpService.getStores()
    .pipe(
      // tap((res) => console.log('result Stores', res))
    ).subscribe((stores: WrapperData<Store>[]) => (this.stores = stores));
  }

}
