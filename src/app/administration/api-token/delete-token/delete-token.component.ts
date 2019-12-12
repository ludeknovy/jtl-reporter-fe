import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiTokenService } from 'src/app/_services/api-token.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationMessage } from 'src/app/notification/notification-messages';

@Component({
  selector: 'app-delete-token',
  templateUrl: './delete-token.component.html',
  styleUrls: ['./delete-token.component.css']
})
export class DeleteTokenComponent implements OnInit {

  @Input() tokenInput;
  myform: FormGroup;
  deleteCheck;

  constructor(
    private modalService: NgbModal,
    private apiTokenService: ApiTokenService,
    private notification: NotificationMessage,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.deleteCheck = new FormControl('', [
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.apiTokenService.deleteApiToken({ id: this.tokenInput })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.deleteApitokenNotificationMessage(_);
          this.apiTokenService.loadApiKeys();
          this.notificationService.showNotification(message);
        });
      this.myform.reset();
      this.modalService.dismissAll();
    }
  }

}
