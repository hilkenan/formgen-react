import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../..';
var jsonForm = require('./FormInfoText.test.json');

describe('FormInfoText Unit Tests', () => {

  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });

  afterEach(() => {
    clock.restore();
  });

  it('Show Info', () => {
    let renderedForm = ReactTestUtils.renderIntoDocument(
      <Form jsonFormData={ jsonForm }/>
    ) as Form;
    let lable: HTMLLabelElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Label') as HTMLLabelElement;
    expect(lable.innerHTML).toEqual("<div>This is a info text</div>");
  });
});