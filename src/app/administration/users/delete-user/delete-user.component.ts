import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/_services/user.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { NotificationService } from "src/app/_services/notification.service";

@Component({
  selector: "app-delete-user",
  templateUrl: "./delete-user.component.html",
  styleUrls: ["./delete-user.component.css", "../../administration.css"]
})



export class DeleteUserComponent implements OnInit {
  @Input() deleteUserInput;
  myform: FormGroup;
  deleteCheck;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private notification: NotificationMessage,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
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

  onSubmit() {
    if (this.myform.valid) {
      this.userService.deleteUser(this.deleteUserInput.userId)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.userDeletedNotificationMessage(_);
          this.userService.loadUsers();
          this.notificationService.showNotification(message);
        });
      this.myform.reset();
      this.modalService.dismissAll();
    }
  }

}
