import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { customScenarioTrends } from 'src/app/graphs/scenario-trends';
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
  customScenarioChartOptions = {
    ...customScenarioTrends(), series: []
  };

  constructor(private scenarioApiService: ScenarioApiService) {
  }

  ngOnInit() {
    this.scenarioApiService.fetchScenarioTrend(
      this.params.projectName,
      this.params.scenarioName)
      .subscribe(_ => this.generateChartLines(_));
  }

  generateChartLines(data: ScenarioTrendsData[]) {
    const dates = data.map(_ => moment(_.overview.startDate).valueOf());
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
      series.push({ name: key, data: seriesData[key] });
    }
    this.chartSeries = series;
    console.log(series)
    this.customScenarioChartOptions.series = JSON.parse(JSON.stringify(series))
    this.customScenarioChartOptions.xAxis["categories"] = dates;
    this.updateLabelChartFlag = true;
  }

}
