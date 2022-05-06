import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TitlePageModule } from './title/title.module'; 
import { BuyappalertPageModule } from './buyappalert/buyappalert.module'; 
import { VtPopupPageModule } from './vt-popup/vt-popup.module'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InterceptorService } from '../services/interceptor/interceptor.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [
	  BrowserModule, 
    IonicStorageModule.forRoot(),
	  IonicModule.forRoot(), 
      AppRoutingModule,
      HttpClientModule,
      TranslateModule,   
      TitlePageModule,   
      BuyappalertPageModule,
      VtPopupPageModule,
      TranslateModule.forRoot({
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
