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

  constructor(private httpService: HttpService) { }

  ngOnInit() {    
    this.getStatCategories();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    parseOptions(Chart, chartOptions());
      
  }

  getStatCategories(): void {
    this.httpService.getStatCategories()
    .pipe(
      tap((res) => console.log('result Categories', res))
    ).subscribe((categories: StatsCategories[]) => {
      this.categories = categories;
      // this.polarChart.update();
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
    let data: number[] = [];
    let labels: string[] = [];
    statsCategories.map(el =>{
      data.push(el.numberOfProducts);
      labels.push(el.category)
    })
    const confData = {
      labels,
      datasets: [{
        label: 'Category Dataset',
        data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    };
    return confData;
  } 

}