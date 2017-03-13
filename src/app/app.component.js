"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var json_service_1 = require('./services/json.service');
var rest_service_1 = require('./services/rest.service');
var spinner_service_1 = require('./services/spinner.service');
var AppComponent = (function () {
    function AppComponent(jsonService, restService, spinner, datePipe) {
        this.jsonService = jsonService;
        this.restService = restService;
        this.spinner = spinner;
        this.datePipe = datePipe;
        this.days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        this.baseURL = window.location.origin;
        this.dataURL = this.baseURL + '/data/cities-fr.json';
        this.forecast = {};
        this.selectedCity = {};
        this.today = {};
        this.threeDayForecast = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadJSONData();
    };
    AppComponent.prototype.loadJSONData = function () {
        var _this = this;
        console.log('Loading...', this.dataURL);
        this.spinner.start();
        this.jsonService.getJSON(this.dataURL).subscribe(function (data) {
            _this.spinner.stop();
            _this.cities = data;
            _this.selectedCity = data[0];
            _this.onSelect(_this.selectedCity.id, null);
        }, function (error) {
            _this.spinner.stop();
            console.log(error);
        });
    };
    AppComponent.prototype.getWeatherData = function (id) {
        var _this = this;
        this.spinner.start();
        this.restService.getWeatherData(id).subscribe(function (data) {
            //Weather
            _this.today = data[0];
            _this.temperature = Math.round(_this.today.main.temp);
            _this.icon = "wi wi-icon-" + _this.today.weather[0].id;
            //Forecast
            _this.forecast = data[1];
            _this.displayForecast();
        }, function (error) {
            _this.spinner.stop();
            console.log(error);
        });
    };
    AppComponent.prototype.displayForecast = function () {
        this.threeDayForecast = [];
        var currentDay = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
        var nextDay = Date.parse(this.datePipe.transform(new Date().getTime() + 24 * 60 * 60 * 1000, 'yyyy-MM-dd'));
        var i, min = [], max = [], forecastDay, forecastDate;
        for (i = 0; i < this.forecast.list.length; i++) {
            forecastDay = new Date(this.forecast.list[i].dt_txt).getDay() - 1;
            forecastDate = Date.parse(this.datePipe.transform(new Date(this.forecast.list[i].dt_txt), 'yyyy-MM-dd'));
            if (forecastDate !== currentDay) {
                min.push(Math.round(this.forecast.list[i].main.temp_min));
                max.push(Math.round(this.forecast.list[i].main.temp_max));
            }
            if (forecastDate > nextDay && this.threeDayForecast.length < 3) {
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
                if (this.threeDayForecast.length === 3) {
                    console.log('exiting...');
                    this.spinner.stop();
                    break;
                }
            }
        }
    };
    AppComponent.prototype.onSelect = function ($value, $target) {
        this.selectedCity = this.cities[$target != null ? $target.selectedIndex : 0];
        console.log(JSON.stringify(this.selectedCity));
        this.getWeatherData($value);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.html',
            styleUrls: ['app/app.css'],
            providers: [
                json_service_1.JSONService,
                rest_service_1.RESTService,
                spinner_service_1.SpinnerService,
                common_1.DatePipe
            ]
        }), 
        __metadata('design:paramtypes', [json_service_1.JSONService, rest_service_1.RESTService, spinner_service_1.SpinnerService, common_1.DatePipe])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map