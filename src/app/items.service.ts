import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Items } from './items.service.model';
import { ItemsApiService } from './items-api.service';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  public interval;

  private processingItems = new BehaviorSubject<[]>([]);
  public processingItems$ = this.processingItems.asObservable();

  private items = new BehaviorSubject<Items>({ name: undefined, data: [], total: 0 });
  public items$ = this.items.asObservable();

  private shareTokens = new BehaviorSubject<[]>([]);
  public shareTokens$ = this.shareTokens.asObservable();

  constructor(
    private itemsApiService: ItemsApiService
  ) { }

  fetchItems(projectName, scenarioName, query = { limit: 15, offset: 0 }) {
    this.itemsApiService.fetchItems(projectName, scenarioName, query)
      .subscribe(_ => this.items.next(_));
  }

  fetchProcessingItems(projectName, scenarioName) {
    return this.itemsApiService.fetchProcessingItems(projectName, scenarioName).subscribe((_) => this.processingItems.next(_));
  }

  processingItemsInterval(projectName, scenarioName) {
    this.fetchProcessingItems(projectName, scenarioName);
    this.interval = interval(5000).subscribe(() => {
      return this.fetchProcessingItems(projectName, scenarioName);
    });
  }

  fetchItemShareTokens(projectName, scenarioName, itemId) {
    this.itemsApiService.fetchItemShareTokens(projectName, scenarioName, itemId).subscribe((_) => this.shareTokens.next(_));
  }

}
