import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectApiService } from "src/app/project-api.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { ProjectService } from "src/app/project.service";

@Component({
  selector: "app-delete-project",
  templateUrl: "./delete-project.component.html",
  styleUrls: ["./delete-project.component.css"]
})
export class DeleteProjectComponent implements OnInit {

  myform: FormGroup;
  deleteCheck;

  @Input() projectData: any;

  constructor(
    private modalService: NgbModal,
    private projectApiService: ProjectApiService,
    private notification: NotificationMessage,
    private projectService: ProjectService
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
      this.projectApiService.deleteProject(this.projectData.projectName)
      .pipe(catchError(r => of(r)))
      .subscribe(_ => {
        const message = this.notification.deleteProjectNotification(_);
        this.projectService.loadProjects();
        return this.projectApiService.setData(message);
      });
      this.myform.reset();
      this.modalService.dismissAll();
    }
  }


}
