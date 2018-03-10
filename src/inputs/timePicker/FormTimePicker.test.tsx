/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../form/Form';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormTimePicker } from './FormTimePicker';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';

var jsonForm = require('./FormTimePicker.test.json');

describe('FormTimePicker Unit Tests', () => {
  let sandbox: sinon.SinonSandbox;

  beforeAll(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Renders for combinations of props', () => {
    let renderedForm: Form;
    let renderedInput: HTMLElement;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedInput as any) = undefined;
    });

    afterEach(() => {
      expect(renderedForm).toBeTruthy();
      expect(renderedInput).toBeTruthy();
    });

    it('Null props still render', () => {
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm }/>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'preview_container') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm }
          onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'preview_container') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outTime = result["rows"]["0"]["columns"][0]["controls"][0]["value"].toString();
      expect(outTime).toEqual("12:30");
    });
  });

  describe('TimePicker update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });    
  
    it('TimePicker is updating', () => {
      let result: any;
      let updateStub: sinon.SinonStub = sinon.stub();
      let inTime = "13:00"
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      let datePicker: FormTimePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTimePicker);
      datePicker.setValue(inTime);
      clock.tick(DEFAULT_DEBOUNCE);
      
      expect(updateStub.callCount).toEqual(1);

      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      
      let outTime = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outTime).toEqual(inTime);
    });
  });

  describe('TimePicker validate tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });    
    
    it('TimePicker is validating', () => {
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
      ) as Form;

      let timePicker: FormTimePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTimePicker);
      timePicker.setValue(undefined, true);
      clock.tick(DEFAULT_DEBOUNCE);

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  });  
});