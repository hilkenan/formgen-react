/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormSpinButton } from './FormSpinButton';
var jsonForm = require('./FormSpinButton.test.json');

describe('FormSpinButton Unit Tests', () => {
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

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-spinButton-input') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outValue).toEqual(1);
    });
  });

  describe('SpinButton update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('SpinButton is leading and trailing debounced', () => {
        let updateStub: sinon.SinonStub = sinon.stub();
        let renderedForm = ReactTestUtils.renderIntoDocument(
            <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
        ) as Form;
     
        let spin: FormSpinButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSpinButton);
        spin.setValue(2);
        expect(updateStub.callCount).toEqual(0);
        spin.setValue(3);
        expect(updateStub.callCount).toEqual(0);
        clock.tick(DEFAULT_DEBOUNCE);
        expect(updateStub.callCount).toEqual(1);

    });
    it('SpinButton is update over buttons', () => {
      let renderedForm = ReactTestUtils.renderIntoDocument(
          <Form jsonFormData={ jsonForm } />
      ) as Form;

      let spin: FormSpinButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSpinButton);
      let box = ReactTestUtils.findRenderedDOMComponentWithClass(spin, 'ms-spinButton-input') as HTMLButtonElement;
      ReactTestUtils.Simulate.keyDown(box, {key: "Up", keyCode: 38, which: 38});
      clock.tick(DEFAULT_DEBOUNCE);
      expect(box.getAttribute("value")).toEqual("2");
      ReactTestUtils.Simulate.keyDown(box, {key: "Down", keyCode: 40, which: 40});
      clock.tick(DEFAULT_DEBOUNCE);
      expect(box.getAttribute("value")).toEqual("1");
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

      let formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormSpinButton);
      formField.setValue(2, true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("min 3");

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  }); 
});