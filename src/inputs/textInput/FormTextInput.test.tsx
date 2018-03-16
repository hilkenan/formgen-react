/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
//import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../form/Form';
import { PrimaryButton } from 'office-ui-fabric-react';
import { FormTextInput } from './FormTextInput';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { CustomValidator } from '../../objects/CustomValidator.types';
var jsonForm = require('./FormTextInput.test.json');
var jsonForm1 = require('./FormTextInput1.test.json');


function scryRenderedDOMComponentsWithId(tree, id) {
  return ReactTestUtils.findAllInRenderedTree(tree, function(inst) {
    return ReactTestUtils.isDOMComponent(inst) && inst.id === id;
  });
}

describe('FormTextInput Unit Tests', () => {
  let renderedForm: Form;
  let renderedInput: HTMLElement;

  beforeEach(() => {
    (renderedForm as any) = undefined;
    (renderedInput as any) = undefined;
  });

  describe('Renders for all combinations of props', () => {

    it('Null name throws error', () => {
      let errorFunction = () => {
        ReactTestUtils.renderIntoDocument(
          <Form jsonFormData={ undefined } />
        );
      };

      expect(errorFunction).toThrow();
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm }
          onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-TextField-field') as HTMLElement;
      expect(renderedInput.attributes.getNamedItem("value").value).toEqual("test");
      
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outValue).toEqual("test");
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
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onSubmitForm={ undefined } />
      ) as Form;

      let formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
      formField.setValue("test", true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("no int");

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  });

  describe('Textbox update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('TextInput is only trailing debounced', () => {
      let updateStub: sinon.SinonStub = sinon.stub();
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onSubmitForm={ undefined } onUpdated={ updateStub } />
      ) as Form;

      let formField: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
      formField.setValue("0", true);
      expect(updateStub.callCount).toEqual(0);
      formField.setValue("1", true);
      expect(updateStub.callCount).toEqual(0);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateStub.callCount).toEqual(1);
    });

    it('TextInput Custom Validation', () => {
      let result: any;
      let updateStub: sinon.SinonStub = sinon.stub();

      const customValidators:CustomValidator[] = [{
        typeName:"CustomTest",
        validatorType: (value:string) => {
          if (value !="test")
            return "wrong";
          else
            return '';
        }
      }];

      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm1 } customValidators={ customValidators } onSubmitForm={ (formData: any) => { result = formData; } } />
      ) as Form;

      let formField: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
      let input = scryRenderedDOMComponentsWithId(renderedForm, "testform.text");
      input[0].value = 'invalid';
      ReactTestUtils.Simulate.change(input[0]);      
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("wrong")

      input[0].value = 'test';
      ReactTestUtils.Simulate.change(input[0]);      
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual(undefined);
    });
 });
});