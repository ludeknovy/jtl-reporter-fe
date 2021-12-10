import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {ProjectApiService} from '../../project-api.service';
import {NotificationMessage} from '../../notification/notification-messages';
import {ProjectService} from '../../project.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  projectSettingsForm: FormGroup;
  metricsEditable;
  formControls = {
    virtualUsers: null,
    throughput: null,
    percentile: null,
    avgResponseTime: null,
    avgConnectionTime: null,
    avgLatency: null,
    errorRate: null,
    network: null,
    projectName: null,
  };
  @Input() projectName: string;

  constructor(
    private modalService: NgbModal,
    private projectApiService: ProjectApiService,
    private notification: NotificationMessage,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
    this.projectApiService.getProject(this.projectName).subscribe((r) => {
      this.createFormControls(r.body);
      this.createForm();
      this.isEditable();
    });
  }

  createFormControls(settings) {
    this.formControls.virtualUsers = new FormControl(settings.topMetricsSettings.virtualUsers, []);
    this.formControls.percentile = new FormControl(settings.topMetricsSettings.percentile, []);
    this.formControls.throughput = new FormControl(settings.topMetricsSettings.throughput, []);
    this.formControls.errorRate = new FormControl(settings.topMetricsSettings.errorRate, []);
    this.formControls.network = new FormControl(settings.topMetricsSettings.network, []);
    this.formControls.avgLatency = new FormControl(settings.topMetricsSettings.avgLatency, []);
    this.formControls.avgConnectionTime = new FormControl(settings.topMetricsSettings.avgConnectionTime, []);
    this.formControls.avgResponseTime = new FormControl(settings.topMetricsSettings.avgResponseTime, []);
    this.formControls.projectName = new FormControl(settings.projectName, [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(3),
    ]);

  }

  createForm() {
    this.projectSettingsForm = new FormGroup({
      virtualUsers: this.formControls.virtualUsers,
      errorRate: this.formControls.errorRate,
      percentile: this.formControls.percentile,
      throughput: this.formControls.throughput,
      network: this.formControls.network,
      avgLatency: this.formControls.avgLatency,
      avgConnectionTime: this.formControls.avgConnectionTime,
      avgResponseTime: this.formControls.avgResponseTime,
      projectName: this.formControls.projectName,
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  onSubmit() {
    const payload = {
      projectName: this.formControls.projectName.value,
      topMetricsSettings: {
        virtualUsers: this.formControls.virtualUsers.value,
        errorRate: this.formControls.errorRate.value,
        percentile: this.formControls.percentile.value,
        throughput: this.formControls.throughput.value,
        network: this.formControls.network.value,
        avgLatency: this.formControls.avgLatency.value,
        avgResponseTime: this.formControls.avgResponseTime.value,
        avgConnectionTime: this.formControls.avgConnectionTime.value
      }
    };
    if (this.projectSettingsForm.valid) {
      this.projectApiService.updateProject(this.projectName, payload)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.projectUpdate(_);
          this.projectService.loadProjects();
          return this.projectApiService.setData(message);
        });
      this.modalService.dismissAll();
    }
  }

  isEditable() {
    const enabledMetrics = Object.values(this.formControls).map(control => control.value).filter(value => value === true);
    this.metricsEditable = enabledMetrics.length > 5;
    console.log(this.metricsEditable);
  }

  onCheckboxChange() {
    this.isEditable();
  }

}
