import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ScenarioService } from "../../../../scenario.service";
import { ScenarioApiService } from "../../../../scenario-api.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationMessage } from "../../../../notification/notification-messages";

@Component({
  selector: "app-add-execution-file",
  templateUrl: "./add-execution-file.component.html",
  styleUrls: ["./add-execution-file.component.css"]
})
export class AddExecutionFileComponent implements OnInit {


  myform: FormGroup;
  executionFile: FormControl;
  @Input() params

  constructor(
    private modalService: NgbModal,
    private scenarioService: ScenarioService,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage,
  ) {

  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.executionFile = new FormControl("", [
      Validators.required
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      executionFile: this.executionFile,
    });
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onFileChange(event, fileType) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.myform.get(fileType).setValue(file);
    }
  }

  onSubmit() {
    this.formCheck();
    if (this.myform.valid) {
      const { executionFile } = this.myform.value;
      console.log(executionFile)
      this.scenarioApiService.uploadExecutionFiles(
        this.params.projectName,
        this.params.scenarioName,
        executionFile
      )
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.uploadExecutionFiles(_);
          this.scenarioApiService.setData(message);
          this.scenarioService.fetchScenarioExecutionFiles(this.params.projectName, this.params.scenarioName);
        });
      this.myform.reset({ });
      this.modalService.dismissAll();
    }
  }

  formCheck() {
    Object.keys(this.myform.controls).forEach(field => {
      const control = this.myform.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}
