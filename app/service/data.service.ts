/**
 * Created by USER on 7/27/2017.
 */
import { Injectable, NgZone } from "@angular/core";
import { Http, Headers, Response, ResponseOptions } from "@angular/http";
import "rxjs/add/operator/map";

import { Data } from "./data.model";

@Injectable()
export class DataService {
    apiUrl = "https://api-dev.your-concerto.com/v1alpha1/";
    apiFeature = "";
    apiKey = "?key=AIzaSyBdKmlJpZazWYs3UtfwpiiisMGptlEUv_0";

    data:Data;

    constructor(private http: Http, private zone: NgZone) { }

    loadImageName(name: string){
        //console.log("Image"+ this.apiUrl + this.apiFeature + name + this.apiKey);
        let url = this.apiUrl + this.apiFeature + name + this.apiKey;
        return this.http.get(url)
            .map(res=>res.json())
            .map(data =>{
                 let dataContent = JSON.parse(JSON.stringify(data));
                 this.data = new Data(
                     dataContent.name,
                     dataContent.displayName,
                     dataContent.type,
                     JSON.stringify(dataContent.data),
                     dataContent.created
                 )
        })
    }

    getImageName(){
        return JSON.parse(this.data.data).fields.url.Kind.StringValue;
    }

    readImage(url: string){
        return this.http.get(url)
            .map(data=>{})
    }

    loadHTMLName(name: string){
        //console.log("Html"+ this.apiUrl + this.apiFeature + name + this.apiKey);
        let url = this.apiUrl + this.apiFeature + name + this.apiKey;
        return this.http.get(url)
            .map(res=>res.json())
            .map(data =>{
                let dataContent = JSON.parse(JSON.stringify(data));
                this.data = new Data(
                    dataContent.name,
                    dataContent.displayName,
                    dataContent.type,
                    JSON.stringify(dataContent.data),
                    dataContent.created
                )
            })
    }

    getHTMLValue(){
        return JSON.parse(this.data.data).fields.HTML.Kind.StringValue;
    }

}