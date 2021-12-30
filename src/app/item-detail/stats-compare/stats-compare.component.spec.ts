import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsCompareComponent } from './stats-compare.component';
import { BreadcrumbComponent } from 'src/app/shared/breadcrumb/breadcrumb.component';
import { AddNewItemComponent } from 'src/app/scenario/add-new-item/add-new-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule } from '@rushvora/ng-datatable';

describe('StatsCompareComponent', () => {
  let component: StatsCompareComponent;
  let fixture: ComponentFixture<StatsCompareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatsCompareComponent, BreadcrumbComponent, AddNewItemComponent],
      imports: [
        DataTableModule,
        NgbModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
