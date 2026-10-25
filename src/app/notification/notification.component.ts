import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ItemsApiService } from "../items-api.service";
import { ProjectApiService } from "../project-api.service";
import { ScenarioApiService } from "../scenario-api.service";
import { NotificationService } from "../_services/notification.service";
import { GlobalSettingsService } from "../_services/global-settings.service";
import { ToastService } from "../_services/toast.service";

@Component({
    selector: "app-alert",
    templateUrl: "./notification.component.html",
    standalone: false
})
export class NotificationComponent implements OnInit {
  private _success = new Subject<{ success: boolean, message: string }>();

  constructor(
    private itemsApiService: ItemsApiService,
    private projectService: ProjectApiService,
    private scenarioApiService: ScenarioApiService,
    private notificationService: NotificationService,
    private globalSettingsService: GlobalSettingsService,
    public toastService: ToastService
  ) { }

  message: string;

  ngOnInit(): void {

    this.itemsApiService.response$.subscribe(_ => this.showNotification(_));
    this.projectService.response$.subscribe(_ => this.showNotification(_));
    this.scenarioApiService.response$.subscribe(_ => this.showNotification(_));
    this.notificationService.notificationMessage$.subscribe(_ => this.showNotification(_));
    this.globalSettingsService.notification$.subscribe(_ => this.showNotification(_));


    this._success.subscribe((message) => {
      if (message.success === true) {
        this.toastService.success(message.message);
      } else {
        this.toastService.error(message.message);
      }
    });
  }

  public showNotification(message: { success: boolean, message: string }): void {
    this._success.next(message);
  }
}
