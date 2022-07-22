import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ExecutionApiService } from "../../../execution-api.service";


@Component({
  selector: "app-start-execution",
  templateUrl: "./start-execution.component.html",
  styleUrls: ["./start-execution.component.css"]
})
export class StartExecutionComponent implements OnInit {

  myform: FormGroup;
  concurrency: FormControl;
  rampup: FormControl;
  duration: FormControl;
  steps: FormControl;
  iterations: FormControl;
  throughput: FormControl;
  @Input() scenarioId: string;

  constructor(
    private modalService: NgbModal,
    private executionApiService: ExecutionApiService
  ) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  createFormControls() {
    this.concurrency = new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.duration = new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.rampup = new FormControl("", [
      Validators.pattern("^[0-9]*$"),
    ]);
    this.steps = new FormControl("", [
      Validators.pattern("^[0-9]*$"),
    ]);
    this.throughput = new FormControl("", [
      Validators.pattern("^[0-9]*$"),
    ]);
    this.iterations = new FormControl("", [
      Validators.pattern("^[0-9]*$"),
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      concurrency: this.concurrency,
      rampup: this.rampup,
      duration: this.duration,
      steps: this.steps,
      throughput: this.throughput,
      iterations: this.iterations
    });
  }

  onSubmit() {
    this.formCheck();
    if (this.myform.valid) {
      const { concurrency, duration } = this.myform.value;
      const body = {
        scenarioId: this.scenarioId,
        executionOptions: {
          concurrency,
          "hold-for": duration
        }
      };

      console.log(body)

      this.executionApiService.startExecution(body)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          // const message = this.notification.newApitokenNotificationMessage(_);
          // this.notificationService.showNotification(message);
          // this.apiTokenService.loadApiKeys();
        });

      this.myform.reset({});
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
