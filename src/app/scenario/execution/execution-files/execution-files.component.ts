import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-execution-files",
  templateUrl: "./execution-files.component.html",
  styleUrls: ["./execution-files.component.css"]
})
export class ExecutionFilesComponent implements OnInit {

  myform: FormGroup;
  jmxFile: FormControl;


  constructor(
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.jmxFile = new FormControl("", [
      Validators.required
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      kpiFile: this.jmxFile,
    });
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onFileChange(event, fileType) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myform.get(fileType).setValue(file);
    }
  }

  onSubmit() {
    this.formCheck();
    if (this.myform.valid) {
      // this.spinner.show();
      const { jmxFile } = this.myform.value;
      // this.itemsApiService.addNewTestItem(
      //   this.routeParams.projectName,
      //   this.routeParams.scenarioName,
      //   environment, note, hostname, ItemStatusValue[status],
      //   kpiFile, name, errorFile, monitoringFile)
      //   .pipe(catchError(r => of(r)))
      //   .subscribe(_ => {
      //     const message = this.notification.newTestItemNotificationMessage(_);
      //     this.itemService.fetchProcessingItems(this.routeParams.projectName, this.routeParams.scenarioName);
      //     this.scenarioService.fetchScenarioTrends(this.routeParams.projectName, this.routeParams.scenarioName);
      //     this.spinner.hide();
      //     return this.itemsApiService.setData(message);
      //   });
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
