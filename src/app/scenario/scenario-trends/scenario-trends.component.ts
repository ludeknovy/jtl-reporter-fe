import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { customScenarioTrends } from 'src/app/graphs/scenario-trends';
import { Series } from 'src/app/graphs/series.model';
import { bytesToMbps } from 'src/app/item-detail/calculations';
import { ScenarioTrendsData } from 'src/app/items.service.model';
import { ScenarioApiService } from 'src/app/scenario-api.service';

@Component({
  selector: 'app-scenario-trends',
  templateUrl: './scenario-trends.component.html',
  styleUrls: ['./scenario-trends.component.css']
})
export class ScenarioTrendsComponent implements OnInit {

  @Input() params;
  Highcharts: typeof Highcharts = Highcharts;
  updateLabelChartFlag = false;
  customScenarioTimeChartOption = {
    ...customScenarioTrends(), series: []
  };
  customScenarioThroughputChartOption = {
    ...customScenarioTrends(), series: []
  };
  networkTransform = (data) => {
    const network = data.map(_ => bytesToMbps(_))
    return network;
  }

  chartDataMapping = new Map([
    ['percentil', { name: Series.ResponseTimeP90, onLoad: true, color: 'rgb(17,122,139, 0.8)' }],
    ['avgResponseTime', { name: Series.ResponseTimeAvg, onLoad: false }],
    ['avgLatency', { name: Series.LatencyAvg, onLoad: false }],
    ['avgConnect', { name: Series.ConnetcAvg, onLoad: false }],
    ['throughput', { name: Series.Throughput, yAxis: 2, onLoad: true, color: 'rgb(41,128,187, 0.8)' }],
    ['maxVu', { name: 'vu', yAxis: 1, onLoad: true, type: 'spline', color: 'grey' }],
    ['errorRate', { name: Series.ErrorRate, yAxis: 3, onLoad: false, color: 'rgb(231,76,60, 0.8)' }],
    ['bytesPerSecond', { name: Series.Network, yAxis: 4, onLoad: false, transform: this.networkTransform }]
  ]);

  constructor(private scenarioApiService: ScenarioApiService) {
  }

  ngOnInit() {
    this.scenarioApiService.fetchScenarioTrend(
      this.params.projectName,
      this.params.scenarioName)
      .subscribe(_ => this.generateChartLines(_));
  }

  generateChartLines(data: ScenarioTrendsData[]) {
    const dates = data.map(_ => moment(_.overview.startDate).format('DD. MM. YYYY HH:mm:ss'));
    const series = [];
    const seriesData = data.reduce((acc, current) => {
      for (const key of Object.keys(current.overview)) {

        if (!['startDate', 'endDate', 'duration'].includes(key)) {
          if (!acc[key]) {
            acc[key] = [[current.overview[key]]];
          } else {
            acc[key].push([current.overview[key]]);
          }
        }
      }
      return acc;
    }, {});

    console.log(seriesData)

    for (const key of Object.keys(seriesData)) {
      const chartSerieSettings = this.chartDataMapping.get(key);
      if (!chartSerieSettings) {
        continue;
      }
      series.push({
        name: chartSerieSettings.name || key,
        data: chartSerieSettings.transform ? chartSerieSettings.transform(seriesData[key]) : seriesData[key],
        yAxis: chartSerieSettings.yAxis || 0,
        visible: chartSerieSettings.onLoad || false,
        color: chartSerieSettings.color,
        type: chartSerieSettings.type,
      });
    }
    this.customScenarioTimeChartOption.series = JSON.parse(JSON.stringify(series));
    this.customScenarioTimeChartOption.xAxis['categories'] = dates;

    this.updateLabelChartFlag = true;
  }

}
