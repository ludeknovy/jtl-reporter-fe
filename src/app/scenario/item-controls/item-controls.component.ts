import { Component, Input, OnInit } from "@angular/core";
import { ItemInput } from "./item-controls.model";

@Component({
  selector: "app-item-controls",
  templateUrl: "./item-controls.component.html",
  styleUrls: ["./item-controls.component.css"]
})
export class ItemControlsComponent {

  @Input() item: ItemInput;

}
