import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectApiService } from '../../../project-api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationMessage } from '../../../notification/notification-messages';
import { ProjectService } from '../../../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project-modal.component.html',
})
export class AddNewProjectComponent implements OnInit {
  closeResult: string;
  myform: FormGroup;
  projectName: FormControl;

  constructor(
    private modalService: NgbModal,
    private projectApiService: ProjectApiService,
    private projectService: ProjectService,
    private notification: NotificationMessage
  ) { }
  ngOnInit() {
    this.createFormControls();
    this.createForm();

  }

  createFormControls() {
    this.projectName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      projectName: this.projectName,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { projectName } = this.myform.value;
      this.projectApiService.createNewProject({ projectName })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.newProjectNotificationMessage(_);
          this.projectService.loadProjects();
          return this.projectApiService.setData(message);
        });
      this.myform.reset();
      this.modalService.dismissAll();
    }
  }
}
