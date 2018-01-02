"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var settings_component_1 = require("./setting/settings.component");
var player_component_1 = require("./player/player.component");
var routes = [
    { path: "", redirectTo: "/settings", pathMatch: "full" },
    { path: "settings", component: settings_component_1.SettingsComponent },
    { path: "player", component: player_component_1.PlayerComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
        exports: [router_1.NativeScriptRouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
