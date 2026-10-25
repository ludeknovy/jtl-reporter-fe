import { Injectable, NgZone } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {

  constructor(private zone: NgZone) { }

  private baseUrl = environment.baseUrl;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      url: `${this.baseUrl}/${request.url}`,
    });

    return new Observable<HttpEvent<any>>(observer => {
      const subscription = next.handle(request).subscribe({
        next: event => this.zone.run(() => observer.next(event)),
        error: error => this.zone.run(() => observer.error(error)),
        complete: () => this.zone.run(() => observer.complete())
      });

      return () => subscription.unsubscribe();
    });
  }
}
