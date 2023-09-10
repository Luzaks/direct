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
  tableHeaderValues: string[] = ['Nombre', 'Correo', 'Telefono'];
  tableBodyValues: any[] = [];
  p: number = 1;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.handleInitializeData();
    
  }

  ngOnDestroy(): void {
    this.tableBodyValues = [];
  }

  handleInitializeData() {
    this.readData.getData().subscribe(async (data) => {
      const formattedData = await this.readData.handleData({str: data});
      const { uniqueArr, counter } = await this.readData.handleDuplicatesInArray({arr: formattedData});
      this.tableBodyValues = uniqueArr;
      this.totalDuplicatedDataCount = counter;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000); 
    });
  }

  onTableDataChange(ev: any) {
    this.p = ev;
  }

}
