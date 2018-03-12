/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import Form from '../../form/Form';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormToggle } from './FormToggle';
var jsonForm = require('./FormToggle.test.json');
describe('FormToggle Unit Tests', function () {
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
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Toggle-background');
        });
        it('With initial value', function () {
            var result;
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: function (formData) { result = formData; } }));
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Toggle-background');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeTruthy();
        });
    });
    describe('Toggle update tests', function () {
        it('Toggle is updating', function () {
            var result;
            var updateStub = sandbox.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub, onSubmitForm: function (formData) { result = formData; } }));
            var toggle = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormToggle);
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            toggle.setValue(true);
            expect(updateStub.callCount).toEqual(1);
            toggle.setValue(false);
            expect(updateStub.callCount).toEqual(1);
            ReactTestUtils.Simulate.submit(form);
            expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeFalsy();
        });
    });
    describe('Toggle validate tests', function () {
        it('Toggle is validating', function () {
            var updateStub = sandbox.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var toggle = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormToggle);
            toggle.setValue(false);
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormToggle.test.js.map