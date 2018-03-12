import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
var jsonForm = require('./TabContainer.test.json');
describe('TabContainer Unit Tests', function () {
    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers(Date.now());
    });
    afterEach(function () {
        clock.restore();
    });
    it('Show Tabs', function () {
        var renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm }));
        var list = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Pivot');
        expect(list.childNodes.length).toEqual(2);
    });
});
//# sourceMappingURL=TabContainer.test.js.map