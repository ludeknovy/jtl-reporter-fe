import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTokenComponent } from './share-token.component';

describe('ShareTokenComponent', () => {
  let component: ShareTokenComponent;
  let fixture: ComponentFixture<ShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
