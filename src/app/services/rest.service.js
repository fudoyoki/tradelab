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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/Rx');
var RESTService = (function () {
    function RESTService(http) {
        this.http = http;
        this.apiURL = 'http://api.openweathermap.org/data/2.5/';
        this.appId = 'a4ff73accb3c8b5f4a9d70f0d695197b';
    }
    RESTService.prototype.getWeatherData = function (id) {
        var weather = this.http.get(this.apiURL + "weather?id=" + id + "&appid=" + this.appId + "&units=metric").map(function (res) { return res.json(); });
        var forecast = this.http.get(this.apiURL + "forecast?id=" + id + "&appid=" + this.appId + "&units=metric").map(function (res) { return res.json(); });
        return Rx_1.Observable.forkJoin([weather, forecast]);
    };
    RESTService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RESTService);
    return RESTService;
}());
exports.RESTService = RESTService;
//# sourceMappingURL=rest.service.js.map