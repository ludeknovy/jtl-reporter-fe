import { Component, OnInit } from '@angular/core';
import { ProjectsListing } from '../../project-api.service.model';
import { Observable } from 'rxjs';
import { ProjectService } from '../../project.service';
import { SharedMainBarService } from '../../shared-main-bar.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css', '../../shared-styles.css']
})
export class ProjectsAdministrationComponent implements OnInit {

  projects$: Observable<ProjectsListing[]>;

  constructor(
    private projectService: ProjectService,
    private sharedMainBarService: SharedMainBarService
    ) {
    this.projects$ = this.projectService.state$;

  }
  ngOnInit(): void {
    this.sharedMainBarService.setProjectName(null);
  }


}
