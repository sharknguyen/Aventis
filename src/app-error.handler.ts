import { Logger } from './shared/utilites/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { AppInsightsService } from '@markpieszak/ng-application-insights';

const log = new Logger('AppErrorHandler');

@Injectable({
    providedIn: 'root'
})
export class AppErrorHandler extends ErrorHandler {
    constructor(private appInsightsService: AppInsightsService) {
        super();
    }

    handleError(error) {
        super.handleError(error);
        log.error(`Error occurred: ${error.message}`);
        this.logAppInsights(error);
    }

    private logAppInsights(error: any) {
        if (error instanceof HttpErrorResponse) {
            this.appInsightsService.trackEvent('Track API',
                {
                    'status': error.status.toString(),
                    'statusText': error.statusText,
                    'message': error.message,
                    'name': error.name,
                    'url': error.url
                });
        } else if (error instanceof Error) {
            this.appInsightsService.trackException(error);
        } else {
          log.error('Nobody threw an error but something happened!', error);
        }
    }
}
