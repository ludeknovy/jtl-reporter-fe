import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachementsComponent } from './attachements.component';
import { HttpClientModule } from '@angular/common/http';

describe('AttachementsComponent', () => {
  let component: AttachementsComponent;
  let fixture: ComponentFixture<AttachementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttachementsComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
