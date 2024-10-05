import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { logsAllHTTPRequestInterceptor } from './interceptors/logs-all-httprequest.interceptor';
import { authLoaderInterceptor } from './interceptors/auth-loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { CurrencyFormatDirective } from './directives/currency-format.directive';
import { PasswordToggleDirective } from './directives/password-toggle.directive';




@NgModule({
  declarations: [
    AppComponent,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    NgbModule,
    MatIconModule,
    HttpClientModule,
    DashboardModule,
    MatProgressSpinnerModule




  ],
  providers: [
    provideHttpClient(
      withInterceptors([logsAllHTTPRequestInterceptor])
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authLoaderInterceptor,
      multi: true,
    },

    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
