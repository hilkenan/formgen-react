/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';

import { PrimaryButton } from 'office-ui-fabric-react';
import { Form } from '../../..';
import { FormToggle } from './FormToggle';
import * as sinon from 'sinon';

var jsonForm = require('./FormToggle.test.json');

describe('FormToggle Unit Tests', () => {
  let sandbox: sinon.sandbox

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

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Toggle-background') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm }
          onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Toggle-background') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeTruthy()
    });
  });

  describe('Toggle update tests', () => {
    it('Toggle is updating', () => {
      let result: any;
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      let toggle: FormToggle = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormToggle);
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      
      toggle.setValue(true);
      expect(updateStub.callCount).toEqual(1);
      toggle.setValue(false);
      expect(updateStub.callCount).toEqual(1);
      ReactTestUtils.Simulate.submit(form);
      expect(result["rows"]["0"]["columns"][0]["controls"][0]["value"]).toBeFalsy()
    });
  });

  describe('Toggle validate tests', () => {
    it('Toggle is validating', () => {
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
      ) as Form;

      let toggle: FormToggle = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormToggle);
      toggle.setValue(false);

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  });
});