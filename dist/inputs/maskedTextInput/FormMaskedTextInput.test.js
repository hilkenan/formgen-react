/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormMaskedTextInput } from './FormMaskedTextInput';
var jsonForm = require('./FormMaskedTextInput.test.json');
describe('FormMaskedTextInput Unit Tests', function () {
    describe('Renders for all combinations of props', function () {
        var renderedForm;
        var renderedInput;
        beforeEach(function () {
            renderedForm = undefined;
            renderedInput = undefined;
        });
        it('With initial value', function () {
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { Language: "de", jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input');
            var label = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'label');
            expect(label.innerHTML).toEqual("MaskedText DE");
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            expect(renderedInput.placeholder).toEqual("ss:mm:ss");
            var outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outValue).toEqual("12:30:30");
        });
    });
    describe('Translation in English', function () {
        var renderedForm;
        var renderedInput;
        beforeEach(function () {
            renderedForm = undefined;
            renderedInput = undefined;
        });
        it('With initial value', function () {
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { Language: "en", jsonFormData: jsonForm }));
            var label = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'label');
            expect(label.innerHTML).toEqual("MaskedText EN");
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input');
            expect(renderedInput.placeholder).toEqual("hh:mm:ss");
        });
    });
    describe('MaskedTextInput update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('MaskedTextInput is leading and trailing debounced', function () {
            var updateStub = sinon.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var textInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormMaskedTextInput);
            textInput.setValue("12:00:00", true);
            expect(updateStub.callCount).toEqual(0);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(updateStub.callCount).toEqual(1);
            var renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input');
            expect(renderedInput.value).toEqual("12:00:00");
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
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: undefined }));
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormMaskedTextInput);
            formField.setValue("11:22:333", true);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(formField.state.currentError).toEqual("max 8");
            formField.setValue(undefined, true);
            clock.tick(DEFAULT_DEBOUNCE);
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormMaskedTextInput.test.js.map