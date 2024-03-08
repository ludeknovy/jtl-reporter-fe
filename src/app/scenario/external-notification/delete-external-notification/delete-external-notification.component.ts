import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { ScenarioApiService } from "src/app/scenario-api.service";
import { ScenarioService } from "src/app/scenario.service";

@Component({
  selector: "app-delete-external-notification",
  templateUrl: "./delete-external-notification.component.html",
  styleUrls: ["./delete-external-notification.component.css"]
})
export class DeleteExternalNotificationComponent implements OnInit {

  myform: FormGroup;
  modal: NgbActiveModal;
  @Input() notificationInput: { id: string, name: string };
  @Input() params: { projectName: string, scenarioName: string };

  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage,
    private scenarioService: ScenarioService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.myform = new FormGroup({});
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    console.log("SUBMUTED")
    if (this.myform.valid) {
      const { projectName, scenarioName } = this.params;
      this.scenarioApiService.deleteScenarioNotification(projectName, scenarioName, this.notificationInput.id)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.deleteScenarioNotification(_);
          this.scenarioApiService.setData(message);
          this.scenarioService.fetchScenarioNotifications(projectName, scenarioName);
        });
      this.myform.reset();
      this.modal.close();
    }
  }


}
