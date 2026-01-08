import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// translations
const resources = {
  en: {
    translation: {
      "chooseCity": "Choose City",
      "athens": "Athens",
      "patra": "Patras",
      "thes": "Thessaloniki",
      "discover": "Discover the best activities in your city",
      "begin": "Begin",
      "filters": "Filters",
      "personal": "Personal",
      "city": "City",
      "changeCity": "Change city",
      "activities": "Activities",
      "ActivitiesBasedOnCity": "All Activities based on the city of your choise",
      "favorites": "Favorites",
      "savedFavorites": "All your saved activities appear here",
      "exit": "Logout from your account",
      "events": "Events",
      "MyEvents": "My Events",
      "addedEvents": "All events that you've added",
      "createEvent": "Create an event",
      "createDescription": "Create your new event",
      "editEvent": "Edit your event",
      "editDescription": "Edit or Delete your events",
      "about": "About",
      "terms": "Terms & Conditions",
      "privacy": "Privacy Policy",
      "logIn": "Log in",
      "provider": "Are you an event provider?"
    }
  },
  el: {
    translation: {
      "chooseCity": "Επιλέξτε πόλη",
      "athens": "Aθήνα",
      "patra": "Πάτρα",
      "thes": "Θεσσαλονίκη",
      "discover": "Ανακαλύψτε τις καλύτερες εμπειρίες στην πόλη σας",
      "begin": "Ξεκινήστε",
      "filters": "Φίλτρα",
      "personal": "Επιλογές",
      "city": "Πόλη",
      "changeCity": "Αλλάξτε Πόλη",
      "activities": "Δραστηριότητες",
      "ActivitiesBasedOnCity": "Όλες οι δραστηριότητες, με βάση την πόλη της επιλογής σας",
      "favorites": "Αγαπημένα",
      "savedFavorites": "'Ο.τι δραστηριότητα έχετε αποθηκεύσει εμφανίζεται εδώ",
      "exit": "Έξοδος από τον λογαριασμό",
      "events": "Διαχείρηση",
      "MyEvents": "Οι δραστηριότητες μου",
      "addedEvents": "Δείτε τις δραστηριότητες που έχετε προσθέσει",
      "createEvent": "Προσθέστε μια δραστηριότητα",
      "createDescription": "Δημιουργείστε μια δραστηριότητα για το κοινό",
      "editEvent": "Διαχειριστείτε τις δραστηριότητές σας",
      "editDescription": "Επεξεργαστείτε ή διαγράψτε τις δραστηριότητές σας",
      "about": "Νομικά",
      "terms": "Όροι Χρήσης και εξυπηρέτησης",
      "privacy": "Πολιτική Aπορρήτου",
      "logIn": "Συνδεθείτε",
      "provider": "Είστε πάροχος υπηρεσιών;"
    }
  }
};


const deviceLanguage = ((Localization as any).locale || 'en').split('-')[0];

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;

