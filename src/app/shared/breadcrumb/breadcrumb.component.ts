import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() testName
  @Input() isAnonymous: boolean

  params;
  urls = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      const { testName } = changes
      if (testName?.currentValue !== testName?.previousValue) {
        this.urls[this.urls.length - 1] = { label: this.testName || "test run", url: "", last: true }
      }
  }

  ngOnInit() {

    this.route.params.subscribe(param => {
      this.urls = [];
      const { projectName = null, scenarioName = null, id = null } = param;
      const _length = Object.keys(param).length;
      if (projectName) {
        const projectUrlTemplate = `/project/${projectName}/scenarios`;
        this.urls.push({ label: projectName, url: projectUrlTemplate, last: _length === 1 });
      }
      if (scenarioName) {
        const projectUrlTemplate = `/project/${projectName}/scenario/${scenarioName}/items`;
        this.urls.push({ label: scenarioName, url: projectUrlTemplate, last: _length === 2 });
      }
      if (id) {
        this.urls.push({ label: this.testName || "test run", url: "", last: _length === 3 });
      }
    });
  }
}
