/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { FormDatePicker } from './FormDatePicker';
import * as moment from 'moment';
import { PrimaryButton } from 'office-ui-fabric-react';
var jsonForm = require('./FormDatePicker.test.json');
describe('FormDatePicker Unit Tests', function () {
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
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-DatePicker');
        });
        it('With initial value', function () {
            var result;
            var inDate = moment.utc("2018-03-11T00:00:00.000Z");
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-DatePicker');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outDate = moment.utc(result["rows"]["0"]["columns"][0]["controls"][0]["value"].toString());
            expect(outDate).toEqual(inDate);
        });
    });
    describe('DatePicker update tests', function () {
        it('DatePicker is updating', function () {
            var result;
            var updateStub = sinon.stub();
            var inDate = moment.utc("2018-03-12T00:00:00.000Z");
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub, onSubmitForm: function (formData) { result = formData; } }));
            var datePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormDatePicker);
            datePicker.setValue(inDate.toJSON());
            expect(updateStub.callCount).toEqual(1);
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outDate = moment.utc(result["rows"]["0"]["columns"][0]["controls"][0]["value"]);
            expect(outDate).toEqual(inDate);
        });
    });
    describe('DatePicker validate tests', function () {
        it('DatePicker is validating', function () {
            var updateStub = sandbox.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var datePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormDatePicker);
            datePicker.setValue(null);
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormDatePicker.test.js.map