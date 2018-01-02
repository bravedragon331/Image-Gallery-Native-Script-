/**
 * Created by USER on 7/26/2017.
 */
import { Injectable, NgZone } from "@angular/core";
import { Http, Headers, Response, ResponseOptions } from "@angular/http";
import "rxjs/add/operator/map";

import { Content } from "./content.model";

@Injectable()
export class ContentService {
    apiUrl = "https://api-dev.your-concerto.com/v1alpha1/";
    apiFeature = "contents?types=Image&types=HTML&";
    apiKey = "key=AIzaSyBdKmlJpZazWYs3UtfwpiiisMGptlEUv_0";

    presentContent:Content;
    presentNo;

    private allContents:Array<Content> = [];

    constructor(private http: Http, private zone: NgZone) { }

    loadAll(){
        return this.http.get(this.apiUrl + this.apiFeature + this.apiKey)
        .map(res=>res.json())
        .map(data =>{
            let contents = JSON.parse(JSON.stringify(data.contents));
            for(let contentNo in contents){
                this.allContents.push(
                    new Content(
                        contents[contentNo].name,
                        contents[contentNo].displayName,
                        contents[contentNo].type,
                        contents[contentNo].created
                    )
                )
            }
            this.presentNo = 0;
        })
    }

    getNextType(){
        console.log(this.presentNo);
        console.log(this.allContents.length);
        if(this.presentNo >= this.allContents.length)
            this.presentNo = 0;
        this.presentContent = this.allContents[this.presentNo];
        this.presentNo++;
        return this.presentContent.type;
    }

}