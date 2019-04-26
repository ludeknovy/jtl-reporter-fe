import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ScenarioApiService } from 'src/app/scenario-api.service';

@Component({
  selector: 'app-edit-scenario',
  templateUrl: './edit-scenario.component.html',
  styleUrls: ['./edit-scenario.component.css'],
})

export class EditScenarioComponent implements OnInit {

  myform: FormGroup;
  scenarioName;
  params;

  @Input() scenarioData: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(_ => this.params = _);
    this.scenarioData.subscribe(_ => {
      if (_.name) {
        this.createFormControls(_.name);
        this.createForm();
      }
    });
  }

  createFormControls(currentName) {
    this.scenarioName = new FormControl(currentName, [
      Validators.maxLength(100)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      scenarioName: this.scenarioName,
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.myform.valid) {
      const { scenarioName } = this.myform.value;
      const { projectName, scenarioName: currentScenarioName } = this.params;
      this.scenarioApiService.updateScenario(projectName, currentScenarioName, { scenarioName })
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.scenarioUpdate(_);
          return this.scenarioApiService.setData(message);
        });
      this.modalService.dismissAll();
    }
  }

}
