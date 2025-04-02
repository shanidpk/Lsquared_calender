import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { icon: 'bi bi-search', label: 'Search', badge: null },
    { icon: 'bi bi-bell', label: 'Notification', badge: null },
    { icon: 'bi bi-calendar', label: 'Calendar', badge: null },
    { icon: 'bi bi-gear', label: 'Settings', badge: null }
  ];
  strEmail:string = 'john@gmail.com'
  isCollapsed = false;

  constructor () {}

  ngOnInit() {
    console.log(this.menuItems)
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


}
