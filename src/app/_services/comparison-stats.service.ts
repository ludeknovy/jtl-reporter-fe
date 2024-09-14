import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ItemStatistics } from "../items.service.model";

@Injectable({
  providedIn: 'root'
})
export class ComparisonStatsService {

  private requestStats = new BehaviorSubject<ItemStatistics[]>([]);

  requestStats$ = this.requestStats.asObservable();


  setRequestStats(data: ItemStatistics[]) {
    this.requestStats.next(data);
  }

}
