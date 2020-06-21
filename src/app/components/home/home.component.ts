import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummary } from '../../models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dataTable = [];
  globalData : GlobalDataSummary[];

  pieChart: GoogleChartInterface = {
    chartType: 'pieChart'
  };

  columnChart: GoogleChartInterface = {
    chartType: 'columnChart'
  };
  constructor(private dataservice: DataServicesService) { }
 
   updateChart(input: HTMLInputElement) {
     console.log('inside update chart',input.value);
    console.log(input.value);
    this.initChart(input.value);
  }
  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next: (result) => {
        this.globalData = result;
        result.forEach(cs => {
          if(!Number.isNaN(cs.confirmed)) {
          this.totalConfirmed += cs.confirmed;
          this.totalActive += cs.active;
          this.totalDeaths += cs.deaths;
          this.totalRecovered += cs.recovered;
          }
        });
        this.initChart('c');
      }
    });
  }

   initChart(caseType: string) {
    console.log('inside initchart',caseType);
    this.dataTable = [];
    this.dataTable.push(["Country","Cases"]);
    this.globalData.forEach( cs => {
      let value : number
      if(caseType == 'c')
        if(cs.confirmed > 2000)
          value = cs.confirmed;
     
        if(caseType == 'a')
          if(cs.active > 2000)
            value = cs.active;
 
        if(caseType == 'd')
          if(cs.deaths > 1000)
            value = cs.deaths;
 
        if(caseType == 'r')
          if(cs.recovered > 2000)
              value = cs.recovered;
   
          this.dataTable.push([
          cs.country , value
         ]);
    });

    console.log('casetype is',caseType);
    console.log('datatable',this.dataTable);
        this.pieChart = {
        chartType: 'PieChart',
        dataTable: this.dataTable,
        options: {
          height: 500
          },
        };
        
        console.log('piechart',this.pieChart);
        this.columnChart = {
        chartType: 'ColumnChart',
        dataTable: this.dataTable,
        options: {
          height: 500
          },
        };

        console.log('columnchart',this.columnChart);
    }

}
