"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogsModule = require("ui/dialogs");
function alert(message) {
    return dialogsModule.alert({
        title: "Concerta",
        okButtonText: "OK",
        message: message
    });
}
exports.alert = alert;
