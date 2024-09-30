import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Observable, Subscription } from "rxjs";
import { switchMap, catchError, withLatestFrom } from "rxjs/operators";
import { Items } from "../items.service.model";
import { ItemsService } from "../items.service";
import { SharedMainBarService } from "../shared-main-bar.service";
import { ScenarioService } from "../scenario.service";
import { ScenarioApiService } from "../scenario-api.service";
import { getValidationResults } from "../utils/showZeroErrorTolerance";
import { EnvironmentService } from "../_services/environment.service";

const LIMIT = 15;
const OFFSET = 15;

@Component({
  selector: "app-items",
  templateUrl: "./scenario.component.html",
  styleUrls: ["./scenario.component.scss", "../shared-styles.css"],
})
export class ScenarioComponent implements OnInit, OnDestroy {
  items$: Observable<Items>;
  environment$: Subscription;
  params;
  page = 1;
  pageSize = LIMIT;
  currentProcessingItems = [];
  processingItems;
  subscription: Subscription;
  zeroErrorToleranceEnabled: boolean;
  token: string;
  isAnonymous = false;
  validationEnabled = false
  minTestDuration = null
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private scenarioService: ScenarioService,
    private scenarioApiService: ScenarioApiService,
    private itemsService: ItemsService,
    private router: Router,
    private sharedMainBarService: SharedMainBarService,
    private environmentService: EnvironmentService,
  ) {
  }

  ngOnDestroy() {
    this.itemsService.intervalSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.scenarioService.updateScenarioTrends(undefined);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(_ => {
      this.token = _.token;
      if (this.token) {
        this.isAnonymous = true;
      }
    });

    if (!this.isAnonymous) {
      this.items$ = this.itemsService.items$
      this.items$
        .pipe(catchError(r => {
          this.isLoading = false;
          return of(r);
        }))
        .subscribe(items => {
        if (items.name) {
          this.isLoading = false;
        }
      })
      this.environment$ = this.environmentService.environment$.subscribe(value => this.page = 1);

      this.route.params.pipe<any>(
        switchMap(routeParams => {
          this.params = routeParams;
          this.sharedMainBarService.setProjectName(this.params.projectName);
          this.scenarioApiService.getScenario(this.params.projectName, this.params.scenarioName).subscribe(_ => {
            this.validationEnabled = this.isValidationEnabled(_.zeroErrorToleranceEnabled, _.minTestDuration)
            this.minTestDuration = _.minTestDuration
          });
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
            this.scenarioService.fetchEnvironments(this.params.projectName, this.params.scenarioName);
          }
          return this.currentProcessingItems = inprogress.map((item) => item.id);
        }
      });
    } else {
      this.route.params.pipe<any>(
        switchMap(routeParams => {
          this.params = routeParams;
          return new Observable().pipe(catchError(err => of([])));
        })
      ).subscribe(_ => _);
    }



  }


  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset });
  }

  open(itemId) {
    const { projectName, scenarioName } = this.params;
    this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
  }

  updateScenarioName(scenarioName: string) {
    this.router.navigate(
      [".", "project", this.params.projectName, "scenario", scenarioName, "items"]);
  }

  displayItemValidationError(zeroErrorEnabled, errorCount, errorRate, duration, minTestDuration) {
    const { zeroErrorToleranceValidation, minTestDurationValidation } = getValidationResults(zeroErrorEnabled, errorRate, errorCount, duration, minTestDuration);
    return zeroErrorToleranceValidation || minTestDurationValidation
  }

  private isValidationEnabled(zeroErrorEnabled, minTestDuration): boolean {
    return zeroErrorEnabled || minTestDuration > 0
  }


}
