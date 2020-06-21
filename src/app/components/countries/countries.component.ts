import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummary } from '../../models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GoogleChartInterface } from 'ng2-google-charts';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  dateWiseData ;
  selectedCountryData: DateWiseData[]

  lineChart: GoogleChartInterface = {
    chartType: 'lineChart'
  }

  data: GlobalDataSummary[];
  countries: String [] = [];
   constructor(private dataservice: DataServicesService) { }

  ngOnInit(): void {
    this.dataservice.getDateWiseData().subscribe(result => {
      console.log('globaldata',result)
      this.dateWiseData = result;
      this.updateChart();
    })
    this.dataservice.getGlobalData().subscribe(result => {
    this.data =result;
    this.data.forEach( cs => {
      this.countries.push(cs.country);
    })
  })
  }

  updateChart() {
    let dataTable = [];
    dataTable.push(['cases' , 'date']);
    this.selectedCountryData.forEach( cs =>{
      dataTable.push([cs.date , cs.cases])
    })
    
    this.lineChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    };
  }

  updateValues(country: string) {
    console.log(country)
    this.data.forEach( cs => {
      if(cs.country == country) {
        this.totalConfirmed = cs.confirmed
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
      }
    });
    this.selectedCountryData = this.dateWiseData[country];
    //console.log('select',this.selectedCountryData)
    this.updateChart();
  }

}
