var t = require("./../../net/groupNet.js"), a = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), e = (require("./../../const/consts.js"), 
require("./../../util/PVERoomDataManager.js")), n = require("./../../util/Tween.js"), o = getApp();

Page({
    data: {
        status: 0,
        page: 0,
        myGroup: {
            id: 123,
            name: "",
            openGId: ""
        },
        members: null,
        shareRewardText: ""
    },
    callback_item_clicked: function(t) {
        var a = this;
        if (!this.btnLock) for (var e = t.currentTarget.dataset.uid, n = 0; n < this.data.members.length; n++) {
            var i = this.data.members[n];
            i.uid == e && (o.mainData.user_to_detail = i, this.btnLock = !0, wx.navigateTo({
                url: "../../page/user_detail/user_detail",
                complete: function() {
                    setTimeout(function() {
                        a.btnLock = !1;
                    }, 500);
                }
            }));
        }
    },
    btn_newuser_clicked: function(t) {
        var a = this;
        this.btnlock || (this.btnlock = !0, e.createBeginnerTestData(), wx.redirectTo({
            url: "../../page/fight/fight?from=pve",
            complete: function() {
                setTimeout(function() {
                    a.btnlock = !1;
                }, 500);
            }
        }));
    },
    onLoad: function(t) {
        var e = this;
        a.showShareMenu(), o.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        console.log("options onload:", t), this.options = t;
        var i = {
            "myGroup.id": t.groupId,
            "myGroup.name": t.groupName,
            "myGroup.openGId": t.openGId,
            shareRewardText: o.getShareRewardText()
        };
        this.setData(i), this.init(t);
        var r = n.fastGet("compare_to_group");
        r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 400
            });
            t.translate3d(0, "0px", 0).step();
            var a = e.data;
            a.ani_head_panel = t.export(), e.setData(a);
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            t.scale(1).step(), e.setData({
                ani_logo: t.export()
            });
        }), r.wait(300), r.call(function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            t.scale(1, 1).step(), e.setData({
                ani_brow: t.export()
            });
        }), r.wait(300), r.call(function() {
            var t = wx.createAnimation({
                duration: 400,
                timingFunction: "ease-out"
            });
            t.translate3d(0, 0, 0).step(), e.setData({
                ani_list: t.export()
            });
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                duration: 400,
                timingFunction: "ease-out"
            });
            t.translate3d(0, 0, 0).step(), e.setData({
                ani_foot: t.export()
            });
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-in"
            });
            t.scale(1).opacity(1).step(), e.setData({
                ani_groupName: t.export()
            });
        });
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : o.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.shared = !1, this.backgroundPositionInterval || (this.backgroundPosition || (this.backgroundPosition = {
            x: 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3),
            y: 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3)
        }, this.setData({
            backgroundPosition: this.backgroundPosition.x + "rpx " + this.backgroundPosition.y + "rpx "
        })), this.backgroundPositionInterval = setInterval(function() {
            t.backgroundPosition.x += 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3), 
            t.backgroundPosition.y += 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3), 
            t.setData({
                backgroundPosition: t.backgroundPosition.x + "rpx " + t.backgroundPosition.y + "rpx "
            });
        }, 1e4));
    },
    onHide: function() {
        this.backgroundPositionInterval && (clearInterval(this.backgroundPositionInterval), 
        this.backgroundPositionInterval = void 0);
    },
    onUnload: function() {
        n.removeTweens("compare_to_group"), o.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var a = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + o.mainData.role.shareCode + "&compare=true",
            from: "compare_to_group"
        };
        return o.shareConf(a);
    },
    init: function(e) {
        var n = this;
        t.matchInfo(this.data.myGroup.id, function(t, e) {
            if (e && e.list) {
                for (var i = 0; i < e.list.length; i++) {
                    var r = e.list[i];
                    r.matchName = a.GetMatchInfo(r.curMatch).name;
                }
                e.list.sort(function(t, a) {
                    return 0 == a.curMath && 0 != t.curMath ? 1 : 0 != a.curMath && 0 == t.curMath ? -1 : a.curMatch == t.curMatch ? a.star - t.star : a.curMatch - t.curMatch;
                });
                for (var s = 0; s < e.list.length; s++) {
                    var c = e.list[s];
                    c.rank = s + 1, c.uid == o.mainData.role.uid && (c.itsMe = !0);
                }
                n.setData({
                    members: e.list,
                    listHeight: 186 * e.list.length + 100
                });
            }
        });
    }
});