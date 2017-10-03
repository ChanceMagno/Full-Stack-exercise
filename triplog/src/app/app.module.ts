import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TriplogsApiService } from './services/triplogs-api-service/triplogs-api.service';
import { HomeComponent } from './home/home.component';
import { routing } from './router/app.routing';
import { AllTriplogsComponent } from './all-triplogs/all-triplogs.component';
import { DayLimitPipe } from './day-limit.pipe';
import * as moment from 'moment';
import { MaterializeModule } from 'angular2-materialize';
import { AddTriplogComponent } from './add-triplog/add-triplog.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllTriplogsComponent,
    DayLimitPipe,
    AddTriplogComponent,
    ProfileComponent,
    ChartComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    ReactiveFormsModule,
  ],
  providers: [TriplogsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
