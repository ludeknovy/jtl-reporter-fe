import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-delete-token',
  templateUrl: './delete-token.component.html',
  styleUrls: ['./delete-token.component.css']
})
export class DeleteTokenComponent implements OnInit {

  myform: FormGroup;
  deleteCheck;

  constructor(private modalService: NgbModal
  ) { }

  ngOnInit() {
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
    this.myform = new FormGroup({
      deleteCheck: this.deleteCheck,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    // if (this.myform.valid) {
    //   this.projectApiService.deleteProject(this.projectData.projectName)
    //   .pipe(catchError(r => of(r)))
    //   .subscribe(_ => {
    //     const message = this.notification.deleteProjectNotification(_);
    //     this.projectService.loadProjects();
    //     return this.projectApiService.setData(message);
    //   });
    //   this.myform.reset();
    //   this.modalService.dismissAll();
    // }
  }

}
