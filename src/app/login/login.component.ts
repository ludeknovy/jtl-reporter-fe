import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { first } from "rxjs/operators";
import { InitService } from "../_services/init.service";
import { NotificationService } from "../_services/notification.service";
import { NotificationMessage } from "../notification/notification-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  initLoaded = false;
  submitted = false;
  returnUrl: string;
  error = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private initService: InitService,
    private notification: NotificationMessage,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // slow down to give top panel time to disappear
    new Promise(resolve => setTimeout(resolve, 0)).then();
    this.initService.fetchInfo()
      .subscribe((res) => {
        if (res?.body?.initialized === false) {
          this.router.navigate(["init"]);
        }
        this.initLoaded = true;
      }, (res) => {
        const message = this.notification.appInitialization(res);
        this.notificationService.showNotification(message);

      });


    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
