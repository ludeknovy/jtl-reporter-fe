import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  params;
  urls = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(_ => {
      this.urls = [];
      const { projectName = null, scenarioName = null, id = null} = _;
      const _length = Object.keys(_).length;
      if (projectName) {
        const projectUrlTemplate = `/project/${projectName}/scenarios`;
        this.urls.push({ label: projectName, url: projectUrlTemplate, last: _length === 1});
      }
      if (scenarioName) {
        const projectUrlTemplate = `/project/${projectName}/scenario/${scenarioName}/items`;
        this.urls.push({ label: scenarioName, url: projectUrlTemplate, last: _length === 2 });
      }
      if (id) {
        this.urls.push({ label: 'test run', url: '', last: _length === 3});
      }
    });
  }
}
