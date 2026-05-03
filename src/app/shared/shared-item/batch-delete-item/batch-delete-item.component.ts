import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ItemsApiService } from "src/app/items-api.service";
import { ItemsService } from "src/app/items.service";
import { ScenarioService } from "src/app/scenario.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-batch-delete-item",
  templateUrl: "./batch-delete-item.component.html",
  styleUrls: ["./batch-delete-item.component.css"]
})
export class BatchDeleteItemComponent {
  myform: FormGroup;
  deleteCheck: FormControl;

  @Input() selectedIds: string[] = [];
  @Input() projectName: string;
  @Input() scenarioName: string;
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private modalService: NgbModal,
    private itemsService: ItemsService,
    private itemApiService: ItemsApiService,
    private scenarioService: ScenarioService,
  ) {
    this.deleteCheck = new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]);
    this.myform = new FormGroup({ deleteCheck: this.deleteCheck });
  }

  open(content) {
    if (this.selectedIds.length === 0) return;
    this.myform.reset();
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    if (!this.myform.valid) return;

    this.itemApiService.deleteItems(this.selectedIds, this.scenarioName, this.projectName)
      .pipe(catchError(r => of(r)))
      .subscribe(res => {
        if (res.status >= 200 && res.status < 300) {
          this.itemsService.fetchItems(this.projectName, this.scenarioName);
          this.scenarioService.fetchScenarioTrends(this.projectName, this.scenarioName);
          const count = this.selectedIds.length;
          const msg = count > 1 ? `${count} tests have been deleted` : "Test has been deleted";
          this.itemApiService.setData({ success: true, message: msg });
          this.deleted.emit();
        }
        this.myform.reset();
        this.modalService.dismissAll();
      });
  }
}
