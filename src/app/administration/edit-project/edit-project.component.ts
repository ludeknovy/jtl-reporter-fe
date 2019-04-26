import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectApiService } from 'src/app/project-api.service';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ProjectService } from 'src/app/project.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  myform: FormGroup;
  projectName;

  @Input() projectDataInput: any;

  constructor(
    private modalService: NgbModal,
    private projectApiService: ProjectApiService,
    private notification: NotificationMessage,
    private projectService: ProjectService
    ) {

  }
  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.projectName = new FormControl(this.projectDataInput.projectName, [
      Validators.required,
      Validators.maxLength(100)
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
      this.projectApiService.updateProject(this.projectDataInput.projectName, { projectName })
      .pipe(catchError(r => of(r)))
      .subscribe(_ => {
        const message = this.notification.projectUpdate(_);
        this.projectService.loadProjects();
        return this.projectApiService.setData(message);
      });
      this.modalService.dismissAll();
    }
  }


}
