import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Items } from './items.service.model';
import { ItemsApiService } from './items-api.service';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  private items = new BehaviorSubject<Items>({ name, data: [], total: 0 });
  public items$ = this.items.asObservable();

  constructor(
    private itemsApiService: ItemsApiService
  ) { }

  fetchItems(projectName, scenarioName, query = { limit: 15, offset: 0 }) {
    this.itemsApiService.fetchItems(projectName, scenarioName, query)
      .subscribe(_ => this.items.next(_));
  }

}
