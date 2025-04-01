import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:LayoutComponent,
        children:[
            {
                path:'calender',
                component:CalenderComponent
            },
            {
                path:'settings',
                component:SettingsComponent
            }
        ]
    }
];
