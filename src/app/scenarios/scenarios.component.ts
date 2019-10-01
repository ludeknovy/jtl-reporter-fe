import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IScenarios } from '../items.service.model';
import { SharedMainBarService } from '../shared-main-bar.service';
import { ViewType } from './scenario.component.model';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css', '../shared-styles.css']
})
export class ScenariosComponent implements OnInit {

  scenarios;
  filteredScenarios;
  projectName: string;
  nrSelect = 'az';
  viewType = ViewType.Cards;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedMainBarService: SharedMainBarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(_ => {
      this.projectName = _.projectName;
      this.projectService.fetchScenarios(this.projectName);
      this.sharedMainBarService.setProjectName(this.projectName);
      this.projectService.scenarios$.subscribe((scenario) => {
        this.filteredScenarios = scenario.sort(this.azSort);
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

  changingValue(event) {
    const ordering = event.target.value;
    switch (ordering) {
      case 'newest':
        this.filteredScenarios.sort(this.fromNewest);
        break;
      case 'az':
        this.filteredScenarios.sort(this.azSort);
        break;
      case 'za':
        this.filteredScenarios.sort(this.zaSort);
        break;
    }
  }

  changeView(viewType: ViewType) {
    this.viewType = viewType;
  }

  open(scenarioName) {
    this.router.navigate([`./project/${this.projectName}/scenario/${scenarioName}/items`]);

  }

  private fromNewest(a, b) {
    return new Date(b.data[0].startDate).getTime() - new Date(a.data[0].startDate).getTime();
  }

  private azSort(a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }

  private zaSort(a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
  }
}
