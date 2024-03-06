import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { ScenarioService } from "../../scenario.service";
import { Observable } from "rxjs";
import { ScenarioShareToken } from "../../scenario-api.service.model";

@Component({
  selector: "app-share-token",
  templateUrl: "./scenario-share-token.component.html",
  styleUrls: ["./scenario-share-token.component.css", "../../shared-styles.css"]
})
export class ScenarioShareTokenComponent implements OnInit {

  @Input() params: { scenarioName: string, projectName: string };

  shareForm: FormGroup;
  scenarioShareTokens$: Observable<ScenarioShareToken[]>;
  selfUrl: string


  constructor(
    private modalService: NgbModal,
    private scenarioService: ScenarioService
  ) {
    this.scenarioShareTokens$ = scenarioService.scenarioShareTokens$;

  }

  ngOnInit(): void {
    this.scenarioService.fetchScenarioShareTokens(this.params.projectName, this.params.scenarioName);
    this.createForm();
    this.selfUrl = window.location.href;

  }

  createForm() {
    this.shareForm = new FormGroup({});
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
  }

}
