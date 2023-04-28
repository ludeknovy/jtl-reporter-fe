import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable, Subscription } from "rxjs";
import { Items } from "./items.service.model";
import { ItemsApiService } from "./items-api.service";

@Injectable({
  providedIn: "root"
})

export class ItemsService {
  private interval;

  private processingItems = new BehaviorSubject<[]>([]);
  public processingItems$ = this.processingItems.asObservable();

  private items = new BehaviorSubject<Items>({ name: undefined, data: [], total: 0 });
  public items$ = this.items.asObservable();

  private shareTokens = new BehaviorSubject<[]>([]);
  public shareTokens$ = this.shareTokens.asObservable();

  public intervalSubscription: Subscription;

  private environment = ""


  constructor(
    private itemsApiService: ItemsApiService,
  ) {
  }

  fetchItems(projectName, scenarioName, query: ItemsQuery = { limit: 15, offset: 0 }) {
    const queryParams = { ...query, environment: this.environment };
    this.itemsApiService.fetchItems(projectName, scenarioName, queryParams)
      .subscribe(_ => this.items.next(_));
  }

  fetchProcessingItems(projectName, scenarioName, queryParams) {
    return this.itemsApiService.fetchProcessingItems(projectName, scenarioName, queryParams).subscribe((_) => this.processingItems.next(_));
  }

  setProcessingItemsIntervalSubscription(projectName, scenarioName) {
    this.fetchProcessingItems(projectName, scenarioName, { environment: this.environment });
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    this.intervalSubscription = interval(5000).subscribe(() => {
      return this.fetchProcessingItems(projectName, scenarioName, { environment: this.environment });
    });
  }

  fetchItemShareTokens(projectName, scenarioName, itemId) {
    this.itemsApiService.fetchItemShareTokens(projectName, scenarioName, itemId).subscribe((_) => this.shareTokens.next(_));
  }

  // some of the above methods are called from various places, this way we can propagate the environment to all of them
  setEnvironment(environment) {
    this.environment = environment;
  }

}

interface ItemsQuery {
  limit: number,
  offset: number,
  environment?: string
}
