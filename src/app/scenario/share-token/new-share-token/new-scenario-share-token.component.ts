import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError } from "rxjs/internal/operators/catchError";
import { of } from "rxjs";
import { NotificationMessage } from "../../../notification/notification-messages";
import { ScenarioApiService } from "../../../scenario-api.service";
import { ScenarioService } from "../../../scenario.service";

@Component({
  selector: "app-new-share-token",
  templateUrl: "./new-scenario-share-token.component.html",
  styleUrls: ["./new-scenario-share-token.component.css"]
})
export class NewScenarioShareTokenComponent implements OnInit {

  private note: FormControl;
  private newScenarioShareTokenForm: FormGroup;
  modal: NgbActiveModal;
  @Input() params: { projectName: string, scenarioName: string };

  constructor(
    private modalService: NgbModal,
    private notification: NotificationMessage,
    private scenarioApiService: ScenarioApiService,
    private scenarioService: ScenarioService
  ) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  createFormControls() {
    this.note = new FormControl("", [
      Validators.maxLength(100),
      Validators.required
    ]);
  }

  createForm() {
    this.newScenarioShareTokenForm = new FormGroup({
      note: this.note
    });
  }

  onSubmit() {
    const { note } = this.newScenarioShareTokenForm.value;
    const { projectName, scenarioName } = this.params;
    console.log(note)

    this.scenarioApiService.createScenarioShareToken(projectName, scenarioName, { note })
      .pipe(catchError(r => of(r)))
      .subscribe(_ => {
        const message = this.notification.createScenarioShareToken(_);
        this.scenarioApiService.setData(message);
        this.scenarioService.fetchScenarioShareTokens(projectName, scenarioName);
      });
    this.newScenarioShareTokenForm.reset();
    this.modal.close();
  }

}
