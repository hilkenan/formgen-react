/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormSpinButton } from './FormSpinButton';
var jsonForm = require('./FormSpinButton.test.json');
describe('FormSpinButton Unit Tests', function () {
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
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-spinButton-input');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outValue).toEqual(1);
        });
    });
    describe('SpinButton update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('SpinButton is leading and trailing debounced', function () {
            var updateStub = sinon.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var spin = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSpinButton);
            spin.setValue(2);
            expect(updateStub.callCount).toEqual(0);
            spin.setValue(3);
            expect(updateStub.callCount).toEqual(0);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(updateStub.callCount).toEqual(1);
        });
        it('SpinButton is update over buttons', function () {
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm }));
            var spin = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSpinButton);
            var box = ReactTestUtils.findRenderedDOMComponentWithClass(spin, 'ms-spinButton-input');
            ReactTestUtils.Simulate.keyDown(box, { key: "Up", keyCode: 38, which: 38 });
            clock.tick(DEFAULT_DEBOUNCE);
            expect(box.getAttribute("value")).toEqual("2");
            ReactTestUtils.Simulate.keyDown(box, { key: "Down", keyCode: 40, which: 40 });
            clock.tick(DEFAULT_DEBOUNCE);
            expect(box.getAttribute("value")).toEqual("1");
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
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSpinButton);
            formField.setValue(2, true);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(formField.state.currentError).toEqual("min 3");
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormSpinButton.test.js.map