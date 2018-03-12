/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
//import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';
import { Form } from '../../..';
import { BinderType } from '../../Enums';
import { FormCascader } from './FormCascader';
var jsonForm = require('./FormCascader.test.json');
var options = [{
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
describe('FormTextInput Unit Tests', function () {
    var renderedForm;
    var renderedInput;
    beforeEach(function () {
        renderedForm = undefined;
        renderedInput = undefined;
    });
    describe('Cascader update tests', function () {
        var clock;
        beforeEach(function () {
            clock = sinon.useFakeTimers(Date.now());
        });
        afterEach(function () {
            clock.restore();
        });
        it('Cascader is only trailing debounced', function () {
            var updateStub = sinon.stub();
            var binders = [{
                    typeName: "testform.cascading_options",
                    binderType: BinderType.Sync,
                    binderFunction: {
                        retrieveData: function (controlConfig, lang) {
                            return options;
                        }
                    }
                }];
            renderedForm = ReactTestUtils.renderIntoDocument(React.createElement(Form, { jsonFormData: jsonForm, onSubmitForm: undefined, onUpdated: updateStub, dataBinders: binders }));
            var formField = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormCascader);
            var out = [{ "label": "Super langer ultra test", "value": "fj", "children": [{ "label": "Test 1", "value": "fuzhou", "children": [{ "label": "diabled", "value": "mawei" }] }, { "label": "Test 2", "value": "quanzhou" }] }, { "label": "Test 1", "value": "fuzhou", "children": [{ "label": "diabled", "value": "mawei" }] }, { "label": "diabled", "value": "mawei" }];
            expect(formField.state.currentValue).toEqual(out);
            var inValue = [{ "label": "Super langer ultra", "value": "fj", "children": [{ "label": "Test 1", "value": "fuzhou", "children": [{ "label": "diabled", "value": "mawei" }] }, { "label": "Test 2", "value": "quanzhou" }] }, { "label": "Test 1", "value": "fuzhou", "children": [{ "label": "diabled", "value": "mawei" }] }, { "label": "diabled", "value": "mawei" }];
            formField.setValue(inValue, true);
            expect(updateStub.callCount).toEqual(1);
        });
    });
});
//# sourceMappingURL=FormCascader.test.js.map