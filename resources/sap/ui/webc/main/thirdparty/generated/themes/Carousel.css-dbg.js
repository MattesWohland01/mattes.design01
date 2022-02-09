sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theme-base", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var CarouselCss = ":host(:not([hidden])){display:inline-block}:host{width:100%;min-width:15.5rem;height:100%}.ui5-carousel-root:focus{outline:1px dotted var(--sapContent_FocusColor)}.ui5-carousel-root{height:inherit;position:relative;display:flex;flex-direction:column;align-items:center}.ui5-carousel-viewport{width:100%;height:inherit;position:relative;display:flex;flex-direction:column;align-items:flex-start;overflow:hidden}.ui5-carousel-viewport.ui5-carousel-viewport--single{align-items:center}.ui5-carousel-content{height:100%;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;background:var(--sapBackgroundColor);transition:transform .5s cubic-bezier(.46,0,.44,1);will-change:transform}.ui5-carousel-content.ui5-carousel-content-no-animation{transition:none}.ui5-carousel-content.ui5-carousel-content-has-navigation{height:calc(100% - 1rem)}.ui5-carousel-item{height:100%;display:flex;align-items:center;justify-content:center;padding:0 .75rem;box-sizing:border-box;transition:visibility .5s linear;will-change:visibility}.ui5-carousel-item--hidden{visibility:hidden}.ui5-carousel-navigation-arrows{width:100%;padding:0 .5rem;position:absolute;top:calc(50% - 2.5rem);left:0;display:flex;justify-content:space-between;box-sizing:border-box;pointer-events:none}.ui5-carousel-navigation-arrows>[ui5-button]{pointer-events:all}.ui5-carousel-navigation-wrapper{width:100%;height:2.75rem;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor)}.ui5-carousel-navigation-wrapper.ui5-carousel-navigation-with-buttons{height:3.5rem}.ui5-carousel-navigation-button{width:var(--ui5_carousel_button_size);height:var(--ui5_carousel_button_size);border-radius:50%;box-shadow:none;cursor:pointer;outline-offset:.1rem}.ui5-carousel-navigation-button--hidden{visibility:hidden;padding:0}.ui5-carousel-navigation{width:9rem;height:2rem;display:flex;justify-content:center;align-items:center}.ui5-carousel-navigation-dot{width:var(--ui5_carousel_width);height:var(--ui5_carousel_height);margin:var(--ui5_carousel_margin);border-radius:50%;background-color:var(--ui5_carousel_dot_background);border:var(--ui5_carousel_dot_border);transition:background-color .1s ease-in}.ui5-carousel-navigation-dot[active]{width:.5rem;height:.5rem;margin:0 .25rem;background-color:var(--sapSelectedColor);border:var(--ui5_carousel_dot_border)}";

	return CarouselCss;

});
