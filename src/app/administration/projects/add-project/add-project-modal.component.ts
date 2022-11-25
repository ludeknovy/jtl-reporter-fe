import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ProjectApiService } from "../../../project-api.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationMessage } from "../../../notification/notification-messages";
import { ProjectService } from "../../../project.service";
import { UserService } from "../../../_services/user.service";
import { UserRole, Users } from "../../../_services/users.model";

@Component({
  styleUrls: ["./add-project-modal.component.css"],
  selector: "app-add-project",
  templateUrl: "./add-project-modal.component.html",
})
export class AddNewProjectComponent implements OnInit {
  myform: FormGroup;
  projectName: FormControl;
  projectMembers: FormArray;
  users: Users[];

  @Input() topMenu: boolean;


  constructor(
    private modalService: NgbModal,
    private projectApiService: ProjectApiService,
    private projectService: ProjectService,
    private notification: NotificationMessage,
    private userService: UserService
  ) { }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    const { role } = JSON.parse(localStorage.getItem("currentUser"));
    if (role === UserRole.Admin) {
      this.userService.fetchUsers().subscribe(data => {
        this.users = data.filter(user => user.role != "admin")
        this.addCheckboxes()
      });
    }

  }

  get usersFormArray() {
    return this.myform.controls.projectMembers as FormArray;
  }

  createFormControls() {
    this.projectName = new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
    this.projectMembers = new FormArray([])
  }

  createForm() {
    this.myform = new FormGroup({
      projectName: this.projectName,
      projectMembers: this.projectMembers
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    this.formCheck()
    if (this.myform.valid) {
      const projectMembers = this.myform.value.projectMembers
        .map((v, i) => v ? this.users[i].id : null)
        .filter(v => v !== null);

      const { projectName } = this.myform.value;
      this.projectApiService.createNewProject({ projectName, projectMembers })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.newProjectNotificationMessage(_);
          this.projectService.loadProjects();
          return this.projectApiService.setData(message);
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

  private addCheckboxes() {
    this.users.forEach(() => this.usersFormArray.push(new FormControl(false)));
  }
}
