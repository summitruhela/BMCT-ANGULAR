import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {SlideshowModule} from 'ng-simple-slideshow';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'ngx-slider';
import { InternationalPhoneModule } from 'ng4-intl-phone'; 
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { TermsandconditionsComponent } from './component/termsandconditions/termsandconditions.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';

import { ServiceService } from './services/service.service';
import { GooglePlacesDirective } from './google-places.directive';
import { SocketService } from './socket.service';

const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "termsAndConditions", component: TermsandconditionsComponent },
  { path: "privacyPolicy", component: PrivacyPolicyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    TermsandconditionsComponent,
    PrivacyPolicyComponent,
    GooglePlacesDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: false}),
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      newestOnTop: true
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SliderModule,
    InternationalPhoneModule,
    SlideshowModule
  ],
  providers: [ServiceService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
