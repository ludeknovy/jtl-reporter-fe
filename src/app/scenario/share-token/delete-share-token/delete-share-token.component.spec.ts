import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShareTokenComponent } from './delete-share-token.component';

describe('DeleteShareTokenComponent', () => {
  let component: DeleteShareTokenComponent;
  let fixture: ComponentFixture<DeleteShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShareTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
