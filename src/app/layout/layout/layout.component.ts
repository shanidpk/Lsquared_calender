import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent,NavbarComponent,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
