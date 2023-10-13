import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { GlobalSettingsService } from "../../_services/global-settings.service";
import { GlobalSettings } from "../../_services/global-settings.model";
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {NotificationMessage} from '../../notification/notification-messages';

@Component({
  selector: "app-global-settings",
  templateUrl: "./global-settings.component.html",
  styleUrls: ["./global-settings.component.css",  "../administration.css", "../../shared-styles.css"]
})
export class GlobalSettingsComponent implements OnInit {
  globalSettingsForm: FormGroup;

  formControls = {
    projectAutoProvisioning: null
  }

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private notification: NotificationMessage,
  ) {
  }

  ngOnInit(): void {
    this.globalSettingsService.getGlobalSettings().subscribe((body) => {
      this.createFormControls(body);
      this.createForm();
    })

  }

  onSubmit() {
    console.log(this.globalSettingsForm.valid)
    if (this.globalSettingsForm.valid) {
      const { projectAutoProvisioning } = this.globalSettingsForm.value
      this.globalSettingsService.updateGlobalSettings({ projectAutoProvisioning })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.globalSettingsNotification(_);
          this.globalSettingsService.setNotificationMessage(message)
        })
    }
  }

  private createFormControls(settings: GlobalSettings) {
    this.formControls.projectAutoProvisioning = new FormControl(settings.projectAutoProvisioning, []);
  }

  private createForm() {
    this.globalSettingsForm = new FormGroup({
      projectAutoProvisioning: this.formControls.projectAutoProvisioning
    })
  }



}
