"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var JFormData_1 = require("./JFormData");
var Control_1 = require("./Control");
var Row_1 = require("./Row");
/**
* Object Fabric to convert json objects to javascript objects.
*/
var ObjectFabric = /** @class */ (function () {
    function ObjectFabric() {
    }
    /**
    * Get a FormData object
    * @param json The Json object.
    */
    ObjectFabric.getForm = function (json) {
        var jsonConvert = new json2typescript_1.JsonConvert();
        return jsonConvert.deserializeObject(json, JFormData_1.JFormData);
    };
    /**
    * Get the Json from a FormData object
    * @param form The Form Control tree.
    */
    ObjectFabric.getJsonFromForm = function (form) {
        var jsonConvert = new json2typescript_1.JsonConvert();
        return jsonConvert.serializeObject(form);
    };
    /**
    * Get a Row object
    * @param json The json object the get the row from.
    */
    ObjectFabric.getRow = function (json) {
        var jsonConvert = new json2typescript_1.JsonConvert();
        return jsonConvert.deserializeObject(json, Row_1.Row);
    };
    /**
    * Get a Json from a Row object
    * @param row The row to serialize.
    */
    ObjectFabric.getJsonFromRow = function (row) {
        var jsonConvert = new json2typescript_1.JsonConvert();
        return jsonConvert.serializeObject(row);
    };
    /**
    * Get a Control object
    * @param json The json object the get the control from.
    */
    ObjectFabric.getControl = function (json) {
        var jsonConvert = new json2typescript_1.JsonConvert();
        return jsonConvert.deserializeObject(json, Control_1.Control);
    };
    /**
    * Get the Json from an given Control
    * @param ctrol The Control to serialize.
    */
    ObjectFabric.getJsonFromControl = function (ctrl) {
        var jsonConvert = new json2typescript_1.JsonConvert();
        return jsonConvert.serializeObject(ctrl);
    };
    return ObjectFabric;
}());
exports.ObjectFabric = ObjectFabric;
//# sourceMappingURL=ObjectFabric.js.map