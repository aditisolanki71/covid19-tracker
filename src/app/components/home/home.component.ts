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

  globalData : GlobalDataSummary[];

  pieChart: GoogleChartInterface = {
    chartType: 'pieChart'
  }
  constructor(private dataservice: DataServicesService) { }

  initChart() {
    let dataTable = [];
    dataTable.push(["Country","Cases"])
    this.globalData.forEach( cs => {
      dataTable.push([
        cs.country , cs.confirmed
      ])
    })
    this.pieChart = {
    chartType: 'PieChart',
    dataTable: dataTable,
    options: {
      height: 500
    },
    };
    console.log('datatable',dataTable)
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
        })
        this.initChart();
      }
    })
  }

}
