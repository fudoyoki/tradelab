import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class RESTService {

    private apiURL: string = 'http://api.openweathermap.org/data/2.5/';
    private appId: string = 'a4ff73accb3c8b5f4a9d70f0d695197b';

    constructor(private http: Http) { }
  
    getWeatherData(id: string): Observable<any[]> {

        let weather = this.http.get(`${this.apiURL}weather?id=${id}&appid=${this.appId}&units=metric`).map(res => res.json());
        let forecast = this.http.get(`${this.apiURL}forecast?id=${id}&appid=${this.appId}&units=metric`).map(res => res.json());

        return Observable.forkJoin([weather, forecast]);
    }

}