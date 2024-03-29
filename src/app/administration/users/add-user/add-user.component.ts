import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/_services/user.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationService } from "src/app/_services/notification.service";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { UserRole } from "src/app/_services/users.model";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {

  myform: FormGroup;
  username: FormControl;
  password: FormControl;
  role: FormControl;
  roles = Object.values(UserRole);
  DEFAULT_ROLE = UserRole.Operator;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private notificationService: NotificationService,
    private notification: NotificationMessage
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.username = new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^[0-9a-zA-Z.]+$")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.role = new FormControl(this.DEFAULT_ROLE, [
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      username: this.username,
      password: this.password,
      role: this.role,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    this.formCheck()
    if (this.myform.valid) {
      const { username, password, role } = this.myform.value;
      this.userService.createNewUser({ username, password, role })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.userCreatedNotificationMessage(_);
          this.userService.loadUsers();
          this.notificationService.showNotification(message);
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
