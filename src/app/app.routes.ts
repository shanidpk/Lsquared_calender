import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'calender',  // Fixed: Relative redirect
                pathMatch: 'full'
            },
            {
                path: 'calender',
                component: CalenderComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]
    },
    {
        path:'**',
        component:PageNotFoundComponent
    }
];
