import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "urlEncode",
    standalone: false
})
export class UrlEncodePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return encodeURIComponent(value);
  }

}
