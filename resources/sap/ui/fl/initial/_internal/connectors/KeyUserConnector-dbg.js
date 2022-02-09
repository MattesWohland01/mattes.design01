/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/base/util/merge",
	"sap/ui/fl/initial/_internal/connectors/BackendConnector",
	"sap/ui/fl/Layer"
], function(
	merge,
	BackendConnector,
	Layer
) {
	"use strict";

	var PREFIX = "/flex/keyuser";
	var API_VERSION = "/v1";

	/**
	 * Connector for requesting data from SAPUI5 Flexibility KeyUser service.
	 *
	 * @namespace sap.ui.fl.initial._internal.connectors.KeyUserConnector
	 * @since 1.70
	 * @private
	 * @ui5-restricted sap.ui.fl.initial._internal.Storage, sap.ui.fl.write._internal.Storage
	 */
	var KeyUserConnector = merge({}, BackendConnector, { /** @lends sap.ui.fl.initial._internal.connectors.KeyUserConnector */
		layers: [
			Layer.CUSTOMER
		],
		ROUTES: {
			DATA: PREFIX + API_VERSION + "/data/"
		},
		isLanguageInfoRequired: true
	});

	return KeyUserConnector;
});