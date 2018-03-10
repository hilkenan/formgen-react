import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../form/Form';
import { FormTextInput } from '../textInput/FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./SubmitButton.test.json');

describe('SubmitButton Unit Tests', () => {

  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });

  afterEach(() => {
    clock.restore();
  });

  it('Button is disabled when form is invalid and enabled when form is valid', () => {
    let renderedForm = ReactTestUtils.renderIntoDocument(
      <Form jsonFormData={ jsonForm } />
    ) as Form;

    let button: HTMLButtonElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button') as HTMLButtonElement;
    let textBox: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);

    expect(button.getAttribute('disabled')).toEqual('');
    textBox.setValue('Value');
    clock.tick(DEFAULT_DEBOUNCE);
    expect(button.getAttribute('disabled')).toBeFalsy();
  });
});