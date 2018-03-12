/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
//import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormTextInput } from './FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./FormTextInput.test.json');
describe('FormTextInput Unit Tests', function () {
    var renderedForm;
    var renderedInput;
    beforeEach(function () {
        renderedForm = undefined;
        renderedInput = undefined;
    });
    describe('Renders for all combinations of props', function () {
        it('Null name throws error', function () {
            var errorFunction = function () {
                ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: undefined }));
            };
            expect(errorFunction).toThrow();
        });
        it('With initial value', function () {
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-TextField-field');
            expect(renderedInput.attributes.getNamedItem("value").value).toEqual("test");
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outValue).toEqual("test");
        });
    });
    describe('Common validations', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('Validators run properly', function () {
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: undefined }));
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
            formField.setValue("test", true);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(formField.state.currentError).toEqual("no int");
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
    describe('Textbox update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('TextInput is only trailing debounced', function () {
            var updateStub = sinon.stub();
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: undefined, onUpdated: updateStub }));
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
            formField.setValue("0", true);
            expect(updateStub.callCount).toEqual(0);
            formField.setValue("1", true);
            expect(updateStub.callCount).toEqual(0);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(updateStub.callCount).toEqual(1);
        });
    });
});
//# sourceMappingURL=FormTextInput.test.js.map