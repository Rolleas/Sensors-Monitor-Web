import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './store/auth/auth.effects';
import { SensorsEffects } from './store/sensors/sensors.effects';
import { HTTP_INTERCEPTORS_PROVIDES } from './core/interceprors/interceptors.providers';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { SensorModule } from './sensor/sensor.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers: [...metaReducers] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, SensorsEffects]),
    ButtonModule,
    SensorModule,
  ],
  providers: [HTTP_INTERCEPTORS_PROVIDES],
  bootstrap: [AppComponent],
})
export class AppModule {}
