import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-external-notification',
  templateUrl: './add-new-external-notification.component.html',
  styleUrls: ['./add-new-external-notification.component.css']
})
export class AddNewExternalNotificationComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
