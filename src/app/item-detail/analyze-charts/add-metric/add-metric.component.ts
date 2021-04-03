import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-metric',
  templateUrl: './add-metric.component.html',
  styleUrls: ['./add-metric.component.scss']
})
export class AddMetricComponent implements OnInit {

  @Input() chartLines;
  @Input() preloadedSeries;
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
    overallLines.forEach((_: string) => {
      this.metrics[_] = [{ name: 'overall', isChecked: false }];
    });
    labelsLines.forEach((_: string) => {
      const labelsArray = [...JSON.parse(JSON.stringify(labels))];
      this.metrics.hasOwnProperty(_)
        ? this.metrics[_].push(...labelsArray)
        : this.metrics[_] = labelsArray;
    });

    this.overallChartLines = Array.from(this.chartLines.overall.keys());
    this.labelsChartLines = Array.from(this.chartLines.labels.keys());
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit() {
    const checked = [];
    for (const key of Object.keys(this.metrics)) {
      const metric = this.metrics[key];
      const checkedMetric = metric.filter((_) => _.isChecked === true).map((_ ) => ({ name: _.name, metric: key }));
      if (checkedMetric.length > 0) {
        checked.push(...checkedMetric);
      }
    }
    this.chartUpdate.emit(checked);
    this.modalService.dismissAll();
  }

  ngOnChanges(changes) {
    // update checkboxes with loaded settings
    if (changes.preloadedSeries) {
      const preloadedSeries = changes.preloadedSeries.currentValue;
      if (!Array.isArray(preloadedSeries)) return;
      preloadedSeries.forEach(_ => {
        if (this.metrics[_.metric]) {
          const item = this.metrics[_.metric].find(__ => __.name === _.name)
          item.isChecked = true;
        }
      })
    }
  }
}
