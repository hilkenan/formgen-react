import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormPeoplePickerState, IFormPeoplePickerProps } from './FormPeoplePicker.types';
/**
 * People picker control. Let choose one ore more Persons.
 */
export declare class FormPeoplePicker extends FormBaseInput<IFormPeoplePickerProps, IFormBaseInputProps, IFormPeoplePickerState> {
    private peopleListFilterFunction;
    private pickerSuggestionsProps;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Translate all the UI text in the correct langauge.
     */
    private _getTranslatedTexts();
    /**
     * Render a Fabric DatePicker
     */
    render(): JSX.Element;
    /**
     * Event when user want remove an person from the sugestion list.
     * @param item The Person that should removed
     */
    private _onRemoveSuggestion(item);
    /**
     * Returns an array of person with the most recend used persons
     * @param currentPersonas The Persons that allready are choosed
     */
    private _returnMostRecentlyUsed(currentPersonas);
    /**
     * Remove dupplicate persons
     * @param personas The Person array with the persons to check,
     * @param possibleDupes Array of Persons with potential dupplicates
     */
    private _removeDuplicates(personas, possibleDupes);
    /**
     * Check if a person exist in the list.
     * @param persona The Person to check
     * @param personas Array of Persons to search in
     */
    private _listContainsPersona(persona, personas);
    /**
     * Resolve the Dipslay name of an Person
     * @param persona The Person to resolve
     */
    private _getTextFromItem(persona);
    /**
     * Validate any input string. If an (@) is in the string then its a valid email.
     * @param input String to validate
     */
    private _validateInput(input);
    /**
     * Event when a user enter a filter criteria. Call the databinding store with the filter to search for persons.
     * @param filterText Entered Filtertext.
     * @param currentPersonas The current set persons (for remove the dupplicates)
     * @param limitResults Maximal amount of numbers to return
     */
    private _onFilterChanged(filterText, currentPersonas, limitResults?);
    /**
     * Event when the selection has changed. Store the array of persons.
     * @param items Array of personas to store
     */
    private _onItemsChange(items);
}
