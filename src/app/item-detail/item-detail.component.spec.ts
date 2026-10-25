import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ItemDetailComponent } from "./item-detail.component";
import { BreadcrumbComponent } from "../shared/breadcrumb/breadcrumb.component";
import { EditItemComponent } from "../shared/shared-item/edit-item/edit-item.component";
import { DeleteItemComponent } from "../shared/shared-item/delete-item/delete-item.component";
import { ControlPanelComponent } from "../shared/control-panel/control-panel.component";
import { StatsCompareComponent } from "./stats-compare/stats-compare.component";
import { HighchartsChartModule } from "highcharts-angular";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";


describe("ItemDetailComponent", () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ItemDetailComponent,
        BreadcrumbComponent,
        EditItemComponent,
        DeleteItemComponent,
        ControlPanelComponent,
        StatsCompareComponent,
    ],
    imports: [DataTableModule,
        HighchartsChartModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
