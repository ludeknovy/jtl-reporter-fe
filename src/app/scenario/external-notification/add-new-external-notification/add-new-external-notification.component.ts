import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { ScenarioApiService } from "src/app/scenario-api.service";
import { ScenarioService } from "src/app/scenario.service";
import { notificationConfig } from "../notificationConfig";

@Component({
  selector: 'app-add-new-external-notification',
  templateUrl: './add-new-external-notification.component.html',
  styleUrls: ['./add-new-external-notification.component.css']
})
export class AddNewExternalNotificationComponent implements OnInit {
  myform: FormGroup;
  url;
  name;
  channel;
  notificationType;
  modal: NgbActiveModal;
  notificationChannels: string[] = Array.from(notificationConfig.channels.keys());
  notificationTypes: string[] = Array.from(notificationConfig.notificationType.values());
  helpUrl: string;
  @Input() params;
  private DEFAULT_NOTIFICATION_CHANNEL = 0;
  private DEFAULT_NOTIFICATION_TYPE = 0;

  constructor(
    private modalService: NgbModal,
    private notification: NotificationMessage,
    private scenarioApiService: ScenarioApiService,
    private scenarioService: ScenarioService,
  ) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.setHelpUrl(this.notificationChannels[this.DEFAULT_NOTIFICATION_CHANNEL]);
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  createFormControls() {
    this.url = new FormControl("", [
      Validators.maxLength(400),
      Validators.required
    ]);
    this.name = new FormControl("", [
      Validators.maxLength(100),
      Validators.required
    ]);
    this.channel = new FormControl(this.notificationChannels[this.DEFAULT_NOTIFICATION_CHANNEL], [Validators.required]);
    this.notificationType = new FormControl(this.notificationTypes[this.DEFAULT_NOTIFICATION_TYPE], [Validators.required]);
  }

  createForm() {
    this.myform = new FormGroup({
      url: this.url,
      name: this.name,
      channel: this.channel,
      notificationType: this.notificationType,
    });
  }

  changeNotification(e) {
    this.channel?.setValue(e.target.value);
    if (notificationConfig.channels.has(e.target.value)) {
      this.setHelpUrl(e.target.value);
    } else {
      this.helpUrl = null;
    }
  }

  setHelpUrl(channel: string) {
    const notification = notificationConfig.channels.get(channel);
    this.helpUrl = notification.helpUrl;
  }

  onSubmit() {
    this.formCheck();
    if (this.myform.valid) {
      const { projectName, scenarioName } = this.params;
      const { url, channel, notificationType, name } = this.myform.value;
      const channelKey = notificationConfig.channels.get(channel).key;
      const typeKey = Array.from(notificationConfig.notificationType.entries()).find(([key, val]) => val === notificationType)[0];
      const body = {
        name,
        url,
        channel: channelKey,
        type: typeKey
      };

      this.scenarioApiService.createNewScenarioNotification(projectName, scenarioName, body)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.createScenarioNotification(_);
          this.scenarioApiService.setData(message);
          this.scenarioService.fetchScenarioNotifications(projectName, scenarioName);
        });
      this.myform.reset({
        channel: this.notificationChannels[this.DEFAULT_NOTIFICATION_CHANNEL],
        notificationType: this.notificationTypes[this.DEFAULT_NOTIFICATION_TYPE]
      });
      this.setHelpUrl(this.notificationChannels[this.DEFAULT_NOTIFICATION_CHANNEL]);
      this.modal.close();
    }
  }

  formCheck() {
    Object.keys(this.myform.controls).forEach(field => {
      const control = this.myform.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}
