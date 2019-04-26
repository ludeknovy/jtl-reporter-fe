import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ProjectsListing } from '../project-api.service.model';
import { Observable } from 'rxjs';
import { SharedMainBarService } from '../shared-main-bar.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit {

  message;
  navbarOpen = false;
  selectedProject = null;

  projectsState$: Observable<ProjectsListing[]>;

  constructor(
    private projectService: ProjectService,
    private sharedMainBarService: SharedMainBarService
    ) {
    this.projectsState$ = this.projectService.state$;
    this.sharedMainBarService.project$.subscribe(_ => this.selectedProject = _);
  }

  ngOnInit() {
    this.projectService.loadProjects();
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  changeSelectedProject(projectName) {
    this.selectedProject = projectName;
  }
}
