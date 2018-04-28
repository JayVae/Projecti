function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = require("./../../../util/util.js"), i = require("./../../../const/consts.js"), a = (require("./../../../util/Tween.js"), 
require("./../../../net/settingNet.js")), s = require("./../../../net/messageNet.js"), o = getApp(), r = function() {
    function r(e) {
        var n = this;
        t(this, r), this.page = e;
        var i = {
            settingViewVisible: !1,
            hasAnyNotice: !1,
            scopeBtnVisible: !1
        };
        this.page.setData({
            settingData: i
        }), this.page.onTapSettingView_pushBtn = function() {
            n.onTapSettingView_pushBtn();
        }, this.page.onTapSettingView_soundBtn = function() {
            n.onTapSettingView_soundBtn();
        }, this.page.onTapNoticeInSettingView = function() {
            n.onTapNoticeInSettingView();
        }, this.page.onTapSettingViewCloseBtn = function() {
            n.onTapSettingViewCloseBtn();
        }, this.page.form_submit_setting = function() {
            n.form_submit_setting();
        }, this.page.userInfoHandler_setting = function() {
            n.userInfoHandler_setting();
        }, this.page.onTapGetUserInfoBtn_setting = function() {
            n.onTapGetUserInfoBtn_setting();
        };
    }
    return e(r, [ {
        key: "show",
        value: function(t) {
            this.callback_soundSwitch = t;
            try {
                var e = o.mainData.role.settingsInfo || {};
                this.page.setData({
                    settingData: {
                        settingViewVisible: !0,
                        hasAnyNotice: this.hasAnyNotice(),
                        settingOpacity: 1,
                        tmpForbiddenPush: e.forbiddenPush,
                        tmpSoundOff: e.soundOff,
                        scopeBtnVisible: !1
                    }
                }), this.checkScope();
            } catch (t) {
                n.reportAnalytics_Try(t);
            }
        }
    }, {
        key: "checkScope",
        value: function() {
            var t = this;
            o.checkScope("scope.userInfo", function(e) {
                var n = {};
                n["settingData.scopeBtnVisible"] = !e, t.page.setData(n), t.btnLock = !1;
            });
        }
    }, {
        key: "userInfoHandler_setting",
        value: function(t) {
            var e = this;
            t && t.detail && "getUserInfo:ok" == t.detail.errMsg ? o.setUserInfo(t.detail, function() {
                e.page.setData({
                    "roleInfo.userInfo": o.mainData.role.userInfo,
                    "roleInfo.headId": o.mainData.role.headId
                }), e.checkScope();
            }) : this.checkScope();
        }
    }, {
        key: "form_submit_setting",
        value: function(t) {
            this.btnLock || (this.btnLock = !0, t && t.detail && t.detail.formId && "the formId is a mock one" != t.detail.formId && (n.checkSaveTime(i.StorageKey.FormTime) || s.recordForm(t.detail.formId, function() {
                n.setSaveTime(i.StorageKey.FormTime, i.MaxFormId);
            })));
        }
    }, {
        key: "hasAnyNotice",
        value: function() {
            var t = {};
            return (t = this.page.noticeController.initNoctice(t, !1)).noticeData.noticeList.length > 0 && !o.isNewUser();
        }
    }, {
        key: "onTapSettingView_pushBtn",
        value: function() {
            var t = {};
            t["settingData.tmpForbiddenPush"] = !this.page.data.settingData.tmpForbiddenPush, 
            this.page.setData(t);
        }
    }, {
        key: "onTapSettingView_soundBtn",
        value: function() {
            var t = {};
            t["settingData.tmpSoundOff"] = !this.page.data.settingData.tmpSoundOff, this.page.setData(t), 
            this.callback_soundSwitch && this.callback_soundSwitch();
        }
    }, {
        key: "onTapNoticeInSettingView",
        value: function() {
            this.onTapSettingViewCloseBtn(), this.page.noticeController.onShowAbs();
        }
    }, {
        key: "onTapSettingViewCloseBtn",
        value: function() {
            var t = this, e = o.mainData.role.settingsInfo || {};
            this.page.data.settingData.tmpForbiddenPush == e.forbiddenPush && this.page.data.settingData.tmpSoundOff == e.soundOff || a.setting(this.page.data.settingData.tmpForbiddenPush, this.page.data.settingData.tmpSoundOff, function() {
                o.mainData.role.settingsInfo || (o.mainData.role.settingsInfo = {}), o.mainData.role.settingsInfo.soundOff = t.page.data.settingData.tmpSoundOff, 
                o.mainData.role.settingsInfo.forbiddenPush = t.page.data.settingData.tmpForbiddenPush;
            });
            var n = {};
            n["settingData.settingOpacity"] = 0, this.page.setData(n), setTimeout(function() {
                (n = {})["settingData.settingViewVisible"] = !1, t.page.setData(n);
            }, 300);
        }
    } ]), r;
}();

module.exports = r;