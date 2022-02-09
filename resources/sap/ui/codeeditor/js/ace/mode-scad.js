ace.define("ace/mode/doc_comment_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var D=function(){this.$rules={"start":[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},D.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]};};o.inherits(D,T);D.getTagRule=function(s){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"};};D.getStartRule=function(s){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:s};};D.getEndRule=function(s){return{token:"comment.doc",regex:"\\*\\/",next:s};};e.DocCommentHighlightRules=D;});ace.define("ace/mode/scad_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var l=r("../lib/lang");var D=r("./doc_comment_highlight_rules").DocCommentHighlightRules;var T=r("./text_highlight_rules").TextHighlightRules;var s=function(){var k=this.createKeywordMapper({"variable.language":"this","keyword":"module|if|else|for","constant.language":"NULL"},"identifier");this.$rules={"start":[{token:"comment",regex:"\\/\\/.*$"},D.getStartRule("start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant",regex:"<[a-zA-Z0-9.]+>"},{token:"keyword",regex:"(?:use|include)"},{token:k,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],"comment":[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],"qqstring":[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:'.+'}],"qstring":[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:'.+'}]};this.embedRules(D,"doc-",[D.getEndRule("start")]);};o.inherits(s,T);e.scadHighlightRules=s;});ace.define("ace/mode/matching_brace_outdent",[],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/folding/cstyle",[],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/scad",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var s=r("./scad_highlight_rules").scadHighlightRules;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var C=r("./behaviour/cstyle").CstyleBehaviour;var a=r("./folding/cstyle").FoldMode;var b=function(){this.HighlightRules=s;this.$outdent=new M();this.$behaviour=new C();this.foldingRules=new a();};o.inherits(b,T);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.getNextLineIndent=function(c,l,t){var i=this.$getIndent(l);var d=this.getTokenizer().getLineTokens(l,c);var f=d.tokens;var g=d.state;if(f.length&&f[f.length-1].type=="comment"){return i;}if(c=="start"){var h=l.match(/^.*[\{\(\[]\s*$/);if(h){i+=t;}}else if(c=="doc-start"){if(g=="start"){return"";}var h=l.match(/^\s*(\/?)\*/);if(h){if(h[1]){i+=" ";}i+="* ";}}return i;};this.checkOutdent=function(c,l,i){return this.$outdent.checkOutdent(l,i);};this.autoOutdent=function(c,d,f){this.$outdent.autoOutdent(d,f);};this.$id="ace/mode/scad";}).call(b.prototype);e.Mode=b;});(function(){ace.require(["ace/mode/scad"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();