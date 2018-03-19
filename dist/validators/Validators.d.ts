export declare namespace Validators {
    /**
     * Returns a validator that checks for null and whitespace
     * @param errorMessage Required error message to display
     */
    function required(errorMessage: string): (value?: any | null) => string | undefined;
    /**
     * Returns a validator that checks the length of a string and ensures its equal to a value. If input null return -1
     * @param desiredLength The length of the string
     * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
     */
    function length(desiredLength: Number, formatError: (length: number) => string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that checks the length of a string and ensures its greater than a value (inclusive)
     * @param lengthBound The min length of the string
     * @param formatError a callback which takes the values Length and formats an appropriate error message for validation failed
     */
    function minLength(lengthBound: number, formatError: (length: number) => string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that checks the length of a string and ensures its less than a value (inclusive)
     * @param lengthBound The max length of the string
     * @param formatError a callback which takes the values length and formats an appropriate error message for validation failed
     */
    function maxLength(lengthBound: Number, formatError: (length: number) => string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that calls the passed in regular expression aganist the string using exec()
     * @param expression The regular expression to use.
     * @param errorMessage Required error message to display
     */
    function regex(expression: RegExp, errorMessage: string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that checks if a number is greater than the provided bound
     * @param bound The bound
     * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
     */
    function minValue(bound: Number, formatError: (length: number) => string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that checks if a number is less than the provided bound
     * @param bound The bound
     * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
     */
    function maxValue(bound: Number, formatError: (length: number) => string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that checks if a number is an integer
     * @param errorMessage Required error message to display
     */
    function isInteger(errorMessage: string): (value?: string | null) => string | undefined;
    /**
     * Returns a validator that ensures the value is a number
     * @param errorMessage Required error message to display
     */
    function isNumber(errorMessage: string): (value?: string | null) => string | undefined;
}
export declare type IValidator = (value?: any) => string | undefined;
