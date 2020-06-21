import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary  } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data'
@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-16-2020.csv"
  private dateWiseDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

  constructor(private http: HttpClient) { }

  getDateWiseData() {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text'})
    .pipe(map(result => {
      console.log('res is',result)
      let rows = result.split("\n");
      let mainData = {};
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      //console.log('dates',dates);
      //console.log('rows',rows);  

      dates.splice(0,4);
      rows.splice(0,1);
      rows.forEach(row => {
        let cols = row.split(/,(?=\S)/);
        let con = cols[1];
        cols.splice(0,4);
        //console.log(con,cols);
        mainData[con] = [];
        //console.log('cols',cols);
        cols.forEach((value,index) => {
          let dw : DateWiseData = {
            cases : +value ,
            country : con ,
            date : new Date(Date.parse(dates[index]))
          };
          mainData[con].push(dw);      
        })
      })
      //console.log('maindata is',mainData);
      return mainData;
    }))
  }
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
      return <GlobalDataSummary[]>Object.values(raw);
    })
    )
  }
}
