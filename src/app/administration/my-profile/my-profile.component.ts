import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css', '../administration.css', '../../shared-styles.css']
})
export class MyProfileComponent implements OnInit {
  myform: FormGroup;
  currentPassword;
  newPassword
  apiTokenService: any;
  tokenInput: any;


  constructor(
    private notification: NotificationMessage,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.currentPassword = new FormControl('', [Validators.required]);
    this.newPassword = new FormControl('', [Validators.required, Validators.minLength(8)])
  }

  createForm() {
    this.myform = new FormGroup({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { newPassword, currentPassword } = this.myform.value;
      this.authenticationService.changePassword({ newPassword, currentPassword })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.userCreatedNotificationMessage(_);
          this.notificationService.showNotification(message);
        });
      this.myform.reset();
    }
  }


}
