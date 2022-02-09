sap.ui.define(['exports'], function (exports) { 'use strict';

	var messagebundle_tr = {
		ARIA_LABEL_CARD_CONTENT: "Kart içeriği",
		ARIA_ROLEDESCRIPTION_CARD: "Kart",
		ARIA_ROLEDESCRIPTION_CARD_HEADER: "Kart başlığı",
		ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER: "Etkileşimli kart başlığı",
		AVATAR_TOOLTIP: "Avatar",
		AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL: "{0} görüntüleniyor, {1} gizli.",
		AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL: "Eksiksiz liste için etkinleştirin.",
		AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL: "Münferit avatarlar.",
		AVATAR_GROUP_ARIA_LABEL_GROUP: "Birleşik avatarlar.",
		AVATAR_GROUP_MOVE: "Taşımak için OK tuşlarına basın.",
		BADGE_DESCRIPTION: "Rozet",
		BREADCRUMBS_ARIA_LABEL: "Dolaşma yolu",
		BREADCRUMBS_OVERFLOW_ARIA_LABEL: "Daha fazla",
		BREADCRUMBS_CANCEL_BUTTON: "İptal et",
		BUSY_INDICATOR_TITLE: "Bekleyin",
		BUTTON_ARIA_TYPE_ACCEPT: "Pozitif işlem",
		BUTTON_ARIA_TYPE_REJECT: "Negatif işlem",
		BUTTON_ARIA_TYPE_EMPHASIZED: "Vurgulandı",
		CAROUSEL_OF_TEXT: "/",
		CAROUSEL_DOT_TEXT: "{1} öğeden {0} öğe görüntüleniyor",
		CAROUSEL_PREVIOUS_ARROW_TEXT: "Önceki sayfa",
		CAROUSEL_NEXT_ARROW_TEXT: "Sonraki sayfa",
		COLORPALETTE_CONTAINER_LABEL: "Renk paleti - ön tanımlı renkler",
		COLORPALETTE_COLOR_LABEL: "Renk",
		COLOR_PALETTE_DIALOG_CANCEL_BUTTON: "İptal et",
		COLOR_PALETTE_DIALOG_OK_BUTTON: "Tamam",
		COLOR_PALETTE_DIALOG_TITLE: "Rengi değiştir",
		COLOR_PALETTE_MORE_COLORS_TEXT: "Daha fazla renk...",
		DATEPICKER_OPEN_ICON_TITLE: "Seçiciyi aç",
		DATEPICKER_DATE_DESCRIPTION: "Tarih girişi",
		DATETIME_DESCRIPTION: "Tarih ve saat girişi",
		DATERANGE_DESCRIPTION: "Tarih aralığı girişi",
		DELETE: "Sil",
		FILEUPLOAD_BROWSE: "Gözat...",
		FILEUPLOADER_TITLE: "Dosyayı yukarı yükle",
		GROUP_HEADER_TEXT: "Grup başlığı",
		SELECT_OPTIONS: "Seçenekleri seç",
		INPUT_SUGGESTIONS: "Öneriler kullanılabilir",
		INPUT_SUGGESTIONS_TITLE: "Seç",
		INPUT_SUGGESTIONS_ONE_HIT: "1 sonuç mevcut",
		INPUT_SUGGESTIONS_MORE_HITS: "{0} sonuç mevcut",
		INPUT_SUGGESTIONS_NO_HIT: "Sonuç yok",
		LINK_SUBTLE: "İnce",
		LINK_EMPHASIZED: "Vurgulu",
		LIST_ITEM_POSITION: "{0} / {1} liste öğesi",
		LIST_ITEM_SELECTED: "Seçilenler",
		ARIA_LABEL_LIST_ITEM_CHECKBOX: "Çoklu seçim kipi",
		MESSAGE_STRIP_CLOSE_BUTTON: "Kapatma için ileti satırı",
		MULTICOMBOBOX_DIALOG_OK_BUTTON: "Tamam",
		MULTIINPUT_ROLEDESCRIPTION_TEXT: "Çoklu değer girdisi",
		MULTIINPUT_SHOW_MORE_TOKENS: "{0} daha",
		PANEL_ICON: "Genişlet/daralt",
		RANGE_SLIDER_ARIA_DESCRIPTION: "Aralık",
		RANGE_SLIDER_START_HANDLE_DESCRIPTION: "Sol tutamaç",
		RANGE_SLIDER_END_HANDLE_DESCRIPTION: "Sağ tutamaç",
		RATING_INDICATOR_TOOLTIP_TEXT: "Değerleme",
		RATING_INDICATOR_TEXT: "Derecelendirme yıldızı",
		RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON: "Reddet",
		SEGMENTEDBUTTON_ARIA_DESCRIPTION: "Segmentlere ayrılmış düğme grubu",
		SEGMENTEDBUTTON_ARIA_DESCRIBEDBY: "Öğe seçmek için ENTER'a veya boşluk tuşuna basın.",
		SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION: "Segmentlere ayrılmış düğme",
		SLIDER_ARIA_DESCRIPTION: "Kaydırıcı tutamacı",
		SWITCH_ON: "Açık",
		SWITCH_OFF: "Kapalı",
		LOAD_MORE_TEXT: "Daha fazla",
		TABLE_HEADER_ROW_TEXT: "Başlık",
		TABLE_ROW_POSITION: "{0}/{1}",
		TABLE_GROUP_ROW_ARIA_LABEL: "Grup başlığı satırı",
		ARIA_LABEL_ROW_SELECTION: "Kalem seçimi",
		ARIA_LABEL_SELECT_ALL_CHECKBOX: "Tüm satırları seç",
		TABCONTAINER_NEXT_ICON_ACC_NAME: "Sonraki",
		TABCONTAINER_PREVIOUS_ICON_ACC_NAME: "Önceki",
		TABCONTAINER_OVERFLOW_MENU_TITLE: "Taşma menüsü",
		TEXTAREA_CHARACTERS_LEFT: "{0} karakter kaldı",
		TEXTAREA_CHARACTERS_EXCEEDED: "{0} karakter aşıldı",
		TIMEPICKER_HOURS_LABEL: "Saat",
		TIMEPICKER_MINUTES_LABEL: "Dakika",
		TIMEPICKER_SECONDS_LABEL: "Saniye",
		TIMEPICKER_PERIODS_LABEL: "AM/PM",
		TIMEPICKER_SUBMIT_BUTTON: "Tamam",
		TIMEPICKER_CANCEL_BUTTON: "İptal et",
		TIMEPICKER_INPUT_DESCRIPTION: "Zaman girişi",
		DURATION_INPUT_DESCRIPTION: "Süre girişi",
		DATETIME_PICKER_DATE_BUTTON: "Tarih",
		DATETIME_PICKER_TIME_BUTTON: "Zaman",
		TOKEN_ARIA_DELETABLE: "Silinebilir",
		TOKENIZER_ARIA_CONTAIN_TOKEN: "Simge yok",
		TOKENIZER_ARIA_CONTAIN_ONE_TOKEN: "1 simge içerir",
		TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS: "{0} simge içerir",
		TOKENIZER_ARIA_LABEL: "Simgeleştirici",
		TOKENIZER_POPOVER_REMOVE: "Kaldır",
		TREE_ITEM_ARIA_LABEL: "Ağaç öğesi",
		TREE_ITEM_EXPAND_NODE: "Düğümü genişlet",
		TREE_ITEM_COLLAPSE_NODE: "Düğümü daralt",
		VALUE_STATE_ERROR: "Geçersiz giriş",
		VALUE_STATE_WARNING: "Uyarı verildi",
		VALUE_STATE_INFORMATION: "Bilgilendirici giriş",
		VALUE_STATE_SUCCESS: "Giriş başarıyla doğrulandı",
		CALENDAR_HEADER_NEXT_BUTTON: "Sonraki",
		CALENDAR_HEADER_PREVIOUS_BUTTON: "Önceki",
		DAY_PICKER_WEEK_NUMBER_TEXT: "Hafta sayısı",
		DAY_PICKER_NON_WORKING_DAY: "Çalışılmayan gün",
		DAY_PICKER_TODAY: "Bugün",
		STEPINPUT_DEC_ICON_TITLE: "Azalt",
		STEPINPUT_INC_ICON_TITLE: "Artır"
	};

	exports.default = messagebundle_tr;

});
