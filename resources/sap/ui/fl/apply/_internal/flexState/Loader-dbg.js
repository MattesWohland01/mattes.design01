/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/base/util/deepClone",
	"sap/ui/fl/apply/_internal/flexState/ManifestUtils",
	"sap/ui/fl/initial/_internal/Storage",
	"sap/ui/fl/Utils"
], function(
	deepClone,
	ManifestUtils,
	ApplyStorage,
	Utils
) {
	"use strict";

	function getIdIsLocalTrueObject(vSelector) {
		if (typeof vSelector === "string") {
			vSelector = {id: vSelector};
		}
		vSelector.idIsLocal = true;

		return vSelector;
	}

	function migrateSelectorFlags(bMigrationNeeded, mFlexData) {
		if (bMigrationNeeded) {
			[
				mFlexData.changes,
				mFlexData.variantChanges,
				mFlexData.variantDependentControlChanges,
				mFlexData.variantManagementChanges
			].forEach(function (aFlexItems) {
				// a for is used due to the alteration of the array and its length
				for (var i = aFlexItems.length - 1; i >= 0; i--) {
					var oFlexItem = aFlexItems[i];
					if (!oFlexItem.selector.idIsLocal) {
						// ensure the UID stays the same to send the correct ID on a condensing request (delete section)
						var oFlexItemCopy = deepClone(oFlexItem);
						oFlexItem.cloned = true;
						oFlexItemCopy.selector = getIdIsLocalTrueObject(oFlexItemCopy.selector);

						// do the same for dependentSelectors
						if (oFlexItemCopy.dependentSelector) {
							Object.keys(oFlexItemCopy.dependentSelector).forEach(function (oFlexItemCopy, sCategory) {
								if (Array.isArray(oFlexItemCopy.dependentSelector[sCategory])) {
									oFlexItemCopy.dependentSelector[sCategory] = oFlexItemCopy.dependentSelector[sCategory].map(getIdIsLocalTrueObject);
								} else {
									oFlexItemCopy.dependentSelector[sCategory] = getIdIsLocalTrueObject(oFlexItemCopy.dependentSelector[sCategory]);
								}
							}.bind(undefined, oFlexItemCopy));
						}

						aFlexItems.splice(i, 0, oFlexItemCopy);
					}
				}
			});
		}

		return mFlexData;
	}

	function isMigrationNeeded(oManifest) {
		return oManifest && !!ManifestUtils.getOvpEntry(oManifest);
	}

	function formatFlexData(mFlexData) {
		// TODO: rename "changes" everywhere to avoid oResponse.changes.changes calls
		return {
			changes: mFlexData,
			cacheKey: mFlexData.cacheKey
		};
	}

	/**
	 * Class for loading Flex Data from the backend via the Connectors.
	 *
	 * @namespace sap.ui.fl.apply._internal.flexState.Loader
	 * @experimental
	 * @since 1.74
	 * @version 1.96.4
	 * @private
	 * @ui5-restricted sap.ui.fl.apply._internal.flexState
	 */
	return {
		/**
		 * Provides the flex data for a given application based on the configured connectors.
		 * This function needs a manifest object, async hints and either an ID to an instantiated component or component data as parameter.
		 *
		 * The property <code>partialFlexData</code> contains the flexData except the data from flexibility-bundle.json or changes-bundle.json.
		 * This is needed in case descriptor changes are required in a maniFirst scenario before the component and thus the bundle can be loaded.
		 *
		 * @param {object} mPropertyBag - Contains additional data needed for loading changes
		 * @param {object} mPropertyBag.manifest - ManifestObject that belongs to current component
		 * @param {object} mPropertyBag.reference - Flex Reference
		 * @param {string} mPropertyBag.componentData - Component data of the current component
		 * @param {object} [mPropertyBag.reInitialize] - Flag if the application is reinitialized even if it was loaded before
		 * @param {object} [mPropertyBag.asyncHints] - Async hints passed from the app index to the component processing
		 * @param {number} [mPropertyBag.version] - Number of the version in which the state should be initialized
		 * @param {object} [mPropertyBag.partialFlexData] - Contains current flexstate for this reference, indicator to reload bundles from storage
		 * @param {boolean} [mPropertyBag.allContexts] - Includes also restricted context
		 * @returns {Promise<object>} resolves with the change file for the given component from the Storage
		 */
		loadFlexData: function (mPropertyBag) {
			var sComponentName = ManifestUtils.getBaseComponentNameFromManifest(mPropertyBag.manifest);

			if (mPropertyBag.partialFlexData) {
				return ApplyStorage.completeFlexData({
					reference: mPropertyBag.reference,
					componentName: sComponentName,
					partialFlexData: mPropertyBag.partialFlexData
				}).then(formatFlexData);
			}

			// the cache key cannot be used in case of a reinitialization
			var sCacheKey = mPropertyBag.reInitialize ? undefined : ManifestUtils.getCacheKeyFromAsyncHints(mPropertyBag.reference, mPropertyBag.asyncHints);

			return ApplyStorage.loadFlexData({
				reference: mPropertyBag.reference,
				componentName: sComponentName,
				cacheKey: sCacheKey,
				siteId: Utils.getSiteIdByComponentData(mPropertyBag.componentData),
				appDescriptor: mPropertyBag.manifest.getRawJson ? mPropertyBag.manifest.getRawJson() : mPropertyBag.manifest,
				version: mPropertyBag.version,
				allContexts: mPropertyBag.allContexts
			}).then(migrateSelectorFlags.bind(undefined, isMigrationNeeded(mPropertyBag.manifest))).then(formatFlexData);
		}
	};
});
