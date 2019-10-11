import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCompareComponent } from './stats-compare.component';
import { BreadcrumbComponent } from 'src/app/breadcrumb/breadcrumb.component';
import { AddNewItemComponent } from 'src/app/scenario/add-new-item/add-new-item.component';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('StatsCompareComponent', () => {
  let component: StatsCompareComponent;
  let fixture: ComponentFixture<StatsCompareComponent>;

  beforeEach(async(() => {
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
