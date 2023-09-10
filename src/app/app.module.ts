import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// External helpers

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


// Components

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ValidateEmailPipe } from './pipes/validateEmail/validate-email.pipe';
import { ValidatePhonePipe } from './pipes/validatePhone/validate-phone.pipe';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoadingComponent,
    ValidateEmailPipe,
    ValidatePhonePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
