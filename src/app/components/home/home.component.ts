import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';

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
  constructor(private dataservice: DataServicesService) { }

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next: (result) => {
        console.log('res',result)
        this.globalData = result;
        result.forEach(cs => {
          if(!Number.isNaN(cs.confirmed)) {
          this.totalConfirmed += cs.confirmed;
          this.totalActive += cs.active;
          this.totalDeaths += cs.deaths;
          this.totalRecovered += cs.recovered;
          }
        })
      }
    })
  }

}
