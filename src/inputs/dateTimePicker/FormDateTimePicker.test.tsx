/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import * as moment from 'moment';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormDateTimePicker } from './FormDateTimePicker';

var jsonForm = require('./FormDateTimePicker.test.json');

describe('FormDateTimePicker Unit Tests', () => {
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

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-DatePicker') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      let inDate = moment.utc("2018-03-11T15:30:30.000Z");
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm }
          onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-DatePicker') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outDate = moment.utc(result["rows"]["0"]["columns"][0]["controls"][0]["value"].toString());
      expect(outDate).toEqual(inDate);
    });
  });

  describe('DateTimePicker update tests', () => {
    it('DateTimePicker is updating', () => {
      let result: any;
      let updateStub: sinon.SinonStub = sinon.stub();
      let inDate = moment.utc("2018-03-12T15:30:30.000Z");
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      let datePicker: FormDateTimePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormDateTimePicker);
      datePicker.setValue(inDate.toJSON());
      expect(updateStub.callCount).toEqual(1);

      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      
      let outDate = moment.utc(result["rows"]["0"]["columns"][0]["controls"][0]["value"]);
      expect(outDate).toEqual(inDate);
    });
  });

  describe('DateTimePicker validate tests', () => {
    it('DateTimePicker is validating', () => {
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
      ) as Form;

      let datePicker: FormDateTimePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormDateTimePicker);
      datePicker.setValue(null);

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  });  
});