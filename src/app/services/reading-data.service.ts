import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StateService } from './globalService/initial-state-service.service';
import { Papa } from 'ngx-papaparse';
import * as _ from 'lodash';

interface InitialStateProps {
  data: string[] | undefined;
}

interface TypeObjProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  duplicatedPhone?: boolean;
  duplicatedEmail?: boolean;
  duplicatedName?: boolean;
  duplicatedData?: boolean;
}

const initialState: InitialStateProps = {
  data: undefined
};

@Injectable({
  providedIn: 'root'
})
export class ReadingDataService extends StateService<any> {

  constructor(private http: HttpClient, private papa: Papa) {
    super(initialState);

  }
  dataList$: Observable<InitialStateProps> = this.select((state) => {
    return state;
  });
  counter:  number = 0;

  selectState(state: InitialStateProps) {
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
          this.selectState({data: [...result.data]});
        }
      }
  });
  }

  handleData({arr}: any) {    
    if (arr) {
      // Get Unique array
      const uniqueObjArray =  this.handleUniqArr(arr);
         // Manipulate uniq array data format
      const auxData = uniqueObjArray.map((item: string, index: number) => {
        const auxObj: TypeObjProps = { id: index, name: item[0], email: item[1], phone: item[2] };
          // Manipulate uniq array data format
        this.handleFormatDuplicatedDataInfo({item: auxObj, arr: uniqueObjArray});
        if (auxObj.duplicatedData) this.counter++;
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

  handleUniqArr(arr: any) {
    return _.uniqWith((arr), (a: any, b: any) => a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2]
  );
  }

  async handleFormatDuplicatedDataInfo({item, arr}: any) {
    if (arr) {
      arr.forEach((data: any, index: number) => {
        const conditionalOne: boolean = index !== item.id;
        const conditionalTwo: boolean = (data[2] === item.phone || data[1] === item.email || data[0] === item.name);
        if (conditionalOne && conditionalTwo) {
          if (data[2] === item.phone) {
            item.duplicatedPhone = true; 
          }
          if (data[1] === item.email) {
            item.duplicatedEmail = true;
          }
          if (data[0] === item.name) {
            item.duplicatedName = true;
          }
          item.duplicatedData = true;
        }
      });
    }
  }

  handleReturnData(): any {
    return this.counter;
  }
}
