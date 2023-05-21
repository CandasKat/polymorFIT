import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProfile'
})
export class FilterProfilePipe implements PipeTransform {

  transform(value: any): any {
    return (value && value.profile && value.profile.exerciseTarget) ? value : null;
  }

}
