import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShareTokenComponent } from './new-share-token.component';

describe('NewShareTokenComponent', () => {
  let component: NewShareTokenComponent;
  let fixture: ComponentFixture<NewShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewShareTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
