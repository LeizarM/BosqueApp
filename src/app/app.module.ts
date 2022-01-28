import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorInterceptor } from './auth/interceptor/token-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
     //Modulos de Angular propiamente
     BrowserModule,
     BrowserAnimationsModule,
     HttpClientModule,
     AppRoutingModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
