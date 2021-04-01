import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { customScenarioTrends } from 'src/app/graphs/scenario-trends';
import { Series } from 'src/app/graphs/series.model';
import { ScenarioTrendsData } from 'src/app/items.service.model';
import { ScenarioApiService } from 'src/app/scenario-api.service';

@Component({
  selector: 'app-scenario-trends',
  templateUrl: './scenario-trends.component.html',
  styleUrls: ['./scenario-trends.component.css']
})
export class ScenarioTrendsComponent implements OnInit {

  @Input() params;
  chartSeries;
  Highcharts: typeof Highcharts = Highcharts;
  updateLabelChartFlag = false;
  customScenarioTimeChartOption = {
    ...customScenarioTrends(), series: []
  };
  customScenarioThroughputChartOption = {
    ...customScenarioTrends(), series: []
  };
  chartDataMapping = new Map([
    ['percentil', { name: Series.ResponseTimeP90, onLoad: true }],
    ['avgResponseTime', { name: Series.ResponseTimeAvg, onLoad: false }],
    ['avgLatency', { name: Series.LatencyAvg, onLoad: false }],
    ['avgConnect', { name: Series.ConnetcAvg, onLoad: false }],
    ['throughput', { name: Series.Throughput, yAxis: 2, onLoad: true }],
    ['maxVu', { name: 'vu', yAxis: 1, onLoad: true }],
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

    for (const key of Object.keys(seriesData)) {
      const chartSerieSettings = this.chartDataMapping.get(key);
      if (key === 'maxVu') {
        series.push({
          name: chartSerieSettings.name,
          data: seriesData[key],
          type: 'spline', color: '#b7b7b717',
          yAxis: chartSerieSettings.yAxis
        });
      }
      series.push({
        name: chartSerieSettings && chartSerieSettings.name || key,
        data: seriesData[key],
        yAxis: chartSerieSettings && chartSerieSettings.yAxis || 0,
        visible: chartSerieSettings && chartSerieSettings.onLoad || false,
      });

    }
    this.chartSeries = series;
    const threads = series.find((_) => _.name === 'vu');
    const throughput = series.find((_) => _.name === Series.Throughput);
    const timeSeries = series.filter((_ => [Series.ConnetcAvg, Series.LatencyAvg,
    Series.ResponseTimeAvg, Series.ResponseTimeP90].includes(_.name)));
    this.customScenarioTimeChartOption.series = JSON.parse(JSON.stringify([...timeSeries, threads, throughput]));
    this.customScenarioTimeChartOption.xAxis['categories'] = dates;

    this.updateLabelChartFlag = true;
  }

}
