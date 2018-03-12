/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormMaskedTextInput } from './FormMaskedTextInput';
var jsonForm = require('./FormMaskedTextInput.test.json');

describe('FormMaskedTextInput Unit Tests', () => {
  describe('Renders for all combinations of props', () => {
    let renderedForm: Form;
    let renderedInput: HTMLInputElement;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedInput as any) = undefined;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form Language="de" jsonFormData={ jsonForm }  onSubmitForm={ (formData: any) => { result = formData; } } 
        />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input') as HTMLInputElement;
      let label:HTMLLabelElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'label') as HTMLLabelElement;
      expect(label.innerHTML).toEqual("MaskedText DE");
      
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      expect(renderedInput.placeholder).toEqual("ss:mm:ss");
      let outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outValue).toEqual("12:30:30");
    });
  });

  describe('Translation in English', () => {
    let renderedForm: Form;
    let renderedInput: HTMLInputElement;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedInput as any) = undefined;
    });

    it('With initial value', () => {
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form Language="en" jsonFormData={ jsonForm } />
      ) as Form;

      let label:HTMLLabelElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'label') as HTMLLabelElement;
      expect(label.innerHTML).toEqual("MaskedText EN");

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input') as HTMLInputElement;
      expect(renderedInput.placeholder).toEqual("hh:mm:ss");
    })
})

  describe('MaskedTextInput update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('MaskedTextInput is leading and trailing debounced', () => {
        let updateStub: sinon.SinonStub = sinon.stub();
        let renderedForm = ReactTestUtils.renderIntoDocument(
            <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
        ) as Form;
     
        let textInput: FormMaskedTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormMaskedTextInput);
        textInput.setValue("12:00:00", true);
        expect(updateStub.callCount).toEqual(0);
        clock.tick(DEFAULT_DEBOUNCE);
        expect(updateStub.callCount).toEqual(1);

        let renderedInput = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input') as HTMLInputElement;
        expect(renderedInput.value).toEqual("12:00:00");
    });
  });

  describe('Common validations', () => {

    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });    

    it('Validators run properly', () => {
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onSubmitForm={ undefined } />
      ) as Form;

      let formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormMaskedTextInput);

      formField.setValue("11:22:333", true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("max 8");
      
      formField.setValue(undefined, true);
      clock.tick(DEFAULT_DEBOUNCE);
      
      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  }); 
});