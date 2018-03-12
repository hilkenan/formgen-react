import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../..';
import { FormTextInput } from '../textInput/FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./CancelButton.test.json');

describe('CancelButton Unit Tests', () => {

  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });

  afterEach(() => {
    clock.restore();
  });

  it('Button clickt then the function is called', () => {
    let cancelStub: sinon.SinonStub = sinon.stub();
    let renderedForm = ReactTestUtils.renderIntoDocument(
      <Form jsonFormData={ jsonForm } onCancelForm={ cancelStub } />
    ) as Form;

    let button: HTMLButtonElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button') as HTMLButtonElement;
    let textBox: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
    textBox.setValue('Value');
    ReactTestUtils.Simulate.click(button);
    clock.tick(DEFAULT_DEBOUNCE);
    expect(cancelStub.callCount).toEqual(1);
  });
});