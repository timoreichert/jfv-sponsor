import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaSettings, RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CustomerComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6Lej1wwUAAAAAMV0q50021r90Z6vWSkE5ixOqN9K' } as RecaptchaSettings,
  }, {
    provide: RECAPTCHA_LANGUAGE,
    useValue: 'de'
  }],
  bootstrap: [AppComponent],
  entryComponents: [CustomerComponent]
})
export class AppModule { }
