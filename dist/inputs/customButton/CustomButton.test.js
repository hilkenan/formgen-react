import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { FormTextInput } from '../textInput/FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./CustomButton.test.json');
describe('CustomButton Unit Tests', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers(Date.now());
    });
    afterEach(function () {
        clock.restore();
    });
    it('Button clickt then the function is called', function () {
        var customStub = sinon.stub();
        var customAction = [{
                typeName: "TestCustom1",
                actionType: function (formData) {
                    customStub();
                    expect(formData["rows"]["0"]["columns"][0]["controls"][0]["value"]).toEqual('Value');
                }
            }];
        var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, customActions: customAction }));
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button');
        var textBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
        textBox.setValue('Value');
        ReactTestUtils.Simulate.click(button);
        clock.tick(DEFAULT_DEBOUNCE);
        expect(customStub.callCount).toEqual(1);
    });
});
//# sourceMappingURL=CustomButton.test.js.map