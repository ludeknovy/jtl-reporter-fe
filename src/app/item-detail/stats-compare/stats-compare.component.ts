import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService } from 'src/app/items.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Items } from 'src/app/items.service.model';
import { ItemsApiService } from 'src/app/items-api.service';

const LIMIT = 15;
const OFFSET = 15;


@Component({
  selector: 'app-stats-compare',
  templateUrl: './stats-compare.component.html',
  styleUrls: ['./stats-compare.component.css']
})

export class StatsCompareComponent implements OnInit {
  items$: Observable<Items>;
  page = 1;
  pageSize = LIMIT;
  params;
  selectedTestItem;

  @Output() itemDetailToCompare = new EventEmitter<{}>();

  constructor(
    private modalService: NgbModal,
    private itemsService: ItemsService,
    private itemsApiService: ItemsApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.items$ = this.itemsService.items$;
  }

  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
    this.route.params.subscribe(_ => {
      this.params = _;
      this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0 });
    });
  }

  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset });
  }

  onSelectionChange(id) {
    this.selectedTestItem = id;
  }

  loadItemToCompare() {
    if (this.selectedTestItem) {
      this.itemsApiService.fetchItemDetail(this.params.projectName, this.params.scenarioName, this.selectedTestItem)
        .subscribe(_ => {
          this.itemDetailToCompare.emit({
            statistics: _.statistics,
            maxVu: _.overview.maxVu,
            id: this.selectedTestItem,
            environment: _.environment
          });
          this.page = 0;
          this.modalService.dismissAll();
        });
    }
  }

}
