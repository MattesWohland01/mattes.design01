/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.main.RadioButton.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"sap/ui/core/library",
	"./thirdparty/RadioButton"
], function(WebComponent, library, coreLibrary) {
	"use strict";

	var ValueState = coreLibrary.ValueState;
	var WrappingType = library.WrappingType;

	/**
	 * Constructor for a new <code>RadioButton</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3>
	 *
	 * The <code>sap.ui.webc.main.RadioButton</code> component enables users to select a single option from a set of options. When a <code>sap.ui.webc.main.RadioButton</code> is selected by the user, the <code>change</code> event is fired. When a <code>sap.ui.webc.main.RadioButton</code> that is within a group is selected, the one that was previously selected gets automatically deselected. You can group radio buttons by using the <code>name</code> property. <br>
	 * <b>Note:</b> If <code>sap.ui.webc.main.RadioButton</code> is not part of a group, it can be selected once, but can not be deselected back.
	 *
	 * <h3>Keyboard Handling</h3>
	 *
	 * Once the <code>sap.ui.webc.main.RadioButton</code> is on focus, it might be selected by pressing the Space and Enter keys. <br>
	 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group, while TAB and SHIFT + TAB can be used to enter or leave the radio button group. <br>
	 * <b>Note:</b> On entering radio button group, the focus goes to the currently selected radio button.
	 *
	 * @author SAP SE
	 * @version 1.96.4
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.RadioButton
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var RadioButton = WebComponent.extend("sap.ui.webc.main.RadioButton", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-radio-button-ui5",
			properties: {

				/**
				 * Defines whether the component is checked or not. <br>
				 * <br>
				 * <b>Note:</b> The property value can be changed with user interaction, either by clicking/tapping on the component, or by using the Space or Enter key.
				 */
				checked: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines whether the component is disabled. <br>
				 * <br>
				 * <b>Note:</b> A disabled component is completely noninteractive.
				 */
				disabled: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines the name of the component. Radio buttons with the same <code>name</code> will form a radio button group.
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> The selection can be changed with <code>ARROW_UP/DOWN</code> and <code>ARROW_LEFT/RIGHT</code> keys between radio buttons in same group.
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> Only one radio button can be selected per group.
				 *
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> When set, a native <code>input</code> HTML element will be created inside the component so that it can be submitted as part of an HTML form.
				 */
				name: {
					type: "string",
					defaultValue: ""
				},

				/**
				 * Defines whether the component is read-only. <br>
				 * <br>
				 * <b>Note:</b> A read-only component is not editable, but still provides visual feedback upon user interaction.
				 */
				readonly: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines the text of the component.
				 */
				text: {
					type: "string",
					defaultValue: ""
				},

				/**
				 *
				 */
				value: {
					type: "string",
					defaultValue: ""
				},

				/**
				 * Defines the value state of the component. <br>
				 * <br>
				 * Available options are:
				 * <ul>
				 *     <li><code>None</code></li>
				 *     <li><code>Error</code></li>
				 *     <li><code>Warning</code></li>
				 * </ul>
				 */
				valueState: {
					type: "sap.ui.core.ValueState",
					defaultValue: ValueState.None
				},

				/**
				 * Defines whether the component text wraps when there is not enough space. <br>
				 * <br>
				 * Available options are:
				 * <ul>
				 *     <li><code>None</code> - The text will be truncated with an ellipsis.</li>
				 *     <li><code>Normal</code> - The text will wrap. The words will not be broken based on hyphenation.</li>
				 * </ul>
				 */
				wrappingType: {
					type: "sap.ui.webc.main.WrappingType",
					defaultValue: WrappingType.None
				}
			},
			events: {

				/**
				 * Fired when the component checked state changes.
				 */
				change: {
					parameters: {}
				}
			}
		}
	});

	return RadioButton;
});