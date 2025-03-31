import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CalenderComponent } from '../pages/calender/calender.component';

const routes: Routes = [
  /* {
    path:'',
    redirectTo:'/calender',
    pathMatch:'full'
  },
  {
    path:'calender',
    component:CalenderComponent,
  }, */
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
