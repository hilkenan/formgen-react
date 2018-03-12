import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormPeoplePickerState, IFormPeoplePickerProps } from './FormPeoplePicker.types';
/**
 * DatePicker input for Form
 */
export declare class FormPeoplePicker extends FormBaseInput<IFormPeoplePickerProps, IFormBaseInputProps, IFormPeoplePickerState> {
    private peopleListFilterFunction;
    private pickerSuggestionsProps;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    private _getTranslatedTexts();
    /**
     * Render a Fabric DatePicker
     */
    render(): JSX.Element;
    private _onRemoveSuggestion(item);
    private _returnMostRecentlyUsed(currentPersonas);
    private _removeDuplicates(personas, possibleDupes);
    private _listContainsPersona(persona, personas);
    private _getTextFromItem(persona);
    private _validateInput(input);
    private _onFilterChanged(filterText, currentPersonas, limitResults?);
    private _onItemsChange(items);
}
