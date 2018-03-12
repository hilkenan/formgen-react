import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { FormTextInput } from '../textInput/FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./CancelButton.test.json');
describe('CancelButton Unit Tests', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers(Date.now());
    });
    afterEach(function () {
        clock.restore();
    });
    it('Button clickt then the function is called', function () {
        var cancelStub = sinon.stub();
        var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onCancelForm: cancelStub }));
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button');
        var textBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
        textBox.setValue('Value');
        ReactTestUtils.Simulate.click(button);
        clock.tick(DEFAULT_DEBOUNCE);
        expect(cancelStub.callCount).toEqual(1);
    });
});
//# sourceMappingURL=CancelButton.test.js.map