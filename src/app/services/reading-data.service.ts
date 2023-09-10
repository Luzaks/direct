import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StateService } from './globalService/initial-state-service.service';
import { Papa } from 'ngx-papaparse';

const initialState: any = {
  data: []
};

@Injectable({
  providedIn: 'root'
})
export class ReadingDataService extends StateService<any> {

  constructor(private http: HttpClient, private papa: Papa) {
    super(initialState);

  }
  dataList$: Observable<string[]> = this.select((state) => {
    return state;
  });
  counter:  number = 0;

  selectState(state: {data: string[]}) {
    this.setState(state);
}

  getData() {
    return this.http
    .get('/assets/data/MOCK_DATA.csv', {responseType: 'text'});
  }

  parsingData({csvData}: { csvData: string}): any {
    this.papa.parse(csvData,{
      complete: (result: any) => {
        if (result.data && result.data.length > 0) {
          console.log(result);
          this.selectState({data: [...result.data]});
        }
      }
  });
  }

  handleData({arr}: any) {
    if (arr) {
      // TO DO: Optimize, larger arrays will colapse
      const auxData = arr.map((item: string, index: number) => {
        const auxObj = { id: index, name: item[0], email: item[1], phone: item[2] };
        return auxObj;
      });
      auxData.shift();
      console.log('Data formatted in formatData method: ', auxData);
      return auxData;
    } else {
      console.error('No data received in formatData method. Value received: ', arr);
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

  handleDuplicatesInArray({arr}: {arr: any[]}): any {
    if (arr) {
      const uniqueArr = Array.from(new Set(arr));
      // TO DO: Optimize, larger arrays will colapse
      uniqueArr.forEach(item => this.handleFormatDuplicatedData({item, arr: uniqueArr}));
      return {uniqueArr,  counter: this.counter };
    } else {
      console.error('No array received in formatData method. Value received: ', arr);
      return [];
    }
  }
}
