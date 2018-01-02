"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by USER on 7/27/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var data_model_1 = require("./data.model");
var DataService = (function () {
    function DataService(http, zone) {
        this.http = http;
        this.zone = zone;
        this.apiUrl = "https://api-dev.your-concerto.com/v1alpha1/";
        this.apiFeature = "";
        this.apiKey = "?key=AIzaSyBdKmlJpZazWYs3UtfwpiiisMGptlEUv_0";
    }
    DataService.prototype.loadImageName = function (name) {
        var _this = this;
        //console.log("Image"+ this.apiUrl + this.apiFeature + name + this.apiKey);
        var url = this.apiUrl + this.apiFeature + name + this.apiKey;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var dataContent = JSON.parse(JSON.stringify(data));
            _this.data = new data_model_1.Data(dataContent.name, dataContent.displayName, dataContent.type, JSON.stringify(dataContent.data), dataContent.created);
        });
    };
    DataService.prototype.getImageName = function () {
        return JSON.parse(this.data.data).fields.url.Kind.StringValue;
    };
    DataService.prototype.readImage = function (url) {
        return this.http.get(url)
            .map(function (data) { });
    };
    DataService.prototype.loadHTMLName = function (name) {
        var _this = this;
        //console.log("Html"+ this.apiUrl + this.apiFeature + name + this.apiKey);
        var url = this.apiUrl + this.apiFeature + name + this.apiKey;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var dataContent = JSON.parse(JSON.stringify(data));
            _this.data = new data_model_1.Data(dataContent.name, dataContent.displayName, dataContent.type, JSON.stringify(dataContent.data), dataContent.created);
        });
    };
    DataService.prototype.getHTMLValue = function () {
        return JSON.parse(this.data.data).fields.HTML.Kind.StringValue;
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
], DataService);
exports.DataService = DataService;
