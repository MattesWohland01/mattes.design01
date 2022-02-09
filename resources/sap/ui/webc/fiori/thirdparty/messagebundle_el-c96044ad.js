sap.ui.define(["exports"],function(T){"use strict";var _={BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT:"Ακύρωση",BARCODE_SCANNER_DIALOG_LOADING_TXT:"Φόρτωση",FCL_START_COLUMN_TXT:"Πρώτη στήλη",FCL_MIDDLE_COLUMN_TXT:"Μεσαία στήλη",FCL_END_COLUMN_TXT:"Τελευταία στήλη",FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP:"Επέκταση της πρώτης στήλης",FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"Σύμπτυξη της πρώτης στήλης",FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP:"Επέκταση της τελευταίας στήλης",FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"Σύμπτυξη της τελευταίας στήλης",NOTIFICATION_LIST_ITEM_TXT:"Γνωστοποίηση",NOTIFICATION_LIST_ITEM_SHOW_MORE:"Εμφάν.Περισσοτ.",NOTIFICATION_LIST_ITEM_SHOW_LESS:"Εμφάνιση Λιγότερων",NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE:"Περισσότερα",NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE:"Κλείσιμο",NOTIFICATION_LIST_ITEM_READ:"Ανάγνωση",NOTIFICATION_LIST_ITEM_UNREAD:"ΜηΔιαβ",NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT:"Υψηλή Προτεραιότητα",NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT:"Μεσαία Προτεραιότητα",NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT:"Χαμηλή Προτεραιότητα",NOTIFICATION_LIST_GROUP_ITEM_TXT:"Ομάδα Ειδοποιήσεων",NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT:"Μετρητής",NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE:"Κλείσιμο Όλων",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE:"Σύμπτυξη Ομάδας",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE:"Επέκταση Ομάδας",TIMELINE_ARIA_LABEL:"Χρονοδιάγραμμα",UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT:"Ακύρωση",UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT:"Μετονομασία",UPLOADCOLLECTIONITEM_ERROR_STATE:"Τερματίστηκε",UPLOADCOLLECTIONITEM_READY_STATE:"Εκκρεμής",UPLOADCOLLECTIONITEM_UPLOADING_STATE:"Φόρτωση",UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT:"Τερματισμός",UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT:"Νέα προσπάθεια",UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT:"Eπεξεργασία",UPLOADCOLLECTION_NO_DATA_TEXT:"Αρχεία δεν βρέθηκαν.",UPLOADCOLLECTION_NO_DATA_DESCRIPTION:"Απόθεση αρχείων για φόρτωσή τους ή χρήση του κουμπιού «Φόρτωση».",UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION:"Φόρτωση Συλλογής",UPLOADCOLLECTION_DRAG_FILE_INDICATOR:"Μεταφορά αρχείων εδώ.",UPLOADCOLLECTION_DROP_FILE_INDICATOR:"Απόθεση αρχείων για φόρτωσή τους.",SHELLBAR_LABEL:"Γραμμή Shell",SHELLBAR_LOGO:"Λογότυπο",SHELLBAR_COPILOT:"CoPilot",SHELLBAR_NOTIFICATIONS:"{0} Ειδοποιήσεις",SHELLBAR_PROFILE:"Προφίλ",SHELLBAR_PRODUCTS:"Προϊόντα",PRODUCT_SWITCH_CONTAINER_LABEL:"Προϊόντα",SHELLBAR_SEARCH:"Αναζήτηση",SHELLBAR_OVERFLOW:"Περισσότερα",SHELLBAR_CANCEL:"Ακύρωση",WIZARD_NAV_ARIA_LABEL:"Γραμμή Προόδου Οδηγού",WIZARD_LIST_ARIA_LABEL:"Βήματα Προόδου",WIZARD_LIST_ARIA_DESCRIBEDBY:"Για ενεργοποίηση, πατήστε τη μπάρα διαστήματος ή Enter",WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL:"Βήματα",WIZARD_OPTIONAL_STEP_ARIA_LABEL:"Προαιρετικό",WIZARD_STEP_ACTIVE:"Ενεργό",WIZARD_STEP_INACTIVE:"Aνενεργό",WIZARD_STEP_ARIA_LABEL:"Βήμα {0}",WIZARD_NAV_ARIA_ROLE_DESCRIPTION:"Οδηγός",WIZARD_NAV_STEP_DEFAULT_HEADING:"Βήμα",VSD_DIALOG_TITLE_SORT:"Ταξινόμηση",VSD_SUBMIT_BUTTON:"ΟΚ",VSD_CANCEL_BUTTON:"Ακύρωση",VSD_RESET_BUTTON:"Επαναφορά",VSD_SORT_ORDER:"Σειρά Ταξινόμησης",VSD_SORT_BY:"Ταξινόμηση Κατά",VSD_ORDER_ASCENDING:"Αύξουσα",VSD_ORDER_DESCENDING:"Φθίνουσα",IM_TITLE_BEFORESEARCH:"Εμφάνιση αποτελεσμάτων",IM_SUBTITLE_BEFORESEARCH:"Ξεκινήστε παρέχοντας τα κριτήρια αναζήτησης.",IM_TITLE_NOACTIVITIES:"Δεν προσθέσατε δραστηριότητες ακόμη.",IM_SUBTITLE_NOACTIVITIES:"Θέλετε να προσθέσετε μία τώρα;",IM_TITLE_NODATA:"Δεν υπάρχουν δεδομένα ακόμη.",IM_SUBTITLE_NODATA:"Μόλις υπάρξουν, θα τα δείτε εδώ.",IM_TITLE_NOMAIL:"Κανένα νέο μήνυμα.",IM_SUBTITLE_NOMAIL:"Ελέγξτε πάλι αργότερα.",IM_TITLE_NOENTRIES:"Δεν υπάρχουν καταχωρίσεις ακόμη",IM_SUBTITLE_NOENTRIES:"Μόλις υπάρξουν, θα τις δείτε εδώ.",IM_TITLE_NONOTIFICATIONS:"Δεν λάβατε νέες ειδοποιήσεις",IM_SUBTITLE_NONOTIFICATIONS:"Ελέγξτε πάλι αργότερα.",IM_TITLE_NOSAVEDITEMS:"Δεν προσθέσατε δραστηριότητες και αγαπημένα ακόμη.",IM_SUBTITLE_NOSAVEDITEMS:"Θέλετε να δημιουργήσετε μία λίστα με τα αγαπημένα σας είδη τώρα;",IM_TITLE_NOSEARCHRESULTS:"Αποτελέσματα δεν βρέθηκαν",IM_SUBTITLE_NOSEARCHRESULTS:"Δοκιμάστε να αλλάξετε τα κριτήρια αναζήτησης.",IM_TITLE_NOTASKS:"Δεν λάβατε νέες εργασίες",IM_SUBTITLE_NOTASKS:"Μόλις υπάρξουν, θα τις δείτε εδώ.",IM_TITLE_UNABLETOLOAD:"Αδύνατη η φόρτωση δεδομένων",IM_SUBTITLE_UNABLETOLOAD:"Ελέγξτε την σύνδεση διαδικτύου. Εάν το πρόβλημα παραμένει δοκιμάστε επαναφόρτωση. Εάν εξακολουθεί το πρόβλημα, επικοινωνήστε με τον διαχειριστή σας.",IM_TITLE_UNABLETOUPLOAD:"Αδύνατη η προσκόμιση δεδομένων",IM_SUBTITLE_UNABLETOUPLOAD:"Ελέγξτε την σύνδεση διαδικτύου. Εάν το πρόβλημα παραμένει, ελέγξτε τη μορφή αρχείου και το μέγεθος αρχείου. Διαφορετικά, επικοινωνήστε με το διαχειριστή σας."};T.default=_});