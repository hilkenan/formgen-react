/**
 * Enum for the type of the standard Controls
 */
export enum ControlTypes {
    DropDown = "DropDown",
    CascadingDropDown = "CascadingDropDown",
    ComboBox = "ComboBox",
    ChoiceGroup = "ChoiceGroup",
    Checkbox = "Checkbox",
    Textbox = "Textbox",
    RichtTex = "RichtTex",
    MaskedTextbox = "MaskedTextbox",
    DatePicker = "DatePicker",
    Time = "Time",
    InfoText = "InfoText",
    Rating = "Rating",
    Slider = "Slider",
    SpinButton = "SpinButton",
    Toggle = "Toggle",
    TabContainer = "TabContainer",
    Tab = "Tab",
    Custom = "Custom",
    SubmitButton = "SubmitButton",
    CancelButton = "CancelButton",
    CustomButton = "CustomButton",
    PeoplePicker = "PeoplePicker",
    DateTimePicker = "DateTimePicker",
    TimePicker = "TimePicker"
}

/**
 * Enum for all current supported Languages
 */
export enum SupportedLanguages {
    de = "de",
    en = "en",
    fr = "fr",
    es = "es",
    it = "it"
}

/**
 * Enum for Rendering the position of lablels
 */
export enum LabelPositions {
    Top = "Top",
    Left = "Left",
    Right = "Right"
}

/**
 * Enum for the Type of used Type of Binders.
 */
export enum BinderType {
    Sync = "Sync",
    Async = "Async",
    AsyncFilter = "AsyncFilter"
}


/**
 * Enum for Translation Properites
 */
export enum TranslatedProperty {
    Title = "Title",
    Info = "Info",
    Message = "Message",
    Default = "Default"
}

/**
 * Enum for used Form Actions
 */
export enum FormActions {
    Submit = "Submit",
    InvalidSubmit = "InvalidSubmit",
    Cancel = "Cancel",
    Reset = "Reset",
    Custom = "Custom"
}

/**
 * Enum for possible form control validators
 */
export enum ValidatorTypes {
    Required = "Required",
    Integer = "Integer",
    Number = "Number",
    MaxLength = "MaxLength",
    MinLength = "MinLength",
    MinValue = "MinValue",
    MaxValue = "MaxValue",
    Length = "Length",
    Regex = "Regex",
    Custom = "Custom"
}