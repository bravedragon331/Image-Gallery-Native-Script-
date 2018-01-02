"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by USER on 7/26/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var content_model_1 = require("./content.model");
var ContentService = (function () {
    function ContentService(http, zone) {
        this.http = http;
        this.zone = zone;
        this.apiUrl = "https://api-dev.your-concerto.com/v1alpha1/";
        this.apiFeature = "contents?types=Image&types=HTML&";
        this.apiKey = "key=AIzaSyBdKmlJpZazWYs3UtfwpiiisMGptlEUv_0";
        this.allContents = [];
    }
    ContentService.prototype.loadAll = function () {
        var _this = this;
        return this.http.get(this.apiUrl + this.apiFeature + this.apiKey)
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var contents = JSON.parse(JSON.stringify(data.contents));
            for (var contentNo in contents) {
                _this.allContents.push(new content_model_1.Content(contents[contentNo].name, contents[contentNo].displayName, contents[contentNo].type, contents[contentNo].created));
            }
            _this.presentNo = 0;
        });
    };
    ContentService.prototype.getNextType = function () {
        console.log(this.presentNo);
        console.log(this.allContents.length);
        if (this.presentNo >= this.allContents.length)
            this.presentNo = 0;
        this.presentContent = this.allContents[this.presentNo];
        this.presentNo++;
        return this.presentContent.type;
    };
    return ContentService;
}());
ContentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
], ContentService);
exports.ContentService = ContentService;
