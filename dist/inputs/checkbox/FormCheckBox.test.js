/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import Form from '../../form/Form';
import { FormCheckBox } from './FormCheckBox';
import { PrimaryButton } from 'office-ui-fabric-react';
var jsonForm = require('./FormCheckBox.test.json');
describe('FormCheckBox Unit Tests', function () {
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
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Checkbox');
        });
        it('With initial value', function () {
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Checkbox');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeTruthy();
        });
    });
    describe('Checkbox update tests', function () {
        it('Checkbox is updating', function () {
            var result;
            var updateStub = sandbox.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub, onSubmitForm: function (formData) { result = formData; } }));
            var checkBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormCheckBox);
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            checkBox.setValue(true);
            expect(updateStub.callCount).toEqual(1);
            checkBox.setValue(false);
            expect(updateStub.callCount).toEqual(1);
            ReactTestUtils.Simulate.submit(form);
            expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeFalsy();
        });
    });
    describe('Checkbox validate tests', function () {
        it('Checkbox is validating', function () {
            var updateStub = sandbox.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var checkBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormCheckBox);
            checkBox.setValue(false);
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormCheckBox.test.js.map