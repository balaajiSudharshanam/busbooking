import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScheduleData } from '../Models/model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl: string="https://api.freeprojectapi.com/api/BusBooking/"
  constructor(private http:HttpClient) { }


  searchBus(fromId:string,toId:string,date:string){
    // debugger;
       return this.http.get(this.apiUrl+"searchBus2?fromLocation="+fromId+"&toLocation="+toId+"&travelDate="+date+"")
      
    
  }

  getBusScheduleById(scheduleId:string):Observable<IScheduleData>{
    return this.http.get<IScheduleData>(this.apiUrl+"GetBusScheduleById?id="+scheduleId)
  }
}
