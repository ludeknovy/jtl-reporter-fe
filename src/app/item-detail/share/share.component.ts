import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { ItemsService } from "src/app/items.service";
import { ItemParams } from "src/app/scenario/item-controls/item-controls.model";

@Component({
  selector: "app-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.css"]
})
export class ShareComponent implements OnInit {

  shareForm: FormGroup;
  shareTokens$: Observable<[]>;
  selfUrl: string;

  @Input() params: ItemParams;

  constructor(
    private modalService: NgbModal,
    private itemService: ItemsService,
  ) {
    this.shareTokens$ = itemService.shareTokens$;

   }

  ngOnInit() {
    this.selfUrl = window.location.href;
    this.createForm();
  }

  createForm() {
    this.shareForm = new FormGroup({});
  }

  open(content) {
    this.itemService.fetchItemShareTokens(this.params.projectName, this.params.scenarioName, this.params.id);
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "xl" as any });
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

}
