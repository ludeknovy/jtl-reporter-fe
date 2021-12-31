import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ProjectsListing } from '../project-api.service.model';
import { Observable } from 'rxjs';
import { SharedMainBarService } from '../shared-main-bar.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss', '../shared-styles.css'],
})
export class TopPanelComponent implements OnInit {

  message;
  navbarOpen = false;
  selectedProject = null;
  username: string;

  isLoggedIn$: Observable<boolean>;
  projectsState$: Observable<ProjectsListing[]>;

  constructor(
    private projectService: ProjectService,
    private sharedMainBarService: SharedMainBarService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {
    this.projectsState$ = this.projectService.state$;
  }

  ngOnInit() {
    this.sharedMainBarService.project$.subscribe(_ => {
      this.selectedProject = _;
      this.cdr.detectChanges();
      return;
    }
    );
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.isLoggedIn.subscribe((_) => {
      if (_ === true) {
        this.projectService.loadProjects();
        const { username } = JSON.parse(localStorage.getItem('currentUser'));
        this.username = username;
      }
    });
  }



  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  changeSelectedProject(projectName) {
    this.sharedMainBarService.setProjectName(projectName);
  }
}
