/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/DataType','sap/ui/core/mvc/ViewType','./CalendarType','./Core'],function(D,V){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.core",version:"1.96.4",designtime:"sap/ui/core/designtime/library.designtime",types:["any","boolean","float","int","object","string","void","sap.ui.core.AbsoluteCSSSize","sap.ui.core.AccessibleRole","sap.ui.core.AccessibleLandmarkRole","sap.ui.core.aria.HasPopup","sap.ui.core.BarColor","sap.ui.core.BusyIndicatorSize","sap.ui.core.CalendarType","sap.ui.core.CSSColor","sap.ui.core.CSSSize","sap.ui.core.CSSSizeShortHand","sap.ui.core.Collision","sap.ui.core.ComponentLifecycle","sap.ui.core.Design","sap.ui.core.Dock","sap.ui.core.HorizontalAlign","sap.ui.core.ID","sap.ui.core.IconColor","sap.ui.core.ImeMode","sap.ui.core.IndicationColor","sap.ui.core.MessageType","sap.ui.core.OpenState","sap.ui.core.Orientation","sap.ui.core.Percentage","sap.ui.core.Priority","sap.ui.core.ScrollBarAction","sap.ui.core.Scrolling","sap.ui.core.SortOrder","sap.ui.core.TextAlign","sap.ui.core.TextDirection","sap.ui.core.TitleLevel","sap.ui.core.URI","sap.ui.core.ValueState","sap.ui.core.VerticalAlign","sap.ui.core.Wrapping","sap.ui.core.InvisibleMessageMode","sap.ui.core.dnd.DropEffect","sap.ui.core.dnd.DropLayout","sap.ui.core.dnd.DropPosition","sap.ui.core.mvc.ViewType","sap.ui.core.routing.HistoryDirection"],interfaces:["sap.ui.core.IShrinkable","sap.ui.core.Label","sap.ui.core.PopupInterface","sap.ui.core.Toolbar","sap.ui.core.IContextMenu","sap.ui.core.IFormContent","sap.ui.core.dnd.IDragInfo","sap.ui.core.dnd.IDropInfo","sap.ui.core.IDScope","sap.ui.core.ITitleContent","sap.ui.core.IAsyncContentCreation","sap.ui.core.IPlaceholderSupport"],controls:["sap.ui.core.ComponentContainer","sap.ui.core.Control","sap.ui.core.HTML","sap.ui.core.Icon","sap.ui.core.InvisibleText","sap.ui.core.LocalBusyIndicator","sap.ui.core.ScrollBar","sap.ui.core.TooltipBase","sap.ui.core.XMLComposite","sap.ui.core.mvc.HTMLView","sap.ui.core.mvc.JSONView","sap.ui.core.mvc.JSView","sap.ui.core.mvc.TemplateView","sap.ui.core.mvc.View","sap.ui.core.mvc.XMLView","sap.ui.core.tmpl.DOMElement","sap.ui.core.tmpl.TemplateControl","sap.ui.core.util.Export"],elements:["sap.ui.core.CustomData","sap.ui.core.Element","sap.ui.core.Item","sap.ui.core.LayoutData","sap.ui.core.ListItem","sap.ui.core.Message","sap.ui.core.SeparatorItem","sap.ui.core.Title","sap.ui.core.VariantLayoutData","sap.ui.core.dnd.DragDropBase","sap.ui.core.dnd.DragInfo","sap.ui.core.dnd.DropInfo","sap.ui.core.dnd.DragDropInfo","sap.ui.core.search.OpenSearchProvider","sap.ui.core.search.SearchProvider","sap.ui.core.tmpl.DOMAttribute","sap.ui.core.util.ExportCell","sap.ui.core.InvisibleMessage"],extensions:{"sap.ui.support":{diagnosticPlugins:["sap/ui/core/support/plugins/TechInfo","sap/ui/core/support/plugins/ControlTree","sap/ui/core/support/plugins/Debugging","sap/ui/core/support/plugins/Trace","sap/ui/core/support/plugins/Selector","sap/ui/core/support/plugins/Breakpoint","sap/ui/core/support/plugins/ViewInfo","sap/ui/core/support/plugins/LocalStorage","sap/ui/core/support/plugins/Interaction","sap/ui/core/support/plugins/Performance"],publicRules:true,internalRules:true}}});var t=sap.ui.core;t.AbsoluteCSSSize=D.createType('sap.ui.core.AbsoluteCSSSize',{isValid:function(v){return/^([-+]?(0*|([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]))|calc\(\s*(\(\s*)*[-+]?(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC])?)(\s*(\)\s*)*(\s[-+]\s|[*\/])\s*(\(\s*)*([-+]?(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC])?)))*\s*(\)\s*)*\))$/.test(v);}},D.getType('string'));t.AccessibleRole={Alert:"Alert",AlertDialog:"AlertDialog",Application:"Application",Banner:"Banner",Button:"Button",Checkbox:"Checkbox",ColumnHeader:"ColumnHeader",Combobox:"Combobox",
/**
		 * Information about the content on the page. Examples are footnotes, copyrights, or links to privacy statements.
		 *
		 * @public
		 */
ContentInfo:"ContentInfo",Definition:"Definition",Description:"Description",Dialog:"Dialog",Directory:"Directory",Document:"Document",Grid:"Grid",GridCell:"GridCell",Group:"Group",Heading:"Heading",Img:"Img",Link:"Link",List:"List",Listbox:"Listbox",ListItem:"ListItem",Log:"Log",Main:"Main",Marquee:"Marquee",Menu:"Menu",Menubar:"Menubar",MenuItem:"MenuItem",MenuItemCheckbox:"MenuItemCheckbox",MenuItemRadio:"MenuItemRadio",Navigation:"Navigation",Note:"Note",Option:"Option",Presentation:"Presentation",ProgressBar:"ProgressBar",Radio:"Radio",RadioGroup:"RadioGroup",Region:"Region",Row:"Row",RowHeader:"RowHeader",Search:"Search",Secondary:"Secondary",SeeAlso:"SeeAlso",Separator:"Separator",Slider:"Slider",SpinButton:"SpinButton",Status:"Status",Tab:"Tab",Tablist:"Tablist",Tabpanel:"Tabpanel",Textbox:"Textbox",Timer:"Timer",Toolbar:"Toolbar",Tooltip:"Tooltip",Tree:"Tree",TreeGrid:"TreeGrid",TreeItem:"TreeItem"};t.AccessibleLandmarkRole={None:"None",Banner:"Banner",Main:"Main",Region:"Region",Navigation:"Navigation",Search:"Search",Complementary:"Complementary",Form:"Form",ContentInfo:"ContentInfo"};t.aria=t.aria||{};t.aria.HasPopup={None:"None",Menu:"Menu",ListBox:"ListBox",Tree:"Tree",Grid:"Grid",Dialog:"Dialog"};t.BarColor={NEUTRAL:"NEUTRAL",POSITIVE:"POSITIVE",CRITICAL:"CRITICAL",NEGATIVE:"NEGATIVE"};t.BusyIndicatorSize={Auto:"Auto",Small:"Small",Medium:"Medium",Large:"Large"};t.CSSColor=D.createType('sap.ui.core.CSSColor',{isValid:function(v){return/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|rgb\(\s*((1?[0-9]?[0-9]|2([0-4][0-9]|5[0-5]))|([0-9]?[0-9](\.[0-9]+)?|100(\.0+)?)%)\s*(,\s*((1?[0-9]?[0-9]|2([0-4][0-9]|5[0-5]))|([0-9]?[0-9](\.[0-9]+)?|100(\.0+)?)%)\s*){2}\)|rgba\((\s*((1?[0-9]?[0-9]|2([0-4][0-9]|5[0-5]))|([0-9]?[0-9](\.[0-9]+)?|100(\.0+)?)%)\s*,){3}\s*(0(\.[0-9]+)?|1(\.0+)?)\s*\)|hsl\(\s*([0-2]?[0-9]?[0-9]|3([0-5][0-9]|60))\s*(,\s*(([0-9]?[0-9](\.[0-9]+)?|100(\.0+)?)%)\s*){2}\)|hsla\(\s*([0-2]?[0-9]?[0-9]|3([0-5][0-9]|60))\s*,(\s*(([0-9]?[0-9](\.[0-9]+)?|100(\.0+)?)%)\s*,){2}\s*(0(\.[0-9]+)?|1(\.0+)?)\s*\)|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silverskyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|transparent|inherit|)$/.test(v);}},D.getType('string'));t.CSSSize=D.createType('sap.ui.core.CSSSize',{isValid:function(v){return/^(auto|inherit|[-+]?(0*|([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|[vV][wW]|[vV][hH]|[vV][mM][iI][nN]|[vV][mM][aA][xX]|%))|calc\(\s*(\(\s*)*[-+]?(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|[vV][wW]|[vV][hH]|[vV][mM][iI][nN]|[vV][mM][aA][xX]|%)?)(\s*(\)\s*)*(\s[-+]\s|[*\/])\s*(\(\s*)*([-+]?(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|[vV][wW]|[vV][hH]|[vV][mM][iI][nN]|[vV][mM][aA][xX]|%)?)))*\s*(\)\s*)*\))$/.test(v);}},D.getType('string'));t.CSSSizeShortHand=D.createType('sap.ui.core.CSSSizeShortHand',{isValid:function(v){return/^(inherit|(auto|[-+]?(0*|(\d+|\d*\.\d+)([eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|%))){1}(\s(auto|[-+]?(0*|(\d+|\d*\.\d+)([eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|%)))){0,3})$/.test(v);}},D.getType('string'));t.Collision=D.createType('sap.ui.core.Collision',{isValid:function(v){return/^((flip|fit|none)( (flip|fit|none))?)$/.test(v);}},D.getType('string'));t.Design={Standard:"Standard",Monospace:"Monospace"};t.Dock=D.createType('sap.ui.core.Dock',{isValid:function(v){return/^((begin|left|center|right|end) (top|center|bottom))$/.test(v);}},D.getType('string'));t.HorizontalAlign={Begin:"Begin",End:"End",Left:"Left",Right:"Right",Center:"Center"};t.ID=D.createType('sap.ui.core.ID',{isValid:function(v){return/^([A-Za-z_][-A-Za-z0-9_.:]*)$/.test(v);}},D.getType('string'));t.IconColor={Default:"Default",Positive:"Positive",Negative:"Negative",Critical:"Critical",Neutral:"Neutral",Contrast:"Contrast",NonInteractive:"NonInteractive",Tile:"Tile",Marker:"Marker"};t.ImeMode={Auto:"Auto",Active:"Active",Inactive:"Inactive",Disabled:"Disabled"};t.IndicationColor={Indication01:"Indication01",Indication02:"Indication02",Indication03:"Indication03",Indication04:"Indication04",Indication05:"Indication05",Indication06:"Indication06",Indication07:"Indication07",Indication08:"Indication08"};t.MessageType={Information:"Information",Warning:"Warning",Error:"Error",None:"None",Success:"Success"};t.OpenState={OPEN:"OPEN",CLOSED:"CLOSED",OPENING:"OPENING",CLOSING:"CLOSING"};t.Orientation={Horizontal:"Horizontal",Vertical:"Vertical"};t.Percentage=D.createType('sap.ui.core.Percentage',{isValid:function(v){return/^([0-9][0-9]*(\.[0-9]+)?%)$/.test(v);}},D.getType('string'));t.Priority={None:"None",Low:"Low",Medium:"Medium",High:"High"};t.ScrollBarAction={Step:"Step",Page:"Page",MouseWheel:"MouseWheel",Drag:"Drag"};t.Scrolling={None:"None",Auto:"Auto",Scroll:"Scroll",Hidden:"Hidden"};t.SortOrder={None:"None",Ascending:"Ascending",Descending:"Descending"};t.TextAlign={Begin:"Begin",End:"End",Left:"Left",Right:"Right",Center:"Center",Initial:"Initial"};t.TextDirection={LTR:"LTR",RTL:"RTL",Inherit:"Inherit"};t.TitleLevel={Auto:"Auto",H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};t.URI=D.createType('sap.ui.core.URI',{isValid:function(v){return/^((([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?)$/.test(v);}},D.getType('string'));t.ValueState={Error:"Error",Warning:"Warning",Success:"Success",Information:"Information",None:"None"};t.VerticalAlign={Bottom:"Bottom",Middle:"Middle",Top:"Top",Inherit:"Inherit"};t.Wrapping={None:"None",Soft:"Soft",Hard:"Hard",Off:"Off"};t.dnd=t.dnd||{};t.dnd.DropPosition={On:"On",Between:"Between",OnOrBetween:"OnOrBetween"};t.dnd.DropLayout={Default:"Default",Vertical:"Vertical",Horizontal:"Horizontal"};t.dnd.DropEffect={Copy:"Copy",Move:"Move",Link:"Link",None:"None"};t.mvc=t.mvc||{};t.mvc.ViewType=V;t.routing=t.routing||{};t.routing.HistoryDirection={Forwards:"Forwards",Backwards:"Backwards",NewEntry:"NewEntry",Unknown:"Unknown"};sap.ui.core.ComponentLifecycle={Legacy:"Legacy",Application:"Application",Container:"Container"};sap.ui.core.InvisibleMessageMode={Polite:"Polite",Assertive:"Assertive"};var l=sap.ui.lazyRequire;function e(p,c,s){for(var i=0;i<c.length;i++){if(s){l(s,c[i].toLowerCase(),p+c[i]);}else{l(p+c[i],"new extend getMetadata");}}}l("sap.ui.core.BusyIndicator","show hide attachOpen detachOpen attachClose detachClose");l("sap.ui.core.tmpl.Template","registerType unregisterType");l("sap.ui.core.Fragment","registerType byId createId");l("sap.ui.core.IconPool","createControlByURI addIcon getIconURI getIconInfo isIconURI getIconCollectionNames getIconNames getIconForMimeType");l("sap.ui.core.service.ServiceFactoryRegistry","register unregister get");l("sap.ui.model.odata.AnnotationHelper","createPropertySetting format getNavigationPath"+" gotoEntitySet gotoEntityType gotoFunctionImport isMultiple resolvePath simplePath");var A=sap.ui.model&&sap.ui.model.odata&&sap.ui.model.odata.AnnotationHelper;if(A){A.format.requiresIContext=true;A.getNavigationPath.requiresIContext=true;A.isMultiple.requiresIContext=true;A.simplePath.requiresIContext=true;}l("sap.ui","xmlfragment","sap.ui.core.Fragment");l("sap.ui","jsfragment","sap.ui.core.Fragment");l("sap.ui","htmlfragment","sap.ui.core.Fragment");e("sap.ui.model.",["Filter","Sorter","json.JSONModel","resource.ResourceModel","odata.ODataModel","odata.v2.ODataModel","odata.v4.ODataModel","xml.XMLModel"]);e("sap.ui.model.type.",["Boolean","Integer","Float","String","Date","Time","DateTime","FileSize","Currency","Unit","DateInterval","DateTimeInterval","TimeInterval"]);e("sap.ui.model.odata.type.",["Boolean","Byte","Currency","Date","DateTime","DateTimeOffset","Double","Decimal","Guid","Int16","Int32","Int64","Raw","SByte","Single","Stream","String","Time","TimeOfDay","Unit"]);e("sap.ui.core.",["Locale","LocaleData","mvc.Controller","UIComponent"]);e("sap.ui.core.mvc.",["Controller","View","JSView","JSONView","XMLView","HTMLView","TemplateView"],"sap.ui");e("sap.ui.core.",["Component"],"sap.ui");e("sap.ui.core.tmpl.",["Template"],"sap.ui");e("sap.ui.core.routing.",["HashChanger","History","Route","Router","Target","Targets","Views"]);e("sap.ui.core.service.",["ServiceFactory","Service"]);return sap.ui.core;});
