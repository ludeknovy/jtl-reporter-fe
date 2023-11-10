import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ScenarioApiService } from "../../../scenario-api.service";
import { ScenarioService } from "../../../scenario.service";
import { NotificationMessage } from "../../../notification/notification-messages";

@Component({
  selector: "app-delete-share-token",
  templateUrl: "./delete-scenario-share-token.component.html",
  styleUrls: ["./delete-scenario-share-token.component.css"]
})
export class DeleteScenarioShareTokenComponent implements OnInit {

  deleteCheck: FormControl;
  deleteScenarioShareTokenForm: FormGroup;
  modal: NgbModalRef;

  @Input() params: { projectName: string, scenarioName: string };
  @Input() tokenId: string;


  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private scenarioService: ScenarioService,
    private notification: NotificationMessage
  ) { }

  ngOnInit(): void {
    this.createFormControls()
    this.createForm()
  }

  createFormControls() {
    this.deleteCheck = new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]);
  }

  createForm() {
    this.deleteScenarioShareTokenForm = new FormGroup({
      deleteCheck: this.deleteCheck,
    });
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    if (this.deleteScenarioShareTokenForm.valid) {
      this.scenarioApiService.deleteScenarioShareToken(
        this.params.projectName,
        this.params.scenarioName,
        this.tokenId
      ).subscribe((_) => {
        this.scenarioService.fetchScenarioShareTokens(this.params.projectName, this.params.scenarioName);
        const message = this.notification.deleteScenarioShareTokenNotification(_);
        this.scenarioApiService.setData(message);
      });

      this.deleteScenarioShareTokenForm.reset();
      this.modal.close();

    }
  }

}
