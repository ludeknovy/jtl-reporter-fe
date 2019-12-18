import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-item-chart',
  templateUrl: './item-chart.component.html',
  styleUrls: ['./item-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ItemChartComponent implements AfterViewInit, OnDestroy {

  @Input() chartData: any;
  @ViewChild('chartCanvasRef', { static: true }) chartCanvas: ElementRef;
  @HostBinding('class.chart') htmlCardClass = true;

  private chart: Chart;

  ngAfterViewInit(): void {
    this.destroyChart();
    this.chart = new Chart(this.chartCanvas.nativeElement, this.chartData);
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart(): void {
    // tslint:disable-next-line:no-unused-expression
    this.chart && this.chart.destroy();
  }

}
