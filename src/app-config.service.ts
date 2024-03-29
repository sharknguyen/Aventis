import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { Injectable, Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class AppConfigService {

  private config: typeof AppConsts;
  private env: Object;

  constructor(private http: HttpClient) {
  }

  static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
    return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
  }

  /**
  * Loads the environment config file first. Reads the environment variable from the file
  * and based on that loads the appropriate configuration file - development or production
  */
  load() {
    return new Promise((resolve, reject) => {
      const options = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'DataType': 'application/json' }
      };
      this.env = {
        env: environment.env
      };
      this.http.get(`/config/${environment.env}.json`, options)
        .subscribe((data: any) => {
          this.setConfig(data);
          resolve(true);
        }, (err) => this.errorHandler(err));
    });
  }

  private setConfig = (data: any): void => {
    AppConsts.api = data.api;
    this.config = AppConsts;
  }

  private errorHandler(error: HttpErrorResponse) {
    return _throw(error.message || 'Server Error');
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key
   */
  getEnv = (key: any) => {
    return this.env[key];
  }

  /**
   * Returns app configuration value
   *
   */
  getConfig = () => {
    return this.config;
  }
}
