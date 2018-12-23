import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WakiLoginComponent } from './Components/waki-login/waki-login.component';
import { EnterPasswordScreenComponent } from './Components/enter-password-screen/enter-password-screen.component';
import { BusinessDetailComponent } from './Components/business-detail/business-detail.component';
import { HomePageVendorComponent } from './Components/home-page-vendor/home-page-vendor.component';
import { AddProductScreenComponent } from './Components/add-product-screen/add-product-screen.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditproductComponent } from './Components/editproduct/editproduct.component';
import { TestSumitComponent } from './Components/test-sumit/test-sumit.component';
  
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: WakiLoginComponent },
  { path: 'enterPassword', component: EnterPasswordScreenComponent },
  { path: 'business_details', component: BusinessDetailComponent },
  { path: 'dashBoard', component: HomePageVendorComponent },
  { path: 'addProductScreen', component: AddProductScreenComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'editProduct', component: EditproductComponent },
  {path:'test',component:TestSumitComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
