/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject','./ExportCell'],function(M){'use strict';var E=M.extend("sap.ui.core.util.ExportColumn",{metadata:{library:"sap.ui.core",properties:{name:"string"},aggregations:{template:{type:"sap.ui.core.util.ExportCell",multiple:false}}}});return E;});
