import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomChartsComponent } from './zoom-charts.component';

describe('ZoomChartsComponent', () => {
  let component: ZoomChartsComponent;
  let fixture: ComponentFixture<ZoomChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
