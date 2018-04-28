function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = require("./../../../net/connectNotify.js"), n = require("./../../../const/notifyConsts.js"), o = require("./../../../util/util.js"), a = (require("./../../../const/consts.js"), 
getApp()), r = function() {
    function r(t) {
        var i = this;
        e(this, r), this.page = t, this.registerConnectNotify(), this.page.on_notice_banner_clicked = function(e) {
            console.log("on_notice_banner_clicked~");
        }, this.page.onTapNoticeViewBtn = function() {
            i.onTapNoticeViewBtn();
        }, this.tryShow = !0;
    }
    return t(r, [ {
        key: "initNoctice",
        value: function(e, t) {
            for (var i = {
                noticeViewVisible: this.tryShow,
                noticeList: [],
                notice_banner_url: null
            }, n = o.getServerTime() / 1e3, r = a.mainData.role.noticeList || [], c = 0; c < r.length; c++) {
                var s = r[c];
                if (s.endTime > n) {
                    if (t) {
                        var l = "notice_" + s.id;
                        if (o.checkSaveTime(l)) continue;
                    }
                    "banner" == s.title ? i.notice_banner_url = "http://question-resource-zh.hortor.net/image/new_skin/AD/" + s.content + ".png" : i.noticeList.push(s);
                }
            }
            return i.noticeViewVisible = i.noticeViewVisible && !a.isNewUser() && i.noticeList.length > 0, 
            e.noticeData = i, e;
        }
    }, {
        key: "checkSaveTime",
        value: function() {
            for (var e = a.mainData.role.noticeList || [], t = 0; t < e.length; t++) {
                var i = "notice_" + e[t].id;
                if (!o.checkSaveTime(i)) return !0;
            }
            return !1;
        }
    }, {
        key: "setSaveTime",
        value: function() {
            this.removeAllNoticeSave();
            for (var e = a.mainData.role.noticeList || [], t = "", i = 0; i < e.length; i++) {
                var n = e[i], r = "notice_" + n.id;
                o.setSaveTime(r, 0), t = t.length > 0 ? t + "|" + n.id : "" + n.id;
            }
            return o.setStorageSync("noticeStatus", t), console.log("生成新的notice清单" + t), !1;
        }
    }, {
        key: "onShow",
        value: function() {
            if (this.checkSaveTime()) {
                var e = {};
                e = this.initNoctice(e, !0), this.page.setData(e), this.setSaveTime();
            }
        }
    }, {
        key: "onShowAbs",
        value: function() {
            this.tryShow = !0;
            var e = {};
            e = this.initNoctice(e, !1), this.page.setData(e);
        }
    }, {
        key: "onShowInstert",
        value: function(e) {
            this.noticeFromWsconnect(e);
            var t = {};
            t = this.initNoctice(t, !0), this.page.setData(t), this.setSaveTime();
        }
    }, {
        key: "noticeFromWsconnect",
        value: function(e) {
            if (e) {
                a.mainData.role.noticeList || (a.mainData.role.noticeList = []);
                for (var t = 0; t < a.mainData.role.noticeList.length; t++) {
                    var i = a.mainData.role.noticeList[t];
                    if (i.id == e.id) {
                        if (i.endTime == e.endTime) {
                            this.tryShow = !0;
                            var n = "notice_" + i.id;
                            o.removeSaveTime(n);
                        }
                        return void (a.mainData.role.noticeList[t] = e);
                    }
                }
                a.mainData.role.noticeList.push(e), this.tryShow = !0;
            }
        }
    }, {
        key: "closeNoticeForm",
        value: function() {
            this.tryShow = !1;
            var e = {};
            e["noticeData.noticeViewVisible"] = !1, this.page.setData(e);
        }
    }, {
        key: "removeAllNoticeSave",
        value: function() {
            var e = o.getStorageSync("noticeStatus");
            if (e && e.length > 0) for (var t = e.split("|"), i = 0; i < t.length; i++) {
                var n = "notice_" + t[i];
                o.removeSaveTime(n), console.log("removenotice:" + n);
            }
        }
    }, {
        key: "onTapNoticeViewBtn",
        value: function() {
            this.closeNoticeForm();
        }
    }, {
        key: "onActionGameBoard",
        value: function(e, t) {
            var i = {
                id: t[3],
                title: t[0],
                content: t[1],
                endTime: t[2]
            };
            this.onShowInstert(i);
        }
    }, {
        key: "registerConnectNotify",
        value: function() {
            i.register(n.ActionGameBoard, this.onActionGameBoard, this);
        }
    }, {
        key: "removeConnectNotify",
        value: function() {
            i.remove(n.ActionGameBoard, this.onActionGameBoard);
        }
    }, {
        key: "onUnload",
        value: function() {
            this.removeConnectNotify();
        }
    } ]), r;
}();

module.exports = r;