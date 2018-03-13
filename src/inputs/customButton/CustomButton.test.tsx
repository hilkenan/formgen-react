import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Form } from '../../form/Form';
import * as sinon from 'sinon';
import { FormTextInput } from '../textInput/FormTextInput';
import { CustomActions } from '../../objects/CustomActions.types';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
var jsonForm = require('./CustomButton.test.json');

describe('CustomButton Unit Tests', () => {

  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });

  afterEach(() => {
    clock.restore();
  });

  it('Button clickt then the function is called', () => {
    let customStub: sinon.SinonStub = sinon.stub();
    const customAction:CustomActions[] = [{
      typeName: "TestCustom1",
      actionType: (formData: any) => {
        customStub();
        expect(formData["rows"]["0"]["columns"][0]["controls"][0]["value"]).toEqual('Value');
      }
     }]

    let renderedForm = ReactTestUtils.renderIntoDocument(
      <Form jsonFormData={ jsonForm } customActions={ customAction }  />
    ) as Form;

    let button: HTMLButtonElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button') as HTMLButtonElement;
    let textBox: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
    textBox.setValue('Value');
    ReactTestUtils.Simulate.click(button);
    clock.tick(DEFAULT_DEBOUNCE);
    expect(customStub.callCount).toEqual(1);
  });
});