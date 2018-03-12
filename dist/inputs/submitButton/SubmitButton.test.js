import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { FormTextInput } from '../textInput/FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./SubmitButton.test.json');
describe('SubmitButton Unit Tests', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers(Date.now());
    });
    afterEach(function () {
        clock.restore();
    });
    it('Button is disabled when form is invalid and enabled when form is valid', function () {
        var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm }));
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button');
        var textBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
        expect(button.getAttribute('disabled')).toEqual('');
        textBox.setValue('Value');
        clock.tick(DEFAULT_DEBOUNCE);
        expect(button.getAttribute('disabled')).toBeFalsy();
    });
});
//# sourceMappingURL=SubmitButton.test.js.map