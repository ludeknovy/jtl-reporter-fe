import { Component } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css', '../../shared-styles.css']
})
export class ControlPanelComponent {

  navbarOpen = false;

  constructor() { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}