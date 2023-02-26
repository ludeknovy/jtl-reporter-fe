import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ScenarioApiService } from "../../../scenario-api.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationMessage } from "../../../notification/notification-messages";
import { ScenarioService } from "../../../scenario.service";

@Component({
  selector: "app-scenario-trends-settings",
  templateUrl: "./scenario-trends-settings.component.html",
  styleUrls: ["./scenario-trends-settings.component.css"]
})
export class ScenarioTrendsSettingsComponent implements OnInit {

  @Input() userSettings;
  @Input() params;

  scenarioTrendsSettingsForm: FormGroup;

  formControls = {
    aggregatedTrends: null,
    errorRate: null,
    percentile90: null,
    throughput: null,
  };

  metricsEditable;

  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private scenarioService: ScenarioService,
    private notification: NotificationMessage,
  ) {
  }

  ngOnInit(): void {
    this.createFormControls(this.userSettings);
    this.createForm();
  }

  createFormControls(settings) {
    this.formControls.aggregatedTrends = new FormControl(settings.aggregatedTrends.toString(), [
      Validators.required
    ]);
    this.formControls.percentile90 = new FormControl(settings.labelMetrics.percentile90 || false, [
      Validators.required
    ])
    this.formControls.errorRate = new FormControl(settings.labelMetrics.errorRate || false, [
      Validators.required
    ])
    this.formControls.throughput = new FormControl(settings.labelMetrics.throughput || false, [
      Validators.required
    ])
  }

  createForm() {
    this.scenarioTrendsSettingsForm = new FormGroup({
      aggregatedTrends: this.formControls.aggregatedTrends,
      percentile90: this.formControls.percentile90,
      errorRate: this.formControls.errorRate,
      throughput: this.formControls.throughput,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
  }

  onCheckboxChange() {
    this.isEditable();
  }

  isEditable() {
    const enabledMetrics = Object.values([this.formControls.errorRate, this.formControls.percentile90,
      this.formControls.throughput])
      .map(control => control.value).filter(value => value === true);
    this.metricsEditable = enabledMetrics.length > 2;
  }

  onSubmit() {
    if (this.scenarioTrendsSettingsForm.valid) {
      const { scenarioName, projectName } = this.params
      const body = {
        aggregatedTrends: this.scenarioTrendsSettingsForm.value.aggregatedTrends === "true",
        labelMetrics: {
          errorRate: this.scenarioTrendsSettingsForm.value.errorRate,
          percentile90: this.scenarioTrendsSettingsForm.value.percentile90,
          throughput: this.scenarioTrendsSettingsForm.value.throughput,
        }
      }
      this.scenarioApiService.updateScenarioTrendsSettings(projectName, scenarioName, body)
        .pipe(catchError(r => of(r)))
        .subscribe(subscription => {
          const message = this.notification.scenarioTrendsSettingsNotification(subscription);
          this.scenarioApiService.setData(message)
          this.scenarioService.updateScenarioTrends({ userSettings: body })
        })
      this.modalService.dismissAll()

    }
  }

}
