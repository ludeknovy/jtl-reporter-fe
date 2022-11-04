import { Component, OnInit } from "@angular/core";
import { ProjectApiService } from "../project-api.service";
import { ItemsListing, ProjectsOverallStats } from "../items.service.model";
import { Router } from "@angular/router";
import { SharedMainBarService } from "../shared-main-bar.service";
import { showZeroErrorWarning } from "../utils/showZeroErrorTolerance";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css", "../shared-styles.css"]
})
export class DashboardComponent implements OnInit {
  latestItems: ItemsListing[];
  overallStats: ProjectsOverallStats;
  Math: Math;

  constructor(
    private projectService: ProjectApiService,
    private router: Router,
    private sharedMainBarService: SharedMainBarService
    ) {
      this.Math = Math;
    }
  ngOnInit(): void {
    this.fetchLatestItems();
    this.fetchOverallStats();
    this.sharedMainBarService.setProjectName(null);
  }

  fetchLatestItems() {
    this.projectService.fetchLatestItems().subscribe(_ => this.latestItems = _);
  }

  fetchOverallStats() {
    this.projectService.fetchOverallStats().subscribe(_ => this.overallStats = _);
  }

  open(projectName, scenarioName, itemId) {
    this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
  }

  showZeroErrorToleranceWarning(errorCount, errorRate) {
    return showZeroErrorWarning(errorRate, errorCount);

  }
}
