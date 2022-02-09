/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger","sap/ui/fl/apply/_internal/flexState/compVariants/Utils","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/Utils","sap/ui/fl/LayerUtils"],function(C,a,F,M,U,L){"use strict";function g(c){var r=M.getFlexReferenceForControl(c);var p=a.getPersistencyKey(c);var m=F.getCompVariantsMap(r);return m._getOrCreate(p);}function b(p){var c=p.control;var r=M.getFlexReferenceForControl(c);return F.initialize({reference:r,componentData:{},manifest:U.getAppDescriptor(c),componentId:U.getAppComponentForControl(c).getId()}).then(function(){var P=a.getPersistencyKey(c);var m=F.getCompVariantsMap(r);F.setInitialNonFlCompVariantData(r,P,p.standardVariant,p.variants);return m._initialize(P,p.variants);});}var S={loadVariants:function(p){return b(p).then(function(c){var P=a.getPersistencyKey(p.control);return C.merge(P,c,p.standardVariant);});},isApplicationVariant:function(p){var c=p.control;if(U.isApplicationVariant(c)){return true;}var o=U.getComponentForControl(c);if(o&&o.getAppComponent){o=o.getAppComponent();if(o){return true;}}return false;},isVendorLayer:function(){return L.isVendorLayer();},isDeveloperLayer:function(){return L.isDeveloperLayer();},isVariantDownport:function(){return L.isVendorLayer()&&U.isHotfixMode();},getDefaultVariantId:function(p){var d=g(p.control).defaultVariants;var c=d[d.length-1];return c?c.getContent().defaultVariantName:"";}};return S;});
