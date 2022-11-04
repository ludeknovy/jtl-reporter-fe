import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Observable, Subscription } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { ProjectOverview, Items } from "../items.service.model";
import { ItemsService } from "../items.service";
import { SharedMainBarService } from "../shared-main-bar.service";
import { ScenarioService } from "../scenario.service";
import { ScenarioApiService } from "../scenario-api.service";
import { showZeroErrorWarning } from "../utils/showZeroErrorTolerance";

const LIMIT = 15;
const OFFSET = 15;

@Component({
  selector: "app-items",
  templateUrl: "./scenario.component.html",
  styleUrls: ["./scenario.component.scss", "../shared-styles.css"],
})
export class ScenarioComponent implements OnInit, OnDestroy {
  overview$: Observable<ProjectOverview>;
  items$: Observable<Items>;
  trends$: Observable<Record<string, unknown>>;
  processingItems$: Observable<Record<string, unknown>>;
  params;
  page = 1;
  pageSize = LIMIT;
  currentProcessingItems = [];
  processingItems;
  subscription: Subscription;
  zeroErrorToleranceEnabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private scenarioService: ScenarioService,
    private scenarioApiService: ScenarioApiService,
    private itemsService: ItemsService,
    private router: Router,
    private sharedMainBarService: SharedMainBarService,
  ) {
    this.items$ = itemsService.items$;
    this.trends$ = scenarioService.trends$;
  }

  ngOnDestroy() {
    this.itemsService.interval.unsubscribe();
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.route.params.pipe<any>(
      switchMap(routeParams => {
        this.params = routeParams;
        this.sharedMainBarService.setProjectName(this.params.projectName);
        this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0 });
        this.scenarioService.fetchScenarioTrends(this.params.projectName, this.params.scenarioName);
        this.scenarioApiService.getScenario(this.params.projectName, this.params.scenarioName).subscribe(_ => {
          this.zeroErrorToleranceEnabled = _.zeroErrorToleranceEnabled;
        });
        this.itemsService.processingItemsInterval(this.params.projectName, this.params.scenarioName);
        return new Observable().pipe(catchError(err => of([])));
      })
    ).subscribe(_ => _);
    this.subscription = this.itemsService.processingItems$.subscribe((_) => {
      this.processingItems = _;
      const { inprogress } = _ as any;
      if (Array.isArray(inprogress)) {
        const processingItems = inprogress.map((item) => item.id);
        const reloadItems = !this.currentProcessingItems.every((id) => processingItems.includes(id));
        if (reloadItems) {
          this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0 });
          this.scenarioService.fetchScenarioTrends(this.params.projectName, this.params.scenarioName);
        }
        return this.currentProcessingItems = inprogress.map((item) => item.id);
      }
    });

  }

  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset });
  }

  open(itemId) {
    const { projectName, scenarioName } = this.params;
    this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
  }

  navigateBack() {
    this.router.navigate([`./project/${this.params.projectName}/scenarios`]);
  }

  updateScenarioName(scenarioName: string) {
    this.router.navigate(
      [".", "project", this.params.projectName, "scenario", scenarioName, "items"]);
  }

  showZeroErrorToleranceWarning(errorCount, errorRate) {
    return showZeroErrorWarning(errorRate, errorCount);

  }


}
