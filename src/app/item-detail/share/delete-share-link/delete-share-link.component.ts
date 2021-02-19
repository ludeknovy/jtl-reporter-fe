import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-delete-share-link',
  templateUrl: './delete-share-link.component.html',
  styleUrls: ['./delete-share-link.component.css']
})
export class DeleteShareLinkComponent implements OnInit {
  deleteCheck: FormControl;
  deleteShareLinkForm: FormGroup;
  modal: NgbModalRef;

  constructor(
    private modalService: NgbModal
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

      this.deleteShareLinkForm.reset();
      this.modal.close();

    }
  }

}
