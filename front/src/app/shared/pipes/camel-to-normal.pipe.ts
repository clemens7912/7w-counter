import { Pipe, PipeTransform } from '@angular/core';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';

@Pipe({
  name: 'camelToNormal',
  standalone: true
})
export class CamelToNormalPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(!value) {
      return value;
    }
    
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

}
