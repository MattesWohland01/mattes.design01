ace.define("ace/mode/prisma_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var P=function(){this.$rules={start:[{include:"#triple_comment"},{include:"#double_comment"},{include:"#model_block_definition"},{include:"#config_block_definition"},{include:"#enum_block_definition"},{include:"#type_definition"}],"#model_block_definition":[{token:["source.prisma.embedded.source","storage.type.model.prisma","source.prisma.embedded.source","entity.name.type.model.prisma","source.prisma.embedded.source","punctuation.definition.tag.prisma"],regex:/^(\s*)(model|type)(\s+)([A-Za-z][\w]*)(\s+)({)/,push:[{token:"punctuation.definition.tag.prisma",regex:/\s*\}/,next:"pop"},{include:"#triple_comment"},{include:"#double_comment"},{include:"#field_definition"},{defaultToken:"source.prisma.embedded.source"}]}],"#enum_block_definition":[{token:["source.prisma.embedded.source","storage.type.enum.prisma","source.prisma.embedded.source","entity.name.type.enum.prisma","source.prisma.embedded.source","punctuation.definition.tag.prisma"],regex:/^(\s*)(enum)(\s+)([A-Za-z][\w]*)(\s+)({)/,push:[{token:"punctuation.definition.tag.prisma",regex:/\s*\}/,next:"pop"},{include:"#triple_comment"},{include:"#double_comment"},{include:"#enum_value_definition"},{defaultToken:"source.prisma.embedded.source"}]}],"#config_block_definition":[{token:["source.prisma.embedded.source","storage.type.config.prisma","source.prisma.embedded.source","entity.name.type.config.prisma","source.prisma.embedded.source","punctuation.definition.tag.prisma"],regex:/^(\s*)(generator|datasource)(\s+)([A-Za-z][\w]*)(\s+)({)/,push:[{token:"source.prisma.embedded.source",regex:/\s*\}/,next:"pop"},{include:"#triple_comment"},{include:"#double_comment"},{include:"#assignment"},{defaultToken:"source.prisma.embedded.source"}]}],"#assignment":[{token:["text","variable.other.assignment.prisma","text","keyword.operator.terraform","text"],regex:/^(\s*)(\w+)(\s*)(=)(\s*)/,push:[{token:"text",regex:/$/,next:"pop"},{include:"#value"},{include:"#double_comment_inline"}]}],"#field_definition":[{token:["text","variable.other.assignment.prisma","invalid.illegal.colon.prisma","text","support.type.primitive.prisma","keyword.operator.list_type.prisma","keyword.operator.optional_type.prisma","invalid.illegal.required_type.prisma"],regex:/^(\s*)(\w+)((?:\s*:)?)(\s+)(\w+)((?:\[\])?)((?:\?)?)((?:\!)?)/},{include:"#attribute_with_arguments"},{include:"#attribute"}],"#type_definition":[{token:["text","storage.type.type.prisma","text","entity.name.type.type.prisma","text","support.type.primitive.prisma"],regex:/^(\s*)(type)(\s+)(\w+)(\s*=\s*)(\w+)/},{include:"#attribute_with_arguments"},{include:"#attribute"}],"#enum_value_definition":[{token:["text","variable.other.assignment.prisma","text"],regex:/^(\s*)(\w+)(\s*$)/},{include:"#attribute_with_arguments"},{include:"#attribute"}],"#attribute_with_arguments":[{token:["entity.name.function.attribute.prisma","punctuation.definition.tag.prisma"],regex:/(@@?[\w\.]+)(\()/,push:[{token:"punctuation.definition.tag.prisma",regex:/\)/,next:"pop"},{include:"#named_argument"},{include:"#value"},{defaultToken:"source.prisma.attribute.with_arguments"}]}],"#attribute":[{token:"entity.name.function.attribute.prisma",regex:/@@?[\w\.]+/}],"#array":[{token:"source.prisma.array",regex:/\[/,push:[{token:"source.prisma.array",regex:/\]/,next:"pop"},{include:"#value"},{defaultToken:"source.prisma.array"}]}],"#value":[{include:"#array"},{include:"#functional"},{include:"#literal"}],"#functional":[{token:["support.function.functional.prisma","punctuation.definition.tag.prisma"],regex:/(\w+)(\()/,push:[{token:"punctuation.definition.tag.prisma",regex:/\)/,next:"pop"},{include:"#value"},{defaultToken:"source.prisma.functional"}]}],"#literal":[{include:"#boolean"},{include:"#number"},{include:"#double_quoted_string"},{include:"#identifier"}],"#identifier":[{token:"support.constant.constant.prisma",regex:/\b(?:\w)+\b/}],"#map_key":[{token:["variable.parameter.key.prisma","text","punctuation.definition.separator.key-value.prisma","text"],regex:/(\w+)(\s*)(:)(\s*)/}],"#named_argument":[{include:"#map_key"},{include:"#value"}],"#triple_comment":[{token:"comment.prisma",regex:/\/\/\//,push:[{token:"comment.prisma",regex:/$/,next:"pop"},{defaultToken:"comment.prisma"}]}],"#double_comment":[{token:"comment.prisma",regex:/\/\//,push:[{token:"comment.prisma",regex:/$/,next:"pop"},{defaultToken:"comment.prisma"}]}],"#double_comment_inline":[{token:"comment.prisma",regex:/\/\/[^$]*/}],"#boolean":[{token:"constant.language.boolean.prisma",regex:/\b(?:true|false)\b/}],"#number":[{token:"constant.numeric.prisma",regex:/(?:0(?:x|X)[0-9a-fA-F]*|(?:\+|-)?\b(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDdg]|UL|ul)?\b/}],"#double_quoted_string":[{token:"string.quoted.double.start.prisma",regex:/"/,push:[{token:"string.quoted.double.end.prisma",regex:/"/,next:"pop"},{include:"#string_interpolation"},{token:"string.quoted.double.prisma",regex:/[\w\-\/\._\\%@:\?=]+/},{defaultToken:"unnamed"}]}],"#string_interpolation":[{token:"keyword.control.interpolation.start.prisma",regex:/\$\{/,push:[{token:"keyword.control.interpolation.end.prisma",regex:/\s*\}/,next:"pop"},{include:"#value"},{defaultToken:"source.tag.embedded.source.prisma"}]}]};this.normalizeRules();};P.metaData={name:"Prisma",scopeName:"source.prisma"};o.inherits(P,T);e.PrismaHighlightRules=P;});ace.define("ace/mode/folding/cstyle",[],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/prisma",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var P=r("./prisma_highlight_rules").PrismaHighlightRules;var F=r("./folding/cstyle").FoldMode;var M=function(){this.HighlightRules=P;this.foldingRules=new F();};o.inherits(M,T);(function(){this.lineCommentStart="//";this.$id="ace/mode/prisma";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/prisma"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();