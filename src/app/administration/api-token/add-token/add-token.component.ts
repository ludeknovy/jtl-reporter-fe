import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ApiTokenService } from "src/app/_services/api-token.service";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { NotificationService } from "src/app/_services/notification.service";

@Component({
  selector: "app-add-token",
  templateUrl: "./add-token.component.html",
  styleUrls: ["./add-token.component.css"]
})
export class AddTokenComponent implements OnInit {
  myform: FormGroup;
  description: FormControl;

  constructor(
    private modalService: NgbModal,
    private apiTokenService: ApiTokenService,
    private notification: NotificationMessage,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.description = new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      description: this.description,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { description } = this.myform.value;
      this.apiTokenService.createApiToken({ description })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.newApitokenNotificationMessage(_);
          this.notificationService.showNotification(message);
          this.apiTokenService.loadApiKeys();
        });
      this.myform.reset();
      this.modalService.dismissAll();
    }
  }

}
