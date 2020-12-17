import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppConfigService as ConfigService } from './app-config.service';
import { AppModule } from '@app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@shared/core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { RootComponent } from './root.component';
import { RootRoutingModule } from './root-routing.module';
import { RootSandbox } from './root.sandbox';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

/**
 * Calling functions or calling new is not supported in metadata when using AoT.
 * The work-around is to introduce an exported function.
 *
 * The reason for this limitation is that the AoT compiler needs to generate the code that calls the factory
 * and there is no way to import a lambda from a module, you can only import an exported symbol.
 */
export function configServiceFactory(config: ConfigService) {
  return () => config.load();
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    CoreModule,
    AppModule.forRoot(),
    LayoutContainersModule.forRoot(),
    RootRoutingModule,
    // Third party modules
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    })
  ],
  declarations: [RootComponent],
  providers: [
    RootSandbox,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }
