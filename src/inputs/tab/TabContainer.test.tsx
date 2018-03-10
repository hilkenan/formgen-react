import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../form/Form';
var jsonForm = require('./TabContainer.test.json');

describe('TabContainer Unit Tests', () => {

  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });

  afterEach(() => {
    clock.restore();
  });

  it('Show Tabs', () => {
    let renderedForm = ReactTestUtils.renderIntoDocument(
      <Form jsonFormData={ jsonForm }/>
    ) as Form;
    let list: HTMLUListElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Pivot') as HTMLUListElement;
    expect(list.childNodes.length).toEqual(2);
  });
});