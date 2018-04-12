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
        this.providerServiceKey = "mockDataService";
    }
    /**
   * Retrieve data from the store
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param formData The Current complete Form Model. Here the config should be found.
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   */
    MockDataProviderService.prototype.retrieveListData = function (configKey, controlConfig, lang) {
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
    MockDataProviderService.prototype.retrieveSingleData = function (configKey, senderControl, receiverControl, lang) {
        return new Promise(function (resolve, reject) {
            if (senderControl && senderControl.Value == "11:00:01") {
                resolve("nothing else");
                return;
            }
            if (configKey == "testA") {
                resolve("1");
                return;
            }
            else {
                resolve("");
                return;
            }
        });
    };
    MockDataProviderService.prototype.addFile = function (configKey, controlConfig, fileName, fileContent) {
        return "http://test/" + fileName;
    };
    MockDataProviderService.prototype.removeFile = function (configKey, controlConfig, fileName) {
    };
    MockDataProviderService.prototype.retrieveFilteredListData = function (configKey, controlConfig, lang, filter, limitResults) {
        return new Promise(function (resolve, reject) {
            var dropDonwEntries = [];
            if (filter == "1") {
                dropDonwEntries.push({
                    key: 1,
                    text: "Test 1"
                });
            }
            if (filter == "2") {
                dropDonwEntries.push({
                    key: 2,
                    text: "Test2"
                });
            }
            setTimeout(function () { return resolve(dropDonwEntries); }, 1000);
        });
    };
    return MockDataProviderService;
}());
exports.MockDataProviderService = MockDataProviderService;
var MockDataProviderCollection = /** @class */ (function () {
    function MockDataProviderCollection() {
        this.providers = [];
        var mockProvider = new MockDataProviderService();
        mockProvider.providerServiceKey;
        this.providers.push(mockProvider);
    }
    MockDataProviderCollection = __decorate([
        inversify_1.injectable()
    ], MockDataProviderCollection);
    return MockDataProviderCollection;
}());
exports.MockDataProviderCollection = MockDataProviderCollection;
//# sourceMappingURL=MockDataProviderService.js.map