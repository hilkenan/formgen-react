/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormTimePicker } from './FormTimePicker';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./FormTimePicker.test.json');
describe('FormTimePicker Unit Tests', function () {
    var sandbox;
    beforeAll(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe('Renders for combinations of props', function () {
        var renderedForm;
        var renderedInput;
        beforeEach(function () {
            renderedForm = undefined;
            renderedInput = undefined;
        });
        afterEach(function () {
            expect(renderedForm).toBeTruthy();
            expect(renderedInput).toBeTruthy();
        });
        it('Null props still render', function () {
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'preview_container');
        });
        it('With initial value', function () {
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'preview_container');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outTime = result["rows"]["0"]["columns"][0]["controls"][0]["value"].toString();
            expect(outTime).toEqual("12:30");
        });
    });
    describe('TimePicker update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('TimePicker is updating', function () {
            var result;
            var updateStub = sinon.stub();
            var inTime = "13:00";
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub, onSubmitForm: function (formData) { result = formData; } }));
            var datePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTimePicker);
            datePicker.setValue(inTime);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(updateStub.callCount).toEqual(1);
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outTime = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outTime).toEqual(inTime);
        });
    });
    describe('TimePicker validate tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('TimePicker is validating', function () {
            var updateStub = sandbox.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var timePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTimePicker);
            timePicker.setValue(undefined, true);
            clock.tick(DEFAULT_DEBOUNCE);
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormTimePicker.test.js.map