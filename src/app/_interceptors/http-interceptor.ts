import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectApiService } from "../project-api.service";
import { environment } from "src/environments/environment";

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {

  constructor(public projectService: ProjectApiService) { }

  private baseUrl = environment.baseUrl;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      url: `${this.baseUrl}/${request.url}`,
    });

    return next.handle(request);
  }
}
