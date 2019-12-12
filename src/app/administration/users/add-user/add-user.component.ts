import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/_services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationMessage } from 'src/app/notification/notification-messages';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  myform: FormGroup;
  username: FormControl;
  password: FormControl;

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
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[0-9a-zA-Z.]+$')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { username, password } = this.myform.value;
      this.userService.createNewUser({ username, password })
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

}
