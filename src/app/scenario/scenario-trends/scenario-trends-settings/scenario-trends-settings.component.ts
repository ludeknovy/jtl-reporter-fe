import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ScenarioApiService } from "../../../scenario-api.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationMessage } from "../../../notification/notification-messages";
import {ScenarioService} from '../../../scenario.service';

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
  };

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
    console.log(settings.aggregatedTrends);
    this.formControls.aggregatedTrends = new FormControl(settings.aggregatedTrends.toString(), [
      Validators.required
    ]);
  }

  createForm() {
    this.scenarioTrendsSettingsForm = new FormGroup({
      aggregatedTrends: this.formControls.aggregatedTrends,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
  }

  onSubmit() {
    if (this.scenarioTrendsSettingsForm.valid) {
      const { scenarioName, projectName } = this.params
      const body = {
        aggregatedTrends: this.scenarioTrendsSettingsForm.value.aggregatedTrends === "true"
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
