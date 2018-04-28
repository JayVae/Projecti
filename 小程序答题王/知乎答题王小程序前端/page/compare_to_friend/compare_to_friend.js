var t = require("./../../net/friendNet.js"), e = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), a = require("./../../util/PVERoomDataManager.js"), n = require("./../../util/Tween.js"), i = getApp();

Page({
    data: {
        x: 0,
        y: 0,
        hidden: !0,
        status: 0,
        scopping: !0,
        roleInfo: null,
        rivalUser: null,
        killedQuestions: 0,
        killedQuestions_rival: 0,
        winRatio_user: 0,
        winRatio_rival: 0,
        shareRewardText: "",
        aniFeild: [ null, null, null, null ],
        showSharp1: !1,
        showSharp2: !1
    },
    btn_back_clicked: function(t) {
        wx.navigateBack();
    },
    start: function(t) {
        this.setData({
            hidden: !1,
            x: t.touches[0].x,
            y: t.touches[0].y
        });
    },
    move: function(t) {
        this.setData({
            x: t.touches[0].x,
            y: t.touches[0].y
        });
    },
    end: function(t) {
        this.setData({
            hidden: !0
        });
    },
    setUser: function(t, a, n) {
        var i = a, r = 0;
        if (a.scoreStats) {
            var s = a.scoreStats[1], o = a.scoreStats[2], u = a.scoreStats[3], c = a.scoreStats[4], l = a.scoreStats[5], h = a.scoreStats[6];
            s = s || 0, o = o || 0, u = u || 0, c = c || 0, l = l || 0, h = h || 0, i.userInfo || (i.userInfo = {}, 
            i.userInfo.nickName = i.nickName, i.userInfo.avatarUrl = i.avatarUrl), r = a.rightNum;
            var d = 750 / this.screenWidth, f = 110 / d, m = 70 / d, v = this.screenWidth / 2, w = wx.createCanvasContext(t);
            w.setFillStyle(n), w.setStrokeStyle(n), w.setGlobalAlpha(.4), w.beginPath();
            for (var p = {
                "-90": u,
                "-30": c,
                30: l,
                90: h,
                150: o,
                210: s
            }, x = -90; x < 270; x += 60) {
                var g = Math.PI / 180 * x, D = f * (Math.min(100, p[x + ""]) / 100), S = v + (D += m) * Math.cos(g), k = 120.5 + D * Math.sin(g);
                w.lineTo(S, k);
            }
            w.fill(), w.stroke(), w.draw();
        }
        return i.matchName = e.GetMatchInfo(i.curMatch).name, {
            user: i,
            killedQuestions: r
        };
    },
    onLoad: function(t) {
        var a = this;
        e.showShareMenu(), i.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.options = t, this.setData({
            status: 2,
            shareRewardText: i.getShareRewardText()
        }), this.init(t);
        var r = n.fastGet("compare_to_friend");
        r.wait(500);
        for (var s = 0; s < 4; s++) !function(t) {
            r.wait(100), r.call(function() {
                var e = wx.createAnimation({
                    timingFunction: "ease-out",
                    duration: 300
                });
                e.translate3d(0, 0, 0).step();
                var n = {};
                n["aniFeild[" + t + "]"] = e.export(), a.setData(n);
            });
        }(s);
        r.wait(200), r.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 300
            });
            t.translate3d(0, 0, 0).step();
            var e = {
                ani_foot: t.export()
            };
            a.setData(e);
        }), r.wait(300), r.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-in",
                duration: 300
            });
            t.scale(1).opacity(1).rotate(0).step();
            var e = {
                ani_web: t.export()
            };
            a.setData(e);
        }), r.wait(800), r.call(function() {
            var t = {
                showSharp1: !0
            };
            a.setData(t);
        }), r.wait(500), r.call(function() {
            var t = {
                showSharp2: !0
            };
            a.setData(t);
        });
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : i.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        n.removeTweens("compare_to_friend"), i.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var e = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + i.mainData.role.shareCode + "&compare=true",
            from: "compare_to_friend"
        };
        return i.shareConf(e);
    },
    btn_newuser_clicked: function() {
        var t = this;
        this.btnlock || (this.btnlock = !0, a.createBeginnerTestData(), wx.redirectTo({
            url: "../../page/fight/fight?from=pve",
            complete: function() {
                setTimeout(function() {
                    t.btnlock = !1;
                }, 500);
            }
        }));
    },
    init: function(e) {
        var a = this;
        this.screenWidth = i.systemInfo.windowWidth, this.screenHeight = i.systemInfo.windowHeight;
        var n = this.setUser("myCanvas", i.mainData.role, "#2EDAFE");
        this.setData({
            roleInfo: n.user,
            killedQuestions: n.killedQuestions,
            winRatio_user: 0 == n.user.roomNum ? 0 : (100 * n.user.winRoom / n.user.roomNum).toFixed(1)
        }), t.friendDetail(i.mainData.loginArgs.friendCode, function(t, e) {
            if (!t && e) {
                var n = a.setUser("myCanvas2", e, "#FF205A");
                a.setData({
                    rivalUser: n.user,
                    killedQuestions_rival: n.killedQuestions,
                    winRatio_rival: 0 == n.user.roomNum ? 0 : (100 * n.user.winRoom / n.user.roomNum).toFixed(1)
                });
            }
        });
    }
});