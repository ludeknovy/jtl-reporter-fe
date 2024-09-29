import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css', '../../shared-styles.css']
})
export class ControlPanelComponent {

  @Input() shouldStick = false;

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.shouldStick) {
      return
    }
    const element = document.querySelector("#top-panel") as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add("navbar-inverse");
    } else {
      element.classList.remove("navbar-inverse");
    }
  }

}
