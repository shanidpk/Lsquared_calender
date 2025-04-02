import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface Task {
  date: string;
  text: string;
  id: string;
  color?: string;
}


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})

export class SettingsComponent {
    // Display variables
    display: string = '';
    selectedDate: string = '';
    days: number[] = [];
    year: number;
    month: number;
    today: { date: any; month: any; year: any; };
    strNewTask: string = '';
    selectedTask: Task | any;
    selectedColor:string = '#C9D5DF';
    isEditing: boolean = false;
    // Color options for tasks

    colors: string[] | any = ['F02C17','#FF5733', '#C9D5DF', '#3357FF', '#F1C40F', '#8E44AD'];

    // Sample tasks
    tasks: Task[] = [
      {
        "date": "Tue Apr 1 2025",
        "text": "Client Meeting Planning",
        "id": "task001",
        "color": "#F02C17" // Red
      },
      {
        "date": "Tue Apr 1 2025",
        "text": "Client Meeting Planning",
        "id": "task021",
        "color": "#C9D5DF" // Red
      }, {
        "date": "Tue Apr 1 2025",
        "text": "Client Meeting Planning",
        "id": "task022",
        "color": "#8E44AD" // Red
      }, {
        "date": "Tue Apr 1 2025",
        "text": "Client Meeting Planning",
        "id": "task023",
        "color": "#F02C17" // Red
      }, {
        "date": "Tue Apr 1 2025",
        "text": "Client Meeting Planning",
        "id": "task024",
        "color": "#F02C17" // Red
      },
      {
        "date": "Tue Apr 15 2025",
        "text": "Design Revisions",
        "id": "task002",
        "color": "#33FF57" // Green
      },
      {
        "date": "Wed Apr 16 2025",
        "text": "New Project Kickoff Meeting",
        "id": "task003",
        "color": "#3357FF" // Blue
      },
      {
        "date": "Thu Apr 17 2025",
        "text": "Client Meeting Progress report",
        "id": "task004",
        "color": "#F3C300" // Yellow
      },
      {
        "date": "Fri Apr 18 2025",
        "text": "Design Team Stand-up Meeting",
        "id": "task005",
        "color": "#9A2EFE" // Purple
      },
      {
        "date": "Sat Apr 19 2025",
        "text": "Industry Webinar/ Workshop",
        "id": "task006",
        "color": "#FFA500" // Orange
      }
    ];
  
    users = [
      { name: 'Jhon Deo', color:  '#F02C17'},
      { name: 'Malik Din', color: '#FF5733'},
      { name: 'Rfhat Deo', color: '#C9D5DF'},
      { name: 'Jhon Deo', color:  '#8E44AD'}
    ];
    constructor(private modalService: NgbModal) {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.today = { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
    }
  
    ngOnInit() {
      this.displayCalendar();
    }
  
    displayCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const numberOfDays = new Date(this.year, this.month + 1, 0).getDate();
  
      this.display = new Date(this.year, this.month).toLocaleString('en-US', { month: 'long', year: 'numeric' });
      
      this.days = Array(firstDay).fill(0).concat(Array.from({ length: numberOfDays }, (_, i) => i + 1));
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
  
    showAddTaskModal(modal: any, day: any) {
      if (day !== 0) {
        this.fnSelectDate(day);
        if (this.strNewTask) {
          this.strNewTask = '';
        }
        this.modalService.open(modal);
      }
    }
  
    onSubmitModal() {
      if (!this.selectedDate || !this.strNewTask.trim()) return;
  
      // Select a random color from the colors array
      // const colorKeys = Object.keys(this.colors[Math.floor(Math.random() * this.colors.length)]);
      // const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)][colorKeys[0]];
      
      this.tasks.push({ 
        date: this.selectedDate, 
        text: this.strNewTask, 
        id: `task00${this.tasks.length + 1}`,
        color: this.selectedColor
      });
      
      this.strNewTask = ''; // Clear input
      this.modalService.dismissAll();
    }
  
    getTasksForDate(date: string): Task[] {
      if (!date) return [];
      
      const [year, month, day] = date.split('-').map(Number);
      if (!year || !month || !day) return [];
      
      const dateObj = new Date(year, month - 1, day);
      const dateString = dateObj.toDateString();
      
      return this.tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.toDateString() === dateString;
      });
    }
  
    showEditModal(event: Event, modal: any, index: number, task: any) {
      this.isEditing = false;  //hide input
      this.selectedTask = task;
      event.stopPropagation();
      this.modalService.dismissAll();
      this.modalService.open(modal);
      this.strNewTask = task.text;
    }
  
    showAllTasks(event:Event, selectedDate: string, modal:any) {
      this.selectedDate = selectedDate;

      event.stopPropagation();
      
      this.modalService.dismissAll();
      
      this.modalService.open(modal, {size: 'sm'});

      console.log("Show all tasks for", selectedDate);
      // You can implement additional functionality here to show all tasks
    }
  
    fnUpdateTask() {
      let taskId = this.selectedTask.id;
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        this.tasks[taskIndex].text = this.strNewTask;
        this.modalService.dismissAll();
      }
    }
  
    fnDeleteTask() {
      let taskId = this.selectedTask.id;
      let itemIndex = this.tasks.findIndex(task => task.id === taskId);
      
      if (itemIndex !== -1) {
        this.tasks.splice(itemIndex, 1);
        this.modalService.dismissAll();
      }
    }
  
    goToToday() {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.displayCalendar();
    }
  
    getDateRange() {
      const firstDay = 1;
      const lastDay = new Date(this.year, this.month + 1, 0).getDate();
      const monthName = new Date(this.year, this.month).toLocaleString('en-US', { month: 'short' });
      return `${firstDay} ${monthName} - ${lastDay} ${monthName} ${this.year}`;
    }

    selectColor(color:string) {
      this.selectedColor = color
      console.log(this.selectedColor)
    }

    /**
     * @param name 
     * @returns 
     */
    getInitials(name: string): string {
      const nameParts = name.split(' ');
      return nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]  // Get first letter of first and last name
        : nameParts[0][0];  // Fallback if only one name is present
    }
}
