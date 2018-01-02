"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by USER on 7/27/2017.
 */
var Data = (function () {
    function Data(name, displayName, type, data, created) {
        this.name = name;
        this.displayName = displayName;
        this.type = type;
        this.data = data;
        this.created = created;
    }
    return Data;
}());
exports.Data = Data;
