/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormTimeInput } from './FormTimeInput';
var jsonForm = require('./FormTimeInput.test.json');
describe('FormTimeInput Unit Tests', function () {
    describe('Renders for combinations of props', function () {
        var renderedForm;
        var renderedInput;
        beforeEach(function () {
            renderedForm = undefined;
            renderedInput = undefined;
        });
        it('With initial value', function () {
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outValue).toEqual(39600);
        });
    });
    describe('TimeInput update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('TimeInput is leading and trailing debounced', function () {
            var updateStub = sinon.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var textInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTimeInput);
            var renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input');
            textInput.setValue(32400, true);
            expect(updateStub.callCount).toEqual(0);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(updateStub.callCount).toEqual(1);
            expect(renderedInput.value).toEqual("09:00"); //Is 32400 Seconds
            ReactTestUtils.Simulate.focus(renderedInput);
            renderedInput.value = "";
            ReactTestUtils.Simulate.blur(renderedInput);
            expect(textInput.state.isValid).toBeFalsy();
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
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTimeInput);
            formField.setValue(43200, true);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(formField.state.currentError).toEqual("max 09:00");
            formField.setValue(undefined, true);
            clock.tick(DEFAULT_DEBOUNCE);
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormTimeInput.test.js.map