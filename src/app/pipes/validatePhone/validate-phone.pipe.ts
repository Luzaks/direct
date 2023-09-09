import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validatePhoneStyle'
})
export class ValidatePhonePipe implements PipeTransform {

  transform(phone: string): string {
    let result: string = 'warning-badge';
    const regex: RegExp =  /^\D*(\d\D*){10}$/g;
    if (regex.test(phone)) {
      result = 'passed-badge';
    } 
    return result;
  }

}
