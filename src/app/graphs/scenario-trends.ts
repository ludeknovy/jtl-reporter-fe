import { ScenarioTrendsData } from '../items.service.model';
import * as moment from 'moment';

const options = ({ data, projectId, scenarioId }, yUnit) => {
  return {
    hover: {
      intersect: true,
      onHover: function (event, elements) {
        event.target.style.cursor = elements[0] ? 'pointer' : 'default';
      }
    },
    legend: false,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function (t, d) {
          if (t.datasetIndex === 0) {
            return `${t.yLabel} ${yUnit}`;
          } else if (t.datasetIndex === 1) {
            return `${t.yLabel} VU`;
          }
        }
      }
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          drawBorder: false,
          display: false,
          type: 'time'
        },
      }],
      yAxes: [
        {
          type: 'linear',
          position: 'left',
          id: 'A',
          gridLines: {
            color: '#b7b7b717',
            zeroLineColor: '#b7b7b717',
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: yUnit,
            padding: -3,
            fontColor: '#888888c7'
          },
          ticks: {
            beginAtZero: true,
            min: 0
          }
        },
        {
          id: 'B',
          type: 'linear',
          position: 'right',
          gridLines: {
            color: '#FFFFFF',
            zeroLineColor: '#FFFFFF',
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            display: false
          },
          scaleLabel: {
            display: false,
            labelString: 'threads',
            padding: -3,
            fontColor: '#888888c7'
          },
        }
      ]
    },
    onClick: function (e) {
      const element = this.getElementAtEvent(e);
      if (element.length) {
        const index = element[0]._index;
        const itemId = data[index].id;
        window.location.href = `/project/${projectId}/scenario/${scenarioId}/item/${itemId}`;
      }
    }
  };
};

export const customScenarioTrends = () => {
  return {
    chart: {
      type: 'column',
      zoomType: 'x',
      marginTop: 30,
      className: 'hg-chart',
    },
    time: {
      getTimezoneOffset: function (timestamp) {
        const d = new Date();
        const timezoneOffset = d.getTimezoneOffset();
        return timezoneOffset;
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false
        },
      }
    },
    title: {
      text: ''
    },
    colors: ['#5DADE2', '#2ECC71', '#F4D03F', '#D98880',
      '#707B7C', '#7DCEA0', '#21618C', '#873600', '#AF7AC5', '#B7950B'],
    tooltip: {
      split: false,
      crosshairs: [true],
      shared: true
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        pointWidth: 20,
      },
      line: {
        lineWidth: 1.5,
        states: {
          hover: {
            lineWidth: 1.5
          }
        },
        marker: {
          enabled: false
        },
      }
    },
    xAxis: {
      min: 0,
      max: 15,
      lineWidth: 0,
      type: 'datetime',
      crosshair: {
        snap: true
      },
      labels: {
        enabled: false
      }
    },
    yAxis: [
      {
        gridLineColor: '#f2f2f2',
        lineWidth: 0,
        showEmpty: false,
        title: {
          text: 'ms'
        },
      },
      {
        gridLineColor: '#f2f2f2',
        lineWidth: 0,
        opposite: true,
        showEmpty: false,
        title: {
          text: 'VU'
        },
      },
      {
        gridLineColor: '#f2f2f2',
        lineWidth: 0,
        showEmpty: false,
        title: {
          text: 'hits/s'
        },
      },
      {
        gridLineColor: '#f2f2f2',
        lineWidth: 0,
        opposite: true,
        showEmpty: false,
        title: {
          text: '%'
        },
      },
      {
        gridLineColor: '#f2f2f2',
        lineWidth: 0,
        opposite: true,
        showEmpty: false,
        title: {
          text: 'mbps'
        },
      }
    ],
  };
};


export const scenarioHistoryGraphs = (historyData: ScenarioTrendsData[], projectId, scenarioId) => {
  const dates = historyData.map(_ => moment(_.overview.startDate).format('DD. MM. YYYY HH:mm'));
  const intervals = [
    { name: 'avgResponseTime', color: 'rgb(87,95,207, 0.8)', unit: 'ms' },
    { name: 'throughput', color: 'rgb(41,128,187, 0.8)', unit: 'hit/s' },
    { name: 'errorRate', color: 'rgb(231,76,60, 0.8)', unit: '%' },
    { name: 'percentil', color: 'rgb(17,122,139, 0.8)', unit: 'ms' }].map(({ name, color, unit }) => {

      // in case of no data create empty graph data to allow afterDraw hook to work
      if (historyData.length === 0) {
        return {
          name,
          data: {
            type: 'bar',
            data: {
              maxBarNumber: 15,
              labels: [],
              datasets: [],
            },
            options
          }
        };
      }

      const datasets = [
        {
          data: historyData.map((__) => __.overview[name]),
          borderColor: color,
          backgroundColor: color,
          fill: true,
          borderWidth: 1,
          yAxisID: 'A',
        },
        {
          data: historyData.map((__) => __.overview.maxVu),
          type: 'line',
          showLine: false,
          yAxisID: 'B',
          fill: false,
          borderColor: '#000000',
          pointRadius: 5,
          pointStyle: 'line',
        }
      ];
      return {
        name,
        data: {
          type: 'bar',
          data: {
            maxBarNumber: 15,
            labels: dates,
            datasets,
          },
          options: options({ data: historyData, projectId, scenarioId }, unit)
        }
      };
    });
  return {
    responseHistoryTimeChart: intervals.find(_ => _.name === 'avgResponseTime').data,
    throughputHistoryChart: intervals.find(_ => _.name === 'throughput').data,
    errorRateHistoryChart: intervals.find(_ => _.name === 'errorRate').data,
    ninetyHistoryChart: intervals.find(_ => _.name === 'percentil').data,
  };
};

export const scenarioResponseTime = () => {
  return {
    chart: {
      type: 'column',
      zoomType: 'x',
      marginTop: 30,
      className: 'chart-sync',
    },
    legend: false,
    time: {
      getTimezoneOffset: function (timestamp) {
        const d = new Date();
        const timezoneOffset = d.getTimezoneOffset();
        return timezoneOffset;
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 400,
          maxHeight: 200,
        },
        // Make the labels less space demanding on mobile
        chartOptions: {
          xAxis: {
            labels: {
              formatter: function () {
                return this.value.charAt(0);
              }
            }
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -2
            },
            title: {
              text: ''
            }
          }
        }
      }]
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false
        },
      }
    },
    title: {
      text: ''
    },
    colors: ['#5DADE2', '#2ECC71', '#F4D03F', '#D98880',
      '#707B7C', '#7DCEA0', '#21618C', '#873600', '#AF7AC5', '#B7950B'],
    tooltip: {
      split: false,
      crosshairs: [true],
      shared: true
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        pointWidth: 20,
      },
      line: {
        lineWidth: 1.5,
        states: {
          hover: {
            lineWidth: 1.5
          }
        },
        marker: {
          enabled: false
        },
      }
    },
    xAxis: {
      min: 0,
      max: 15,
      lineWidth: 0,
      type: 'datetime',
      crosshair: {
        snap: true
      },
      labels: {
        enabled: false
      }
    },
    yAxis: [
      {
        gridLineColor: '#f2f2f2',
        lineWidth: 0,
        showEmpty: false,
        title: {
          text: 'ms'
        },
      },
    ],
  };
};
