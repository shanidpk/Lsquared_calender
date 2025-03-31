import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent implements OnInit{

  display: string = '';
  selectedDate: string = '';
  days: number[] = [];
  year: number;
  month: number;
  today: { date: any; month: any; year: any; };
  
  constructor() {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.today = { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() };

  }



/*   currentDate = new Date();
  daysInMonth: number[] = [];
  weeks: any[] = []; // To store the grid structure
  todayDate:number = this.currentDate.getDate();
  months = ["January","February","March","April","May","June","July","August","September","October","November","December"]; */


  ngOnInit() {
    // this.generateCalendar();
    this.displayCalendar()
  }

 /*  generateCalendar() {
    const year = this.currentDate.getFullYear();
    console.log(year,'year')
    const month = this.currentDate.getMonth();
    console.log(year,'month')

    const dat = this.currentDate.getDate();

    // Get first and last day
    const firstDay = new Date(year, month, 1).getDay(); // Day index (0-Sunday, 6-Saturday)
    const totalDays = new Date(year, month + 1, 0).getDate(); // Days in month

    let days = [];

    // Add previous month's remaining days
    let prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, currentMonth: false });
    }

    // Add current month's days
    for (let i = 1; i <= totalDays; i++) {
      days.push({ date: i, currentMonth: true });
    }

    // Fill remaining days from next month
    let nextDays = 42 - days.length; // Assuming a 6-row calendar
    for (let i = 1; i <= nextDays; i++) {
      days.push({ date: i, currentMonth: false });
    }

    // Break into weeks (7 days per week)
    // this.weeks = [];
    // while (days.length) {
    //   this.weeks.push(days.splice(0, 7));
    //   console.log(this.weeks,'weeks')
    // }
  }

  changeMonth(offset: number) {

    let date1 = new Date();
    
    let todayMonth = date1.getMonth();
    console.log(date1.getFullYear())
    
    console.log(this.months[todayMonth])
    // this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    // this.generateCalendar();
  } */

    displayCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const numberOfDays = new Date(this.year, this.month + 1, 0).getDate();
      this.display = new Date(this.year, this.month).toLocaleString('en-US', { month: 'long', year: 'numeric' });
      
      this.days = Array(firstDay).fill(0).concat(Array.from({ length: numberOfDays }, (_, i) => i + 1));

      console.log(this.today.date,'ss')
    }

    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
      this.displayCalendar();
    }

    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year += 1;
      } else {
        this.month += 1;
      }
      this.displayCalendar();
    }

    selectDate(day: number) {
    this.selectedDate = new Date(this.year, this.month, day).toDateString();
  }
}
