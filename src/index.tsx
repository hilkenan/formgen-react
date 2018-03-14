import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { IDropdownOption, IPersonaProps } from 'office-ui-fabric-react';
import { CustomActions } from './objects/CustomActions.types';
import { DataBinder } from './objects/DataBinder.types';
import { BinderType } from './Enums';
import { Control } from './objects/Control';
import { Form } from './form/Form';
var jsonForm = require('./samples/test.json');

const customAction:CustomActions[] = [{
 typeName: "TestCustom1",
 actionType: (formData: any) => {
   if (formData)
      console.log(JSON.stringify(formData));
 }
}]

const binders:DataBinder[] = [{
  typeName:"testform.dropDonw1_options",
  binderType: BinderType.Sync,
  binderFunction: {
    retrieveData(controlConfig: Control, lang:string):Promise<any[]> {
      return new Promise<any[]>(resolve => {
        let dropDonwEntries:IDropdownOption[] = [{
          key: 1,
          text: "Bla bla 1"
        },
        {
          key: 20,
          text: "Bla bla 20"
        }];
        setTimeout(() => resolve(dropDonwEntries), 5000);
      });
    }
  }
},
{
  typeName: "testform.tabContainer.tab2.pepople_filteredPeoples",
  binderType: BinderType.AsyncFilter,  
  binderFunction: {
    retrieveData(controlConfig: Control, lang:string, filterText: string):Promise<any[]> {
     return new Promise<any[]>((resolve, reject)  => {
        let dropDonwEntries:IPersonaProps[] = [{
          primaryText: "Muster Hans"
        },
        {
          primaryText: "Muster Fritz"
        },
        {
          primaryText: "Müller Roger"
        },
        {
          primaryText: "Müller Mia"
        }];
        let filtered = dropDonwEntries.filter(item => _doesTextStartWith(item.primaryText as string, filterText));
        setTimeout(() => resolve(filtered), 2000);
      });
    }
  }
},
{
  typeName:"testform.cascader_options",
  binderType: BinderType.Async,    
  binderFunction: {
    retrieveData(controlConfig: Control, lang:string):Promise<any[]> {
      return new Promise<any[]>(resolve => {
        const optionsEN = [{
          'label': '1st Level EN 1',
          'value': 'l11',
          'children': [{
            'label': '2th Level EN',
            'value': 'l2',
            'children': [{
              'label': '3th Level EN',
              'value': 'l3',
            }],
          }, {
            'label': '2st Level EN 2',
            'value': 'l22',
          }],
        }];
        
        const optionsDE = [{
          'label': '1st Level DE 1',
          'value': 'l11',
          'children': [{
            'label': '2th Level DE',
            'value': 'l2',
            'children': [{
              'label': '3th Level DE',
              'value': 'l3',
            }],
          }, {
            'label': '2st Level DE 2',
            'value': 'l22',
          }],
        }];
        let options = lang == "de" ? optionsDE : optionsEN;
        setTimeout(() => resolve(options), 2000);
      });
    }
  }  
}]

function _doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

ReactDOM.render(
    <Form 
      onCancelForm={ () => console.log("cancel click") }
      onSubmitForm={ (formData:any) => console.log("submit click: " + JSON.stringify(formData)) }
      dataBinders={ binders }
      jsonFormData={jsonForm} 
      showErrorsWhenPristine={false} 
      customActions={ customAction }  />,
  document.getElementById('form') as HTMLElement
);
registerServiceWorker();