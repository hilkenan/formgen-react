# React Form Generator with UI Fabric React Components

[![npm version](https://badge.fury.io/js/formgen-react.svg)](http://badge.fury.io/js/formgen-react)
[![Build Status](https://secure.travis-ci.org/hilkenan/formgen-react.svg)](https://travis-ci.org/hilkenan/formgen-react)
[![Dependency Status](https://david-dm.org/hilkenan/formgen-react.svg)](https://david-dm.org/hilkenan/formgen-react)
[![codecov](https://codecov.io/gh/hilkenan/formgen-react/branch/master/graph/badge.svg)](https://codecov.io/gh/hilkenan/formgen-react)
[![Downloads](http://img.shields.io/npm/dm/formgen-react.svg)](https://npmjs.org/package/formgen-react)

Formula generator with JSON for react. UI Fabric controls are used for rendering

![](https://cloud.githubusercontent.com/assets/1412392/5339491/c40de124-7ee1-11e4-9f07-9276e2545f27.png)

## Installation

The package can be installed via NPM:

```
npm install formgen-react --save
```
The example below shows how to use the form generator with a simple json definition. This json need to map to the Json schema:

```ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
Full documentation will provided in some days.

### Localization

The form is fully translatable. Included are defauld translations for DE, IT, EN, and ES

### Browser Support

The date picker is compatible with the latest versions of Chrome, Firefox, and IE10+.

## Local Development

The `master` branch contains the latest version of the Form component. To start your example app, you can run `npm start`. This starts a simple webserver on http://localhost:3000.

You can run `npm test` to execute the test suite. To help you develop the component we’ve set up some tests that cover the basic functionality for every control (in every control folder). 

## License

Copyright (c) 2018 hilkenan Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
