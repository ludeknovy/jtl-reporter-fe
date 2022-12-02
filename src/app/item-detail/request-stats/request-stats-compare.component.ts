import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { ItemParams } from "src/app/scenario/item-controls/item-controls.model";
import { bytesToMbps, roundNumberTwoDecimals } from "../calculations";
import { AnalyzeChartService } from "../../analyze-chart.service";
import { ItemsApiService } from "src/app/items-api.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import html2canvas from "html2canvas";
import { ExcelService } from "src/app/_services/excel.service";
import { ItemDetail } from "../../items.service.model";



@Component({
  selector: "app-request-stats-compare",
  templateUrl: "./request-stats-compare.component.html",
  styleUrls: ["./request-stats-compare.component.css", "../item-detail.component.scss"]
})
export class RequestStatsCompareComponent implements OnInit, OnDestroy {

  @Input() itemData: ItemDetail;
  @Input() isAnonymous: boolean;
  @Input() params: ItemParams;

  @ViewChild("screen") screen: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("downloadLink") downloadLink: ElementRef;

  comparingData;
  comparedData;
  comparedDataMs;
  labelsData;
  comparisonWarning = [];
  comparedMetadata;
  defaultUnit = true;
  externalSearchTerm = "";

  constructor(
    private itemsService: ItemsApiService,
    private toastr: ToastrService,
    private analyzeChartService: AnalyzeChartService,
    private modalService: NgbModal,
    private excelService: ExcelService,
  ) {
  }

  ngOnInit() {
    this.labelsData = this.itemData.statistics;
    this.analyzeChartService.currentData.subscribe(data => {
      if (data && data.label) {
        this.search(data.label);
        this.externalSearchTerm = data.label;
      }
    });
  }

  ngOnDestroy() {
    this.analyzeChartService.changeMessage(null);
  }

  resetStatsData() {
    this.comparedData = null;
    this.labelsData = this.itemData.statistics;
    this.defaultUnit = true;
  }

  search(query: string) {
    const dataToFilter = this.comparedData || this.itemData.statistics;
    const terms = query.match(/(?:[^\s"]+|"[^"]*")+/g);

    let notTerm = null;
    let orTerms = [];

    if (terms && terms.length > 0) {
      if (terms[0] === "not" && terms.length > 1) {
        notTerm = terms[1];
        terms.splice(0, 1);
      }

      if (terms.includes("or")) {
        orTerms = terms.map((term, index, arr) => {
          if (term.toLowerCase() === "or") {
            return this.trimTerm(arr[index + 1]);
          } else if (index === 0) {
            return this.trimTerm(term);
          }
        });
      }

      // search with operators
      if (notTerm || orTerms.length > 0) {
        this.labelsData = dataToFilter
          .filter(x => {
            if (notTerm) {
              return this.trimTerm(x.label) !== this.trimTerm(notTerm);
            }
            return true;
          })
          .filter(x => {
            if (orTerms.length > 0) {
              return orTerms.includes(this.trimTerm(x.label));
            }
            return true;
          });
        return;
      }
      // fulltext search
      this.labelsData = dataToFilter.filter(x => this.trimTerm(x.label).includes(this.trimTerm(terms[0])));
    } else {
      this.labelsData = dataToFilter;
    }
  }

  clearSearch() {
    const dataToFilter = this.comparedData || this.itemData.statistics;
    this.labelsData = dataToFilter;
    this.externalSearchTerm = "";
  }

  itemToCompare(data) {
    this.resetStatsData();
    this.comparingData = data;
    this.comparedMetadata = { id: data.id, maxVu: data.maxVu };
    if (data.maxVu !== this.itemData.overview.maxVu) {
      this.comparisonWarning.push(`VU do differ ${this.itemData.overview.maxVu} vs. ${data.maxVu}`);
    }

    this.comparedDataMs = this.labelsData.map((_) => {
      const labelToBeCompared = data.statistics.find((__) => __.label === _.label);
      if (labelToBeCompared) {
        return {
          ..._,
          samples: (_.samples - labelToBeCompared.samples),
          avgResponseTime: (_.avgResponseTime - labelToBeCompared.avgResponseTime),
          minResponseTime: (_.minResponseTime - labelToBeCompared.minResponseTime),
          maxResponseTime: (_.maxResponseTime - labelToBeCompared.maxResponseTime),
          bytes: ((_.bytes - labelToBeCompared.bytes) / 1024).toFixed(2),
          bytesPerSecond: (_.bytesPerSecond - labelToBeCompared.bytesPerSecond),
          bytesSentPerSecond:(_.bytesSentPerSecond - labelToBeCompared.bytesSentPerSecond),
          n0: (_.n0 - labelToBeCompared.n0),
          n5: (_.n5 - labelToBeCompared.n5),
          n9: (_.n9 - labelToBeCompared.n9),
          errorRate: (_.errorRate - labelToBeCompared.errorRate),
          throughput: (_.throughput - labelToBeCompared.throughput)
        };
      } else {
        this.comparisonWarning.push(`${_.label} label not found`);
        return {
          ..._,
          avgResponseTime: null,
          minResponseTime: null,
          maxResponseTime: null,
          n0: null,
          n5: null,
          n9: null,
          errorRate: null,
          throughput: null,
          bytes: null,
        };
      }
    });
    if (data.environment !== this.itemData.environment) {
      this.comparisonWarning.push("Environments do differ");
    }
    this.comparedData = this.comparedDataMs;
    this.labelsData = this.comparedData;

    if (this.comparisonWarning.length) {
      this.showComparisonWarnings();
    }
  }

  quickBaseComparison(id) {
    this.itemsService.fetchItemDetail(
      this.params.projectName,
      this.params.scenarioName,
      id).subscribe(_ => this.itemToCompare({
        statistics: _.statistics,
        maxVu: _.overview.maxVu,
        environment: _.environment,
        id
      }));
  }

  showComparisonWarnings() {
    this.toastr.warning(this.comparisonWarning.join("<br>"), "Comparison Warning!",
      {
        closeButton: true,
        enableHtml: true,
        timeOut: 15000,
        positionClass: "toast-bottom-right"
      });
    this.comparisonWarning = [];
  }

  convertBytesToMbps(bytes) {
    return bytesToMbps(bytes);
  }

  switchComparisonDataUnit() {
    if (this.defaultUnit) {
      this.comparedData = this.labelsData.map((_) => {
        const labelToBeCompared = this.comparingData.statistics.find((__) => __.label === _.label);
        if (labelToBeCompared) {
          console.log(_.bytes, labelToBeCompared)
          return {
            ..._,
            avgResponseTime: this.calculatePercDifference(_.avgResponseTime, labelToBeCompared.avgResponseTime),
            minResponseTime: this.calculatePercDifference(_.minResponseTime, labelToBeCompared.minResponseTime),
            maxResponseTime: this.calculatePercDifference(_.maxResponseTime, labelToBeCompared.maxResponseTime),
            bytes: this.calculatePercDifference(_.bytes, labelToBeCompared.bytes) / 1024,
            n0: this.calculatePercDifference(_.n0, labelToBeCompared.n0),
            n5: this.calculatePercDifference(_.n5, labelToBeCompared.n5),
            n9: this.calculatePercDifference(_.n9, labelToBeCompared.n9),
            bytesPerSecond: this.calculatePercDifference(_.bytesPerSecond, labelToBeCompared.bytesPerSecond),
            bytesSentPerSecond:this.calculatePercDifference(_.bytesSentPerSecond, labelToBeCompared.bytesSentPerSecond),
            errorRate: this.calculatePercDifference(_.errorRate, labelToBeCompared.errorRate),
            throughput: this.calculatePercDifference(_.throughput, labelToBeCompared.throughput)
          };
        } else {
          this.comparisonWarning.push(`${_.label} label not found`);
          return {
            ..._,
            avgResponseTime: null,
            minResponseTime: null,
            maxResponseTime: null,
            n0: null,
            n5: null,
            n9: null,
            errorRate: null,
            throughput: null,
            bytes: null,
          };
        }
      });
    } else {
      this.comparedData = this.comparedDataMs;
    }

    this.defaultUnit = !this.defaultUnit;
    this.labelsData = this.comparedData;
  }

  private calculatePercDifference(x, y) {
    const percDiff = (x / y) * 100;
    if (percDiff === Infinity || isNaN(percDiff)) {
      return 0;
    }
    return roundNumberTwoDecimals(percDiff);
  }

  private trimTerm(term: string) {
    if (!term) {
      return;
    }
    return term
      .trim()
      .replace(/^"+|"+$/g, "")
      .toLowerCase();
  }

  focusLabel(label: string) {
    this.analyzeChartService.changeMessage({ label });
  }

  openSearchHelp(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  downloadAsPng() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL("image/png");
      this.downloadLink.nativeElement.download = "request-stats.png";
      this.downloadLink.nativeElement.click();
    });
  }

  downloadAsXLXS() {
    const dataToBeSaved = this.labelsData.map((label) =>
      ({ label: label.label, samples: label.samples, "avg [ms]": label.avgResponseTime, "min [ms]": label.minResponseTime,
       "max [ms]": label.maxResponseTime, "P90 [ms]": label.n0, "P95 [ms]": label.n5, "P99 [ms]": label.n9,
        "reqs/s": label.throughput, "network [mbps]": roundNumberTwoDecimals(this.convertBytesToMbps(label.bytesPerSecond + label.bytesSentPerSecond)), "error rate [%]": label.errorRate
      }))
    this.excelService.exportAsExcelFile(dataToBeSaved, `request-stats-${this.params.id}`)
  }

  displayColumn(value) {
    if (typeof value === "undefined" || value === null) {
      return true
    }
    return value
}
}
