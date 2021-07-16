import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectApiService } from 'src/app/project-api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ProjectService } from 'src/app/project.service';
import { ItemsApiService } from 'src/app/items-api.service';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/items.service';
import { ScenarioService } from 'src/app/scenario.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  myform: FormGroup;
  deleteCheck;

  @Input() itemData: any;
  @Input() remoteDelete: boolean;

  constructor(
    private modalService: NgbModal,
    private itemsService: ItemsService,
    private itemApiService: ItemsApiService,
    private notification: NotificationMessage,
    private scenarioService: ScenarioService,
    private router: Router
  ) {

  }
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
    this.myform = new FormGroup({
      deleteCheck: this.deleteCheck,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.itemApiService.deleteItem(this.itemData.id, this.itemData.scenarioName, this.itemData.projectName)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          if (_.status >= 200 && _.status < 300) {
            const message = this.notification.itemDeleted(_);
            // if deleted from other component than item detail
            if (this.remoteDelete) {
              this.itemsService.fetchItems(this.itemData.projectName, this.itemData.scenarioName);
              this.scenarioService.fetchScenarioTrends(this.itemData.projectName, this.itemData.scenarioName);
            }
            this.itemApiService.setData(message);
            this.redirect();
          }
        });
      this.myform.reset();
      this.modalService.dismissAll();

    }
  }

  private redirect() {
    this.router.navigate([`./project/${this.itemData.projectName}/scenario/${this.itemData.scenarioName}/items`]);
  }


}
