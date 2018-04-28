var e = require("./../../util/util.js"), t = require("./../../const/consts.js"), r = require("./../../const/modeConsts.js"), s = void 0, o = function() {
    this.API_URL = r.CashNetURL[r.CashRunMode].httpURL, this.Server_URL = r.CashNetURL[r.CashRunMode].httpURL;
};

module.exports = new o(), o.prototype.init = function(e) {
    this.initEnd || (this.initEnd = !0, s = e);
}, o.prototype.updateURL = function(e) {
    r.NetURL[r.CashRunMode].serverURL = e.http, r.NetURL[r.CashRunMode].wsURL = e.ws, 
    this.Server_URL = e.http;
};

o.prototype.get = function(e, r) {
    if (t.MessageHead.Login != e && t.MessageHead.Entry != e && 0 == s.uid) return console.warn(e + " not get,when uid is 0."), 
    void s.exitGame(t.ExitCode.UidErr);
    r.retry = 0, this.request("GET", e, r);
}, o.prototype.post = function(e, r) {
    if (t.MessageHead.Login != e && t.MessageHead.Entry != e && t.MessageHead.Query != e && 0 == s.uid) return console.warn(e + " not post,when uid is 0."), 
    void s.exitGame(t.ExitCode.UidErr);
    r.retry = 0, this.request("POST", e, r);
}, o.prototype.request = function(o, n, i) {
    var a = this, u = e.assign({}, i.params), d = "", c = "";
    u.uid = s.uid, u.t = Date.now();
    for (var p in u) "" != d && (d += "&", c += "&"), d += p + "=" + encodeURIComponent(u[p]), 
    c += p + "=" + u[p];
    r.RunMode != r.RunModeType.Prod && console.warn(o, n, d);
    var h = e.GenNetSign(s.token + s.uid, c);
    "GET" == o ? (u.sign = h, d = u) : d += "&sign=" + h;
    var R = this.Server_URL + n;
    n == t.MessageHead.Query && (R = this.API_URL + n);
    wx.request({
        url: R,
        data: d,
        method: o,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            var t = e.data;
            i.success(t);
        },
        fail: function(r) {
            var s = r && r.errMsg ? r.errMsg : "";
            console.warn("request fail: ", s, n), e.reportAnalytics_cmd_err(n, d, "", "", s), 
            i.retry < 2 ? (i.retry++, setTimeout(function() {
                console.log("请求失败，重试", i.retry), a.request(o, n, i);
            }, 500)) : i.fail({
                errMsg: s,
                errCode: t.ExitCode.requestFail
            });
        },
        complete: function() {}
    });
};