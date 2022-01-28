import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlDecode'
})
export class UrlDecodePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return decodeURIComponent(value);
  }

}
