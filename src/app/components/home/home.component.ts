import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataservice: DataServicesService) { }

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next: (result) => {
        console.log('res',result)
      }
    })
  }

}
