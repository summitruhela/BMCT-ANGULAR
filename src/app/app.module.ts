import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {NgxPaginationModule} from 'ngx-pagination';
import {TooltipModule} from "ngx-tooltip";

// import { CKEditorModule } from 'ngx-ckeditor';
import { CKEditorModule } from 'ng2-ckeditor';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MerchantManagementComponent } from './Components/merchant-management/merchant-management.component';
import { StaticContentManagementComponent } from './Components/static-content-management/static-content-management.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { StaticContentViewComponent } from './Components/static-content-view/static-content-view.component';
import { StaticContentEditComponent } from './Components/static-content-edit/static-content-edit.component';
import { BannerManagementComponent } from './Components/banner-management/banner-management.component';
import { BannerEditComponent } from './Components/banner-edit/banner-edit.component';
import { BannerViewComponent } from './Components/banner-view/banner-view.component';
import { MerchantViewComponent } from './Components/merchant-view/merchant-view.component';
import { HeaderFooterComponent } from './Common/header-footer/header-footer.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MerchantEditComponent } from './Components/merchant-edit/merchant-edit.component';
import { SubAdminManagementComponent } from './Components/sub-admin-management/sub-admin-management.component';
import { SubAdminViewComponent } from './Components/sub-admin-view/sub-admin-view.component';
import { SubAdminAddComponent } from './Components/sub-admin-add/sub-admin-add.component';

import { SocketService } from './Services/socket.service';
import { MerchantFormComponent } from './Components/merchant-form/merchant-form.component';
import { GooglePlacesDirective } from './google-places.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    MerchantManagementComponent,
    StaticContentManagementComponent,
    ChangePasswordComponent,
    StaticContentViewComponent,
    StaticContentEditComponent,
    BannerManagementComponent,
    BannerEditComponent,
    BannerViewComponent,
    MerchantViewComponent,
    HeaderFooterComponent,
    ResetPasswordComponent,
    MerchantEditComponent,
    SubAdminManagementComponent,
    SubAdminViewComponent,
    SubAdminAddComponent,
    MerchantFormComponent,
    GooglePlacesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule ,
    CKEditorModule,     
    TooltipModule
   
  ],
  providers: [CookieService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
