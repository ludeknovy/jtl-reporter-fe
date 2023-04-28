import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ScenarioService } from "../../scenario.service";
import { ItemsService } from "../../items.service";

@Component({
  selector: "app-environments",
  templateUrl: "./environments.component.html",
  styleUrls: ["./environments.component.css"]
})
export class EnvironmentsComponent implements OnInit {
  $environments: Observable<Array<string>>;
  selectedEnvironment: string;
  defaultEnvironment = "All Environments";

  @Input() params
  constructor(
    private scenarioService: ScenarioService,
    private itemsService: ItemsService,
  ) {
    this.$environments = scenarioService.environments$;
  }

  ngOnInit(): void {
    this.scenarioService.fetchEnvironments(this.params.projectName, this.params.scenarioName);
    this.reloadData("")

  }
  // reload data and set new subscription(s)
  filterEnvironment(environment: string) {
    this.selectedEnvironment = environment
    const env = environment === this.defaultEnvironment ? "" : environment;
    this.reloadData(env)

  }

  private reloadData(environment) {
    this.itemsService.setEnvironment(environment)
    this.scenarioService.setEnvironment(environment)
    this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: 15, offset: 0 });
    this.scenarioService.fetchScenarioTrends(this.params.projectName, this.params.scenarioName)
    this.itemsService.setProcessingItemsIntervalSubscription(this.params.projectName, this.params.scenarioName);
  }

}
