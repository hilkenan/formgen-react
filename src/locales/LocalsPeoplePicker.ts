import { defineMessages } from 'react-intl';

/**
 * People Picker Translaiton const with default value in english.
 */
export const LocalsPeoplePicker = defineMessages({ 
    suggestionsHeaderText: { 
        id: "suggestionsHeaderText", 
        defaultMessage: "Suggested People"
      },
    mostRecentlyUsedHeaderText: { 
        id: "mostRecentlyUsedHeaderText", 
        defaultMessage: "Suggested Contacts"
    },
    noResultsFoundText: { 
        id: "noResultsFoundText", 
        defaultMessage: "No results found"
    },
    loadingText: { 
        id: "loadingText", 
        defaultMessage: "Loading"
    },
    suggestionsAvailableAlertText: { 
        id: "suggestionsAvailableAlertText", 
        defaultMessage: "Suggestions available"
    },
    suggestionsContainerAriaLabel: { 
        id: "suggestionsContainerAriaLabel", 
        defaultMessage: "Suggested contacts"
    }
}); 