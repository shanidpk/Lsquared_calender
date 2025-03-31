import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getTasksByDate(date: string): Task[] {
    return this.tasks.filter(task => task.date === date);
  }
}