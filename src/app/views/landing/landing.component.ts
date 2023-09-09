import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient) {}

  tableHeaderValues: string[] = ['Nombre', 'Correo', 'Telefono'];
  tableBodyValues: any[] = [];
  p: number = 1;

  ngOnInit(): void {
      this.getData().subscribe(data => {
         this.formatData({str: data});
      });
    
  }

  ngOnDestroy(): void {
    
  }

  getData() {
    return this.http
    .get('/assets/data/MOCK_DATA.csv', {responseType: 'text'})
  }

  formatData({str}: any) {
    if (str) {
      const auxData = str.split('\r\n').map((item: any) => {
        const format = item.split(',');
        const auxObj = { name: format[0], email: format[1], phone: format[2] };
        return JSON.stringify(auxObj);
      });
      auxData.shift();
      
      this.tableBodyValues = this.eraseDuplicatesInArray({arr: auxData});
      console.log('Data formatted in formatData method: ', this.tableBodyValues);
    } else {
      console.error('No string received in formatData method. Value received: ', str);
    }
  }

  eraseDuplicatesInArray({arr}: {arr: any[]}) {
    if (arr) {
      const uniqueSet = new Set(arr);
      const uniqueArray = Array.from(uniqueSet).map(item => JSON.parse(item));
      return [...new Set(uniqueArray)]
    } else {
      console.error('No array received in formatData method. Value received: ', arr);
      return [];
    }
  }

  onTableDataChange(ev: any) {
    this.p = ev;
  }

  validateEmail({str}: {str: string;}) {

  }

  validatePhone({str}: {str: string;}) {

  }

}
