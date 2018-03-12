"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
var Validators;
(function (Validators) {
    'use strict';
    /**
     * Returns a validator that checks for null and whitespace
     * @param errorMessage Required error message to display
     */
    function required(errorMessage) {
        'use strict';
        return function (value) {
            if (value == undefined)
                return errorMessage;
            if (typeof (value) === "boolean" && value == false) {
                return errorMessage;
            }
            if (value instanceof Array && value.length == 0) {
                return errorMessage;
            }
            if (value === null || value === undefined || value === '') {
                return errorMessage;
            }
            return '';
        };
    }
    Validators.required = required;
    /**
     * Returns a validator that checks the length of a string and ensures its equal to a value. If input null return -1
     * @param desiredLength The length of the string
     * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
     */
    function length(desiredLength, formatError) {
        'use strict';
        return function (value) {
            value = ((value !== null && value !== undefined) ? value : '');
            if (value.length !== desiredLength) {
                return formatError(value.length);
            }
            return '';
        };
    }
    Validators.length = length;
    /**
     * Returns a validator that checks the length of a string and ensures its greater than a value (inclusive)
     * @param lengthBound The min length of the string
     * @param formatError a callback which takes the values Length and formats an appropriate error message for validation failed
     */
    function minLength(lengthBound, formatError) {
        'use strict';
        return function (value) {
            value = ((value !== null && value !== undefined) ? value : '');
            if (value.length < lengthBound) {
                return formatError(value.length);
            }
            return '';
        };
    }
    Validators.minLength = minLength;
    /**
     * Returns a validator that checks the length of a string and ensures its less than a value (inclusive)
     * @param lengthBound The max length of the string
     * @param formatError a callback which takes the values length and formats an appropriate error message for validation failed
     */
    function maxLength(lengthBound, formatError) {
        'use strict';
        return function (value) {
            value = ((value !== null && value !== undefined) ? value : '');
            if (value.length > lengthBound) {
                return formatError(value.length);
            }
            return '';
        };
    }
    Validators.maxLength = maxLength;
    /**
     * Returns a validator that calls the passed in regular expression aganist the string using exec()
     * @param expression The regular expression to use.
     * @param errorMessage Required error message to display
     */
    function regex(expression, errorMessage) {
        'use strict';
        return function (value) {
            if (value) {
                var match = expression.exec(value);
                if (match === null || match === undefined) {
                    return errorMessage;
                }
            }
            return '';
        };
    }
    Validators.regex = regex;
    /**
     * Returns a validator that checks if a number is greater than the provided bound
     * @param bound The bound
     * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
     */
    function minValue(bound, formatError) {
        'use strict';
        return function (value) {
            if (value || !isNaN(parseFloat(value))) {
                var intValue = Number(value);
                if (!isNaN(intValue) && intValue < bound) {
                    return formatError(intValue);
                }
            }
            return '';
        };
    }
    Validators.minValue = minValue;
    /**
     * Returns a validator that checks if a number is less than the provided bound
     * @param bound The bound
     * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
     */
    function maxValue(bound, formatError) {
        'use strict';
        return function (value) {
            if (value || !isNaN(parseFloat(value))) {
                var intValue = Number(value);
                if (!isNaN(intValue) && intValue > bound) {
                    return formatError(intValue);
                }
            }
            return '';
        };
    }
    Validators.maxValue = maxValue;
    /**
     * Returns a validator that checks if a number is an integer
     * @param errorMessage Required error message to display
     */
    function isInteger(errorMessage) {
        'use strict';
        return function (value) {
            if (value) {
                if (Number(value) % 1 !== 0) {
                    return errorMessage;
                }
            }
            return '';
        };
    }
    Validators.isInteger = isInteger;
    /**
     * Returns a validator that ensures the value is a number
     * @param errorMessage Required error message to display
     */
    function isNumber(errorMessage) {
        'use strict';
        return function (value) {
            if (value) {
                if (isNaN(Number(value))) {
                    return errorMessage;
                }
            }
            return '';
        };
    }
    Validators.isNumber = isNumber;
})(Validators = exports.Validators || (exports.Validators = {}));
//# sourceMappingURL=Validators.js.map