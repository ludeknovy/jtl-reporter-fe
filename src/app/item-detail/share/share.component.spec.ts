import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule } from '@rushvora/ng-datatable';
import { CreateNewShareLinkComponent } from './create-new-share-link/create-new-share-link.component';
import { DeleteShareLinkComponent } from './delete-share-link/delete-share-link.component';

import { ShareComponent } from './share.component';

describe('ShareComponent', () => {
  let component: ShareComponent;
  let fixture: ComponentFixture<ShareComponent>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareComponent, CreateNewShareLinkComponent, DeleteShareLinkComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        DataTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareComponent);
    component = fixture.componentInstance;
    component.params = { projectName: 'project', scenarioName: 'scenario', 'id': 'id'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
