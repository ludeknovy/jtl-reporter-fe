import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItemsApiService } from 'src/app/items-api.service';
import { ItemsService } from 'src/app/items.service';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ItemParams } from 'src/app/scenario/item-controls/item-controls.model';

@Component({
  selector: 'app-delete-share-link',
  templateUrl: './delete-share-link.component.html',
  styleUrls: ['./delete-share-link.component.css']
})
export class DeleteShareLinkComponent implements OnInit {
  deleteCheck: FormControl;
  deleteShareLinkForm: FormGroup;
  modal: NgbModalRef;

  @Input() params: ItemParams;
  @Input() tokenId: string;

  constructor(
    private modalService: NgbModal,
    private itemsApiService: ItemsApiService,
    private itemsService: ItemsService,
    private notification: NotificationMessage,
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.deleteCheck = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
  }

  createForm() {
    this.deleteShareLinkForm = new FormGroup({
      deleteCheck: this.deleteCheck,
    });
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.deleteShareLinkForm.valid) {
      this.itemsApiService.deleteItemShareToken(
        this.params.projectName,
        this.params.scenarioName,
        this.params.id,
        this.tokenId
      ).subscribe((_) => {
        this.itemsService.fetchItemShareTokens(this.params.projectName, this.params.scenarioName, this.params.id);
        const message = this.notification.deleteItemShareTokenNotification(_);
        this.itemsApiService.setData(message);
      });

      this.deleteShareLinkForm.reset();
      this.modal.close();

    }
  }

}
