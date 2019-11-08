import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsApiService } from 'src/app/items-api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationMessage } from 'src/app/notification/notification-messages';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})

export class EditItemComponent implements OnInit {

  myform: FormGroup;
  note;
  environment;
  hostname;
  base;
  isBase;
  disabled;
  params;

  @Input() itemDetailData: any;
  @Output() itemDetailChange = new EventEmitter<{}>();

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private itemsService: ItemsApiService,
    private notification: NotificationMessage
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(_ => this.params = _);
    this.isBase = this.itemDetailData.isBase;
    this.disabled = this.isBase;
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.note = new FormControl(this.itemDetailData.note, [
      Validators.maxLength(100)
    ]);
    this.environment = new FormControl(this.itemDetailData.environment, [
      Validators.required,
      Validators.maxLength(150)
    ]);
    this.hostname = new FormControl(this.itemDetailData.hostname, [
      Validators.maxLength(200)
    ]);
    this.base = new FormControl(this.itemDetailData.isBase, []);
  }

  createForm() {
    this.myform = new FormGroup({
      note: this.note,
      environment: this.environment,
      hostname: this.hostname,
      base: this.base
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { note, environment, base, hostname } = this.myform.value;
      const { projectName, id, scenarioName } = this.params;
      this.itemsService.updateItemInfo(id, projectName, scenarioName, { environment, note, base, hostname })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          this.itemDetailChange.emit({ note, environment, hostname });
          const message = this.notification.itemUpdate(_);
          return this.itemsService.setData(message);
        });
      this.modalService.dismissAll();
    }
  }

}
