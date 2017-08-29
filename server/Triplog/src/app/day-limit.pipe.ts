import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayLimit'
})
export class DayLimitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
