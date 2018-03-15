import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { CompactPeoplePicker, IPersonaProps, IBasePickerSuggestionsProps, ValidationState } from 'office-ui-fabric-react';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import Rendering from '../../form/Rendering';;
import { Helper } from '../../Helper';
import { IFormPeoplePickerState, IFormPeoplePickerProps } from './FormPeoplePicker.types';
import { LocalsPeoplePicker } from '../../locales/LocalsPeoplePicker';

/**
 * People picker control. Let choose one ore more Persons.
 */
export class FormPeoplePicker extends FormBaseInput<IFormPeoplePickerProps, IFormBaseInputProps, IFormPeoplePickerState> {
  private peopleListFilterFunction = this.props.inputKey + "_filteredPeoples";
  private pickerSuggestionsProps:IBasePickerSuggestionsProps;

  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value,
      currentError: undefined,
      mostRecentlyUsed: [],
      peopleList: [],
    };
    this.pickerSuggestionsProps = this._getTranslatedTexts();
  }

  /**
   * Translate all the UI text in the correct langauge.
   */
  private _getTranslatedTexts(): IBasePickerSuggestionsProps {
    let ppFormater = Helper.getTranslator("peoplepicker").formatMessage;
    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: ppFormater(LocalsPeoplePicker.suggestionsHeaderText),
      mostRecentlyUsedHeaderText: ppFormater(LocalsPeoplePicker.mostRecentlyUsedHeaderText),
      noResultsFoundText: ppFormater(LocalsPeoplePicker.noResultsFoundText),
      loadingText: ppFormater(LocalsPeoplePicker.loadingText),
      showRemoveButtons: true,
      suggestionsAvailableAlertText: ppFormater(LocalsPeoplePicker.suggestionsAvailableAlertText),
      suggestionsContainerAriaLabel: ppFormater(LocalsPeoplePicker.suggestionsContainerAriaLabel),
    };
    return suggestionProps;
  }

  /**
   * Render a Fabric DatePicker
   */
  public render(): JSX.Element {
    return (
    <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
      <CompactPeoplePicker
        pickerSuggestionsProps={ this.pickerSuggestionsProps }
        {...this.ConfigProperties}
        // These props cannot be overridden
        ref={(input) => this.innerControl = input }     
        key={ this.props.inputKey }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onResolveSuggestions={ this._onFilterChanged }
        className={ 'ms-PeoplePicker' }
        selectedItems={ this.state.currentValue }
        onChange={ this._onItemsChange }      
        getTextFromItem={ this._getTextFromItem }
        onEmptyInputFocus={ this._returnMostRecentlyUsed }
        onValidateInput={ this._validateInput } 
        />
        { this.state.currentError && Rendering.renderError(this.state.currentError) }        
      </InnerControl>);
  }

  /**
   * Event when user want remove an person from the sugestion list.
   * @param item The Person that should removed
   */
  @autobind
  private _onRemoveSuggestion(item: IPersonaProps): void {
    const { peopleList, mostRecentlyUsed: mruState } = this.state;
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mruState.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      this.setState({ peopleList: newPeople });
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mruState.slice(0, indexMostRecentlyUsed).concat(mruState.slice(indexMostRecentlyUsed + 1));
      this.setState({ mostRecentlyUsed: newSuggestedPeople });
    }
  }

  /**
   * Returns an array of person with the most recend used persons
   * @param currentPersonas The Persons that allready are choosed
   */
  @autobind
  private _returnMostRecentlyUsed(currentPersonas: IPersonaProps[]): IPersonaProps[] | IPersonaProps[] {
    let { mostRecentlyUsed } = this.state;
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
    return mostRecentlyUsed;
  }

  /**
   * Remove dupplicate persons
   * @param personas The Person array with the persons to check,
   * @param possibleDupes Array of Persons with potential dupplicates
   */
  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  /**
   * Check if a person exist in the list.
   * @param persona The Person to check
   * @param personas Array of Persons to search in
   */
  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  /**
   * Resolve the Dipslay name of an Person 
   * @param persona The Person to resolve
   */
  @autobind
  private _getTextFromItem(persona: IPersonaProps): string {
    return persona.primaryText as string;
  }
  
  /**
   * Validate any input string. If an (@) is in the string then its a valid email.
   * @param input String to validate
   */
  @autobind
  private _validateInput(input: string) {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  /**
   * Event when a user enter a filter criteria. Call the databinding store with the filter to search for persons.
   * @param filterText Entered Filtertext.
   * @param currentPersonas The current set persons (for remove the dupplicates)
   * @param limitResults Maximal amount of numbers to return
   */
  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) : PromiseLike<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => {
      if (filterText && this.retrievFilterData[this.peopleListFilterFunction]) {
        this.retrievFilterData[this.peopleListFilterFunction].retrieveData(this.props.control, Helper.getLanguage(), filterText, limitResults).then((filteredPersonas) => {
          filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
          this.setState({mostRecentlyUsed: filteredPersonas});
          resolve(filteredPersonas)
        })
      } else {
        resolve([]);
      }
    });
  }

  /**
   * Event when the selection has changed. Store the array of persons.
   * @param items Array of personas to store
   */
  @autobind
  private _onItemsChange(items: any[]) {
    let alloMulti = this.ConfigProperties.allowMultiple != undefined ? this.ConfigProperties.allowMultiple : true;
    let personas = alloMulti ? items : items.splice(items.length - 1, 1);
    this.setValue(personas, true);
  }
}
