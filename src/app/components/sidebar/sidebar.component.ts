import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/stores', title: 'Stores',  icon:'ni-shop text-blue', class: '' },
    { path: '/categories', title: 'Categories',  icon:'ni-chart-pie-35 text-blue', class: '' },
    { path: '/products', title: 'Manage products',  icon:'ni-bullet-list-67 text-yellow', class: '' },
    { path: '/products-view', title: 'View products',  icon:'ni-archive-2 text-red', class: '' }
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
