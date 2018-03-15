/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
//import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../form/Form';
import { DataBinder } from '../../objects/DataBinder.types';
import { BinderType } from '../../Enums';
import { Control } from '../../objects/Control';
import { FormCascader } from './FormCascader';
var jsonForm = require('./FormCascader.test.json');

const options = [{
  'label': 'Super langer ultra test',
  'value': 'fj',
  'children': [{
    'label': 'Test 1',
    'value': 'fuzhou',
    'children': [{
      'label': 'diabled',
      'value': 'mawei',
    }],
  }, {
    'label': 'Test 2',
    'value': 'quanzhou',
  }],
}];

describe('FormTextInput Unit Tests', () => {
  let renderedForm: Form;
  let renderedInput: HTMLElement;

  beforeEach(() => {
    (renderedForm as any) = undefined;
    (renderedInput as any) = undefined;
  });

  describe('Cascader update tests', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('Cascader is only trailing debounced', () => {
      let updateStub: sinon.SinonStub = sinon.stub();
      const binders:DataBinder[] = [{
        typeName:"testform.cascading_options",
        binderType: BinderType.Sync,
        binderFunction: {
          retrieveData(controlConfig: Control, lang:string):any[] {
            return options;
          }
        }
      }]
        
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form jsonFormData={ jsonForm } onSubmitForm={ undefined } onUpdated={ updateStub }  dataBinders={ binders } />
      ) as Form;

      let formField:FormCascader = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormCascader);
      let cascader:FormCascader = new FormCascader(formField.props, formField.context);
      expect(cascader.IsRequired).toBeFalsy();

      const out = [{"label":"Super langer ultra test","value":"fj","children":[{"label":"Test 1","value":"fuzhou","children":[{"label":"diabled","value":"mawei"}]},{"label":"Test 2","value":"quanzhou"}]},{"label":"Test 1","value":"fuzhou","children":[{"label":"diabled","value":"mawei"}]},{"label":"diabled","value":"mawei"}]
      expect(formField.state.currentValue).toEqual(out);

      const inValue = [{"label":"Super langer ultra","value":"fj","children":[{"label":"Test 1","value":"fuzhou","children":[{"label":"diabled","value":"mawei"}]},{"label":"Test 2","value":"quanzhou"}]},{"label":"Test 1","value":"fuzhou","children":[{"label":"diabled","value":"mawei"}]},{"label":"diabled","value":"mawei"}]
      formField.setValue(inValue, true);
      expect(updateStub.callCount).toEqual(1);
    });
 });
});