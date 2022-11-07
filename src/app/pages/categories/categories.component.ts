import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { StatsCategories, WrapperData } from 'src/app/models/user-service.types';
import HttpService from 'src/app/services/user-service/user-service';
import { chartExample1, chartOptions, parseOptions } from 'src/app/variables/charts';
import Chart from 'chart.js'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  
  public categories: StatsCategories[] = [];
  public datasets: any;
  public data: any;
  public polarChart;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public isLoading: boolean = true;

  constructor(private httpService: HttpService) { }

  ngOnInit() {    
    this.getStatCategories();

    parseOptions(Chart, chartOptions());
      
  }

  getStatCategories(): void {
    this.isLoading = true;
    this.httpService.getStatCategories()
    .pipe(
      tap((res) => console.log('result Categories', res))
    ).subscribe((categories: StatsCategories[]) => {
      this.isLoading = false;
      this.categories = categories;
      var polarChart = document.getElementById('polar-chart');
      this.polarChart = new Chart(polarChart, this.getConfig(categories))
    });
  }

  getConfig(statsCategories: StatsCategories[]){
    const config = {
      type: 'polarArea',
      data: this.getData(statsCategories),
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
          }
        },
        // scale: {
        //   gridLines: {
        //     color: 'white'
        //   },
        // },
        
      },
    };
    return config;
  }

  getData(statsCategories: StatsCategories[]){
    let backgroundColor: string[] = [];
    let data: number[] = [];
    let labels: string[] = [];
    statsCategories.map(el =>{
      data.push(el.numberOfProducts);
      labels.push(el.category);
      backgroundColor.push(this.dynamicColors());
    })
    const confData = {
      labels,
      datasets: [{
        label: 'Category Dataset',
        data,
        backgroundColor,
        borderWidth: 1
      }]
    };
    return confData;
  }

  dynamicColors(): string {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

}