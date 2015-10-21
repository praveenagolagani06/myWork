var lpDataFromServer = {
    lpUnit:"grainger-sales",
    lpNum:"34792004",
    lpEnabled: true,
    lpAddVarArrays:[]
}
lpDataFromServer.lpAddVarArrays.push(["page", "Platform", "Hybris"]);
lpDataFromServer.lpAddVarArrays.push(["page", "Section", "Other"]);
lpDataFromServer.lpAddVarArrays.push(["page", "Page", "HomePage"]);
lpDataFromServer.lpAddVarArrays.push(["session", "Community", "Anonymous"]);
lpDataFromServer.lpAddVarArrays.push(["session", "UUID", ""]);
lpDataFromServer.lpAddVarArrays.push(["session", "VisitorID", "anonymous"]);
lpDataFromServer.lpAddVarArrays.push(["page", "RegisteredVisitor", "No"]);
lpDataFromServer.lpAddVarArrays.push(["page", "CartCount", "0"]);
lpDataFromServer.lpAddVarArrays.push(["page", "CartTotal", "N/A"]);
lpDataFromServer.lpAddVarArrays.push(["page", "TrackCode", "N/A"]);

//condition to check for server data initialization before calling livePerson
if (typeof lpDataFromServer !== "undefined" && lpDataFromServer.lpEnabled) {
    
    var lpUnit = lpDataFromServer.lpUnit;
    var lpNum = lpDataFromServer.lpNum;

    //Start - Constant javascript on our pages
    if (window.location.href.indexOf("checkout") > 0) {
        lpUnit = "grainger-checkout";
    }
    if (window.location.href.indexOf("registration") > 0) {
        lpUnit = "grainger-registration";
    }
    if (typeof (lpLanguage) == "undefined") {
        var lpLanguage = "english";
        if (jQuery.cookie("MP_LANG") == "es") {
            lpLanguage = "spanish";
        }
    }
    jQuery("document").ready(function () {
        jQuery("<div/>", {
            id: "voiceLPButtonStalker"
        }).appendTo("body");
        jQuery("<div/>", {
            id: "chatLPButtonStalker"
        }).appendTo("body");
    });
    //End - Constant javascript on our pages
    
    var lpMTagConfig = {
        lpServer: "sales.liveperson.net",
        lpNumber: lpNum,
        lpProtocol: (document.location.toString().indexOf("https:") == 0) ? "https" : "http",
        lpTagLoaded: false,
        pageStartTime: (new Date()).getTime(),
        defaultUnit: "grainger-sales",
        defaultLanguage: "english"
    };
    if (typeof (lpMTagConfig.lpTagSrv) == "undefined") {
        lpMTagConfig.lpTagSrv = lpMTagConfig.lpServer;
    }
    lpMTagConfig.deploymentConfigPath = lpMTagConfig.lpTagSrv + "/visitor/addons/deploy.asp";
    lpMTagConfig.lpLoadScripts = function () {
        lpAddMonitorTag(lpMTagConfig.lpProtocol + "://" + lpMTagConfig.deploymentConfigPath + "?site=" + lpMTagConfig.lpNumber + "&d_id=" + lpMTagConfig.deploymentID);
    };

    function lpAddMonitorTag(b) {
        if (!lpMTagConfig.lpTagLoaded) {
            if (typeof (b) == "undefined" || typeof (b) == "object") {
                if (lpMTagConfig.lpMTagSrc) {
                    b = lpMTagConfig.lpMTagSrc;
                } else {
                    if (lpMTagConfig.lpTagSrv) {
                        b = lpMTagConfig.lpProtocol + "://" + lpMTagConfig.lpTagSrv + "/hcp/html/mTag.js";
                    } else {
                        b = "/hcp/html/mTag.js";
                    }
                }
            }
            if (b.indexOf("http") != 0) {
                b = lpMTagConfig.lpProtocol + "://" + lpMTagConfig.lpServer + b + "?site=" + lpMTagConfig.lpNumber;
            } else {
                if (b.indexOf("site=") < 0) {
                    if (b.indexOf("?") < 0) {
                        b = b + "?";
                    } else {
                        b = b + "&";
                    }
                    b = b + "site=" + lpMTagConfig.lpNumber;
                }
            }
            var a = document.createElement("script");
            a.setAttribute("type", "text/javascript");
            a.setAttribute("charset", "iso-8859-1");
            a.setAttribute("src", b);
            document.getElementsByTagName("head").item(0).appendChild(a);
        }
    }
    lpMTagConfig.calculateSentPageTime = function () {
        var a = (new Date()).getTime() - lpMTagConfig.pageStartTime;
        lpAddVars("page", "pageLoadTime", Math.round(a / 1000) + " sec");
    };
    if (typeof (lpMTagConfig.pageVar) == "undefined") {
        lpMTagConfig.pageVar = [];
    }
    if (typeof (lpMTagConfig.sessionVar) == "undefined") {
        lpMTagConfig.sessionVar = [];
    }
    if (typeof (lpMTagConfig.visitorVar) == "undefined") {
        lpMTagConfig.visitorVar = [];
    }
    if (typeof (lpMTagConfig.onLoadCode) == "undefined") {
        lpMTagConfig.onLoadCode = [];
    }
    if (typeof (lpMTagConfig.dynButton) == "undefined") {
        lpMTagConfig.dynButton = [];
    }
    if (typeof (lpMTagConfig.ifVisitorCode) == "undefined") {
        lpMTagConfig.ifVisitorCode = [];
    }

    function lpAddVars(b, a, c) {
        if (a.indexOf("OrderTotal") != -1 || a.indexOf("OrderNumber") != -1) {
            if (c == "" || c == 0) {
                return;
            } else {
                lpMTagConfig.sendCookies = false;
            }
        }
        c = lpTrimSpaces(c.toString());
        if (a.length > 50) {
            a = a.substr(0, 50);
        }
        if (c.length > 200) {
            c = c.substr(0, 200);
        }
        switch (b) {
        case "page":
            lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(a) + "=" + escape(c);
            break;
        case "session":
            lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(a) + "=" + escape(c);
            break;
        case "visitor":
            lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(a) + "=" + escape(c);
            break;
        }
    }

    function onloadEMT() {
        var a = document.cookie;
        if (lpMTag.lpBrowser == "IE" && a.length > 1000) {
            lpMTagConfig.sendCookies = false;
        }
    }

    function lpTrimSpaces(a) {
        return a.replace(/^\s+|\s+$/g, "");
    }

    function lpSendData(b, a, c) {
        if (typeof (lpMTag) != "undefined" && typeof (lpMTag.lpSendData) != "undefined") {
            lpMTag.lpSendData(b.toUpperCase() + "VAR!" + escape(a) + "=" + escape(c), true);
        }
    }
    try {
        if (typeof (lpUnit) == "undefined") {
            var lpUnit = lpMTagConfig.defaultUnit;
        }
        lpMTagConfig.deploymentID = lpUnit;
        if (typeof (lpAddVars) != "undefined") {
            lpAddVars("page", "unit", lpUnit);
        }
        if (typeof (lpLanguage) == "undefined") {
            var lpLanguage = lpMTagConfig.defaultLanguage;
        }
        if (typeof (lpAddVars) != "undefined") {
            lpAddVars("session", "language", lpLanguage);
        }
        lpMTagConfig.defaultInvite = "chat-" + lpUnit + "-" + lpLanguage;
    } catch (e) {}
    lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;
    lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = function () {
        if (typeof (lpMTagConfig.dynButton) != "undefined") {
            for (i = 0; i < lpMTagConfig.dynButton.length; i++) {
                if (typeof (lpMTagConfig.dynButton[i].pid) != "undefined" && document.getElementById(lpMTagConfig.dynButton[i].pid) == null) {
                    lpMTagConfig.dynButton.splice(i, 1);
                    i--;
                }
            }
        }
    };
    lpMTagConfig.onLoadAll = function () {
        lpMTagConfig.calculateSentPageTime();
        lpMTagConfig.lpLoadScripts();
    };
    if (window.attachEvent) {
        window.attachEvent("onload", lpMTagConfig.onLoadAll);
    } else {
        window.addEventListener("load", lpMTagConfig.onLoadAll, false);
    }
    if (typeof (lpMTagConfig.db1) == "undefined") {
        lpMTagConfig.db1 = new Object();
    }
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "chat-stalker-" + lpUnit + "-" + lpLanguage,
        pid: "chatLPButtonStalker",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "voice-stalker-" + lpUnit + "-" + lpLanguage,
        pid: "voiceLPButtonStalker",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "chat-header-" + lpUnit + "-" + lpLanguage,
        pid: "chatLPButtonHeader",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "voice-header-" + lpUnit + "-" + lpLanguage,
        pid: "voiceLPButtonHeader",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "chat-footer-" + lpUnit + "-" + lpLanguage,
        pid: "chatLPButtonFooter",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "voice-footer-" + lpUnit + "-" + lpLanguage,
        pid: "voiceLPButtonFooter",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };
    lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {
        name: "chat-grainger-customerservice-" + lpLanguage,
        pid: "chatLPButtonCustomerService",
        afterStartPage: true,
        ovr: "lpMTagConfig.db1"
    };

    //Constant javascript on our pages
    if (typeof (lpLanguage) == "undefined") {
        var lpLanguage = "english";
    }
    
    //making lpAddVars calls
    for (var i = 0; i < lpDataFromServer.lpAddVarArrays.length; i++) {
        var tempLPAddVarArray = lpDataFromServer.lpAddVarArrays[i];
        lpAddVars(tempLPAddVarArray[0], tempLPAddVarArray[1], tempLPAddVarArray[2]);
    }
}
///////////////////////////////    
