export class ItemChartOption {
  public overallChart = null
  public threadsPerThreadGroup = null
  public scatterChartOptions = null
  public statusChartOptions = null

  setChartsOptions(options: { overallChart: any, threadsPerThreadGroup: any, scatterChartOptions: any, statusChartOptions: any }) {
    if (!options) {
      return
    }
    this.overallChart = options.overallChart
    this.threadsPerThreadGroup = options.threadsPerThreadGroup
    this.scatterChartOptions = options.scatterChartOptions
    this.statusChartOptions = options.statusChartOptions
  }

  resetChartOptions() {
    this.overallChart = null
    this.threadsPerThreadGroup = null
    this.scatterChartOptions = null
    this.statusChartOptions = null
  }
}
