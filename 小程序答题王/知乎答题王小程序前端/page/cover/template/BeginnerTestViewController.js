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
}(), i = (require("./../../../util/util.js"), require("./../../../net/fightNet.js"), 
require("./../../../util/PVERoomDataManager.js")), n = require("./../../../net/friendNet.js"), a = require("./../../../net/messageNet.js"), r = require("./../../../const/consts.js"), s = getApp(), o = function() {
    function o(t) {
        var i = this;
        e(this, o), this.page = t, this.page.beginnerTestView_onTapCancelBtn = function(e) {
            e && e.detail && e.detail.formId && "the formId is a mock one" != e.detail.formId && a.recordForm(e.detail.formId, function() {}), 
            i.setVisible(!1);
        }, this.page.beginnerTestView_onTapOKBtn = function(e) {
            i.btnLock || (i.btnLock = !0, i.goToFight(), i.setVisible(!1));
        }, this.page.beginnerTestView_onTapClose = function(e) {
            i.setVisible(!1);
        }, this.page.beginnerTestView_submit = function(e) {
            e && e.detail && e.detail.formId && "the formId is a mock one" != e.detail.formId && a.recordForm(e.detail.formId, function() {});
        }, this.page.setData({
            beginnerTestViewData: {
                visible: !1,
                avatarUrl: "../../image/qr/avatar.png",
                nickName: "刘看山"
            }
        });
    }
    return t(o, [ {
        key: "goToFight",
        value: function() {
            a.markStats(r.event_point.click_test, function() {}), i.createBeginnerTestData(), 
            i.fixPVEAvatarUrl(), wx.navigateTo({
                url: "../../page/fight/fight?from=pve"
            });
        }
    }, {
        key: "onShow",
        value: function() {
            var e = this;
            s.isBeginnerTestUser() ? s.mainData.loginArgs.friendCode ? n.friendDetail(s.mainData.loginArgs.friendCode, function(t, i) {
                if (!t) {
                    var n = {};
                    n["beginnerTestViewData.visible"] = !0, n["beginnerTestViewData.avatarUrl"] = i.avatarUrl || "../../image/qr/avatar.png", 
                    n["beginnerTestViewData.nickName"] = i.nickName, e.page.setData(n);
                }
            }) : this.setVisible(!0) : this.setVisible(!1);
        }
    }, {
        key: "setVisible",
        value: function(e) {
            var t = {};
            t["beginnerTestViewData.visible"] = e, this.page.setData(t), e && (this.btnLock = !1);
        }
    } ]), o;
}();

module.exports = o;