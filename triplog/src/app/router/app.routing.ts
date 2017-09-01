import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AllTriplogsComponent } from '../all-triplogs/all-triplogs.component'

const appRoutes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'triplogs',
    component: AllTriplogsComponent
  }

];


  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
