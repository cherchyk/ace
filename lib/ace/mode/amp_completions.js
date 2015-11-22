

define(function (require, exports, module) {
	"use strict";

	var functionMap = {
		"abs": [
			"int abs(int number)",
			"Return the absolute value of the number"
		],
		"acos": [
			"float acos(float number)",
			"Return the arc cosine of the number in radians"
		]
	};

	var variableMap = {
		"$_COOKIE": {
			type: "array"
		},
		"$_ENV": {
			type: "array"
		},
		"$_FILES": {
			type: "array"
		},
		"$_GET": {
			type: "array"
		},
		"$_POST": {
			type: "array"
		},
		"$_REQUEST": {
			type: "array"
		},
		"$_SERVER": {
			type: "array",
			value: {
				"DOCUMENT_ROOT": 1,
				"GATEWAY_INTERFACE": 1,
				"HTTP_ACCEPT": 1,
				"HTTP_ACCEPT_CHARSET": 1,
				"HTTP_ACCEPT_ENCODING": 1,
				"HTTP_ACCEPT_LANGUAGE": 1,
				"HTTP_CONNECTION": 1,
				"HTTP_HOST": 1,
				"HTTP_REFERER": 1,
				"HTTP_USER_AGENT": 1,
				"PATH_TRANSLATED": 1,
				"AMP_SELF": 1,
				"QUERY_STRING": 1,
				"REMOTE_ADDR": 1,
				"REMOTE_PORT": 1,
				"REQUEST_METHOD": 1,
				"REQUEST_URI": 1,
				"SCRIPT_FILENAME": 1,
				"SCRIPT_NAME": 1,
				"SERVER_ADMIN": 1,
				"SERVER_NAME": 1,
				"SERVER_PORT": 1,
				"SERVER_PROTOCOL": 1,
				"SERVER_SIGNATURE": 1,
				"SERVER_SOFTWARE": 1
			}
		},
		"$_SESSION": {
			type: "array"
		},
		"$GLOBALS": {
			type: "array"
		}
	};

	function is(token, type) {
		return token.type.lastIndexOf(type) > -1;
	}

	var AmpCompletions = function () {

	};

	(function () {

		this.getCompletions = function (state, session, pos, prefix) {
			var token = session.getTokenAt(pos.row, pos.column);

			if (!token)
				return [];

			// amp function
			if (token.type === 'identifier')
				return this.getFunctionCompletions(state, session, pos, prefix);

			// amp variable
			if (is(token, "variable"))
				return this.getVariableCompletions(state, session, pos, prefix);

			// amp array key
			var line = session.getLine(pos.row).substr(0, pos.column);
			if (token.type === 'string' && /(\$[\w]*)\[["']([^'"]*)$/i.test(line))
				return this.getArrayKeyCompletions(state, session, pos, prefix);

			return [];
		};

		this.getFunctionCompletions = function (state, session, pos, prefix) {
			var functions = Object.keys(functionMap);
			return functions.map(function (func) {
				return {
					caption: func,
					snippet: func + '($0)',
					meta: "amp function",
					score: Number.MAX_VALUE,
					docHTML: functionMap[func][1]
				};
			});
		};

		this.getVariableCompletions = function (state, session, pos, prefix) {
			var variables = Object.keys(variableMap);
			return variables.map(function (variable) {
				return {
					caption: variable,
					value: variable,
					meta: "amp variable",
					score: Number.MAX_VALUE
				};
			});
		};

		this.getArrayKeyCompletions = function (state, session, pos, prefix) {
			var line = session.getLine(pos.row).substr(0, pos.column);
			/(\$[\w]*)\[["']([^'"]*)$/i.test(line);
			var variable = RegExp.$1;

			if (!variableMap[variable]) {
				return;
			}

			var keys = [];
			if (variableMap[variable].type === 'array' && variableMap[variable].value)
				keys = Object.keys(variableMap[variable].value);

			return keys.map(function (key) {
				return {
					caption: key,
					value: key,
					meta: "amp array key",
					score: Number.MAX_VALUE
				};
			});
		};

	}).call(AmpCompletions.prototype);

	exports.AmpCompletions = AmpCompletions;
});
