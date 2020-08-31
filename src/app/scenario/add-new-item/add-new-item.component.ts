import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsApiService } from '../../items-api.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationMessage } from '../../notification/notification-messages';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemsService } from 'src/app/items.service';
import { ProjectService } from 'src/app/project.service';
import { ItemStatus } from './add-new-item.model';
import { ItemStatusValue } from 'src/app/item-detail/item-detail.model';
import { ScenarioService } from 'src/app/scenario.service';

@Component({
  selector: 'app-add-new-item-modal',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css'],

})
export class AddNewItemComponent implements OnInit {
  closeResult: string;
  myform: FormGroup;
  kpiFile: FormControl;
  errorFile: FormControl;
  monitoringFile: FormControl;
  environment: FormControl;
  note: FormControl;
  status: FormControl;
  hostname: FormControl;
  routeParams;
  statuses = Object.values(ItemStatus);
  DEFAULT_STATUS = ItemStatus.None;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private itemsApiService: ItemsApiService,
    private itemService: ItemsService,
    private scenarioService: ScenarioService,
    private notification: NotificationMessage,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit() {
    this.route.params.subscribe(_ => this.routeParams = _);
    console.log(this.routeParams)
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.kpiFile = new FormControl('', [
      Validators.required
    ]);
    this.errorFile = new FormControl('', []);
    this.monitoringFile = new FormControl('', []);
    this.environment = new FormControl('', [
      Validators.required,
      Validators.maxLength(150)
    ]);
    this.note = new FormControl('', [
      Validators.maxLength(150)
    ]);
    this.hostname = new FormControl('', [
      Validators.maxLength(200)
    ]);
    this.status = new FormControl(this.DEFAULT_STATUS, [
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      kpiFile: this.kpiFile,
      errorFile: this.errorFile,
      monitoringFile: this.monitoringFile,
      environment: this.environment,
      note: this.note,
      hostname: this.hostname,
      status: this.status
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onFileChange(event, fileType) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myform.get(fileType).setValue(file);
    }
  }

  onSubmit() {
    this.formCheck();
    if (this.myform.valid) {
      this.spinner.show();
      const { kpiFile, errorFile, monitoringFile, environment, note, hostname, status } = this.myform.value;
      this.itemsApiService.addNewTestItem(
        this.routeParams.projectName,
        this.routeParams.scenarioName,
        environment, note, hostname, ItemStatusValue[status],
        kpiFile, errorFile, monitoringFile)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.newTestItemNotificationMessage(_);
          this.itemService.fetchProcessingItems(this.routeParams.projectName, this.routeParams.scenarioName);
          this.scenarioService.fetchScenarioTrends(this.routeParams.projectName, this.routeParams.scenarioName);
          this.spinner.hide();
          return this.itemsApiService.setData(message);
        });
      this.myform.reset({ environment: '', status: this.DEFAULT_STATUS, note: '', hostname: '' });
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
