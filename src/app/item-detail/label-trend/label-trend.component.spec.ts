import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelTrendComponent } from './label-trend.component';
import { ChartModule } from 'angular-highcharts';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('LabelTrendComponent', () => {
  let component: LabelTrendComponent;
  let fixture: ComponentFixture<LabelTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTrendComponent ],
      imports: [
        ChartModule,
        HttpClientModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
