import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectSettingsComponent} from './project-settings/project-settings.component';

@NgModule({
  declarations: [ProjectSettingsComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [ProjectSettingsComponent]
})
export class SharedProjectModule { }
