import { Title } from '@angular/platform-browser';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoModule, TimeagoIntl } from 'ngx-timeago';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { environment } from 'environments/environment';
// Register Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers, AppCustomSerializer } from '@shared/store';
import {
  StoreRouterConnectingModule, RouterStateSerializer
} from '@ngrx/router-store';
// Register Effects Root
import { SettingsEffects } from '@shared/store/effects/settings.effects';
import { LayoutEffects } from '@shared/store/effects/layout.effects';
import { AppEffects } from '@shared/store/effects/app.effects';
import { AuthEffects } from '@shared/store/effects/auth.effects';
/**
 * Register AppInsights
 */
import { ApplicationInsightsModule, AppInsightsService } from '@markpieszak/ng-application-insights';
import { AppInsights } from '../../environments/appInsight';
// Register Service
import { EventModule } from '@shared/events/event.module';
import { UtilityModule } from '@shared/utilites/utility.module';
import { HttpServiceModule } from '@shared/asyncServices/http';
import { AuthApiClientService } from '@app/auth/auth-api-client.service';

@NgModule({
  imports: [
    EventModule.forRoot(),
    // App custom dependencies
    HttpServiceModule.forRoot(),
    UtilityModule.forRoot(),
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * store, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/store/README.md
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * Register Router state connect
     */
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    /**
     * EffectsModule.forRoot() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/README.md
     */
    EffectsModule.forRoot([SettingsEffects, LayoutEffects, AppEffects, AuthEffects]),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension/
     * Instrumentation must be imported after importing StoreModule (config is optional)
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // register module ServiceWorker
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    // register AppInsights error handler
    ApplicationInsightsModule.forRoot({
      instrumentationKey: AppInsights.instrumentationKey
    }),
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
      intl: { provide: TimeagoIntl, useClass: TimeagoIntl },
    }),
  ],
  providers: [
    Title,
    // register AppInsightsService
    AppInsightsService,
    // services inject
    AuthApiClientService,
    // register RouterStateSerializer custom
    { provide: RouterStateSerializer, useClass: AppCustomSerializer }
  ]
})

export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the RootModule only.`);
    }
  }
}
