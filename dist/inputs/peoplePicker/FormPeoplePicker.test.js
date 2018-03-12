/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { BinderType } from '../../Enums';
import { FormPeoplePicker } from './FormPeoplePicker';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./FormPeoplePicker.test.json');
function _doesTextStartWith(text, filterText) {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}
var selKey = [{ "primaryText": "Muster Hans" }];
var newKey = [{ "primaryText": "Muster Fritz" }];
describe('FormDropdown Unit Tests', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers(Date.now());
    });
    afterEach(function () {
        clock.restore();
    });
    describe('Renders for all combinations of props', function () {
        var renderedForm;
        var renderedInput;
        beforeEach(function () {
            renderedForm = undefined;
            renderedInput = undefined;
        });
        it('With initial value', function () {
            var binders = [{
                    typeName: "testform.pepoplepicker_filteredPeoples",
                    binderType: BinderType.AsyncFilter,
                    binderFunction: {
                        retrieveData: function (controlConfig, lang, filterText) {
                            console.log("ok" + filterText);
                            return new Promise(function (resolve, reject) {
                                var dropDonwEntries = [{
                                        primaryText: "Muster Hans"
                                    },
                                    {
                                        primaryText: "Muster Fritz"
                                    },
                                    {
                                        primaryText: "Muster Daniela"
                                    },
                                    {
                                        primaryText: "Muster Angela"
                                    }];
                                var filtered = dropDonwEntries.filter(function (item) { return _doesTextStartWith(item.primaryText, filterText); });
                                resolve(filtered);
                            });
                        }
                    }
                }];
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, dataBinders: binders, onSubmitForm: function (formData) { result = formData; } }));
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            var picker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormPeoplePicker);
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-BasePicker-input');
            ReactTestUtils.Simulate.keyPress(renderedInput, { which: 13, keyCode: 13 });
            clock.tick(DEFAULT_DEBOUNCE);
            expect(picker.state.mostRecentlyUsed.length).toEqual(0);
            ReactTestUtils.Simulate.submit(form);
            var outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outValue).toEqual(selKey);
        });
    });
    describe('Dropdown update tests', function () {
        it('PeoplePicker is updating', function () {
            var updateStub = sinon.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var picker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormPeoplePicker);
            picker.setValue(newKey);
            expect(updateStub.callCount).toEqual(1);
        });
    });
});
//# sourceMappingURL=FormPeoplePicker.test.js.map