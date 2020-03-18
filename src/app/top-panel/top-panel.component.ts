import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ProjectsListing } from '../project-api.service.model';
import { Observable } from 'rxjs';
import { SharedMainBarService } from '../shared-main-bar.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserRole } from '../_services/users.model';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit {

  message;
  navbarOpen = false;
  selectedProject = null;
  username: string;
  role: UserRole;

  isLoggedIn$: Observable<boolean>;
  projectsState$: Observable<ProjectsListing[]>;

  constructor(
    private projectService: ProjectService,
    private sharedMainBarService: SharedMainBarService,
    private authService: AuthenticationService
    ) {
    this.projectsState$ = this.projectService.state$;
    this.sharedMainBarService.project$.subscribe(_ => this.selectedProject = _);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.isLoggedIn.subscribe((_) =>  {
      if (_ === true) {
        this.projectService.loadProjects();
        const { username, role } = JSON.parse(localStorage.getItem('currentUser'));
        this.username = username;
        this.role = role;
      }
    });
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  changeSelectedProject(projectName) {
    this.selectedProject = projectName;
  }
}
