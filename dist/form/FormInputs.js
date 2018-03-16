"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormCheckBox_1 = require("../inputs/checkbox/FormCheckBox");
var FormTextInput_1 = require("../inputs/textInput/FormTextInput");
var SubmitButton_1 = require("../inputs/submitButton/SubmitButton");
var CancelButton_1 = require("../inputs/cancelButton/CancelButton");
var CustomButton_1 = require("../inputs/customButton/CustomButton");
var FormDatePicker_1 = require("../inputs/datePicker/FormDatePicker");
var FormDropdown_1 = require("../inputs/dropdown/FormDropdown");
var FormCascader_1 = require("../inputs/cascader/FormCascader");
var FormComboBox_1 = require("../inputs/comboBox/FormComboBox");
var FormChoiceGroup_1 = require("../inputs/choiceGroup/FormChoiceGroup");
var FormToggle_1 = require("../inputs/toggle/FormToggle");
var FormRichTextInput_1 = require("../inputs/richTextInput/FormRichTextInput");
var FormMaskedTextInput_1 = require("../inputs/maskedTextInput/FormMaskedTextInput");
var FormRating_1 = require("../inputs/rating/FormRating");
var FormSpinButton_1 = require("../inputs/spinButton/FormSpinButton");
var FormSlider_1 = require("../inputs/slider/FormSlider");
var FormPeoplePicker_1 = require("../inputs/peoplePicker/FormPeoplePicker");
var FormDateTimePicker_1 = require("../inputs/dateTimePicker/FormDateTimePicker");
var FormTimePicker_1 = require("../inputs/timePicker/FormTimePicker");
var FormTimeInput_1 = require("../inputs/timeInput/FormTimeInput");
var FormInfoText_1 = require("../inputs/info/FormInfoText");
var Tab_1 = require("../inputs/tab/Tab");
var TabContainer_1 = require("../inputs/tab/TabContainer");
var Enums_1 = require("../Enums");
/**
* Class the prepare the matching from the ControlTypes enum to the real control types.
*/
var FormInputs = /** @class */ (function () {
    function FormInputs() {
    }
    /**
    * Ge tall defined standart controls as Dynamic Control array
    */
    FormInputs.getStandartControls = function () {
        var controls = [];
        controls.push({ typeName: Enums_1.ControlTypes.Tab, controlType: Tab_1.Tab }, { typeName: Enums_1.ControlTypes.TabContainer, controlType: TabContainer_1.TabContainer }, { typeName: Enums_1.ControlTypes.SubmitButton, controlType: SubmitButton_1.SubmitButton }, { typeName: Enums_1.ControlTypes.CancelButton, controlType: CancelButton_1.CancelButton }, { typeName: Enums_1.ControlTypes.CustomButton, controlType: CustomButton_1.CustomButton }, { typeName: Enums_1.ControlTypes.Checkbox, controlType: FormCheckBox_1.FormCheckBox }, { typeName: Enums_1.ControlTypes.Textbox, controlType: FormTextInput_1.FormTextInput }, { typeName: Enums_1.ControlTypes.DatePicker, controlType: FormDatePicker_1.FormDatePicker }, { typeName: Enums_1.ControlTypes.DropDown, controlType: FormDropdown_1.FormDropdown }, { typeName: Enums_1.ControlTypes.CascadingDropDown, controlType: FormCascader_1.FormCascader }, { typeName: Enums_1.ControlTypes.ComboBox, controlType: FormComboBox_1.FormComboBox }, { typeName: Enums_1.ControlTypes.ChoiceGroup, controlType: FormChoiceGroup_1.FormChoiceGroup }, { typeName: Enums_1.ControlTypes.Toggle, controlType: FormToggle_1.FormToggle }, { typeName: Enums_1.ControlTypes.RichtTex, controlType: FormRichTextInput_1.FormRichTextInput }, { typeName: Enums_1.ControlTypes.Rating, controlType: FormRating_1.FormRating }, { typeName: Enums_1.ControlTypes.MaskedTextbox, controlType: FormMaskedTextInput_1.FormMaskedTextInput }, { typeName: Enums_1.ControlTypes.SpinButton, controlType: FormSpinButton_1.FormSpinButton }, { typeName: Enums_1.ControlTypes.Slider, controlType: FormSlider_1.FormSlider }, { typeName: Enums_1.ControlTypes.PeoplePicker, controlType: FormPeoplePicker_1.FormPeoplePicker }, { typeName: Enums_1.ControlTypes.DateTimePicker, controlType: FormDateTimePicker_1.FormDateTimePicker }, { typeName: Enums_1.ControlTypes.TimePicker, controlType: FormTimePicker_1.FormTimePicker }, { typeName: Enums_1.ControlTypes.Time, controlType: FormTimeInput_1.FormTimeInput }, { typeName: Enums_1.ControlTypes.InfoText, controlType: FormInfoText_1.FormInfoText });
        return controls;
    };
    return FormInputs;
}());
exports.FormInputs = FormInputs;
//# sourceMappingURL=FormInputs.js.map