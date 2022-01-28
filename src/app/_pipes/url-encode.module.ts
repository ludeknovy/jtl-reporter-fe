import { NgModule } from "@angular/core";
import { UrlEncodePipe } from "./url-encode.pipe";

@NgModule({
    declarations: [UrlEncodePipe],
    exports: [UrlEncodePipe]
  })
  export class UrlEncodePipeModule { }
  