import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from "ngx-tooltip";

// import { CKEditorModule } from 'ngx-ckeditor';
import { CKEditorModule } from 'ng2-ckeditor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderFooterComponent } from './Common/header-footer/header-footer.component';

// import { SocketService } from './Services/socket.service';
import { GooglePlacesDirective } from './google-places.directive';
import { WakiLoginComponent } from './Components/waki-login/waki-login.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { EnterPasswordScreenComponent } from './Components/enter-password-screen/enter-password-screen.component';
import { BusinessDetailComponent } from './Components/business-detail/business-detail.component';

import { HomePageVendorComponent } from './Components/home-page-vendor/home-page-vendor.component';
import { HeaderComponent } from './Components/header/header.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AddProductScreenComponent } from './Components/add-product-screen/add-product-screen.component';
import { ImageUploaderModule } from 'ngx-image-uploader';
// import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from 'ng-custom-select'
import { TagInputModule } from 'ngx-chips';
import { EditproductComponent } from './Components/editproduct/editproduct.component';
import { DynamicFormModule } from 'ngx-dynamic-form';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { Ng2TableModule } from 'ngx-datatable';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { Ng2TableModule} from 'ng2-table/ng2-table';
// import { ChidComponent } from './chid/chid.component';
import { ChildComponent } from './Components/child/child.component';
import { TestSumitComponent } from './Components/test-sumit/test-sumit.component';
@NgModule({
  declarations: [
    AppComponent,
    // HeaderFooterComponent,
    GooglePlacesDirective,
    WakiLoginComponent,
    SideBarComponent,
    EnterPasswordScreenComponent,
    BusinessDetailComponent,
    HomePageVendorComponent,
    HeaderComponent,
    AddProductComponent,
    AddProductScreenComponent,
    EditproductComponent,
    // ChidComponent,
    ChildComponent,
    TestSumitComponent,
    // FancyImageUploaderModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CKEditorModule,
    TooltipModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    TagInputModule,
    NgxDatatableModule,
    Ng2TableModule,
    ImageUploaderModule,
    DynamicFormModule,
  ],
  entryComponents: [
    ChildComponent
  ],
  providers: [CookieService,/* SocketService */],
  bootstrap: [AppComponent]
})
export class AppModule { }
