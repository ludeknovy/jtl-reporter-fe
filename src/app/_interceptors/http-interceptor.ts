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
  private baseUrlExecutor = environment.baseUrlExecutor

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestUrl = request.url;

    if (requestUrl.indexOf("@executor-api") !== -1) {
      requestUrl = requestUrl.replace("@executor-api", this.baseUrlExecutor);
    } else {
      requestUrl = `${this.baseUrl}/${request.url}`
    }


    request = request.clone({
      url: requestUrl,
    });

    return next.handle(request);
  }
}
