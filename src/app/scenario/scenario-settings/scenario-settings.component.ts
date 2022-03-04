import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { NotificationMessage } from "src/app/notification/notification-messages";
import { ScenarioApiService } from "src/app/scenario-api.service";

@Component({
  selector: "app-scenario-settings",
  templateUrl: "./scenario-settings.component.html",
  styleUrls: ["./scenario-settings.component.css"],
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
    zeroErrorToleranceEnabled: null,
    deleteSamples: null,
    keepTestRunsPeriod: null,
    generateShareToken: null,
    term: null,
    operator: null,
  };
  labelFilterControls = {}

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

  labelFiltersData = [{ term: "my label", operator: "includes" }, { term: "test", operator: "match" }]


  labelFilterOperators = ["includes", "match"]
  labelFilters: FormArray



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
        this.labelFilters = new FormArray(
          _.labelFilterSettings.map(filter=>new FormArray([new FormControl(filter.labelTerm,Validators.required), new FormControl(filter.operator, Validators.required)])))
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
    this.formControls.zeroErrorToleranceEnabled = new FormControl(settings.zeroErrorToleranceEnabled, [
      Validators.required
    ]);
    this.formControls.deleteSamples = new FormControl(settings.deleteSamples, [
      Validators.required
    ]);
    this.formControls.keepTestRunsPeriod = new FormControl(settings.keepTestRunsPeriod, [
      Validators.required
    ]);
    this.formControls.generateShareToken = new FormControl(settings.generateShareToken, [
      Validators.required
    ])
  
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
      deleteSamples: this.formControls.deleteSamples,
      keepTestRunsPeriod: this.formControls.keepTestRunsPeriod,
      generateShareToken: this.formControls.generateShareToken,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
  }

  onSubmit() {
    if (this.scenarioSettingsForm.valid && this.labelFilters.valid) {

      const {
        scenarioName, analysisEnabled,
        thresholdEnabled, thresholdErrorRate,
        thresholdPercentile, thresholdThroughput, deleteSamples, zeroErrorToleranceEnabled, keepTestRunsPeriod, generateShareToken
      } = this.scenarioSettingsForm.value;
      const { projectName, scenarioName: currentScenarioName } = this.params;
      const body = {
        scenarioName,
        analysisEnabled,
        zeroErrorToleranceEnabled,
        keepTestRunsPeriod,
        deleteSamples,
        generateShareToken,
        thresholds: {
          enabled: thresholdEnabled,
          errorRate: parseFloat(thresholdErrorRate),
          throughput: parseFloat(thresholdThroughput),
          percentile: parseFloat(thresholdPercentile)
        },
        labelFilterSettings: this.labelFilters.value.map(filter => ({ labelTerm: filter[0], operator: filter[1] }))
      };

      this.scenarioApiService.updateScenario(projectName, currentScenarioName, body)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.scenarioUpdate(_);
          return this.scenarioApiService.setData(message);
        });
      this.modalService.dismissAll();

      if (this.scenarioNameChanged) {
        this.scenarioNameChangeEvent.emit(encodeURIComponent(scenarioName));
      }
    }
  }

  addFieldValue(operator) {  
   const element =  <HTMLInputElement>document.getElementById("term")
    this.labelFilters.push(new FormArray([new FormControl(element.value,Validators.required), new FormControl(operator, Validators.required)]))
    element.value = ""
  }

  deleteFieldValue(index) {
    this.labelFilters.removeAt(index)
  }

  private scenarioNameChanged(name): boolean {
    return name === this.params.scenarioName;
  }

}

