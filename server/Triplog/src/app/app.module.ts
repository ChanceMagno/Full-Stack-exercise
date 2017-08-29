import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TriplogsApiService } from './services/triplogs-api-service/triplogs-api.service';
import { HomeComponent } from './home/home.component';
import { routing } from './router/app.routing';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
