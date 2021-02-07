import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ProjectOverview, Items } from '../items.service.model';
import { ItemsService } from '../items.service';
import { SharedMainBarService } from '../shared-main-bar.service';
import { ScenarioService } from '../scenario.service';

const LIMIT = 15;
const OFFSET = 15;

@Component({
  selector: 'app-items',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss', '../shared-styles.css'],
})
export class ScenarioComponent implements OnInit, OnDestroy {
  projectName: string;
  overview$: Observable<ProjectOverview>;
  items$: Observable<Items>;
  trends$: Observable<{}>;
  processingItems$: Observable<{}>;
  params;
  page = 1;
  pageSize = LIMIT;
  currentProcessingItems = [];
  processingItems;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private scenarioService: ScenarioService,
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
        this.projectName = routeParams.projectName;
        this.sharedMainBarService.setProjectName(this.projectName);
        this.itemsService.fetchItems(this.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0 });
        this.scenarioService.fetchScenarioTrends(this.projectName, this.params.scenarioName);
        this.itemsService.processingItemsInterval(this.projectName, this.params.scenarioName);
        return new Observable().pipe(catchError(err => of([])));
      })
    ).subscribe(_ => {
    });
    this.subscription = this.itemsService.processingItems$.subscribe((_) => {
      this.processingItems = _;
      const { inprogress } = _ as any;
      if (Array.isArray(inprogress)) {
        const processingItems = inprogress.map((item) => item.id);
        const reloadItems = !this.currentProcessingItems.every((id) => processingItems.includes(id));
        if (reloadItems) {
          this.itemsService.fetchItems(this.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0 });
        }
        return this.currentProcessingItems = inprogress.map((item) => item.id);
      }
    });

  }

  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.projectName, this.params.scenarioName, { limit: LIMIT, offset });
  }

  open(itemId) {
    const { projectName, scenarioName } = this.params;
    this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
  }

  navigateBack() {
    this.router.navigate([`./project/${this.params.projectName}/scenarios`]);
  }


}
