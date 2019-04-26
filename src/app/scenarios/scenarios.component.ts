import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IScenarios } from '../items.service.model';
import { SharedMainBarService } from '../shared-main-bar.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css', '../shared-styles.css']
})
export class ScenariosComponent implements OnInit {

  scenarios;
  filteredScenarios;
  projectName: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private sharedMainBarService: SharedMainBarService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(_ => {
      this.projectName = _.projectName;
      this.projectService.fetchScenarios(this.projectName);
      this.sharedMainBarService.setProjectName(this.projectName);
      this.projectService.scenarios$.subscribe((scenario) => {
        this.filteredScenarios = scenario;
        this.scenarios = scenario;
      });
    });
  }

  search(term: string) {
    if (term) {
      this.filteredScenarios = this.scenarios.filter(_ =>
        _.name.trim().toLowerCase().includes(term.trim().toLowerCase()));
    } else {
      this.filteredScenarios = this.scenarios;
    }
  }
}
