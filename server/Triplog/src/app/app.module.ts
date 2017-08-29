;
import { DayLimitPipe } from './day-limit.pipe'import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TriplogsApiService } from './services/triplogs-api-service/triplogs-api.service';
import { HomeComponent } from './home/home.component';
import { routing } from './router/app.routing';
import { AllTriplogsComponent } from './all-triplogs/all-triplogs.component';
import { 30dayPipe } from './30day.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllTriplogsComponent,
    30dayPipe, DayLimitPipe
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [TriplogsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
