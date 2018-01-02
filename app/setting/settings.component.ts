/**
 * Created by USER on 7/25/2017.
 */
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Page } from "ui/page";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";

import { alert } from "../shared";
import { ContentService } from "../service/content.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./server.css"],
    providers: [ContentService]
})
export class SettingsComponent implements OnInit {
    isConnecting = false;
    serverAddress: string;

    @ViewChild("formContainer") formContainer: ElementRef;
    @ViewChild("busyContainer") busyContainer: ElementRef;

    constructor(private page:Page, private router:Router, private contentService:ContentService) { }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    submit():void{
        if (getConnectionType() === connectionType.none) {
            alert("Concerta requires an internet connection.");
            return;
        }

        this.isConnecting = true;
        let formContainer = <View>this.formContainer.nativeElement;
        let busyContainer = <View>this.busyContainer.nativeElement;

        let animations = [];

        formContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function(){
            busyContainer.style.visibility = "visible";
            animations.push({ target: busyContainer, opacity: 1, duration: 500 });
            new Animation(animations, false).play();
        })
        this.gotoPlayer();
    }

    gotoPlayer() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "url": this.serverAddress
            }
        };

        this.router.navigate(["/player"], navigationExtras);
        /*
        this.contentService.loadAll()
            .subscribe(
                ()=>{
                    this.isConnecting = false;
                    this.router.navigate(["/player"]);
                },
                (error) => {
                    alert("Unfortunately we could not find your Contents.");
                }
            );
            */
    }
}