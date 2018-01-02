import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { SettingsComponent } from "./setting/settings.component";
import { PlayerComponent } from "./player/player.component";

const routes: Routes = [
    { path: "", redirectTo: "/settings", pathMatch: "full" },
    { path: "settings", component:SettingsComponent },
    { path: "player", component:PlayerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }