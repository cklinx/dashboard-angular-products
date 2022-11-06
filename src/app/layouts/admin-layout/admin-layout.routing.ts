import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { StoresComponent } from 'src/app/pages/stores/stores.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductsViewComponent } from 'src/app/pages/products-view/products-view.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'stores',         component: StoresComponent },
    { path: 'categories',     component: CategoriesComponent },
    { path: 'products',       component: ProductsComponent },
    { path: 'products-view',  component: ProductsViewComponent }
];
