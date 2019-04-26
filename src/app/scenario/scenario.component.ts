import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ProjectOverview, Items } from '../items.service.model';
import { ProjectService } from '../project.service';
import { ItemsService } from '../items.service';
import { SharedMainBarService } from '../shared-main-bar.service';

const LIMIT = 15;
const OFFSET = 15;

@Component({
  selector: 'app-items',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss', '../shared-styles.css'],
})
export class ScenarioComponent implements OnInit {
  projectName: string;
  overview$: Observable<ProjectOverview>;
  items$: Observable<Items>;
  trends$: Observable<{}>;
  params;
  page = 1;
  pageSize = LIMIT;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private itemsService: ItemsService,
    private router: Router,
    private sharedMainBarService: SharedMainBarService
  ) {
    this.items$ = itemsService.items$;
    this.trends$ = projectService.trends$;
  }

  ngOnInit() {
    this.route.params.pipe<any>(
      switchMap(routeParams => {
        this.params = routeParams;
        this.projectName = routeParams.projectName;
        this.sharedMainBarService.setProjectName(this.projectName);
        this.itemsService.fetchItems(this.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0});
        this.projectService.fetchScenarioTrends(this.projectName, this.params.scenarioName);
        return new Observable().pipe(catchError(err => of([])));
      })
    ).subscribe(_ =>  {
    });

  }

  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.projectName, this.params.scenarioName, { limit: LIMIT, offset });
  }

  open(itemId) {
    const { projectName, scenarioName } = this.params;
    this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
  }

  navigateBack() {
    this.router.navigate([`./project/${this.params.projectName}/scenarios`]);
  }


}
