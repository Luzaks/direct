import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient) {}

  totalDuplicatedDataCount: number = 0;
  tableHeaderValues: string[] = ['Nombre', 'Correo', 'Telefono'];
  tableBodyValues: any[] = [];
  p: number = 1;
  isLoading: boolean = true;

  ngOnInit(): void {
      this.getData().subscribe(async (data) => {
        const formattedData = await this.handleData({str: data});
        this.tableBodyValues = await this.handleDuplicatesInArray({arr: formattedData});
         this.isLoading = false;
      });
    
  }

  ngOnDestroy(): void {
    
  }

  getData() {
    return this.http
    .get('/assets/data/MOCK_DATA.csv', {responseType: 'text'})
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
            item.duplicatedPhone = true; 
            data.duplicatedPhone = true; 
          }
          if (data.email === item.email) {
            item.duplicatedEmail = true;
            data.duplicatedEmail = true;
          }
          if (data.name === item.name) {
            item.duplicatedName = true;
            data.duplicatedName = true;
          }
          this.totalDuplicatedDataCount++;
          item.duplicatedData = true;
          data.duplicatedData = true;
        }
      });
    }
  }

  handleDuplicatesInArray({arr}: {arr: any[]}) {
    if (arr) {
      const uniqueArr = Array.from(new Set(arr));
      uniqueArr.forEach(item => this.handleFormatDuplicatedData({item, arr: uniqueArr}))
      return uniqueArr;
    } else {
      console.error('No array received in formatData method. Value received: ', arr);
      return [];
    }
  }

  onTableDataChange(ev: any) {
    this.p = ev;
  }

}
