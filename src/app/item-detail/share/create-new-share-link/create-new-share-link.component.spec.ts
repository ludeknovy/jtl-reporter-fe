import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewShareLinkComponent } from './create-new-share-link.component';

describe('CreateNewShareLinkComponent', () => {
  let component: CreateNewShareLinkComponent;
  let fixture: ComponentFixture<CreateNewShareLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewShareLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
