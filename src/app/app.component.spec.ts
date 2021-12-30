import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { NotificationComponent } from './notification/notification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AddNewProjectComponent } from './administration/projects/add-project/add-project-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TopPanelComponent,
        NotificationComponent,
        AddNewProjectComponent,
      ],
      imports: [
        RouterTestingModule,
        NgxSpinnerModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
      ]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'jtl-reporter'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('jtl-reporter');
  }));
});
