import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummary } from '../../models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

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

}
