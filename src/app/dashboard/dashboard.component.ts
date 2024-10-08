import { Component, OnInit } from "@angular/core";
import { ProjectApiService } from "../project-api.service";
import { ItemsListing, ProjectsOverallStats } from "../items.service.model";
import { Router } from "@angular/router";
import { SharedMainBarService } from "../shared-main-bar.service";
import { getValidationResults } from "../utils/showZeroErrorTolerance";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../shared-styles.css']
})
export class DashboardComponent implements OnInit {
  latestItems: ItemsListing[];
  overallStats: ProjectsOverallStats;
  Math: Math;
  isLoading = true;

  constructor(
    private projectService: ProjectApiService,
    private router: Router,
    private sharedMainBarService: SharedMainBarService,
  ) {
    this.Math = Math;
  }

  ngOnInit(): void {
    this.fetchLatestItems();
    this.fetchOverallStats();
    this.sharedMainBarService.setProjectName(null);
  }

  fetchLatestItems() {
    this.projectService.fetchLatestItems()
      .pipe(catchError(r => {
        this.isLoading = false;
        return of(r);
      }))
      .subscribe(_ => {
        this.latestItems = _;
        this.isLoading = false;
      });
  }

  fetchOverallStats() {
    this.projectService.fetchOverallStats().subscribe(_ => this.overallStats = _);
  }

  open(projectName, scenarioName, itemId) {
    this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
  }

  displayItemValidationError(zeroErrorEnabled, errorCount, errorRate, duration, minTestDuration) {
    const {
      zeroErrorToleranceValidation,
      minTestDurationValidation
    } = getValidationResults(zeroErrorEnabled, errorRate, errorCount, duration, minTestDuration);
    return zeroErrorToleranceValidation || minTestDurationValidation;
  }


  isValidationEnabled(zeroErrorEnabled, minTestDuration): boolean {
    return zeroErrorEnabled || minTestDuration > 0;
  }
}
