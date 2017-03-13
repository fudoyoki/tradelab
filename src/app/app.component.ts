import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { JSONService } from './services/json.service';
import { RESTService } from './services/rest.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.css'],
  providers: [
    JSONService,
    RESTService,
    SpinnerService,
    DatePipe
  ]
})
export class AppComponent implements OnInit  {

  private days: Array<string> = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  private baseURL: string = window.location.origin;
  private dataURL: string = this.baseURL + '/data/cities-fr.json';

  private cities: Object;
  private forecast: any = {};
  public selectedCity: any = {};
  public today: any = {};
  public icon: string;
  public temperature: any;
  public threeDayForecast: Array<{}> = [];

  constructor(
    private jsonService:JSONService,
    private restService:RESTService,
    private spinner: SpinnerService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.loadJSONData();
  }

  loadJSONData() {

    console.log('Loading...', this.dataURL);

    this.spinner.start();
    this.jsonService.getJSON(this.dataURL).subscribe(data => {
        this.spinner.stop();
        this.cities = data;
        this.selectedCity = data[0];
        this.onSelect(this.selectedCity.id, null);
      }, error => {
        this.spinner.stop();
        console.log(error)
      });
  }

  getWeatherData(id: string) {

    this.spinner.start();
    this.restService.getWeatherData(id).subscribe(data => {

      //Weather
      this.today = data[0];
      this.temperature = Math.round(this.today.main.temp);
      this.icon = `wi wi-icon-${this.today.weather[0].id}`;

      //Forecast
      this.forecast = data[1];
      this.displayForecast();

    }, error => {
      this.spinner.stop();
      console.log(error)
    });

  }

  displayForecast() {

    this.threeDayForecast = [];

    let today: number = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    let nextDay: number = Date.parse(this.datePipe.transform(new Date().getTime() + 24 * 60 * 60 * 1000, 'yyyy-MM-dd'));
    let i: number, min: any = [], max: any = [], forecastDay: number, forecastDate: number;

    for(i = 0; i < this.forecast.list.length; i++) {

      forecastDay = new Date(this.forecast.list[i].dt_txt).getDay()-1;
      forecastDate = Date.parse(this.datePipe.transform(new Date(this.forecast.list[i].dt_txt), 'yyyy-MM-dd'));

      if(forecastDate !== today) {
        min.push(Math.round(this.forecast.list[i].main.temp_min));
        max.push(Math.round(this.forecast.list[i].main.temp_max));
      }    

      if(forecastDate > nextDay && this.threeDayForecast.length < 3) {

        this.threeDayForecast.push({
          'day': this.days[forecastDay],
          'icon': 'wi wi-icon-' + this.forecast.list[i].weather[0].id,
          'temp_min': Math.max.apply(null, max),
          'temp_max': Math.min.apply(null, min)
        });

        console.log(this.datePipe.transform(new Date(nextDay), 'yyyy-MM-dd'));
        console.log("min", min);
        console.log("max", max);

        nextDay = forecastDate;
        min = [];
        max = [];

        if(this.threeDayForecast.length === 3) {
          console.log('exiting...');
          this.spinner.stop();
          break;
        }

      }

    }

  }

  onSelect($value: any, $target: any) {

    this.selectedCity = this.cities[ $target != null ? $target.selectedIndex : 0];
    console.log(JSON.stringify(this.selectedCity));

    this.getWeatherData($value);

  }

 }
