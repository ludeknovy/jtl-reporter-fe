import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShareLinkComponent } from './delete-share-link.component';

describe('DeleteShareLinkComponent', () => {
  let component: DeleteShareLinkComponent;
  let fixture: ComponentFixture<DeleteShareLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteShareLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
