import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { customScenarioTrends, scenarioResponseTime } from 'src/app/graphs/scenario-trends';
import { scenarioHistory } from 'src/app/graphs/scenarios';
import { ScenarioChartInputData } from './scenario-graph.component.model';
import * as moment from 'moment';


@Component({
  selector: 'app-scenarios-graph',
  templateUrl: './scenarios-graph.component.html',
  styleUrls: ['./scenarios-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ScenariosGraphComponent implements OnInit, AfterViewInit {

  @Input() graphData: ScenarioChartInputData[];
  customScenarioTimeChartOption = {
    ...scenarioResponseTime(), series: []
  };

  Highcharts: typeof Highcharts = Highcharts;
  updateLabelChartFlag = false;
  chart: Highcharts.Chart;


  ngOnInit(): void {
    console.log(this.graphData)
    this.generateChartLines(this.graphData);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    window.dispatchEvent(new Event('resize'));
    this.chart.reflow();
  }

  logChartInstance(chart: Highcharts.Chart) {
    console.log('logChartInstance called');
    this.chart = chart;
    this.chart.reflow();
  }

  private generateChartLines(data: ScenarioChartInputData[]) {
    const responseTimes = data.map(_ => _.percentil);
    const dates = data.map(_ => moment(_.startDate).format('DD. MM. YYYY HH:mm:ss'));
    const series = [];
    series.push({
      name: '90%tile',
      data: responseTimes,
      yAxis: 0,
      visible: true,
      // type: chartSerieSettings.type,
    });


    this.customScenarioTimeChartOption.series = JSON.parse(JSON.stringify(series));
    this.customScenarioTimeChartOption.xAxis['categories'] = dates;
  }

}


