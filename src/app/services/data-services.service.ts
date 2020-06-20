import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-16-2020.csv"
  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text'}).pipe(map(result => {
     let data: GlobalDataSummary[] = []
      let raw = {}
      let rows = result.split('\n')
     rows.splice(0,1);
     rows.forEach((row) => {
     let cols = row.split(/,(?=\S)/)
     let cs = {
       country: cols[3],
       confirmed: +cols[7],
       deaths: +cols[8],
       recovered: +cols[9],
       active: +cols[10],
     };
     let temp : GlobalDataSummary= raw[cs.country]
     if(temp) {
       temp.active += cs.active
       temp.confirmed += cs.confirmed
       temp.recovered += cs.recovered
       temp.deaths += cs.deaths
       raw[cs.country] = temp;
     }
     else {
       raw[cs.country] = cs;
     }
     })
      return Object.values(raw);
    })
    )
  }
}
