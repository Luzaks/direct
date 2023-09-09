import { Pipe, PipeTransform } from '@angular/core';
import * as EmailValidator from 'email-validator';

@Pipe({
  name: 'validateEmailStyle'
})
export class ValidateEmailPipe implements PipeTransform {

  transform(email: string): string {
    let result: string = 'warning-badge';
    if (EmailValidator.validate(email)) {
      result = 'passed-badge';
    } 
    return result;
  }

}
