export const normalizeOverviewData = (overviewData: any) => {
  // legacy property `percentil` mapped to a new property
  if (overviewData["percentil"]) {
    overviewData["percentile90"] = overviewData["percentil"]
  }
  return overviewData
}
