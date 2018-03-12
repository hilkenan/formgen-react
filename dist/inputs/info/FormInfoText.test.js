import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
var jsonForm = require('./FormInfoText.test.json');
describe('FormInfoText Unit Tests', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers(Date.now());
    });
    afterEach(function () {
        clock.restore();
    });
    it('Show Info', function () {
        var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm }));
        var lable = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Label');
        expect(lable.innerHTML).toEqual("<div>This is a info text</div>");
    });
});
//# sourceMappingURL=FormInfoText.test.js.map