

define(function (require, exports, module) {
	"use strict";

	var oop = require("../lib/oop");
	var TextMode = require("./text").Mode;
	var AmpHighlightRules = require("./amp_highlight_rules").AmpHighlightRules;
	var AmpLangHighlightRules = require("./amp_highlight_rules").AmpLangHighlightRules;
	var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
	var Range = require("../range").Range;
	var WorkerClient = require("../worker/worker_client").WorkerClient;
	var AmpCompletions = require("./amp_completions").AmpCompletions;
	var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
	var CStyleFoldMode = require("./folding/cstyle").FoldMode;
	var unicode = require("../unicode");
	var HtmlMode = require("./html").Mode;
	var JavaScriptMode = require("./javascript").Mode;
	var CssMode = require("./css").Mode;

	var AmpMode = function (opts) {
		this.HighlightRules = AmpLangHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = new CstyleBehaviour();
		this.$completer = new AmpCompletions();
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(AmpMode, TextMode);

	(function () {

		this.tokenRe = new RegExp("^["
			+ unicode.packages.L
			+ unicode.packages.Mn + unicode.packages.Mc
			+ unicode.packages.Nd
			+ unicode.packages.Pc + "\_]+", "g"
		);

		this.nonTokenRe = new RegExp("^(?:[^"
			+ unicode.packages.L
			+ unicode.packages.Mn + unicode.packages.Mc
			+ unicode.packages.Nd
			+ unicode.packages.Pc + "\_]|\s])+", "g"
		);


		this.lineCommentStart = ["//", "#"];
		this.blockComment = { start: "/*", end: "*/" };

		this.getNextLineIndent = function (state, line, tab) {
			var indent = this.$getIndent(line);

			var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
			var tokens = tokenizedLine.tokens;
			var endState = tokenizedLine.state;

			if (tokens.length && tokens[tokens.length - 1].type == "comment") {
				return indent;
			}

			if (state == "start") {
				var match = line.match(/^.*[\{\(\[\:]\s*$/);
				if (match) {
					indent += tab;
				}
			} else if (state == "doc-start") {
				if (endState != "doc-start") {
					return "";
				}
				var match = line.match(/^\s*(\/?)\*/);
				if (match) {
					if (match[1]) {
						indent += " ";
					}
					indent += "* ";
				}
			}

			return indent;
		};

		this.checkOutdent = function (state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};

		this.autoOutdent = function (state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};

		this.getCompletions = function (state, session, pos, prefix) {
			return this.$completer.getCompletions(state, session, pos, prefix);
		};

		this.$id = "ace/mode/amp-inline";
	}).call(AmpMode.prototype);

	var Mode = function (opts) {
		if (opts && opts.inline) {
			var mode = new AmpMode();
			mode.createWorker = this.createWorker;
			mode.inlineAmp = true;
			return mode;
		}
		HtmlMode.call(this);
		this.HighlightRules = AmpHighlightRules;
		this.createModeDelegates({
			"js-": JavaScriptMode,
			"css-": CssMode,
			"amp-": AmpMode
		});
		this.foldingRules.subModes["amp-"] = new CStyleFoldMode();
	};
	oop.inherits(Mode, HtmlMode);

	(function () {

		this.createWorker = function (session) {
			var worker = new WorkerClient(["ace"], "ace/mode/amp_worker", "AmpWorker");
			worker.attachToDocument(session.getDocument());

			if (this.inlineAmp)
				worker.call("setOptions", [{ inline: true }]);

			worker.on("annotate", function (e) {
				session.setAnnotations(e.data);
			});

			worker.on("terminate", function () {
				session.clearAnnotations();
			});

			return worker;
		};

		this.$id = "ace/mode/amp";
	}).call(Mode.prototype);

	exports.Mode = Mode;
});
