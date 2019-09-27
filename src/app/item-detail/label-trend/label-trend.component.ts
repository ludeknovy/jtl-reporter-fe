import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from 'src/app/items-api.service';
import { Chart } from 'angular-highcharts';
import { colors } from 'src/app/graphs/colors';


@Component({
  selector: 'app-label-trend',
  templateUrl: './label-trend.component.html',
  styleUrls: ['./label-trend.component.css']
})
export class LabelTrendComponent implements OnInit {
  params;
  labelChart;

  @Input() labelName: any;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private itemsApiService: ItemsApiService,
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { size: 'xl' });
    this.route.params.subscribe(_ => {
      this.params = _;
      this.itemsApiService.fetchLabelTrend(
        this.params.projectName,
        this.params.scenarioName,
        this.params.id,
        { name: this.labelName }
      ).subscribe(__ => {
        this.labelChart = new Chart({
          chart: {
            type: 'spline'
          },
          title: { text: '' },
          subtitle: {
            text: ''
          },
          xAxis: [{
            lineWidth: 0,
            crosshair: true,
            categories: __.timePoints,
            tickInterval: 5,
            gridLineWidth: 0,
          }],
          yAxis: [{ // Primary yAxis
            labels: {
              format: '{value} ms',
            },
            type: 'logarithmic',
            title: {
              text: '',
            },
            gridLineWidth: 0
          }, {
            title: {
              text: '',
            },
            labels: {
              format: '{value} hit/s',
            },
            gridLineWidth: 0,
            opposite: true
          },
          {
            title: {
              text: '',
            },
            labels: {
              format: '{value} %',
              style: {
                lineWidt: 1,
              },
            },
            gridLineWidth: 0,
            opposite: true
          },
          {
            title: {
              text: '',
            },
            labels: {
              format: '{value} VU',
            },
            gridLineWidth: 0,
            opposite: false,
          }
          ],
          tooltip: {
            shared: true
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 0.7,
              dataGrouping: { enabled: true }
            }
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
          },
          series: [{
            name: '90%',
            type: 'areaspline',
            yAxis: 0,
            stacking: 'normal',
            data: __['n0'],
            // color: colors[0],
            color: '#FFC400',
            lineWidth: 0,
            tooltip: {
              valueSuffix: ' ms'
            },
            marker: { enabled: false },
          },
          {
            name: '95%',
            type: 'areaspline',
            yAxis: 0,
            // color: colors[3],
            color: '#36B37E',
            lineWidth: 0,
            data: __['n5'],
            tooltip: {
              valueSuffix: ' ms'
            },
            marker: { enabled: false },
            stacking: 'normal',
          },
          {
            name: '99%',
            type: 'areaspline',
            yAxis: 0,
            // color: colors[4],
            color: '#008DA6',
            lineWidth: 0,
            data: __['n9'],
            tooltip: {
              valueSuffix: ' ms'
            },
            marker: { enabled: false },
            stacking: 'normal',
          },
          {
            name: 'throughput',
            type: 'spline',
            data: __.throughput,
            color: '#5243AA',
            tooltip: {
              valueSuffix: ' hits/s'
            },
            yAxis: 1,
            // dashStyle: 'ShortDot',
            marker: { enabled: false, symbol: 'circle' }
          },
          {
            name: 'error rate',
            type: 'spline',
            data: __.errorRate,
            tooltip: {
              valueSuffix: ' %'
            },
            color: 'red',
            yAxis: 2,
            dashStyle: 'ShortDot',
            marker: { enabled: false, symbol: 'circle' }
          },
          {
            name: 'threads',
            type: 'spline',
            data: __.threads,
            tooltip: {
              valueSuffix: ' VU'
            },
            color: 'black',
            dashStyle: 'ShortDot',
            yAxis: 3,
            marker: { enabled: false, symbol: 'circle' }
          },
          ]
        });
      });
    });
  }
}
