import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BatchDeleteItemComponent } from "./batch-delete-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ItemsApiService } from "src/app/items-api.service";
import { ItemsService } from "src/app/items.service";
import { ScenarioService } from "src/app/scenario.service";
import { of } from "rxjs";

describe("BatchDeleteItemComponent", () => {
  let component: BatchDeleteItemComponent;
  let fixture: ComponentFixture<BatchDeleteItemComponent>;

  const mockItemsApiService = jasmine.createSpyObj("ItemsApiService", ["deleteItems", "setData"]);
  const mockItemsService = jasmine.createSpyObj("ItemsService", ["fetchItems"]);
  const mockScenarioService = jasmine.createSpyObj("ScenarioService", ["fetchScenarioTrends"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchDeleteItemComponent],
      imports: [ReactiveFormsModule, NgbModule],
      providers: [
        { provide: ItemsApiService, useValue: mockItemsApiService },
        { provide: ItemsService, useValue: mockItemsService },
        { provide: ScenarioService, useValue: mockScenarioService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDeleteItemComponent);
    component = fixture.componentInstance;
    component.selectedIds = ["id-1", "id-2"];
    component.projectName = "test-project";
    component.scenarioName = "test-scenario";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call deleteItems on submit", () => {
    mockItemsApiService.deleteItems.and.returnValue(of({ status: 204 }));
    component.myform.setValue({ deleteCheck: "abcde" });
    component.onSubmit();
    expect(mockItemsApiService.deleteItems).toHaveBeenCalledWith(
      ["id-1", "id-2"], "test-scenario", "test-project"
    );
    expect(mockItemsService.fetchItems).toHaveBeenCalled();
    expect(mockScenarioService.fetchScenarioTrends).toHaveBeenCalled();
  });
});
