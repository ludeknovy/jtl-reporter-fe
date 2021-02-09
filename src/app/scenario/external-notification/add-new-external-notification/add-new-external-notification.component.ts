import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ScenarioApiService } from 'src/app/scenario-api.service';
import { ScenarioService } from 'src/app/scenario.service';

@Component({
  selector: 'app-add-new-external-notification',
  templateUrl: './add-new-external-notification.component.html',
  styleUrls: ['./add-new-external-notification.component.css']
})
export class AddNewExternalNotificationComponent implements OnInit {

  myform: FormGroup;
  url;
  name;
  modal: NgbActiveModal;
  @Input() params;

  constructor(
    private modalService: NgbModal,
    private notification: NotificationMessage,
    private scenarioApiService: ScenarioApiService,
    private scenarioService: ScenarioService,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  createFormControls() {
    this.url = new FormControl('', [
      Validators.maxLength(400),
      Validators.required
    ]);
    this.name = new FormControl('', [
      Validators.maxLength(100),
      Validators.required
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      url: this.url,
      name: this.name
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { projectName, scenarioName } = this.params;
      const body = {
        ...this.myform.value,
        type: 'ms-teams'
      };

      this.scenarioApiService.createNewScenarioNotification(projectName, scenarioName, body)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.createScenarioNotification(_);
          this.scenarioApiService.setData(message);
          this.scenarioService.fetchScenarioNotifications(projectName, scenarioName);
        });
      this.myform.reset();
      this.modal.close();
    }
  }

}
