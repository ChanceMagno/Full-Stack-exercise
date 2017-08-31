import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TriplogsApiService } from './services/triplogs-api-service/triplogs-api.service';
import { HomeComponent } from './home/home.component';
import { routing } from './router/app.routing';
import { AllTriplogsComponent } from './all-triplogs/all-triplogs.component';
import { DayLimitPipe } from './day-limit.pipe';
import * as moment from 'moment'
import { MaterializeModule } from 'angular2-materialize';
import { AddTriplogComponent } from './add-triplog/add-triplog.component';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllTriplogsComponent,
    DayLimitPipe,
    AddTriplogComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [TriplogsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
