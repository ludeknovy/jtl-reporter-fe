import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Observable } from 'rxjs';
import { ApiKey } from 'src/app/_services/api-token.model';
import { ApiTokenService } from 'src/app/_services/api-token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.css']
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
