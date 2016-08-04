/*++++++++++++++++++++++++++++++++++++++++++++
 * check browser's type & version 
 * ============================================
 * @author fangzhigang
 * ============================================
 * @date 2016-04-19
 *+++++++++++++++++++++++++++++++++++++++++++++*/
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
          },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
          },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
          },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
          },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
          },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
          },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
          },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
          },
        { // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
          },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
          },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
          },
        { // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
          }
      ],
    dataOS: [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
          },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
          },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone"
          },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
          }
      ]

};

function browserWarning() {
    //调用方法 BrowserDetect.browser:为浏览器类型，BrowserDetect.version:为版本,BrowserDetect.OS:为系统类型
    BrowserDetect.init();
    //BrowserDetect.browser == "Firefox" //Firefox  Chrome
    return BrowserDetect.browser;
}

/**
 *versioncue 
 */
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsMac = sUserAgent.match(/mac/i) == "mac";

    if (bIsAndroid) {
        return "android";
    } else if (bIsIphoneOs) {
        return "ios";
    }
}

//下载安装app
function downloadApp() {
    alert(browserRedirect());
    if (browserRedirect() === "android") {

    } else if (browserRedirect() === "ios") {
        if (browserWarning() === "Safari") {
            window.location.href = "itms-services://?action=download-manifest&url=https://alpha-admin.gdfcx.net/Enterprise-Admin/appversion/res/app/Enterprise.plist";
        } else {
            alert("请使用Safari浏览器安装设计家-服务端APP!");
        }
    } else {
        alert("请在手机端下载安装!");
    }
}
