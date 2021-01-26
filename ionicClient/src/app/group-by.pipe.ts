import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(source: Array<any>, field: string) {
    console.log(source);
    return source;
  }
  }
