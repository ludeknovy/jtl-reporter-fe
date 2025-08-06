import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { combineLatest, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { ScenarioApiService } from "src/app/scenario-api.service";

@Component({
  selector: 'app-scenario-settings',
  templateUrl: './scenario-settings.component.html',
  styleUrls: ['./scenario-settings.component.css'],
})

export class SettingsScenarioComponent implements OnInit {

  @Output() scenarioNameChangeEvent = new EventEmitter<string>();

  scenarioSettingsForm: FormGroup;
  labelTrendChartSettingsForm: FormGroup;
  requestStatsSettingsForm: FormGroup;
  labelFiltersForm: FormGroup;
  apdexSettingsForm: FormGroup;

  formControls = {
    scenarioName: null,
    analysisEnabled: null,
    percentile: null,
    errorRate: null,
    throughput: null,
    enabled: null,
    zeroErrorToleranceEnabled: null,
    minTestDuration: null,
    deleteSamples: null,
    keepTestRunsPeriod: null,
    generateShareToken: null,
    term: null,
    operator: null,
    extraAggregations: null
  };
  labelTrendChartControls = {
    virtualUsers: null,
    throughput: null,
    p90: null,
    p95: null,
    p99: null,
    avgResponseTime: null,
    avgConnectionTime: null,
    avgLatency: null,
    errorRate: null,
    failures: null,
  };
  requestStatsCormControls = {
    samples: null,
    avg: null,
    min: null,
    max: null,
    p50: null,
    p90: null,
    p95: null,
    p99: null,
    throughput: null,
    network: null,
    errorRate: null,
    apdex: null,
    standardDeviation: null,
    failures: null
  };
  apdexFormControls = {
    apdexEnabled: null,
    satisfyingThreshold: null,
    toleratingThreshold: null
  };
  params;
  keepTestRunPeriods = [
    {
      period: 0,
      description: "forever",
    },
    {
      period: 7,
      description: "7 days",
    },
    {
      period: 14,
      description: "14 days"
    },
    {
      period: 30,
      description: "30 days",
    },
    {
      period: 90,
      description: "90 days"
    },
    {
      period: 180,
      description: "180 days",
    }
  ];

  labelFiltersData = [{ term: "my label", operator: "includes" }, { term: "test", operator: "match" }];


  labelFilterOperators = ["includes", "match"];
  labelFilters: FormArray;
  hasBaselineReport = false;


  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(_ => this.params = _);
    combineLatest([
      this.route.params,
      this.scenarioApiService.getScenario(this.params.projectName, this.params.scenarioName),
      this.scenarioApiService.getScenarioUserSettings(this.params.projectName, this.params.scenarioName)
    ]).subscribe(([params, scenario, userSettings]) => {
      this.params = params;
      this.hasBaselineReport = !!scenario.baselineReport;
      if (scenario.name) {
        this.createFormControls(scenario, userSettings);
        this.createForm();
        this.labelFilters = new FormArray(
          scenario.labelFilterSettings.map(filter => new FormArray([new FormControl(filter.labelTerm, Validators.required), new FormControl(filter.operator, Validators.required)])));
      }


      this.apdexSettingsForm.valueChanges.subscribe(value => {
        const { satisfyingThreshold, toleratingThreshold } = value;
        if (satisfyingThreshold && toleratingThreshold) {
          if (Number(satisfyingThreshold) > Number(toleratingThreshold)) {
            this.apdexSettingsForm.get("satisfyingThreshold").setErrors({
              "minIsGreaterThanMax": true
            });
            this.apdexSettingsForm.get("toleratingThreshold").setErrors({
              "maxIsLowerThenMin": true,
            });
          } else {
            this.apdexSettingsForm.get("satisfyingThreshold").updateValueAndValidity({ onlySelf: true });
            this.apdexSettingsForm.get("toleratingThreshold").updateValueAndValidity({ onlySelf: true });
          }
        }
      });

    });


  }

  createFormControls(settings, userSettings) {
    this.formControls.scenarioName = new FormControl(settings.name, [
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.required
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
    this.formControls.enabled = new FormControl({ value: settings.thresholds.enabled, disabled: !this.hasBaselineReport }, [
      Validators.required,
    ]);
    this.formControls.analysisEnabled = new FormControl(settings.analysisEnabled, [
      Validators.required
    ]);
    this.formControls.zeroErrorToleranceEnabled = new FormControl(settings.zeroErrorToleranceEnabled, [
      Validators.min(0),
      Validators.max(1000),
      Validators.required
    ]);
    this.formControls.minTestDuration = new FormControl(settings.minTestDuration, [
      Validators.required,
      Validators.min(0),
      Validators.max(1000),
    ]);

    this.formControls.deleteSamples = new FormControl(settings.deleteSamples, [
      Validators.required
    ]);
    this.formControls.keepTestRunsPeriod = new FormControl(settings.keepTestRunsPeriod, [
      Validators.required
    ]);
    this.formControls.generateShareToken = new FormControl(settings.generateShareToken, [
      Validators.required
    ]);
    this.formControls.extraAggregations = new FormControl(settings.extraAggregations, [
      Validators.required
    ]);

    this.labelTrendChartControls.virtualUsers = new FormControl(settings.labelTrendChartSettings?.virtualUsers, []);
    this.labelTrendChartControls.throughput = new FormControl(settings.labelTrendChartSettings?.throughput, []);
    this.labelTrendChartControls.avgConnectionTime = new FormControl(settings.labelTrendChartSettings?.avgConnectionTime, []);
    this.labelTrendChartControls.avgLatency = new FormControl(settings.labelTrendChartSettings?.avgLatency, []);
    this.labelTrendChartControls.avgResponseTime = new FormControl(settings.labelTrendChartSettings?.avgResponseTime, []);
    this.labelTrendChartControls.p90 = new FormControl(settings.labelTrendChartSettings?.p90, []);
    this.labelTrendChartControls.p95 = new FormControl(settings.labelTrendChartSettings?.p95, []);
    this.labelTrendChartControls.p99 = new FormControl(settings.labelTrendChartSettings?.p99, []);
    this.labelTrendChartControls.errorRate = new FormControl(settings.labelTrendChartSettings?.errorRate, []);
    this.labelTrendChartControls.failures = new FormControl(settings.labelTrendChartSettings?.failures, []);


    this.requestStatsCormControls.samples = new FormControl(userSettings.samples, [Validators.required]);
    this.requestStatsCormControls.avg = new FormControl(userSettings.avg, [Validators.required]);
    this.requestStatsCormControls.standardDeviation = new FormControl(userSettings.standardDeviation || true, [Validators.required]);
    this.requestStatsCormControls.min = new FormControl(userSettings.min, [Validators.required]);
    this.requestStatsCormControls.max = new FormControl(userSettings.max, [Validators.required]);
    this.requestStatsCormControls.p50 = new FormControl(userSettings.p50 || false, [Validators.required]);
    this.requestStatsCormControls.p90 = new FormControl(userSettings.p90, [Validators.required]);
    this.requestStatsCormControls.p95 = new FormControl(userSettings.p95, [Validators.required]);
    this.requestStatsCormControls.p99 = new FormControl(userSettings.p99, [Validators.required]);
    this.requestStatsCormControls.throughput = new FormControl(userSettings.throughput, [Validators.required]);
    this.requestStatsCormControls.network = new FormControl(userSettings.network, [Validators.required]);
    this.requestStatsCormControls.errorRate = new FormControl(userSettings.errorRate, [Validators.required]);
    this.requestStatsCormControls.failures = new FormControl(userSettings.failures || false, [Validators.required]);
    this.requestStatsCormControls.apdex = new FormControl(userSettings.apdex || false, [Validators.required]);

    this.apdexFormControls.satisfyingThreshold = new FormControl(settings?.apdexSettings?.satisfyingThreshold, [
      Validators.min(0),
      Validators.max(999999)]);
    this.apdexFormControls.toleratingThreshold = new FormControl(settings?.apdexSettings?.toleratingThreshold, [
      Validators.min(0),
      Validators.max(999999)]);
    this.apdexFormControls.apdexEnabled = new FormControl(settings.apdexSettings?.enabled, []);
  }

  createForm() {
    this.scenarioSettingsForm = new FormGroup({
      scenarioName: this.formControls.scenarioName,
      analysisEnabled: this.formControls.analysisEnabled,
      thresholdPercentile: this.formControls.percentile,
      thresholdEnabled: this.formControls.enabled,
      thresholdThroughput: this.formControls.throughput,
      thresholdErrorRate: this.formControls.errorRate,
      zeroErrorToleranceEnabled: this.formControls.zeroErrorToleranceEnabled,
      minTestDuration: this.formControls.minTestDuration,
      deleteSamples: this.formControls.deleteSamples,
      keepTestRunsPeriod: this.formControls.keepTestRunsPeriod,
      generateShareToken: this.formControls.generateShareToken,
      extraAggregations: this.formControls.extraAggregations,
    });

    this.labelTrendChartSettingsForm = new FormGroup({
      virtualUsers: this.labelTrendChartControls.virtualUsers,
      throughput: this.labelTrendChartControls.throughput,
      avgConnectionTime: this.labelTrendChartControls.avgConnectionTime,
      avgLatency: this.labelTrendChartControls.avgLatency,
      avgResponseTime: this.labelTrendChartControls.avgResponseTime,
      p90: this.labelTrendChartControls.p90,
      p95: this.labelTrendChartControls.p95,
      p99: this.labelTrendChartControls.p99,
      errorRate: this.labelTrendChartControls.errorRate,
    });

    this.requestStatsSettingsForm = new FormGroup({
      samples: this.requestStatsCormControls.samples,
      avg: this.requestStatsCormControls.avg,
      min: this.requestStatsCormControls.min,
      max: this.requestStatsCormControls.max,
      p50: this.requestStatsCormControls.p50,
      p90: this.requestStatsCormControls.p90,
      p95: this.requestStatsCormControls.p95,
      p99: this.requestStatsCormControls.p99,
      throughput: this.requestStatsCormControls.throughput,
      network: this.requestStatsCormControls.network,
      errorRate: this.requestStatsCormControls.errorRate,
      failures: this.requestStatsCormControls.failures,
      apdex: this.requestStatsCormControls.apdex,
      standardDeviation: this.requestStatsCormControls.standardDeviation,
    });
    this.labelFiltersForm = new FormGroup({});
    this.apdexSettingsForm = new FormGroup({
      toleratingThreshold: this.apdexFormControls.toleratingThreshold,
      satisfyingThreshold: this.apdexFormControls.satisfyingThreshold,
      apdexEnabled: this.apdexFormControls.apdexEnabled,
    });

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "xl" });
  }

  onSubmit() {

    const { projectName, scenarioName: currentScenarioName } = this.params;
    const actions = [];

    if (this.scenarioSettingsForm.valid && this.labelFilters.valid && this.labelTrendChartSettingsForm.valid
      && this.apdexSettingsForm.valid && (this.scenarioSettingsForm.dirty || this.labelFilters.dirty || this.labelTrendChartSettingsForm.dirty || this.apdexSettingsForm.dirty)) {

      const {
        scenarioName,
        analysisEnabled,
        thresholdEnabled,
        thresholdErrorRate,
        thresholdPercentile,
        thresholdThroughput,
        deleteSamples,
        zeroErrorToleranceEnabled,
        minTestDuration,
        keepTestRunsPeriod,
        generateShareToken,
        extraAggregations
      } = this.scenarioSettingsForm.value;
      const { apdexEnabled, satisfyingThreshold, toleratingThreshold } = this.apdexSettingsForm.value;
      const body = {
        scenarioName,
        analysisEnabled,
        zeroErrorToleranceEnabled,
        minTestDuration,
        keepTestRunsPeriod,
        deleteSamples,
        generateShareToken,
        extraAggregations,
        thresholds: {
          enabled: !!thresholdEnabled,
          errorRate: parseFloat(thresholdErrorRate),
          throughput: parseFloat(thresholdThroughput),
          percentile: parseFloat(thresholdPercentile)
        },
        labelFilterSettings: this.labelFilters.value.map(filter => ({ labelTerm: filter[0], operator: filter[1] })),
        labelTrendChartSettings: this.labelTrendChartSettingsForm.value,
        apdexSettings: {
          enabled: apdexEnabled,
          satisfyingThreshold,
          toleratingThreshold
        }
      };

      actions.push(this.scenarioApiService.updateScenario(projectName, currentScenarioName, body));

    }
    if (this.requestStatsSettingsForm.dirty && this.requestStatsSettingsForm.valid) {
      actions.push(this.scenarioApiService.updateScenarioUserSettings(projectName, currentScenarioName, {
        requestStats: this.requestStatsSettingsForm.value
      }));
    }


    combineLatest(actions)
      .pipe(catchError(r => of(r)))
      .subscribe((responses) => {
        responses.forEach(response => {
          if (response.url.endsWith("user-settings")) {
            const scenarioMessage = this.notification.scenarioUserSettingsUpdate(response);
            this.scenarioApiService.setData(scenarioMessage);
          } else {
            const scenarioMessage = this.notification.scenarioUpdate(response);
            this.scenarioApiService.setData(scenarioMessage);
          }
        })
        if (this.scenarioNameChanged) {
          this.scenarioNameChangeEvent.emit(encodeURIComponent(this.scenarioSettingsForm.value.scenarioName));
        }
        this.modalService.dismissAll();
      });
  }

  addFieldValue(operator) {
    const element = <HTMLInputElement>document.getElementById("term");
    this.labelFilters.push(new FormArray([new FormControl(element.value, Validators.required), new FormControl(operator, Validators.required)]));
    element.value = "";
  }

  deleteFieldValue(index) {
    this.labelFilters.removeAt(index);
  }

  private scenarioNameChanged(name): boolean {
    return name === this.params.scenarioName;
  }

  protected readonly JSON = JSON;
}

