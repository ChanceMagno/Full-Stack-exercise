import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public doughnutChartLabels:string[] = ['Walk', 'Bike', 'Carpool'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';


  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
