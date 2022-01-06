import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { ProjectService } from "src/app/project.service";
import { ItemsApiService } from "src/app/items-api.service";
import { Router } from "@angular/router";
import { ScenarioApiService } from "src/app/scenario-api.service";

@Component({
  selector: "app-delete-scenario",
  templateUrl: "./delete-scenario.component.html",
  styleUrls: ["./delete-scenario.component.css"]
})
export class DeleteScenarioComponent implements OnInit {

  myform: FormGroup;
  deleteCheck;

  @Input() scenarioData: any;

  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage,
    private projectService: ProjectService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.deleteCheck = new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      deleteCheck: this.deleteCheck,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.scenarioApiService.deleteScenario(this.scenarioData.projectName, this.scenarioData.scenarioName)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.deleteScenario(_);
          this.scenarioApiService.setData(message);
          if (_.status >= 200 && _.status < 300) {
            this.redirect();
          }
        });
      this.myform.reset();
      this.modalService.dismissAll();
    }
  }

  private redirect() {
    this.router.navigate([`./project/${this.scenarioData.projectName}/scenarios`]);
  }


}
