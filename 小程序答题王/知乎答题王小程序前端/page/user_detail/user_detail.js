var t = require("./../../net/friendNet.js"), e = require("./../../net/settingNet.js"), a = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../const/modeConsts.js")), n = require("./../../util/util.js"), i = require("./../../const/consts.js"), s = require("./../../util/PVERoomDataManager.js"), o = require("./../../util/Tween.js"), r = require("./../../data/ItemsManager.js"), c = getApp();

Page({
    data: {
        screenWidth: 100,
        screenHeight: 603,
        roleInfo: null,
        killedQuestions: 0,
        shareRewardText: "",
        settingViewVisible: !1,
        grid9_panel: i.Grid9_panel,
        forbiddenPush: !1,
        soundOff: !1,
        settingOpacity: 0,
        showWeb: !1,
        cups: null,
        myUID: 0
    },
    btn_back_clicked: function(t) {
        wx.navigateBack();
    },
    initCupsResource: function(t) {
        this.setData({
            cups: c.formatUserCups(t)
        });
    },
    setUser: function(t) {
        var e = this;
        if (t) {
            var a = t, i = {};
            if (i.roleInfo = a, t.scoreStats) {
                var s = t.scoreStats[1], r = t.scoreStats[2], u = t.scoreStats[3], d = t.scoreStats[4], l = t.scoreStats[5], f = t.scoreStats[6];
                s = s || 0, r = r || 0, u = u || 0, d = d || 0, l = l || 0, f = f || 0, a.userInfo ? (i.roleInfo.userInfo = n.assign({}, i.roleInfo.userInfo), 
                i.roleInfo.userInfo.nickName = a.userInfo.nickName) : (a.userInfo = {}, a.userInfo.nickName = a.nickName, 
                a.userInfo.avatarUrl = a.avatarUrl), this.initCupsResource(t), i.killedQuestions = t.rightNum;
                var h = 750 / this.data.screenWidth, m = 110 / h, p = 70 / h, g = this.data.screenWidth / 2, w = wx.createCanvasContext("myCanvas");
                w.setFillStyle("#7AFBFF"), w.setStrokeStyle("#7AFBFF"), w.setGlobalAlpha(.5), w.beginPath();
                for (var D = {
                    "-90": u,
                    "-30": d,
                    30: l,
                    90: f,
                    150: r,
                    210: s
                }, v = -90; v < 270; v += 60) {
                    var x = Math.PI / 180 * v, b = m * (Math.min(100, D[v + ""]) / 100), I = g + (b += p) * Math.cos(x), k = 120.5 + b * Math.sin(x);
                    w.lineTo(I, k);
                }
                console.log("-----------"), w.fill(), w.stroke(), w.draw();
            }
            var T = c.getShareRewardText(), _ = n.GetMatchInfo(a.curMatch), S = t.winRoom || 0, y = t.roomNum || 0, F = 0;
            0 != y && (F = S / y), i.matchName = _.name, i.star = a.star, i.shareRewardText = T || "", 
            i.winningRate = (100 * F).toFixed(0) + "%", this.setData(i);
            var C = o.fastGet("user_detail");
            C.wait(1e3), C.call(function() {
                var t = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.translate3d(0, "0px", 0).opacity(1).step(), e.setData({
                    aniHead: t.export()
                });
            }), this.data.cups && (C.wait(400), C.call(function() {
                var t = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.right("16rpx").step(), e.setData({
                    aniCups: t.export()
                });
            })), C.wait(400), C.call(function() {
                var t = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.opacity(1).step(), e.setData({
                    aniWeb: t.export()
                });
            }), C.wait(400), C.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.opacity(1).scale(1).step(), e.setData({
                    showWeb: !0,
                    aniField1: t.export()
                });
            }), C.wait(200), C.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.opacity(1).scale(1).step(), e.setData({
                    aniField2: t.export()
                });
            }), C.wait(200), C.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.opacity(1).scale(1).step(), e.setData({
                    aniField3: t.export()
                });
            }), C.wait(200), C.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.translate3d(0, 0, 0).step(), e.setData({
                    anifoot: t.export()
                });
            });
        }
    },
    onLoad: function(e) {
        var i = this;
        n.showShareMenu(), c.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.setData({
            screenWidth: c.systemInfo.windowWidth,
            screenHeight: c.systemInfo.windowHeight,
            myUID: c.mainData.role.uid
        });
        var s = n.assign({}, c.mainData.user_to_detail || c.mainData.role);
        s.uid != c.mainData.role.uid ? (this.setUser(s), t.findFriend(s.uid, function(t, e) {
            t ? console.warn(t) : e && i.setUser(e);
        })) : this.setUser(c.mainData.role), wx.setNavigationBarTitle && wx.setNavigationBarTitle({
            title: "知乎答题王" + a.ClientVer
        });
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : c.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        o.removeTweens("user_detail"), c.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var e = {
            title: "本群头脑段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + c.mainData.role.shareCode + "&compare=true",
            from: "user_detail"
        };
        return c.shareConf(e);
    },
    btn_newuser_clicked: function() {
        var t = this;
        this.btnlock || (c.mainData.role.userInfo ? (this.btnlock = !0, s.createBeginnerTestData(), 
        wx.redirectTo({
            url: "../../page/fight/fight?from=pve",
            complete: function() {
                setTimeout(function() {
                    t.btnlock = !1;
                }, 500);
            }
        })) : c.exitGame(i.ExitCode.UserErr));
    },
    btn_code_clicked: function() {
        wx.navigateTo({
            url: "/page/qrCode/qrCode"
        });
    },
    onTapSettingBtn: function(t) {
        try {
            var e = c.mainData.role.settingsInfo || {};
            this.setData({
                forbiddenPush: e.forbiddenPush,
                soundOff: e.soundOff,
                settingViewVisible: !0,
                settingOpacity: 1
            });
        } catch (t) {
            n.reportAnalytics_Try(t);
        }
    },
    onTapSettingViewCloseBtn: function(t) {
        var a = this, n = c.mainData.role.settingsInfo || {};
        this.data.forbiddenPush == n.forbiddenPush && this.data.soundOff == n.soundOff || e.setting(this.data.forbiddenPush, this.data.soundOff, function() {
            c.mainData.role.settingsInfo || (c.mainData.role.settingsInfo = {}), c.mainData.role.settingsInfo.soundOff = a.data.soundOff, 
            c.mainData.role.settingsInfo.forbiddenPush = a.data.forbiddenPush;
        }), this.setData({
            settingOpacity: 0
        }), setTimeout(function() {
            a.setData({
                settingViewVisible: !1
            });
        }, 300);
    },
    onTapSettingView_pushBtn: function(t) {
        this.data.forbiddenPush = !this.data.forbiddenPush, this.setData({
            forbiddenPush: this.data.forbiddenPush
        });
    },
    onTapSettingView_soundBtn: function(t) {
        this.data.soundOff = !this.data.soundOff, this.setData({
            soundOff: this.data.soundOff
        });
    },
    btn_cup_clicked: function(t) {
        var e = t.currentTarget.dataset.id, a = r.getItemDetail(e);
        a.num = 1, a.callback_back_clicked = "callback_back_clicked", this.setData({
            selectedItem: a
        });
    },
    callback_back_clicked: function() {
        this.setData({
            selectedItem: null
        });
    }
});