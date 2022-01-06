import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiKey } from "src/app/_services/api-token.model";
import { ApiTokenService } from "src/app/_services/api-token.service";
@Component({
  selector: "app-api-keys",
  templateUrl: "./api-keys.component.html",
  styleUrls: ["./api-keys.component.css", "../administration.css", "../../shared-styles.css"]
})
export class ApiKeysComponent implements OnInit {

  apiKeys$: Observable<ApiKey[]>;


  constructor(
    private apiTokenService: ApiTokenService,
    ) {
    this.apiKeys$ = this.apiTokenService.apiKeys$;

   }

  ngOnInit() {
    this.apiTokenService.loadApiKeys();
  }

}
