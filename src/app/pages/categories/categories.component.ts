import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import HttpService from 'src/app/services/user-service/user-service';
import { StatsCategories, WrapperData } from 'src/app/services/user-service/user-service.types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  
  categories: StatsCategories[] = [];
  
  constructor(private httpService: HttpService) { }

  ngOnInit() {    
    this.getStatCategories();
  }

  getStatCategories(): void {
    this.httpService.getStatCategories()
    .pipe(
      tap((res) => console.log('result Categories', res))
    ).subscribe((categories: StatsCategories[]) => (this.categories = categories));
  }

}
