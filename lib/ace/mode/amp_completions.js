

define(function (require, exports, module) {
	"use strict";

	var functionMap = {
		"add": ["Add(N1,N2)", ""],
		"addmscrmlistmember": ["AddMscrmListMember(S1,S2)", ""],
		"addobjectarrayitem": ["AddObjectArrayItem(O1,S1,S2)", ""],
		"attachfile": ["AttachFile(S1,S2,S3,B1,S4,S5,N1)", ""],
		"attributevalue": ["AttributeValue(S1)", ""],
		"authenticatedemployeeid": ["AuthenticatedEmployeeID()", ""],
		"authenticatedemployeenotificationaddress": ["AuthenticatedEmployeeNotificationAddress()", ""],
		"authenticatedemployeeusername": ["AuthenticatedEmployeeUserName()", ""],
		"authenticatedenterpriseid": ["AuthenticatedEnterpriseID()", ""],
		"authenticatedmemberid": ["AuthenticatedMemberID()", ""],
		"authenticatedmembername": ["AuthenticatedMemberName()", ""],
		"barcodeurl": ["BarCodeURL(S1,S2,N1,N2,S3)", ""],
		"base64decode": ["Base64Decode(S1,S2)", ""],
		"base64encode": ["Base64Encode(S1)", ""],
		"beginimpressionregion": ["BeginImpressionRegion(S1)", ""],
		"buildoptionlist": ["BuildOptionList(S1,S2,S3)", ""],
		"buildrowsetfromstring": ["BuildRowSetFromString(S1,S2)", ""],
		"buildrowsetfromxml": ["BuildRowSetFromXML(S1,S2,B1)", ""],
		"char": ["Char(S1,S2)", ""],
		"claimrow": ["ClaimRow(S1,S2,S3,S4,...Sn,Sn+1)", ""],
		"claimrowvalue": ["ClaimRowValue(S1,S2,S3,S4,S5,S6,...Sn, Sn+1)", ""],
		"cloudpagesurl": ["CloudPagesURL(S1,S2+S3...)", ""],
		"concat": ["Concat(S1,S2,...Sn)", ""],
		"contentarea": ["ContentArea(I1,S1,B1,S2,N1)", ""],
		"contentareabyname": ["ContentAreaByName(S1,S2,B1,S3,N1)", ""],
		"createmscrmrecord": ["CreateMscrmRecord(S1,S2,S3a,S3b)", ""],
		"createobject": ["CreateObject(S1)", ""],
		"createsalesforceobject": ["CreateSalesforceObject(S1,I1,S2a,S2b,...Sna,Snb)", ""],
		"createsmsconversation": ["CreateSmsConversation(S1,S2,S3,S4)", ""],
		"dataextensionrowcount": ["DataExtensionRowCount(S1)", ""],
		"dateadd": ["DateAdd(D1, I1, S1)", ""],
		"datediff": ["DateDiff(D1, D2, S1)", ""],
		"dateparse": ["DateParse(S1,B1)", ""],
		"datepart": ["DatePart(D1, S1)", ""],
		"decryptsymmetric": ["DecryptSymmetric(S1, S2, S3, S4, S5, S6, S7, S8)", ""],
		"deletedata": ["DeleteData(S1, S2, S3)", ""],
		"deletede": ["DeleteDE(S1, S2, S3)", ""],
		"describemscrmentities": ["DescribeMscrmEntities()", ""],
		"describemscrmentityattributes": ["DescribeMscrmEntityAttributes(S1)", ""],
		"divide": ["Divide(N1, N2)", ""],
		"domain": ["Domain(S1)", ""],
		"empty": ["Empty (V1)", ""],
		"encryptsymmetric": ["EncryptSymmetric(S1, S2, S3, S4, S5, S6, S7, S8, S9, S10)", ""],
		"endimpressionregion": ["EndImpressionRegion(B1)", ""],
		"endsmsconversation": ["EndSmsConversation(S1,S2,S3)", ""],
		"executefilter": ["ExecuteFilter(S1,S2,S3...)", ""],
		"executefilterorderedrows": ["ExecuteFilterOrderedRows(S1,N1,S2,S3,S4...)", ""],
		"field": ["Field(S1,S2)", ""],
		"format": ["Format (V1, S1)", ""],
		"formatcurrency": ["FormatCurrency(V1,S1,N1,S2)", ""],
		"formatdate": ["FormatDate(V1,S1,S2,S3)", ""],
		"formatnumber": ["FormatNumber(V1,P1,S1)", ""],
		"getportfolioitem": ["GetPortfolioItem(S1)", ""],
		"getpublishedsocialcontent": ["GetPublishedSocialContent(S1)", ""],
		"getsocialpublishurl": ["GetSocialPublishURL(N1,S1,S2,S3...Sn)", ""],
		"getsocialpublishurlbyname": ["GetSocialPublishURLByName(S1,S2,S3,S4,S5...Sn)", ""],
		"guid": ["GUID()", ""],
		"httpget": ["HTTPGet(S1,B1,N1,S2)", ""],
		"httppost": ["HTTPPost(S1,S2,S3,S4,S5+S6...)", ""],
		"httppost2": ["HTTPPost2(S1,S2,S3,B1,S4,S5, S6+S7...)", ""],
		"httprequestheader": ["HTTPRequestHeader(S1)", ""],
		"iif": ["IIf(E1,S1,S2)", ""],
		"image": ["Image(S1,S2)", ""],
		"indexof": ["IndexOf(V1, S1)", ""],
		"insertdata": ["InsertData(S1, S2, S3)", ""],
		"insertde": ["InsertDE(S1, S2, S3)", ""],
		"invokecreate": ["InvokeCreate(O1,S1,N1,O2)", ""],
		"invokedelete": ["InvokeDelete(O1,S1,N1,O2)", ""],
		"invokeexecute": ["InvokeExecute()", ""],
		"invokeperform": ["InvokePerform(O1,S1,S2)", ""],
		"invokeretrieve": ["InvokeRetrieve(P1,P2,P3)", ""],
		"invokeupdate": ["InvokeUpdate(P1,P2,P3,P4)", ""],
		"ischtmlbrowser": ["IsCHTMLBrowser(S1)", ""],
		"isemailaddress": ["IsEmailAddress(S1)", ""],
		"isnull": ["IsNull(P1)", ""],
		"isnulldefault": ["IsNullDefault(S1, S2)", ""],
		"isphonenumber": ["IsPhoneNumber(P1)", ""],
		"length": ["Length(V1)", ""],
		"livecontentmicrositeurl": ["LiveContentMicrositeURL(S1, S2)", ""],
		"localdatetosystemdate": ["LocalDateToSystemDate(S1)", ""],
		"longsfid": ["LongSFID(S1)", ""],
		"lookup": ["Lookup(S1, S2, S3, S4)", ""],
		"lookuporderedrows": ["LookupOrderedRows(S1, N1, S2, S3, S4)", ""],
		"lookuporderedrowscs": ["LookupOrderedRowsCS(S1, N1, S2, S3, S4)", ""],
		"lookuprows": ["LookupRows(S1, S2, S3)", ""],
		"lookuprowscs": ["LookupRowsCS(S1, S2, S3)", ""],
		"lowercase": ["Lowercase(S1)", ""],
		"md5": ["MD5(S1,S2)", ""],
		"micrositeurl": ["MicrositeURL(S1, S2+S3, Sn)", ""],
		"mod": ["Mod(N1, N2)", ""],
		"multiply": ["Multiply(N1, N2)", ""],
		"now": ["Now(P1)", ""],
		"output": ["Output(C1)", ""],
		"outputline": ["OutputLine(C1)", ""],
		"propercase": ["ProperCase(S1)", ""],
		"queryparameter": ["QueryParameter(S1)", ""],
		"raiseerror": ["RaiseError(S1,B1,S2,S3,B2)", ""],
		"random": ["Random(I1, I2)", ""],
		"redirect": ["Redirect(S1)", ""],
		"redirectto": ["RedirectTo(S1)", ""],
		"regexmatch": ["RegExMatch(S1,S2,S3,S4...Sn)", ""],
		"replace": ["Replace(V1, S1, S2)", ""],
		"replacelist": ["ReplaceList(S1, S2, S3,...Sn)", ""],
		"requestparameter": ["RequestParameter(P1)", ""],
		"retrievemscrmrecords": ["RetrieveMscrmRecords(S1,S2,S3a,S3b,S3c)", ""],
		"retrievemscrmrecordsfetchxml": ["RetrieveMscrmRecordsFetchXML(S1)", ""],
		"retrievesalesforcejobsources": ["RetrieveSalesforceJobSources(P1)", ""],
		"retrievesalesforceobjects": ["RetrieveSalesforceObjects(S1,S2,S3a,S3b,S3c,...Sna,Snb,Snc)", ""],
		"row": ["Row(RS, I1)", ""],
		"rowcount": ["RowCount(RS)", ""],
		"setobjectproperty": ["SetObjectProperty(O1,S1,S2)", ""],
		"setsmsconversationnextkeyword": ["SetSmsConversationNextKeyword(S1,S2,S3)", ""],
		"setstatemscrmrecord": ["SetStateMscrmRecord(S1,S2,S3,S4)", ""],
		"sha1": ["SHA1(S1,S2)", ""],
		"sha256": ["SHA256(S1,S2)", ""],
		"sha512": ["SHA512(S1,S2)", ""],
		"stringtodate": ["StringToDate(S1,S2)", ""],
		"stringtohex": ["StringToHex(S1,S2)", ""],
		"substring": ["Substring(S1, I1, I2)", ""],
		"subtract": ["Subtract(N1, N2)", ""],
		"systemdatetolocaldate": ["SystemDateToLocalDate(S1)", ""],
		"transformxml": ["TransformXML(S1,S2)", ""],
		"treatascontent": ["TreatAsContent(S1)", ""],
		"treatascontentarea": ["TreatAsContentArea(S1,S2,S3)", ""],
		"trim": ["Trim(S1)", ""],
		"updatedata": ["UpdateData(S1, N1, S2, S3, S4, S5)", ""],
		"updatede": ["UpdateDE(S1, N1, S2, S3, S4, S5)", ""],
		"updatemscrmrecords": ["UpdateMscrmRecords(S1,S2,S3a,S3b...SNa,SNb)", ""],
		"updatesinglesalesforceobject": ["UpdateSingleSalesforceObject(S1,S2,S3a,S3b,...Sna,Snb)", ""],
		"uppercase": ["Uppercase (S1)", ""],
		"upsertcontact": ["UpsertContact(S1,S2,S3,S4,S5...)", ""],
		"upsertdata": ["UpsertData(S1, N1, S2, S3, S4, S5)", ""],
		"upsertde": ["UpsertDE(S1, N1, S2, S3, S4, S5)", ""],
		"upsertmscrmrecord": ["UpsertMscrmRecord(S1,S2,S3,S4,S5a,S5b,S6a,S6b)", ""],
		"urlencode": ["URLEncode(S1,B1)", ""],
		"v": ["V(S1)", ""],
		"wat": ["WAT (S1, S2)", ""],
		"watp": ["WATP (S1, S2)", ""],
		"wraplongurl": ["WrapLongURL(S1)", ""]
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
