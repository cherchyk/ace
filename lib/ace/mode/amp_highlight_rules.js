

define(function(require, exports, module) {
	"use strict";

	var oop = require("../lib/oop");
	var lang = require("../lib/lang");
	var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
	var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;

	var AmpLangHighlightRules = function() {
		var docComment = DocCommentHighlightRules;
		// http://phampp.net/quickref.phampp
		var builtinFunctions = lang.arrayToMap(
			('add|addmscrmlistmember|addobjectarrayitem|attachfile|attributevalue|authenticatedemployeeid|authenticatedemployeenotificationaddress|' +
				'authenticatedemployeeusername|authenticatedenterpriseid|authenticatedmemberid|authenticatedmembername|barcodeurl|base64decode|base64encode|' +
				'beginimpressionregion|buildoptionlist|buildrowsetfromstring|buildrowsetfromxml|char|claimrow|claimrowvalue|cloudpagesurl|concat|contentarea|' +
				'contentareabyname|createmscrmrecord|createobject|createsalesforceobject|createsmsconversation|dataextensionrowcount|dateadd|datediff|dateparse|' +
				'datepart|decryptsymmetric|deletedata|deletede|describemscrmentities|describemscrmentityattributes|divide|domain|empty|encryptsymmetric|' +
				'endimpressionregion|endsmsconversation|executefilter|executefilterorderedrows|field|format|formatcurrency|formatdate|formatnumber|getportfolioitem|' +
				'getpublishedsocialcontent|getsocialpublishurl|getsocialpublishurlbyname|guid|httpget|httppost|httppost2|httprequestheader|iif|' +
				'image|indexof|insertdata|insertde|invokecreate|invokedelete|invokeexecute|invokeperform|invokeretrieve|invokeupdate|ischtmlbrowser|isemailaddress|isnull|' +
				'isnulldefault|isphonenumber|length|livecontentmicrositeurl|localdatetosystemdate|longsfid|lookup|lookuporderedrows|lookuporderedrowscs|' +
				'lookuprows|lookuprowscs|lowercase|md5|micrositeurl|mod|multiply|now|output|outputline|propercase|queryparameter|raiseerror|random|redirect|' +
				'redirectto|regexmatch|replace|replacelist|requestparameter|retrievemscrmrecords|retrievemscrmrecordsfetchxml|retrievesalesforcejobsources|' +
				'retrievesalesforceobjects|row|rowcount|setobjectproperty|setsmsconversationnextkeyword|setstatemscrmrecord|sha1|sha256|sha512|stringtodate|' +
				'stringtohex|substring|subtract|systemdatetolocaldate|transformxml|treatascontent|treatascontentarea|trim|updatedata|updatede|updatemscrmrecords|' +
				'updatesinglesalesforceobject|uppercase|upsertcontact|upsertdata|upsertde|upsertmscrmrecord|urlencode|v|wat|watp|wraplongurl').split('|')
		);

		// http://phampp.net/manual/en/reserved.keywords.phampp
		var keywords = lang.arrayToMap(
			('set|var|abstract|and|array|as|break|case|catch|class|clone|const|continue|declare|default|do|else|elseif|enddeclare|endfor|endforeach|endif|' +
				'endswitch|endwhile|extends|final|for|foreach|function|global|goto|if|implements|interface|instanceof|namespace|new|or|private|protected|' +
				'public|static|switch|throw|to|trait|try|use|var|while|xor').split('|')
		);

		// http://phampp.net/manual/en/reserved.keywords.phampp
		var languageConstructs = lang.arrayToMap(
			('die|echo|empty|exit|eval|include|include_once|isset|list|require|require_once|return|print|unset').split('|')
		);

		var builtinConstants = lang.arrayToMap(
			('true|false|null|__CLASS__|__DIR__|__FILE__|__LINE__|__METHOD__|__FUNCTION__|__NAMESPACE__').split('|')
		);

		var builtinVariables = lang.arrayToMap(
			('$GLOBALS|$_SERVER|$_GET|$_POST|$_FILES|$_REQUEST|$_SESSION|$_ENV|$_COOKIE|$amp_errormsg|$HTTP_RAW_POST_DATA|' +
				'$http_response_header|$argc|$argv').split('|')
		);

		var futureReserved = lang.arrayToMap([]);

		// regexp must not have capturing parentheses. Use (?:) instead.
		// regexps are ordered -> the first match is used

		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: /(?:#|\/\/)(?:[^?]|\?[^>])*/
				},
				docComment.getStartRule("doc-start"),
				{
					token: "comment", // multi line comment
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: "string.regexp",
					regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/][gimy]*\\s*(?=[).,;]|$)"
				},
				{
					token: "string", // " string start
					regex: '"',
					next: "qqstring"
				},
				{
					token: "string", // ' string start
					regex: "'",
					next: "qstring"
				},
				{
					token: "constant.numeric", // hex
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric", // float
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: "constant.language", // constants
					regex: "\\b(?:DEFAULT_INCLUDE_PATH|E_(?:ALL|CO(?:MPILE_(?:ERROR|WARNING)|RE_(?:ERROR|WARNING))|" +
						"ERROR|NOTICE|PARSE|STRICT|USER_(?:ERROR|NOTICE|WARNING)|WARNING)|P(?:EAR_(?:EXTENSION_DIR|INSTALL_DIR)|" +
						"HP_(?:BINDIR|CONFIG_FILE_(?:PATH|SCAN_DIR)|DATADIR|E(?:OL|XTENSION_DIR)|INT_(?:MAX|SIZE)|" +
						"L(?:IBDIR|OCALSTATEDIR)|O(?:S|UTPUT_HANDLER_(?:CONT|END|START))|PREFIX|S(?:API|HLIB_SUFFIX|YSCONFDIR)|" +
						"VERSION))|__COMPILER_HALT_OFFSET__)\\b"
					,caseInsensitive: true
				},
				{
					token: ["keyword", "text", "support.class"],
					regex: "\\b(new)(\\s+)(\\w+)"
				},
				{
					token: ["support.class", "keyword.operator"],
					regex: "\\b(\\w+)(::)"
				},
				{
					token: "constant.language", // constants
					regex: "\\b(?:A(?:B(?:DAY_(?:1|2|3|4|5|6|7)|MON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9))|LT_DIGITS|M_STR|" +
						"SSERT_(?:ACTIVE|BAIL|CALLBACK|QUIET_EVAL|WARNING))|C(?:ASE_(?:LOWER|UPPER)|HAR_MAX|" +
						"O(?:DESET|NNECTION_(?:ABORTED|NORMAL|TIMEOUT)|UNT_(?:NORMAL|RECURSIVE))|" +
						"R(?:EDITS_(?:ALL|DOCS|FULLPAGE|G(?:ENERAL|ROUP)|MODULES|QA|SAPI)|NCYSTR|" +
						"YPT_(?:BLOWFISH|EXT_DES|MD5|S(?:ALT_LENGTH|TD_DES)))|URRENCY_SYMBOL)|D(?:AY_(?:1|2|3|4|5|6|7)|" +
						"ECIMAL_POINT|IRECTORY_SEPARATOR|_(?:FMT|T_FMT))|E(?:NT_(?:COMPAT|NOQUOTES|QUOTES)|RA(?:_(?:D_(?:FMT|T_FMT)|" +
						"T_FMT|YEAR)|)|XTR_(?:IF_EXISTS|OVERWRITE|PREFIX_(?:ALL|I(?:F_EXISTS|NVALID)|SAME)|SKIP))|FRAC_DIGITS|GROUPING|" +
						"HTML_(?:ENTITIES|SPECIALCHARS)|IN(?:FO_(?:ALL|C(?:ONFIGURATION|REDITS)|ENVIRONMENT|GENERAL|LICENSE|MODULES|VARIABLES)|" +
						"I_(?:ALL|PERDIR|SYSTEM|USER)|T_(?:CURR_SYMBOL|FRAC_DIGITS))|L(?:C_(?:ALL|C(?:OLLATE|TYPE)|M(?:ESSAGES|ONETARY)|NUMERIC|TIME)|" +
						"O(?:CK_(?:EX|NB|SH|UN)|G_(?:A(?:LERT|UTH(?:PRIV|))|C(?:ONS|R(?:IT|ON))|D(?:AEMON|EBUG)|E(?:MERG|RR)|INFO|KERN|" +
						"L(?:OCAL(?:0|1|2|3|4|5|6|7)|PR)|MAIL|N(?:DELAY|EWS|O(?:TICE|WAIT))|ODELAY|P(?:ERROR|ID)|SYSLOG|U(?:SER|UCP)|WARNING)))|" +
						"M(?:ON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9|DECIMAL_POINT|GROUPING|THOUSANDS_SEP)|_(?:1_PI|2_(?:PI|SQRTPI)|E|L(?:N(?:10|2)|" +
						"OG(?:10E|2E))|PI(?:_(?:2|4)|)|SQRT(?:1_2|2)))|N(?:EGATIVE_SIGN|O(?:EXPR|STR)|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|" +
						"P(?:ATH(?:INFO_(?:BASENAME|DIRNAME|EXTENSION)|_SEPARATOR)|M_STR|OSITIVE_SIGN|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|" +
						"RADIXCHAR|S(?:EEK_(?:CUR|END|SET)|ORT_(?:ASC|DESC|NUMERIC|REGULAR|STRING)|TR_PAD_(?:BOTH|LEFT|RIGHT))|" +
						"T(?:HOUS(?:ANDS_SEP|EP)|_FMT(?:_AMPM|))|YES(?:EXPR|STR)|STD(?:IN|OUT|ERR))\\b"
					//,caseInsensitive: true
				},
				{
					token: function(value) {

						value = value.toLowerCase();

						if (keywords.hasOwnProperty(value))
							return "keyword";
						else if (builtinConstants.hasOwnProperty(value))
							return "constant.language";
						else if (builtinVariables.hasOwnProperty(value))
							return "variable.language";
						else if (futureReserved.hasOwnProperty(value))
							return "invalid.illegal";
						else if (builtinFunctions.hasOwnProperty(value))
							return "support.function";
						else if (value == "debugger")
							return "invalid.deprecated";
						else if (value.match(/^(\$[a-zA-Z_\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*|self|parent)$/))
							return "variable";
						else if (value.match(/^(\@[a-zA-Z_\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*|self|parent)$/))
							return "variable";
						return "identifier";
					},
					regex: /[a-zA-Z_$@\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*/
					//,caseInsensitive: true
				},
				{
					onMatch: function(value, currentSate, state) {
						value = value.substr(3);
						if (value[0] == "'" || value[0] == '"')
							value = value.slice(1, -1);
						state.unshift(this.next, value);
						return "markup.list";
					},
					regex: /<<<(?:\w+|'\w+'|"\w+")$/,
					next: "heredoc"
				},
				{
					token: "keyword.operator",
					regex: "::|!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|!=|!==|<=|>=|=>|<<=|>>=|>>>=|<>|<|>|=|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"heredoc": [
				{
					onMatch: function(value, currentSate, stack) {
						if (stack[1] != value)
							return "string";
						stack.shift();
						stack.shift();
						return "markup.list";
					},
					regex: "^\\w+(?=;?$)",
					next: "start"
				},
				{
					token: "string",
					regex: ".*"
				}
			],
			"comment": [
				{
					token: "comment",
					regex: "\\*\\/",
					next: "start"
				},
				{
					defaultToken: "comment"
				}
			],
			"qqstring": [
				{
					token: "constant.language.escape",
					regex: '\\\\(?:[nrtvef\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})'
				},
				{
					token: "variable",
					regex: /\$[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
				},
				{
					token: "variable",
					regex: /\@[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
				},
				{
					token: "variable",
					regex: /\$\{[^"\}]+\}?/ // this is wrong but ok for now
				},
				{
					token: "variable",
					regex: /\@\{[^"\}]+\}?/ // this is wrong but ok for now
				},
				{
					token: "string",
					regex: '"',
					next: "start"
				},
				{
					 defaultToken: "string"
				}
			],
			"qstring": [
				{
					token: "constant.language.escape",
					regex: /\\['\\]/
				},
				{
					token: "string",
					regex: "'",
					next: "start"
				},
				{
					 defaultToken: "string"
				}
			]
		};

		this.embedRules(DocCommentHighlightRules, "doc-",
		[DocCommentHighlightRules.getEndRule("start")]);
	};

	oop.inherits(AmpLangHighlightRules, TextHighlightRules);


	var AmpHighlightRules = function() {
		HtmlHighlightRules.call(this);

		var startRules = [
			{
				token: "support.amp_tag", // amp open tag
				regex: "<\\?(?:amp|=)?",
				push: "amp-start"
			},
			{
				token: "support.amp_tag", // amp open tag
				regex: "%%(?:\\[|=)",
				push: "amp-start"
			}
		];

		var endRules = [
			{
				token: "support.amp_tag", // amp close tag
				regex: "\\?>",
				next: "pop"
			},
			{
				token: "support.amp_tag", // amp close tag
				regex: "(?:\\]|=)%%",
				next: "pop"
			}
		];

		for (var key in this.$rules)
			this.$rules[key].unshift.apply(this.$rules[key], startRules);

		this.embedRules(AmpLangHighlightRules, "amp-", endRules, ["start"]);

		this.normalizeRules();
	};

	oop.inherits(AmpHighlightRules, HtmlHighlightRules);

	exports.AmpHighlightRules = AmpHighlightRules;
	exports.AmpLangHighlightRules = AmpLangHighlightRules;
});