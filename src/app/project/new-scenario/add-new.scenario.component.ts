import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProjectService } from "src/app/project.service";
import { ScenarioApiService } from "src/app/scenario-api.service";

@Component({
  selector: "app-add-new-scenario",
  templateUrl: "./add-new-scenario.component.html",
  styleUrls: ["./add-new-scenario.component.css"]
})
export class AddNewScenarioComponent implements OnInit {

  @Input() projectName: string;
  myform: FormGroup;
  scenarioName: FormControl;

  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private projectService: ProjectService,
    private notification: NotificationMessage
  ) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.scenarioName = new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      scenarioName: this.scenarioName,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    this.formCheck();
    if (this.myform.valid) {
      const { scenarioName } = this.myform.value;
      this.scenarioApiService.createNewScenario(this.projectName, { scenarioName })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.newProjectNotificationMessage(_);
          this.projectService.fetchScenarios(this.projectName);
          return this.scenarioApiService.setData(message);
        });
      this.myform.reset();
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
