import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Search } from '../../Models/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone:true
})
export class SearchComponent implements OnInit {
  http=inject(HttpClient);
  router=inject(Router);
  locationList:any[]=[];
  searchObj: Search=new Search();
  ngOnInit(): void {
      
      this.getAllocations();
  }
  getAllocations(){
    // debugger;
    this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetBusLocations").subscribe((res:any)=>{
      // debugger;
      this.locationList=res;
    })
  }
  
  searchBus(){
    // this.http.get("https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation="+this.searchObj.fromLocationId+"&toLocation="+this.searchObj.toLocationId+"&travelDate="+this.searchObj.date).subscribe((res:any)=>{
    //   debugger;
      
    // })
    this.router.navigate(['search-result',this.searchObj.fromLocationId,this.searchObj.toLocationId,this.searchObj.date]);
  }
  submit(){
    console.log(this.searchObj);
  }
}
