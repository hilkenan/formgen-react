/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Form } from '../../form/Form';
import * as sinon from 'sinon';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormSlider } from './FormSlider';
var jsonForm = require('./FormSlider.test.json');

describe('FormSlider Unit Tests', () => {
  describe('Renders for combinations of props', () => {
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

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Slider-slideBox') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outValue).toEqual(1);
    });
  });

  describe('Slider update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('Rating is leading and trailing debounced', () => {
        let updateStub: sinon.SinonStub = sinon.stub();
        let renderedForm = ReactTestUtils.renderIntoDocument(
            <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
        ) as Form;
     
        let slider: FormSlider = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSlider);
        slider.setValue(2);
        expect(updateStub.callCount).toEqual(0);
        slider.setValue(3);
        expect(updateStub.callCount).toEqual(0);
        clock.tick(DEFAULT_DEBOUNCE);
        expect(updateStub.callCount).toEqual(1);
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

      let formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSlider);
      formField.setValue(2, true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("min 3");

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  }); 
});