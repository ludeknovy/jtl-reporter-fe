import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemControlsComponent } from './item-controls.component';

describe('ItemControlsComponent', () => {
  let component: ItemControlsComponent;
  let fixture: ComponentFixture<ItemControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
