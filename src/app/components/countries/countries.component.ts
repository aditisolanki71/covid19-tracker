import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummary } from '../../models/global-data';

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

  data: GlobalDataSummary[];
  countries: String [] = [];
   constructor(private dataservice: DataServicesService) { }

  ngOnInit(): void {
      this.dataservice.getGlobalData().subscribe(result => {
    this.data =result;
    this.data.forEach( cs => {
      this.countries.push(cs.country);
    })
  })
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
  }

}
