

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var Mirror = require("../worker/mirror").Mirror;
var AMP = require("./amp/amp").AMP;

var AmpWorker = exports.AmpWorker = function(sender) {
    Mirror.call(this, sender);
    this.setTimeout(500);
};

oop.inherits(AmpWorker, Mirror);

(function() {
    this.setOptions = function(opts) {
        this.inlineAmp = opts && opts.inline;
    };
    
    this.onUpdate = function() {
        var value = this.doc.getValue();
        var errors = [];

        // var start = new Date();
        if (this.inlineAmp)
            value = "<?" + value + "?>";

        var tokens = AMP.Lexer(value, {short_open_tag: 1});
        try {
            new AMP.Parser(tokens);
        } catch(e) {
            errors.push({
                row: e.line - 1,
                column: null,
                text: e.message.charAt(0).toUpperCase() + e.message.substring(1),
                type: "error"
            });
        }

        // console.log("lint time: " + (new Date() - start));

        this.sender.emit("annotate", errors);
    };

}).call(AmpWorker.prototype);

});
