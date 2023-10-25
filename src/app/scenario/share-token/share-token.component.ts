import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from '@angular/forms';

@Component({
  selector: "app-share-token",
  templateUrl: "./share-token.component.html",
  styleUrls: ["./share-token.component.css"]
})
export class ShareTokenComponent implements OnInit {

  shareForm: FormGroup;


  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.shareForm = new FormGroup({});
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
  }

}
