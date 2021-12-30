import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableModule } from '@rushvora/ng-datatable';
import { HighchartsChartModule } from 'highcharts-angular';
import { LabelHealthComponent } from './label-health.component';

describe('LabelHealthComponent', () => {
  let component: LabelHealthComponent;
  let fixture: ComponentFixture<LabelHealthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelHealthComponent ],
      imports: [HighchartsChartModule, DataTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
