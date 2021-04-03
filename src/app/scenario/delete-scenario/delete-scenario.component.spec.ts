import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteScenarioComponent } from './delete-scenario.component';


describe('DeleteScenarioComponent', () => {
  let component: DeleteScenarioComponent;
  let fixture: ComponentFixture<DeleteScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteScenarioComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
