import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "urlEncode"
})
export class UrlEncodePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return encodeURIComponent(value);
  }

}
