/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { PrimaryButton } from 'office-ui-fabric-react';
import { Form } from '../../..';
import { FormCheckBox } from './FormCheckBox';

var jsonForm = require('./FormCheckBox.test.json');


describe('FormCheckBox Unit Tests', () => {
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
        <Form jsonFormData={ jsonForm } />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Checkbox') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm }
          onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Checkbox') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeTruthy()
    });
  });

  describe('Checkbox update tests', () => {
    it('Checkbox is updating', () => {
      let result: any;
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      let checkBox: FormCheckBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormCheckBox);
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      
      checkBox.setValue(true);
      expect(updateStub.callCount).toEqual(1);
      checkBox.setValue(false);
      expect(updateStub.callCount).toEqual(1);
      ReactTestUtils.Simulate.submit(form);
      expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeFalsy()
    });
  });

  describe('Checkbox validate tests', () => {
    it('Checkbox is validating', () => {
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
      ) as Form;

      let checkBox: FormCheckBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormCheckBox);
      checkBox.setValue(false);

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  });
});