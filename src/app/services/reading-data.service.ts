import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadingDataService {

  constructor(private http: HttpClient) { }
  counter:  number = 0;

  getData() {
    return this.http
    .get('/assets/data/MOCK_DATA.csv', {responseType: 'text'});
  }

  handleData({str}: any) {
    if (str) {
      const dataArr: string[] = str.split('\r\n');
      const auxData = dataArr.map((item, index: any) => {
        const format = item.split(',');
        const auxObj = { id: index, name: format[0], email: format[1], phone: format[2] };
        return auxObj;
      });
      auxData.shift();
      console.log('Data formatted in formatData method: ', auxData);
      return auxData;
    } else {
      console.error('No string received in formatData method. Value received: ', str);
      return [];
    }
  }

  handleFormatDuplicatedData({item, arr}: any) {
    if (arr) {
      arr.forEach((data: any) => {
        const conditionalOne: boolean = data.id !== item.id;
        const conditionalTwo: boolean = (data.phone === item.phone || data.email === item.email || data.name === item.name);
        if (!data.duplicatedData && conditionalOne && conditionalTwo) {
          if (data.phone === item.phone) {
            data.duplicatedPhone = true; 
          }
          if (data.email === item.email) {
            data.duplicatedEmail = true;
          }
          if (data.name === item.name) {
            data.duplicatedName = true;
          }
          this.counter++;
          data.duplicatedData = true;
        }
      });
    }
  }

  handleDuplicatesInArray({arr}: {arr: any[];}): any {
    if (arr) {
      const uniqueArr = Array.from(new Set(arr));
      uniqueArr.forEach(item => this.handleFormatDuplicatedData({item, arr: uniqueArr}));
      return {uniqueArr,  counter: this.counter };
    } else {
      console.error('No array received in formatData method. Value received: ', arr);
      return [];
    }
  }
}
