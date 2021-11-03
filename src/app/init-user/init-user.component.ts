import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-init-user',
  templateUrl: './init-user.component.html',
  styleUrls: ['./init-user.component.css']
})
export class InitUserComponent implements OnInit {
  initUserForm: FormGroup;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.initUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.initUserForm.invalid) {
      return;
    }

    this.authenticationService.initUser({
      username: this.initUserForm.controls.username.value,
      password: this.initUserForm.controls.password.value
    })
      .subscribe();
  }

}
