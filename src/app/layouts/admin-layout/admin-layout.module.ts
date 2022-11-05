import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { MessageService } from 'src/app/services/message.service';
import HttpService from 'src/app/services/user-service/user-service';
import { StoresComponent } from 'src/app/pages/stores/stores.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    CommonModule,
  ],
  declarations: [
    ToastComponent,
    ToasterComponent,
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    StoresComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    HttpService
  ],
})

export class AdminLayoutModule {}
