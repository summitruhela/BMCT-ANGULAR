import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { StaticContentManagementComponent } from './Components/static-content-management/static-content-management.component';
import { StaticContentEditComponent } from './Components/static-content-edit/static-content-edit.component';
import { StaticContentViewComponent } from './Components/static-content-view/static-content-view.component';
import { MerchantManagementComponent } from './Components/merchant-management/merchant-management.component';
import { MerchantViewComponent } from './Components/merchant-view/merchant-view.component';
import { BannerManagementComponent } from './Components/banner-management/banner-management.component';
import { BannerViewComponent } from './Components/banner-view/banner-view.component';
import { BannerEditComponent } from './Components/banner-edit/banner-edit.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { SubAdminManagementComponent } from './Components/sub-admin-management/sub-admin-management.component';
import { MerchantEditComponent } from './Components/merchant-edit/merchant-edit.component';
import { SubAdminAddComponent } from './Components/sub-admin-add/sub-admin-add.component';
import { SubAdminViewComponent } from './Components/sub-admin-view/sub-admin-view.component';
import { MerchantFormComponent } from './Components/merchant-form/merchant-form.component';

const routes: Routes = [
  {path:'',                    redirectTo:'login', pathMatch:'full'},
  {path:'login',               component:LoginComponent},
  {path:'dashboard',           component: DashboardComponent },
  {path:'change-password',     component:ChangePasswordComponent},

  {path:'static-contents',     component:StaticContentManagementComponent},
  {path:'static-edit',         component:StaticContentEditComponent},
  {path:'static-view',         component:StaticContentViewComponent},

  {path:'merchant-management', component:MerchantManagementComponent},
  {path:'merchant-view',       component:MerchantViewComponent},
  {path:'merchant-edit', component:MerchantEditComponent},

  {path:'banner-management',   component:BannerManagementComponent},
  {path:'banner-view',         component:BannerViewComponent},
  {path:'banner-edit',         component:BannerEditComponent},

  {path:'forgot-password',     component:ForgotPasswordComponent},
  {path:'reset-password',      component:ResetPasswordComponent},
  {path:'subadmin-management', component:SubAdminManagementComponent},
  {path:'subadmin-add', component:SubAdminAddComponent},
  {path:'subadmin-view', component:SubAdminViewComponent},

  {path:'merchant-form', component:MerchantFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
