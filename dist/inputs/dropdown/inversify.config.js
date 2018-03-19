"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var FormBaseInput_types_1 = require("../../formBaseInput/FormBaseInput.types");
var MockDataProviderService_1 = require("./MockDataProviderService");
/**
* Inversion Of Control class container
*/
var MockContainer = /** @class */ (function (_super) {
    __extends(MockContainer, _super);
    function MockContainer() {
        var _this = _super.call(this) || this;
        _this.declareDependencies();
        return _this;
    }
    MockContainer.prototype.declareDependencies = function () {
        this.bind(FormBaseInput_types_1.typesForInject.IDataProviderService).to(MockDataProviderService_1.MockDataProviderService);
    };
    return MockContainer;
}(inversify_1.Container));
exports.MockContainer = MockContainer;
//# sourceMappingURL=inversify.config.js.map