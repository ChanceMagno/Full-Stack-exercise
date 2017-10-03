import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AllTriplogsComponent } from '../all-triplogs/all-triplogs.component';
import { ProfileComponent } from '../profile/profile.component';

const appRoutes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'triplogs',
    component: AllTriplogsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }

];


  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
