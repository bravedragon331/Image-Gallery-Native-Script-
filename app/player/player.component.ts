/**
 * Created by USER on 7/25/2017.
 */
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { Page } from "ui/page"
import {WebView, LoadEventData} from 'ui/web-view';
import { setInterval, setTimeout, clearInterval } from "timer";
import { Image } from 'ui/image';
import { View } from "ui/core/view";

import { ContentService } from "../service/content.service";
import { DataService } from "../service/data.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./player.component.html",
    providers: [ContentService, DataService]
})
export class PlayerComponent implements OnInit {
    isConnecting = true;
    imageName: string;
    htmlValue: string;
    serverUrl: string;

    @ViewChild("imageView") imageView:ElementRef;
    @ViewChild("webView") webView: ElementRef;
    @ViewChild("imageContainer") imageContainer:ElementRef;
    @ViewChild("webviewContainer") webviewContainer:ElementRef;


    constructor(private page:Page, private contentService:ContentService, private dataService:DataService, private route:ActivatedRoute, private router:Router) {
        this.route.queryParams.subscribe(params => {
            if(params["url"]){
                this.contentService.apiUrl = params["url"];
                console.log(this.contentService.apiUrl);
            }
        });
    }

    submit(){
        this.router.navigate(["/"]);
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;

        let imageContainer = <View>this.imageContainer.nativeElement;
        let webviewContainer = <View>this.webviewContainer.nativeElement;
        imageContainer.style.visibility = "hidden";
        webviewContainer.style.visibility = "hidden";

        this.contentService.loadAll()
            .subscribe(
                ()=>{
                    this.startExhibit();
                },
                (error) => {
                    alert("Unfortunately we could not find your Contents.");
                    this.router.navigate(["/"]);
                }
            );
    }

    startExhibit(){
        if(this.contentService.getNextType() == "Image"){
            let name = this.contentService.presentContent.name;
            this.dataService.loadImageName(name)
                .subscribe(
                    ()=>{
                        this.readImage();
                    },
                    (error) =>{
                        alert("Read Image Error");
                    }
                )
        }

        else if(this.contentService.getNextType() == "HTML"){
            let name = this.contentService.presentContent.name;
            this.dataService.loadHTMLName(name)
                .subscribe(
                    ()=>{
                        this.readHTML();
                    },
                    (error) =>{
                        alert("Read HTML Error");
                    }
                )
        }
    }

    readImage(){

        let imageView = <Image>this.imageView.nativeElement;
        imageView.stretch = "aspectFill";
        let webView = <WebView>this.webView.nativeElement;
        let imageContainer = <View>this.imageContainer.nativeElement;
        let webviewContainer = <View>this.webviewContainer.nativeElement;

        this.imageName = this.dataService.getImageName();

        imageView.src = this.imageName;

        this.dataService.readImage(this.imageName)
            .subscribe(
                ()=>{

                    webviewContainer.animate({
                        opacity: 0,
                        duration: 500
                    }).then(function(){
                        imageContainer.animate({
                            opacity: 1,
                            duration: 500
                        })
                        imageContainer.style.visibility = "visible";
                    });
                    this.isConnecting = false;
                    this.countTime();
                },
                (error) =>{
                    alert("Error in reading Image");
                }

            )
    }

    readHTML(){

        let imageView = <Image>this.imageView.nativeElement;
        imageView.stretch = "aspectFill";
        let webView = <WebView>this.webView.nativeElement;
        let imageContainer = <View>this.imageContainer.nativeElement;
        let webviewContainer = <View>this.webviewContainer.nativeElement;

        this.htmlValue = this.dataService.getHTMLValue();

        webView.src = this.htmlValue;

        imageContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function(){
            webviewContainer.animate({
                opacity: 1,
                duration: 500
            })
            webviewContainer.style.visibility = "visible";
        })

        this.countTime();

    }

    countTime(){
        setTimeout(() => {
            if(this.contentService.getNextType() == "Image"){
                this.isConnecting = true;
                let name = this.contentService.presentContent.name;
                this.dataService.loadImageName(name)
                    .subscribe(
                        ()=>{
                            this.readImage();
                        },
                        (error) =>{
                            alert("Error in reading ImageName");
                        }
                    )
            }
            else{
                //console.log("html");
                let name = this.contentService.presentContent.name;
                this.dataService.loadHTMLName(name)
                    .subscribe(
                        ()=>{
                            this.readHTML();
                        },
                        (error) =>{
                            alert("Error");
                        }
                    )
            }
        }, 5000);
    }

}