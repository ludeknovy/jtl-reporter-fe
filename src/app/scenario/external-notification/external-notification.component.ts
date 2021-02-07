import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ScenarioApiService} from '../../scenario-api.service';
import {ScenarioNotifications} from '../../items.service.model';

@Component({
  selector: 'app-external-notification',
  templateUrl: './external-notification.component.html',
  styleUrls: ['./external-notification.component.css']
})
export class ExternalNotificationComponent implements OnInit {

  myform: FormGroup;
  scenarioName;
  params;
  notifications: ScenarioNotifications[] = null;


  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(_ => this.params = _);
    this.createFormControls();
    this.createForm();
    this.scenarioApiService.fetchScenarioNotification(this.params.projectName, this.params.scenarioName)
      .subscribe(_ => this.notifications = _);
  }

  createFormControls() {
    this.scenarioName = new FormControl('', [
      Validators.maxLength(100)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      scenarioName: this.scenarioName,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

}
