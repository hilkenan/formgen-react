/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Form } from '../../form/Form';
import * as sinon from 'sinon';
import { FormDropdown } from './FormDropdown';
import { DEFAULT_DEBOUNCE } from '../../formBaseInput/FormBaseInput';
import { PrimaryButton, IDropdownOption } from 'office-ui-fabric-react';
import { Control } from '../../objects/Control';
import { BinderType } from '../../Enums';
import { DataBinder } from '../../objects/DataBinder.types';
var jsonForm = require('./FormDropdown.test.json');
var jsonForm1 = require('./FormDropdown1.test.json');

describe('FormDropdown Unit Tests', () => {
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

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Dropdown') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);
      let outValue = result["rows"]["0"]["columns"][0]["controls"][0]["value"];
      expect(outValue).toEqual("1");
    });
  });

  describe('Dropdown update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('Dropdown is leading async', () => {
      const binders:DataBinder[] = [{
        typeName:"testform.dropdown_options",
        binderType: BinderType.Async,    
        binderFunction: {
          retrieveData(controlConfig: Control, lang:string):Promise<any[]> {
            return new Promise<any[]>(resolve => {
              let dropDonwEntries:IDropdownOption[] = [{
                key: 1,
                text: "Test 1"
              },
              {
                key: 2,
                text: "Test2"
              }];
              resolve(dropDonwEntries);
            });
          }
        }  
      }]
      let updateStub: sinon.SinonStub = sinon.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
          <Form jsonFormData={ jsonForm1 } dataBinders={ binders } onUpdated={ updateStub } />
      ) as Form;
  
      let dropDown:HTMLSpanElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, "ms-Dropdown-title") as HTMLSpanElement
      expect(dropDown.childNodes.length).toEqual(1);
      expect(dropDown.childNodes[0].textContent).toEqual("Load data...");
      
  });    

    it('Dropdown is leading and trailing debounced', () => {
        let updateStub: sinon.SinonStub = sinon.stub();
        let renderedForm = ReactTestUtils.renderIntoDocument(
            <Form jsonFormData={ jsonForm } onUpdated={ updateStub } />
        ) as Form;
     
        let datePicker: FormDropdown = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormDropdown);
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
        <Form jsonFormData={ jsonForm } onSubmitForm={ undefined } />
      ) as Form;

      let formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormDropdown);
      formField.setValue("1", true);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(formField.state.currentError).toEqual("min 2");

      let submitButton: PrimaryButton = ReactTestUtils.findRenderedComponentWithType(renderedForm, PrimaryButton);
      expect(submitButton.props.disabled).toBeTruthy();
    });
  }); 
});