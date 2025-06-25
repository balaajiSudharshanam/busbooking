import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { scheduled } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { Booking, BusBookingPassenger, IScheduleData } from '../../Models/model';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, CommonModule, NgClass, FormsModule],
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
export class BookTicketComponent {
activateRoute=inject(ActivatedRoute);

searchService=inject(SearchService);
scheduleData!:IScheduleData;
seatNoList: number[]=[]; 
selectedSeatArray: BusBookingPassenger[]=[];
bookTicketObj:Booking= new Booking();
constructor(){
  this.activateRoute.params.subscribe((res:any)=>{
    
   const scheduleId=res.scheduleId;
   this.bookTicketObj.scheduleId=scheduleId;
   this.getBusDetails(scheduleId);
  })
 
}
getBusDetails(scheduleId: string){
this.searchService.getBusScheduleById(scheduleId).subscribe((res:IScheduleData)=>{
  this.scheduleData=res;
  for (let index = 1; index <= this.scheduleData.totalSeats; index++) {
    this.seatNoList.push(index);
    
  }
})
}
checkSelectedSeat(seatNo:number){
  const check=this.selectedSeatArray.find(m=>m.seatNo==seatNo);
  if(check==undefined){
    return false;
  }else{
    return true;
  }
}
toggleSeat(seatNo: number){
  if(this.checkSelectedSeat(seatNo)){
    this.selectedSeatArray=this.selectedSeatArray.filter(m=>m.seatNo!=seatNo);
  }else{
  const newPassenger: BusBookingPassenger={
    seatNo:seatNo,
    age:0,
    gender:'',
    bookingId:0,
    passengerId:0,
    passengerName:''

  }
  this.selectedSeatArray.push(newPassenger);
}
}
}
