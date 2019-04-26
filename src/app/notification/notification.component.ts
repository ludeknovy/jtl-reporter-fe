import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemsApiService } from '../items-api.service';
import { ProjectApiService } from '../project-api.service';
import { ScenarioApiService } from '../scenario-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alert',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  private _success = new Subject<{ success: boolean, message: string }>();

  constructor(
    private itemsApiService: ItemsApiService,
    private projectService: ProjectApiService,
    private scenarioApiService: ScenarioApiService,
    private toastr: ToastrService
  ) { }

  message: string;

  ngOnInit(): void {

    this.itemsApiService.response$.subscribe(_ => this.showNotification(_));
    this.projectService.response$.subscribe(_ => this.showNotification(_));
    this.scenarioApiService.response$.subscribe(_ => this.showNotification(_));


    this._success.subscribe((message) => {
      if (message.success === true) {
        this.toastr.success(message.message);
      } else {
        this.toastr.error(message.message);
      }
    });
  }

  public showNotification(message) {
    this._success.next(message);
  }
}
