/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../form/Form';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormChoiceGroup } from './FormChoiceGroup';
var jsonForm = require('./FormChoiceGroup.test.json');
var jsonForm1 = require('./FormChoiceGroup1.test.json');

describe('FormChoiceGroup Unit Tests', () => {
  describe('Renders for all combinations of props', () => {
    let renderedForm: Form;
    let renderedInput: HTMLElement;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedInput as any) = undefined;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outValue).toEqual("1");
    });
  });

  describe('ChoiceGroup update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('ChoiceGroup is leading and trailing debounced', () => {
        let updateStub: sinon.SinonStub = sinon.stub();
        let renderedForm = ReactTestUtils.renderIntoDocument(
            <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
        ) as Form;
     
        let datePicker:FormChoiceGroup = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormChoiceGroup);
        let picker:FormChoiceGroup = new FormChoiceGroup(datePicker.props, datePicker.context);
        expect(picker.IsRequired()).toBeTruthy();
          
        datePicker.setValue("2");
        expect(updateStub.callCount).toEqual(1);
        datePicker.setValue("3");
        expect(updateStub.callCount).toEqual(1);
        clock.tick(DEFAULT_DEBOUNCE);
        expect(updateStub.callCount).toEqual(2);
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
        <Form jsonFormData={ jsonForm1 } onSubmitForm={ undefined } />
      ) as Form;

      let formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormChoiceGroup);
      formField.setValue("1", true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("min 2");
      
      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();

      formField.setValue("2", true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual(undefined);
    });
  }); 
});