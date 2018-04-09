import { DynamicControl } from "../objects/DynamicControl.types";
import { FormCheckBox } from "../inputs/checkbox/FormCheckBox";
import { FormTextInput } from "../inputs/textInput/FormTextInput";
import { SubmitButton } from '../inputs/submitButton/SubmitButton';
import { CancelButton } from '../inputs/cancelButton/CancelButton';
import { CustomButton } from '../inputs/customButton/CustomButton';
import { FormDatePicker } from '../inputs/datePicker/FormDatePicker';
import { FormDropdown } from '../inputs/dropdown/FormDropdown';
import { FormCascader } from '../inputs/cascader/FormCascader';
import { FormComboBox } from '../inputs/comboBox/FormComboBox';
import { FormChoiceGroup } from "../inputs/choiceGroup/FormChoiceGroup";
import { FormToggle } from '../inputs/toggle/FormToggle';
import { FormRichTextInput } from '../inputs/richTextInput/FormRichTextInput';
import { FormMaskedTextInput } from '../inputs/maskedTextInput/FormMaskedTextInput';
import { FormRating } from '../inputs/rating/FormRating';
import { FormSpinButton } from '../inputs/spinButton/FormSpinButton';
import { FormSlider } from '../inputs/slider/FormSlider';
import { FormPeoplePicker } from '../inputs/peoplePicker/FormPeoplePicker';
import { FormDateTimePicker } from '../inputs/dateTimePicker/FormDateTimePicker';
import { FormTimePicker } from '../inputs/timePicker/FormTimePicker';
import { FormTimeInput } from '../inputs/timeInput/FormTimeInput';
import { FormInfoText } from '../inputs/info/FormInfoText';
import { Tab } from '../inputs/tab/Tab';
import { TabContainer } from '../inputs/tab/TabContainer';
import { FormFileUpload } from '../inputs/fileUpload/FormFileUpload';
import { ControlTypes } from "../Enums";

/**
* Class the prepare the matching from the ControlTypes enum to the real control types.
*/  
export class FormInputs {
    /**
    * Array with all registered Controls to that can be used in the form.
    */  
    protected controls:DynamicControl[] = [
        { typeName: ControlTypes.Tab, controlType: Tab },
        { typeName: ControlTypes.TabContainer, controlType: TabContainer },
        { typeName: ControlTypes.SubmitButton, controlType: SubmitButton },
        { typeName: ControlTypes.CancelButton, controlType: CancelButton },
        { typeName: ControlTypes.CustomButton, controlType: CustomButton },
        { typeName: ControlTypes.Checkbox, controlType: FormCheckBox },
        { typeName: ControlTypes.Textbox, controlType: FormTextInput },
        { typeName: ControlTypes.DatePicker, controlType: FormDatePicker },
        { typeName: ControlTypes.DropDown, controlType: FormDropdown },
        { typeName: ControlTypes.CascadingDropDown, controlType: FormCascader },
        { typeName: ControlTypes.ComboBox, controlType: FormComboBox },
        { typeName: ControlTypes.ChoiceGroup, controlType: FormChoiceGroup },
        { typeName: ControlTypes.Toggle, controlType: FormToggle },
        { typeName: ControlTypes.RichtTex, controlType: FormRichTextInput },
        { typeName: ControlTypes.Rating, controlType: FormRating },
        { typeName: ControlTypes.MaskedTextbox, controlType: FormMaskedTextInput },
        { typeName: ControlTypes.SpinButton, controlType: FormSpinButton },
        { typeName: ControlTypes.Slider, controlType: FormSlider },
        { typeName: ControlTypes.PeoplePicker, controlType: FormPeoplePicker },
        { typeName: ControlTypes.DateTimePicker, controlType: FormDateTimePicker },
        { typeName: ControlTypes.TimePicker, controlType: FormTimePicker },
        { typeName: ControlTypes.Time, controlType: FormTimeInput },
        { typeName: ControlTypes.InfoText, controlType: FormInfoText },
        { typeName: ControlTypes.FileUpload, controlType: FormFileUpload }
       
    ];
   
    /**
    * Ge tall defined standart controls as Dynamic Control array
    */  
    public getStandartControls(): DynamicControl[] {
        return this.controls;
    }  
}