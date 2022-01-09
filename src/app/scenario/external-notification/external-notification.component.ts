import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ScenarioNotifications } from "../../items.service.model";
import { ScenarioService } from "src/app/scenario.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-external-notification",
  templateUrl: "./external-notification.component.html",
  styleUrls: ["./external-notification.component.css"]
})
export class ExternalNotificationComponent implements OnInit {

  myform: FormGroup;
  params;
  notifications$: Observable<ScenarioNotifications[]>;



  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private scenarioService: ScenarioService
  ) {
    this.notifications$ = this.scenarioService.notifications$;

  }

  ngOnInit(): void {
    this.route.params.subscribe(_ => this.params = _);
    this.createForm();
    this.scenarioService.fetchScenarioNotifications(this.params.projectName, this.params.scenarioName);
  }

  createForm() {
    this.myform = new FormGroup({});
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
  }

}
