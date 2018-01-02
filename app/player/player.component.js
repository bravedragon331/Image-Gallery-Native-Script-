"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by USER on 7/25/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var timer_1 = require("timer");
var content_service_1 = require("../service/content.service");
var data_service_1 = require("../service/data.service");
var PlayerComponent = (function () {
    function PlayerComponent(page, contentService, dataService, route, router) {
        var _this = this;
        this.page = page;
        this.contentService = contentService;
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.isConnecting = true;
        this.route.queryParams.subscribe(function (params) {
            if (params["url"]) {
                _this.contentService.apiUrl = params["url"];
                console.log(_this.contentService.apiUrl);
            }
        });
    }
    PlayerComponent.prototype.submit = function () {
        this.router.navigate(["/"]);
    };
    PlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        var imageContainer = this.imageContainer.nativeElement;
        var webviewContainer = this.webviewContainer.nativeElement;
        imageContainer.style.visibility = "hidden";
        webviewContainer.style.visibility = "hidden";
        this.contentService.loadAll()
            .subscribe(function () {
            _this.startExhibit();
        }, function (error) {
            alert("Unfortunately we could not find your Contents.");
            _this.router.navigate(["/"]);
        });
    };
    PlayerComponent.prototype.startExhibit = function () {
        var _this = this;
        if (this.contentService.getNextType() == "Image") {
            var name_1 = this.contentService.presentContent.name;
            this.dataService.loadImageName(name_1)
                .subscribe(function () {
                _this.readImage();
            }, function (error) {
                alert("Read Image Error");
            });
        }
        else if (this.contentService.getNextType() == "HTML") {
            var name_2 = this.contentService.presentContent.name;
            this.dataService.loadHTMLName(name_2)
                .subscribe(function () {
                _this.readHTML();
            }, function (error) {
                alert("Read HTML Error");
            });
        }
    };
    PlayerComponent.prototype.readImage = function () {
        var _this = this;
        var imageView = this.imageView.nativeElement;
        imageView.stretch = "aspectFill";
        var webView = this.webView.nativeElement;
        var imageContainer = this.imageContainer.nativeElement;
        var webviewContainer = this.webviewContainer.nativeElement;
        this.imageName = this.dataService.getImageName();
        imageView.src = this.imageName;
        this.dataService.readImage(this.imageName)
            .subscribe(function () {
            webviewContainer.animate({
                opacity: 0,
                duration: 500
            }).then(function () {
                imageContainer.animate({
                    opacity: 1,
                    duration: 500
                });
                imageContainer.style.visibility = "visible";
            });
            _this.isConnecting = false;
            _this.countTime();
        }, function (error) {
            alert("Error in reading Image");
        });
    };
    PlayerComponent.prototype.readHTML = function () {
        var imageView = this.imageView.nativeElement;
        imageView.stretch = "aspectFill";
        var webView = this.webView.nativeElement;
        var imageContainer = this.imageContainer.nativeElement;
        var webviewContainer = this.webviewContainer.nativeElement;
        this.htmlValue = this.dataService.getHTMLValue();
        webView.src = this.htmlValue;
        imageContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function () {
            webviewContainer.animate({
                opacity: 1,
                duration: 500
            });
            webviewContainer.style.visibility = "visible";
        });
        this.countTime();
    };
    PlayerComponent.prototype.countTime = function () {
        var _this = this;
        timer_1.setTimeout(function () {
            if (_this.contentService.getNextType() == "Image") {
                _this.isConnecting = true;
                var name_3 = _this.contentService.presentContent.name;
                _this.dataService.loadImageName(name_3)
                    .subscribe(function () {
                    _this.readImage();
                }, function (error) {
                    alert("Error in reading ImageName");
                });
            }
            else {
                //console.log("html");
                var name_4 = _this.contentService.presentContent.name;
                _this.dataService.loadHTMLName(name_4)
                    .subscribe(function () {
                    _this.readHTML();
                }, function (error) {
                    alert("Error");
                });
            }
        }, 5000);
    };
    return PlayerComponent;
}());
__decorate([
    core_1.ViewChild("imageView"),
    __metadata("design:type", core_1.ElementRef)
], PlayerComponent.prototype, "imageView", void 0);
__decorate([
    core_1.ViewChild("webView"),
    __metadata("design:type", core_1.ElementRef)
], PlayerComponent.prototype, "webView", void 0);
__decorate([
    core_1.ViewChild("imageContainer"),
    __metadata("design:type", core_1.ElementRef)
], PlayerComponent.prototype, "imageContainer", void 0);
__decorate([
    core_1.ViewChild("webviewContainer"),
    __metadata("design:type", core_1.ElementRef)
], PlayerComponent.prototype, "webviewContainer", void 0);
PlayerComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./player.component.html",
        providers: [content_service_1.ContentService, data_service_1.DataService]
    }),
    __metadata("design:paramtypes", [page_1.Page, content_service_1.ContentService, data_service_1.DataService, router_2.ActivatedRoute, router_1.Router])
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
