"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by USER on 7/25/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var connectivity_1 = require("connectivity");
var animation_1 = require("ui/animation");
var shared_1 = require("../shared");
var content_service_1 = require("../service/content.service");
var SettingsComponent = (function () {
    function SettingsComponent(page, router, contentService) {
        this.page = page;
        this.router = router;
        this.contentService = contentService;
        this.isConnecting = false;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    SettingsComponent.prototype.submit = function () {
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            shared_1.alert("Concerta requires an internet connection.");
            return;
        }
        this.isConnecting = true;
        var formContainer = this.formContainer.nativeElement;
        var busyContainer = this.busyContainer.nativeElement;
        var animations = [];
        formContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function () {
            busyContainer.style.visibility = "visible";
            animations.push({ target: busyContainer, opacity: 1, duration: 500 });
            new animation_1.Animation(animations, false).play();
        });
        this.gotoPlayer();
    };
    SettingsComponent.prototype.gotoPlayer = function () {
        var navigationExtras = {
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
    };
    return SettingsComponent;
}());
__decorate([
    core_1.ViewChild("formContainer"),
    __metadata("design:type", core_1.ElementRef)
], SettingsComponent.prototype, "formContainer", void 0);
__decorate([
    core_1.ViewChild("busyContainer"),
    __metadata("design:type", core_1.ElementRef)
], SettingsComponent.prototype, "busyContainer", void 0);
SettingsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./settings.component.html",
        styleUrls: ["./server.css"],
        providers: [content_service_1.ContentService]
    }),
    __metadata("design:paramtypes", [page_1.Page, router_1.Router, content_service_1.ContentService])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
