import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-metric',
  templateUrl: './add-metric.component.html',
  styleUrls: ['./add-metric.component.scss']
})
export class AddMetricComponent implements OnInit {

  @Input() chartLines;
  @Output() chartUpdate = new EventEmitter<{}>();

  overallChartLines;
  labelsChartLines;
  labels: string[];
  metrics = {};

  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    const labelsLines = Array.from(this.chartLines.labels.keys());
    const overallLines = Array.from(this.chartLines.overall.keys());
    const { value: firstItem } = this.chartLines.labels.values().next();
    const labels = firstItem.map(_ => ({ name: _.name, isChecked: false }));
    overallLines.forEach((_) => {
      this.metrics[_] = [{ name: 'overall', isChecked: false }]
    });
    labelsLines.forEach((_) => {
      const labelsArray = [...JSON.parse(JSON.stringify(labels))]
      this.metrics.hasOwnProperty(_)
        ? this.metrics[_].push(...labelsArray)
        : this.metrics[_] = labelsArray;
    });

    this.overallChartLines = Array.from(this.chartLines.overall.keys())
    this.labelsChartLines = Array.from(this.chartLines.labels.keys())


  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit() {
    const checked = [];
    // tslint:disable-next-line: forin
    for (const key in this.metrics) {
      const metric = this.metrics[key];
      const checkedMetric = metric.filter((_) => _.isChecked === true).map((_ ) => ({ name: _.name, metric: key }))
      if (checkedMetric.length > 0) {
        checked.push(...checkedMetric);
      }
    }
    this.chartUpdate.emit(checked);


    this.modalService.dismissAll();

  }



}
