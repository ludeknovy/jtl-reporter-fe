import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export type UiAnalyticsEvent = "reportViewed" | "comparisonOpened";
export type ComparisonType = "manual" | "baseline";

@Injectable({ providedIn: "root" })
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  track(event: UiAnalyticsEvent, properties?: { comparisonType?: ComparisonType }): void {
    this.http.post("analytics/events", { event, ...properties }).subscribe({
      error: () => {
        // Analytics must never affect the application.
      },
    });
  }
}
