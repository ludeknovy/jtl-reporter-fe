import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ItemsApiService } from 'src/app/items-api.service';
import { ItemsService } from 'src/app/items.service';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ItemParams } from 'src/app/scenario/item-controls/item-controls.model';


@Component({
  selector: 'app-create-new-share-link',
  templateUrl: './create-new-share-link.component.html',
  styleUrls: ['./create-new-share-link.component.css']
})
export class CreateNewShareLinkComponent implements OnInit {

  private note: FormControl;
  private newShareLinkForm: FormGroup;
  modal: NgbActiveModal;
  @Input() params: ItemParams;

  constructor(
    private modalService: NgbModal,
    private notification: NotificationMessage,
    private itemApiService: ItemsApiService,
    private itemService: ItemsService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  createFormControls() {
    this.note = new FormControl('', [
      Validators.maxLength(100),
      Validators.required
    ]);
  }

  createForm() {
    this.newShareLinkForm = new FormGroup({
      note: this.note
    });
  }

  onSubmit() {
    const { note } = this.newShareLinkForm.value;
    const { projectName, scenarioName, id } = this.params;

    this.itemApiService.createItemShareToken(projectName, scenarioName, id, { note })
    .pipe(catchError(r => of(r)))
    .subscribe(_ => {
      const message = this.notification.createItemShareLinkNotification(_);
      this.itemApiService.setData(message);
      this.itemService.fetchItemShareTokens(projectName, scenarioName, id);
    });
  this.newShareLinkForm.reset();
  this.modal.close();
  }
}
