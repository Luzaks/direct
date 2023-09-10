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
  p: number = 1;
  isLoading: boolean = true;

  ngOnInit(): void {
    // Obtain data from file and parse it for front end
    this.handleInitializeData();
    // Read parsed data from global state
    this.valueSubs = this.readData.dataList$.subscribe(async (data: any) => {
      if (data.data && data.data.length > 0) {
        // Process formmat for front end UI/UX availability
        this.handleProcessData(data.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.tableBodyValues = [];
    if (this.valueSubs){
      this.valueSubs.unsubscribe();
    }
  }

  handleInitializeData() {
    this.readData.getData().subscribe(async (data) => {
      this.readData.parsingData({csvData: data});
    });
  }

  async handleProcessData(data: any) {
    // Obtain
    this.tableBodyValues = await this.readData.handleData({arr: data});
    this.totalDuplicatedDataCount = await this.readData.handleReturnData();
    setTimeout(() => {
      this.isLoading = false;
    }, 500); 
  }

  onTableDataChange(ev: any) {
    this.p = ev;
  }

}
