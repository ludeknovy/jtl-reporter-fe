import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-regression-alert',
  templateUrl: './thresholds-alert.component.html',
  styleUrls: ['./thresholds-alert.component.css', '../item-detail.component.scss']
})
export class ThresholdsAlertComponent implements OnInit {

  @Input() itemData;
  Math: any;

  constructor() {
    this.Math = Math;
   }

  ngOnInit() {
  }

}
