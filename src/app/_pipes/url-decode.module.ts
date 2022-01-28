import { NgModule } from "@angular/core";
import { UrlDecodePipe } from "./url-decode.pipe";

@NgModule({
    declarations: [UrlDecodePipe],
    exports: [UrlDecodePipe]
  })
  export class UrlDecodePipeModule { }
  