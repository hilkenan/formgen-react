/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormSlider } from './FormSlider';
var jsonForm = require('./FormSlider.test.json');
describe('FormSlider Unit Tests', function () {
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
            renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Slider-slideBox');
            var form = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form');
            ReactTestUtils.Simulate.submit(form);
            var outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
            expect(outValue).toEqual(1);
        });
    });
    describe('Slider update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('Rating is leading and trailing debounced', function () {
            var updateStub = sinon.stub();
            var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onUpdated: updateStub }));
            var slider = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSlider);
            slider.setValue(2);
            expect(updateStub.callCount).toEqual(0);
            slider.setValue(3);
            expect(updateStub.callCount).toEqual(0);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(updateStub.callCount).toEqual(1);
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
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSlider);
            formField.setValue(2, true);
            clock.tick(DEFAULT_DEBOUNCE);
            expect(formField.state.currentError).toEqual("min 3");
            var submitButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
            expect(submitButton.props.disabled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FormSlider.test.js.map