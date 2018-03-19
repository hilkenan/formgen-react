"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var MockDataProviderService = /** @class */ (function () {
    function MockDataProviderService() {
    }
    /**
   * Retrieve data from the store
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param formData The Current complete Form Model. Here the config should be found.
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   */
    MockDataProviderService.prototype.retrieveListData = function (configKey, controlConfig, lang) {
        console.log("START SENDING");
        return new Promise(function (resolve, reject) {
            var dropDonwEntries = [{
                    key: 1,
                    text: "Test 1"
                },
                {
                    key: 2,
                    text: "Test2"
                }];
            setTimeout(function () { return resolve(dropDonwEntries); }, 5000);
        });
    };
    MockDataProviderService = __decorate([
        inversify_1.injectable()
    ], MockDataProviderService);
    return MockDataProviderService;
}());
exports.MockDataProviderService = MockDataProviderService;
//# sourceMappingURL=MockDataProviderService.js.map