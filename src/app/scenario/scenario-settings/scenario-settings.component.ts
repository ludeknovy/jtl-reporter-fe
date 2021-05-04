import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ScenarioApiService } from 'src/app/scenario-api.service';

@Component({
  selector: 'app-scenario-settings',
  templateUrl: './scenario-settings.component.html',
  styleUrls: ['./scenario-settings.component.css'],
})

export class SettingsScenarioComponent implements OnInit {

  @Output() scenarioNameChangeEvent = new EventEmitter<string>();

  scenarioSettingsForm: FormGroup;
  formControls = {
    scenarioName: null,
    analysisEnabled: null,
    percentile: null,
    errorRate: null,
    throughput: null,
    enabled: null,
  };

  params;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(_ => this.params = _);
    this.scenarioApiService.getScenario(this.params.projectName, this.params.scenarioName).subscribe(_ => {
      if (_.name) {
        this.createFormControls(_);
        this.createForm();
      }
    });
  }

  createFormControls(settings) {
    this.formControls.scenarioName = new FormControl(settings.name, [
      Validators.maxLength(100)
    ]);
    this.formControls.percentile = new FormControl(settings.thresholds.percentile, [
      Validators.min(0),
      Validators.max(100),
      Validators.required,
    ]);
    this.formControls.throughput = new FormControl(settings.thresholds.throughput, [
      Validators.min(0),
      Validators.max(100),
      Validators.required,
    ]);
    this.formControls.errorRate = new FormControl(settings.thresholds.errorRate, [
      Validators.min(0),
      Validators.max(100),
      Validators.required
    ]);
    this.formControls.enabled = new FormControl(settings.thresholds.enabled, [
      Validators.required,
    ]);
    this.formControls.analysisEnabled = new FormControl(settings.analysisEnabled, [
      Validators.required
    ]);
  }

  createForm() {
    this.scenarioSettingsForm = new FormGroup({
      scenarioName: this.formControls.scenarioName,
      analysisEnabled: this.formControls.analysisEnabled,
      thresholdPercentile: this.formControls.percentile,
      thresholdEnabled: this.formControls.enabled,
      thresholdThroughput: this.formControls.throughput,
      thresholdErrorRate: this.formControls.errorRate
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  onSubmit() {
    if (this.scenarioSettingsForm.valid) {

      const {
        scenarioName, analysisEnabled,
        thresholdEnabled, thresholdErrorRate,
        thresholdPercentile, thresholdThroughput } = this.scenarioSettingsForm.value;
      const { projectName, scenarioName: currentScenarioName } = this.params;

      const body = {
        scenarioName,
        analysisEnabled,
        thresholds: {
          enabled: thresholdEnabled,
          errorRate:  parseFloat(thresholdErrorRate),
          throughput: parseFloat(thresholdThroughput),
          percentile:  parseFloat(thresholdPercentile)
        }
      };

      this.scenarioApiService.updateScenario(projectName, currentScenarioName, body)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.scenarioUpdate(_);
          return this.scenarioApiService.setData(message);
        });
      this.modalService.dismissAll();

      if (this.scenarioNameChanged) {
        this.scenarioNameChangeEvent.emit(scenarioName);
      }
    }
  }

  private scenarioNameChanged(name): boolean {
    return name === this.params.scenarioName;
  }

}

