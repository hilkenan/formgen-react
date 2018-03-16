"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validators_1 = require("./Validators");
describe('Simple form validators test', function () {
    var customMessage = 'Custom Error Message';
    it('Integer validator', function () {
        expect(Validators_1.Validators.isInteger(customMessage)(null)).toBeFalsy();
        expect(Validators_1.Validators.isInteger(customMessage)(undefined)).toBeFalsy();
        expect(Validators_1.Validators.isInteger(customMessage)('4.1')).toEqual(customMessage);
        expect(Validators_1.Validators.isInteger(customMessage)('4')).toBeFalsy();
        expect(Validators_1.Validators.isInteger(customMessage)('4.0')).toBeFalsy();
    });
    it('Length validator', function () {
        expect(Validators_1.Validators.length(4, function () { return customMessage; })('----')).toBeFalsy();
        expect(Validators_1.Validators.length(4, function () { return customMessage; })('-----')).toBeTruthy();
        expect(Validators_1.Validators.length(4, function () { return customMessage; })(null)).toEqual(customMessage);
        expect(Validators_1.Validators.length(4, function () { return customMessage; })(undefined)).toEqual(customMessage);
    });
    it('MinLength validator', function () {
        expect(Validators_1.Validators.minLength(4, function () { return customMessage; })('----')).toBeFalsy();
        expect(Validators_1.Validators.minLength(4, function () { return customMessage; })('-----')).toBeFalsy();
        expect(Validators_1.Validators.minLength(4, function () { return customMessage; })('---')).toEqual(customMessage);
        expect(Validators_1.Validators.minLength(4, function () { return customMessage; })(null)).toEqual(customMessage);
        expect(Validators_1.Validators.minLength(4, function () { return customMessage; })(undefined)).toEqual(customMessage);
    });
    it('MaxLength validator', function () {
        expect(Validators_1.Validators.maxLength(4, function () { return customMessage; })(null)).toBeFalsy();
        expect(Validators_1.Validators.maxLength(4, function () { return customMessage; })(undefined)).toBeFalsy();
        expect(Validators_1.Validators.maxLength(4, function () { return customMessage; })('----')).toBeFalsy();
        expect(Validators_1.Validators.maxLength(4, function () { return customMessage; })('-----')).toEqual(customMessage);
    });
    it('MinValue validator', function () {
        expect(Validators_1.Validators.minValue(4, function () { return customMessage; })(null)).toBeFalsy();
        expect(Validators_1.Validators.minValue(4, function () { return customMessage; })(undefined)).toBeFalsy();
        expect(Validators_1.Validators.minValue(4, function () { return customMessage; })('----')).toBeFalsy();
        expect(Validators_1.Validators.minValue(4, function () { return customMessage; })('3')).toEqual(customMessage);
        expect(Validators_1.Validators.minValue(4, function () { return customMessage; })('5')).toBeFalsy();
        expect(Validators_1.Validators.minValue(0, function () { return customMessage; })('.8')).toBeFalsy();
    });
    it('MaxValue validator', function () {
        expect(Validators_1.Validators.maxValue(4, function () { return customMessage; })(null)).toBeFalsy();
        expect(Validators_1.Validators.maxValue(4, function () { return customMessage; })(undefined)).toBeFalsy();
        expect(Validators_1.Validators.maxValue(4, function () { return customMessage; })('----')).toBeFalsy();
        expect(Validators_1.Validators.maxValue(4, function () { return customMessage; })('5')).toEqual(customMessage);
        expect(Validators_1.Validators.maxValue(4, function () { return customMessage; })('3')).toBeFalsy();
        expect(Validators_1.Validators.maxValue(4, function () { return customMessage; })('.8')).toBeFalsy();
    });
    it('Regex validator', function () {
        expect(Validators_1.Validators.regex(/^(.)*$/, customMessage)('anything')).toBeFalsy();
        expect(Validators_1.Validators.regex(/^([0-9])*$/, customMessage)('10202')).toBeFalsy();
        expect(Validators_1.Validators.regex(/^([0-9])*$/, customMessage)('letters')).toEqual(customMessage);
    });
    it('Number validator', function () {
        expect(Validators_1.Validators.isNumber(customMessage)('abcd')).toEqual(customMessage);
        expect(Validators_1.Validators.isNumber(customMessage)(null)).toBeFalsy();
        expect(Validators_1.Validators.isNumber(customMessage)('')).toBeFalsy();
        expect(Validators_1.Validators.isNumber(customMessage)('10')).toBeFalsy();
        expect(Validators_1.Validators.isNumber(customMessage)('10.1')).toBeFalsy();
    });
    it('Required validator', function () {
        expect(Validators_1.Validators.required(customMessage)(null)).toEqual(customMessage);
        expect(Validators_1.Validators.required(customMessage)(undefined)).toEqual(customMessage);
        expect(Validators_1.Validators.required(customMessage)('')).toEqual(customMessage);
        var arrayObject = [];
        expect(Validators_1.Validators.required(customMessage)(arrayObject)).toEqual(customMessage);
        expect(Validators_1.Validators.required(customMessage)(0)).toBeFalsy();
        expect(Validators_1.Validators.required(customMessage)('HelloWorld')).toBeFalsy();
    });
});
//# sourceMappingURL=Validators.test.js.map