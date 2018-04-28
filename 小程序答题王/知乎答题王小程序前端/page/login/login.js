require("./../../net/network.js");

var e = require("./../../util/util.js"), o = (require("./../../util/LoginManager.js"), 
require("./../../const/consts.js")), i = require("./../../const/modeConsts.js"), n = (require("./../../util/EventDispatcher.js"), 
require("./../../util/RoomDataManager.js")), t = (require("./../../util/ChallengeRoomDataManager.js"), 
require("./../../util/PVERoomDataManager.js"), require("./../../data/ItemsManager.js"), 
require("./../../net/groupNet.js")), r = require("./../../net/fightNet.js"), a = (require("./../../net/roleNet.js"), 
require("./../../util/liveExpiredController.js")), s = (require("./../../net/messageNet.js"), 
require("./../../net/challengeNet.js"), require("../pvr/template/PvrController.js")), l = getApp();

Page({
    data: {},
    onLoad: function(n) {
        e.showShareMenu(), console.log("login onLoad : ", n);
        var t = "知乎答题王";
        if (i.RunMode != i.RunModeType.Prod && (t += i.RunMode), wx.setNavigationBarTitle({
            title: t
        }), this.options = JSON.parse(JSON.stringify(n)), l.mainData.loginArgs.friendCode = n.friendCode, 
        n.scene) {
            var r = decodeURIComponent(n.scene);
            l.mainData.loginArgs.friendCode = r;
        }
        n.channel && (l.channel = n.channel, l.checkPivilege = !0, l.mainData.loginArgs.mp = n.channel), 
        e.getStorageSync(o.StorageKey.ClientVer) != i.clientVer && (e.setStorageSync(o.StorageKey.ClientVer, i.clientVer), 
        e.removeAllCache());
    },
    onReady: function() {},
    onShow: function() {
        this.isShow || (this.isShow = !0, this.checkAuthorize());
    },
    checkAuthorize: function() {
        var e = this;
        wx.authorize({
            scope: "scope.userInfo",
            success: function(o) {
                l.uid ? e.redirectTo() : l.login(function(o) {
                    o || e.redirectTo();
                });
            },
            fail: function(e) {
                wx.openSetting && wx.openSetting();
            },
            complete: function(e) {
                console.log("[app]", "checkAuthorize complete:", e.errMsg);
            }
        });
    },
    redirectTo: function() {
        var e = this;
        setTimeout(function() {
            wx.redirectTo({
                url: "/page/cover/cover",
                success: function() {
                    setTimeout(function() {
                        e.enterWithUrl();
                    }, 500);
                },
                fail: function() {
                    l.gotoCover();
                }
            });
        }, 500);
    },
    onHide: function() {
        this.isShow = !1;
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var o = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + l.mainData.role.shareCode + "&compare=true",
            from: "login"
        };
        return l.shareConf(o);
    },
    enterWithUrl: function() {
        var e = this;
        if (this.options.challenge) l.mainData.role.gameConf.groupChallenge && wx.navigateTo({
            url: "/page/challenge/challenge_roomlist/challenge_roomlist"
        }); else if (this.options.cashGame) l.mainData.role.gameConf.cash && wx.navigateTo({
            url: "/page/cash/home/home"
        }); else if (this.options.roomIdPvr && this.options.friendCode) {
            var o = this.options.roomIdPvr, i = this.options.friendCode;
            s.enterWithUrl_pvr(o, i);
        } else this.options.liveFight ? this.options.liveFight && r.findRoomID(this.options.friendCode, function(o, i) {
            if (o) console.log("查找roomId出错", o); else if (i.isExpired || 0 == i.roomId) e.options.friendCode == l.mainData.role.shareCode ? (n.masterShareCode = e.options.friendCode, 
            l.gotoLive(0, !1)) : a.show(i.nickName ? i.nickName : "发起者"); else {
                var t = n.getData();
                console.log("enterWithUrl liveFight:", "data.roomId:", i.roomId, "roomData.roomId:", t.roomId), 
                i.roomId != t.roomId && t.roomId ? wx.showModal({
                    title: "提示",
                    content: "你已经在一场好友对战中，是否放弃此对战并加入新的对战？",
                    showCancel: !0,
                    confirmText: "加入",
                    complete: function(o) {
                        o.confirm && (n.masterShareCode = e.options.friendCode, l.gotoLive(i.roomId, !1));
                    }
                }) : (n.masterShareCode = e.options.friendCode, l.gotoLive(i.roomId, !1));
            }
        }) : (console.log("处理微信群用户相关 ", l.mainData.touchedShareCode, "loginArgs:", this.options), 
        l.isBeginnerTestUser() || !this.options.friendCode || !l.mainData.loginArgs.shareTicket || !l.mainData.loginArgs.compare && l.mainData.touchedShareCode[l.mainData.loginArgs.shareTicket] ? l.isBeginnerTestUser() || !this.options.compare || this.aboutCompare(null) : wx.getShareInfo({
            shareTicket: l.mainData.loginArgs.shareTicket,
            success: function(o) {
                t.joinGroup(e.options.friendCode, o.encryptedData, o.iv, function(o, i) {
                    o || i && e.options.compare && e.aboutCompare(i);
                }), l.mainData.loginArgs.shareTicket = null;
            },
            fail: function(o) {
                console.log("fail res:", o), e.options.compare && e.aboutCompare(null);
            },
            complete: function() {}
        }));
    },
    aboutCompare: function(e) {
        e && e.groupId ? wx.navigateTo({
            url: "/page/compare_to_group/compare_to_group?groupId=" + e.groupId + "&groupName=" + e.name + "&openGId=" + e.openGId
        }) : this.compareOneByOne(), this.options.compare = void 0;
    },
    compareOneByOne: function() {
        this.options.friendCode && this.options.friendCode != l.mainData.role.shareCode ? wx.navigateTo({
            url: "/page/compare_to_friend/compare_to_friend"
        }) : (l.mainData.user_to_detail = l.mainData.role, wx.navigateTo({
            url: "/page/user_detail/user_detail"
        }));
    }
});