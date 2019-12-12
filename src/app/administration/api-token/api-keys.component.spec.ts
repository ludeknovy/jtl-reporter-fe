import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeysComponent } from './api-keys.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AddTokenComponent } from './add-token/add-token.component';
import { ControlPanelComponent } from 'src/app/control-panel/control-panel.component';
import { DeleteTokenComponent } from './delete-token/delete-token.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


xdescribe('ApiKeysComponent', () => {
  let component: ApiKeysComponent;
  let fixture: ComponentFixture<ApiKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ApiKeysComponent, NavigationComponent, AddTokenComponent, ControlPanelComponent, DeleteTokenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
