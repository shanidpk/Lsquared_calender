import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface Task {
  date: string;
  text: string;
  id: string;
  color?: string
}

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule,NgbModule,FormsModule],
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
  strNewTask:string = '';
  seletedTask: [] | any;
 colors: { [key: string]: string }[] = [
  { red: "#FF5733" },      // Red
  { green: "#33FF57" },    // Green
  { blue: "#3357FF" },     // Blue
  { yellow: "#F3C300" },   // Yellow
  { purple: "#9A2EFE" },   // Purple
  { orange: "#FFA500" }    // Orange
];
  
tasks: Task[] = [
  {
    "date": "Tue Apr 1 2025",
    "text": "Complete Task",
    "id": "task001",
    "color": "#FF5733" // Red
  },
  {
    "date": "Tue Apr 15 2025",
    "text": "Running",
    "id": "task002",
    "color": "#33FF57" // Green
  },
  {
    "date": "Wed Apr 16 2025",
    "text": "Cycling",
    "id": "task003",
    "color": "#3357FF" // Blue
  },
  {
    "date": "Thu Apr 17 2025",
    "text": "Swimming",
    "id": "task004",
    "color": "#F3C300" // Yellow
  },
  {
    "date": "Fri Apr 18 2025",
    "text": "Yoga",
    "id": "task005",
    "color": "#9A2EFE" // Purple
  },
  {
    "date": "Sat Apr 19 2025",
    "text": "Gym Workout",
    "id": "task006",
    "color": "#cccccc" // Default Gray
  }
];

  constructor(private modalService: NgbModal) {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.today = { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
    
  }


  ngOnInit() {
    // this.generateCalendar();
    this.displayCalendar()
  }


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

    fnSelectDate(day: number) {
    this.selectedDate = new Date(this.year, this.month, day).toDateString();
  }

  showAddTaskModal(modal: any,date:any) {

   if(this.strNewTask ) {
    this.strNewTask = ''
   }
    
    this.modalService.open(modal);
  }

  onSubmitModal() {

    if (!this.selectedDate || !this.strNewTask.trim()) return;

    this.tasks.push({ date: this.selectedDate, text: this.strNewTask, id:`task00${this.tasks.length+1}`});
    this.strNewTask = ''; // Clear input

    this.modalService.dismissAll()
     
    console.log(this.tasks,'task arr')
  }

  getTasksForDate(date: string): Task[] {
  
  return this.tasks.filter((task) => {
  
    // Convert both dates to "YYYY-M-D" format
    const formattedTaskDate = new Date(task.date).getFullYear() + '-' + 
                              (new Date(task.date).getMonth() + 1) + '-' + 
                              new Date(task.date).getDate();
  
    const formattedSelectedDate = new Date(date).getFullYear() + '-' + 
                                  (new Date(date).getMonth() + 1) + '-' + 
                                  new Date(date).getDate();
  
    return formattedTaskDate === formattedSelectedDate;
  });
  }

  showEditModal(event:Event,modal:any,index:number, task:any) {
    this.seletedTask = task

    console.log(this.seletedTask,'selected task')
    event.stopPropagation();
    this.modalService.dismissAll();
    this.modalService.open(modal)
    this.strNewTask = task.text;

  }


  showAllTasks(selectedDate: string) {
    console.log("Show all tasks for", selectedDate);
    // You can open a modal or expand the list when clicked
  }


  fnUpdateTask() {

    // debugger

    let taskId = this.seletedTask.id;

    for(let i = 0; i<=this.tasks.length; i++) {

      if(this.tasks[i].id == taskId) {

        this.tasks[i].text = this.strNewTask;

        this.modalService.dismissAll();

        return
      }
    }

  }

  fndeleteTask() {


    let taskId = this.seletedTask.id;

    let itemIndex = this.tasks.findIndex(task => task.id == taskId);

    this.tasks.splice(itemIndex, 1)

    console.log(this.tasks,'tasl')

    this.modalService.dismissAll()

  }

}
