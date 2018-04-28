var e = require("./../../net/fightNet.js"), t = require("./../../net/messageNet.js"), o = require("./../../util/PVERoomDataManager.js"), r = require("./../../util/util.js"), n = require("./../../const/consts.js"), i = require("./../../util/Tween.js"), a = require("./template/PvrController.js"), s = getApp();

Page({
    data: {
        textStatus: ".",
        itsMe: !1,
        myRanking: 0,
        roomInfo: null,
        textExpireTime: ""
    },
    roomId: 0,
    needSendOutFight: !0,
    onLoad: function(e) {
        a.pvrLoad = !0, setTimeout(function() {
            a.pvrLoad = !1;
        }, 2e3), r.showShareMenu(), a.roomInfo ? this.initSkin() : wx.navigateBack();
    },
    initSkin: function() {
        var e = this, t = 0;
        if (a.roomInfo.list) for (var o = 0; o < a.roomInfo.list.length; o++) {
            var n = a.roomInfo.list[o];
            n.rivalUser.uid == s.uid && (t = o + 1), n.rivalUser.nickName = r.formatNameBase(n.rivalUser.nickName, 8, null);
        }
        var i = {
            textStatus: this.getTextStatus(a.roomInfo),
            itsMe: a.itsMe(),
            myRanking: t,
            roomInfo: a.roomInfo
        };
        this.setData(i);
        var m = r.getServerTimeBaseSecond();
        Math.max(0, a.roomInfo.expireTime - m) > 0 && !a.roomInfo.expire && (this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), 
        this.timeFlag_countDown = void 0), this.timeFlag_countDown = setInterval(function() {
            var t = r.getServerTimeBaseSecond(), o = Math.max(0, a.roomInfo.expireTime - t), n = {
                textExpireTime: r.formatTime(o)
            };
            e.setData(n), o <= 0 && (clearInterval(e.timeFlag_countDown), e.timeFlag_countDown = void 0, 
            a.roomInfo.expire = !0, e.initSkin());
        }, 1e3));
    },
    getTextStatus: function(e) {
        var t = null;
        return a.itsMe() ? t = null : e.expire ? t = "房间已过期" : e.isFull ? t = "房间已满" : e.had && (t = "您已完成挑战"), 
        t;
    },
    matchShare: function(t) {
        var o = this;
        e.matchShare(a.roomIdPvr, a.friendCode, function(e, n) {
            if (e) 70024 == e.errMsg ? s.exitGame(e.errCode, e.errMsg) : (console.log(e.errMsg), 
            a.shareRoomInfo(function() {
                o.initSkin();
            })); else {
                console.log("matchShare.data:", n), r.setStorageSync("roomData", JSON.stringify({
                    roomId: n.roomId,
                    notEnd: !0,
                    type: "pvr"
                })), o.roomId = n.roomId;
                var i = {
                    roomId: n.roomId,
                    userInfo: {
                        uid: s.mainData.role.uid,
                        nickName: s.mainData.role.userInfo.nickName,
                        avatarUrl: s.mainData.role.userInfo.avatarUrl,
                        city: r.getCity(s.mainData.role.userInfo.province, s.mainData.role.userInfo.city),
                        level: s.mainData.role.level,
                        headId: s.mainData.role.headId
                    },
                    rivalUser: n.rivalUser
                };
                o.setData(i), t && t();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        a.pvrLoad || setTimeout(function() {
            r.log("从战斗回来，roomid:" + a.roomInfo, "friendCode:" + a.friendCode), a.shareRoomInfo(function() {
                e.initSkin(), a.makeMyShareImage();
            });
        }, 1e3);
    },
    onHide: function() {
        this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), this.timeFlag_countDown = void 0);
    },
    onUnload: function() {
        i.removeTweens("pvr"), this.needSendOutFight && this.sendOutFight();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = {
            title: a.makeMyShareTitle(),
            path: "/page/login/login?friendCode=" + a.friendCode + "&roomIdPvr=" + a.roomIdPvr,
            from: "pvr",
            imageUrl: a.pvrShareImg || "cut"
        };
        return s.shareConf(t);
    },
    btn_goFight_clicked: function(e) {
        var r = this;
        t.markStats(n.event_point.click_pvr, function() {}), this.matchShare(function() {
            r.needSendOutFight = !1;
            o.setData({
                roomId: r.data.roomId,
                userInfo: r.data.userInfo,
                rivalUser: r.data.rivalUser,
                city: r.data.userInfo.city,
                isPvr: !0
            }, !1);
            o.fixPVEAvatarUrl(), wx.navigateTo({
                url: "../../page/fight/fight?from=pve"
            });
        });
    },
    sendOutFight: function() {
        var t = this;
        e.outFight(0, this.roomId, function(e, o) {
            e && e.errCode == n.ExitCode.RequestErr || r.setStorageSync("roomData", JSON.stringify({
                roomId: t.roomId,
                notEnd: !1
            })), e && console.error("outFight err", e);
        });
    },
    onBtnBackClicked: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});