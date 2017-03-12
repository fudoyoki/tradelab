import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JSONService {

    constructor(private http: Http) { }

    public getJSON(dataURL: string): Observable<any> {
         return this.http.get(dataURL)
                .map((res:Response) => {
                    return res.json();
                })
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'
            )
       );
     }
}