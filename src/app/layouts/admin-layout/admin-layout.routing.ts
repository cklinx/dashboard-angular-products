import { Routes } from '@angular/router';

import { StoresComponent } from 'src/app/pages/stores/stores.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductsViewComponent } from 'src/app/pages/products-view/products-view.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'stores',         component: StoresComponent },
    { path: 'categories',     component: CategoriesComponent },
    { path: 'products',       component: ProductsComponent },
    { path: 'products-view',  component: ProductsViewComponent }
];
