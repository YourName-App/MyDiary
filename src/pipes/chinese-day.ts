import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'chineseDay'
})
@Injectable()
export class ChineseDay {

  transform(value, args) {
    if (args === 'short') {
      return value.replace('星期', '');
    } else if (args === 'medium') {
      return value.replace('星期', '週');
    } else {
      return value;
    }
  }
}
