import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReadingDataService } from '../../services/reading-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(private readData: ReadingDataService) {}

  totalDuplicatedDataCount: number = 0;
  tableHeaderValues: string[] = ['Id', 'Nombre', 'Correo', 'Telefono'];
  tableBodyValues: any[] = [];
  valueSubs: any;
  auxList: any[] = [];
  p: number = 1;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.handleInitializeData();
    this.valueSubs = this.readData.dataList$.subscribe(async (data: any) => {
      if (data.data.length > 0) {
        this.handleTry(data.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.tableBodyValues = [];
    if (this.valueSubs){
      this.valueSubs.unsubscribe();
    }
  }

  async handleTry(data: any) {
    const formattedData = await this.readData.handleData({arr: data});
    const { uniqueArr, counter } = await this.readData.handleDuplicatesInArray({arr: formattedData});
    this.tableBodyValues = uniqueArr;
    this.totalDuplicatedDataCount = counter;
    setTimeout(() => {
      this.isLoading = false;
    }, 500); 
  }

  handleInitializeData() {
    this.readData.getData().subscribe(async (data) => {
      this.readData.parsingData({csvData: data});
    });
  }

  onTableDataChange(ev: any) {
    this.p = ev;
  }

}
