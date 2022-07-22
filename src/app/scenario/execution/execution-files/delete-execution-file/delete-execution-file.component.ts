import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ScenarioApiService } from "../../../../scenario-api.service";
import { NotificationMessage } from "../../../../notification/notification-messages";
import { ProjectService } from "../../../../project.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ScenarioService } from "../../../../scenario.service";

@Component({
  selector: "app-delete-execution-file",
  templateUrl: "./delete-execution-file.component.html",
  styleUrls: ["./delete-execution-file.component.css"]
})
export class DeleteExecutionFileComponent implements OnInit {

  myform: FormGroup;
  modal: NgbActiveModal;
  @Input() file: { id: string, filename: string };
  @Input() params: { projectName: string, scenarioName: string };

  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage,
    private scenarioService: ScenarioService
  ) {
  }

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
    if (this.myform.valid) {
      const { projectName, scenarioName } = this.params;
      this.scenarioApiService.deleteExecutionFile(projectName, scenarioName, this.file.id)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.deleteExecutionFile(_);
          this.scenarioApiService.setData(message);
          this.scenarioService.fetchScenarioExecutionFiles(projectName, scenarioName);
        });
      this.myform.reset();
      this.modal.close();
    }
  }
}
