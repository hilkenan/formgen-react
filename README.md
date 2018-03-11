# React Form Generator with UI Fabric React Components

[![npm version](https://badge.fury.io/js/formgen-react.svg)](http://badge.fury.io/js/formgen-react)
[![Build Status](https://secure.travis-ci.org/hilkenan/formgen-react.svg)](https://travis-ci.org/hilkenan/formgen-react)
[![Dependency Status](https://david-dm.org/hilkenan/formgen-react.svg)](https://david-dm.org/hilkenan/formgen-react)
[![codecov](https://codecov.io/gh/hilkenan/formgen-react/branch/master/graph/badge.svg)](https://codecov.io/gh/hilkenan/formgen-react)
[![Downloads](http://img.shields.io/npm/dm/formgen-react.svg)](https://npmjs.org/package/formgen-react)

Formula generator with JSON for react. UI Fabric controls are used for rendering

## Installation

The package can be installed via NPM:

```
npm install formgen-react --save
```
The example below shows how to use the form generator with a simple json definition. This json need to map to the Json schema:

```ts
import * as React from 'react';
import Form from 'formgen-react';
var jsonForm = require('./samples/test.json');

export class Example extends React.Component {
render() {
  return (
  <Form 
    onCancelForm={ () => console.log("cancel click") }
    onSubmitForm={ (formData:any) => console.log("submit click: " + JSON.stringify(formData)) }
    jsonFormData={jsonForm}  />)
  }
}
...

## Configuration

The above test.json file could look like this:
{
	 "$schema": "../schemas/jfrom-schema.json",
	 "id": "testform",
	 "theme": "red",
	 "title": "Test EN",
	 "title_trans": {
		 "de": "Test DE",
		 "fr": "Test FR",
         "it": "Test IT"
	},
	"rows": [{
		"columns": [{
				"controls": [{
					"id": "info",
                "title": "<b>This is a Info about this Test Document in Englisch</b>",
				"control_type": [ "InfoText" ],
				"title_trans": {
					"de": "<b>Das ist ein Info Text über dieses Dokument in Deutsch</b>",
					"fr": "<b>Ceci est un texte d'information sur ce document en français</ b>",					
					"it": "<b>Questo è un testo informativo su questo documento in italiano</ b>"
					}
			}]
		}]
	}]
 }
```
The JSON has to fit the the JSON Schema Definition:
[Form Schema](schemas/jfrom-schema.json)
You need also the following global Schemas:
[Translation](schemas/translation-schema.json)
[Object Translation](schemas/objecttranslation-schema.json)

Full documentation will provided in some days.

### Translating / Localization 

The form is fully translatable. Included are defauld translations for DE, IT, EN, and ES. Time and Date Controls can be localized. If you want provide other language, please let me know, or contribute with other languages.

### Browser Support

The most Controls are UI Fabric Control. Also the Layout classes comes from UI Fabric. Here the Browser Support for UI Fabrict:
<a href="https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/BROWSERSUPPORT.md">Browser support</a>


## Local Development

The `master` branch contains the latest version of the Form component. To start your example app, you can run `npm start`. This starts a simple webserver on http://localhost:3000.

You can run `npm test` to execute the test suite. To help you develop the component we’ve set up some tests that cover the basic functionality for every control (in every control folder). 

## License

Copyright (c) 2018 to hilkean and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
