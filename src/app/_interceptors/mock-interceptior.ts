import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';


@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (request.url &&
      request.url.includes(`projects/test-project/scenarios/test-scenario/notification`)) {
      return of(new HttpResponse({ status: 200, body: [] }));
    }
    if (request.url &&
      request.url.includes('projects/test-project/scenarios/test-scenario/items/test-item/share-tokens')) {
      return of(new HttpResponse({ status: 200, body: [] }));
    }
    if (request.url &&
      request.url.includes('api-tokens')) {
      return of(new HttpResponse({ status: 200, body: [] }));
    }
    if (request.url &&
      request.url.includes('projects/test-project/scenarios/test-scenario/items/test-item/custom-chart-settings')) {
      return of(new HttpResponse({ status: 200 }));
    }


    return next.handle(request);
  }
}
