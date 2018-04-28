var r = require("./../../../util/util.js"), e = (require("./../../../const/consts.js"), 
require("./../../../net/fightNet.js")), a = require("./../../../net/connectNotify.js"), o = getApp();

module.exports = {
    enterWithUrl_pvr: function(o, t) {
        var i = this;
        this.roomIdPvr = o, this.friendCode = t, setTimeout(function() {
            e.shareRoomInfo(o, t, function(e, o) {
                e ? r.log("点开影子对战链接，查询房间信息:", e) : o ? (r.log("让cover来决定下一步操作"), i.roomInfo = o, 
                a.receive("pvr.shareRoomInfo", o), i.makeMyShareImage()) : r.log("点开影子对战链接，查询房间信息，返回既没有报错，也没有房间信息");
            });
        }, 800);
    },
    onCoverLoad: function(e) {
        this.cover = e, r.log("pvr cover 注事件==========="), a.register("pvr.shareRoomInfo", this.onGetShareRoomInfo, this), 
        e.onPvrPopup_closed = function() {
            var r = {};
            r["pvr.visible"] = !1, e.setData(r);
        };
    },
    onCoverUnLoad: function(e) {
        r.log("pvr cover 注销事件==========="), a.remove("pvr.shareRoomInfo", this.onGetShareRoomInfo);
    },
    onGetShareRoomInfo: function(e, a) {
        if (r.log("cover 处理login拿到的影子对战房间信息==========="), a.expire) {
            var o = {};
            o["pvr.visible"] = !0, o["pvr.expire"] = !0, o["pvr.isFull"] = !1, this.cover.setData(o);
        } else if (a.isFull) if (a.had) wx.navigateTo({
            url: "/page/pvr/pvr"
        }); else {
            var t = {};
            t["pvr.visible"] = !0, t["pvr.isFull"] = !0, t["pvr.expire"] = !1, this.cover.setData(t);
        } else wx.navigateTo({
            url: "/page/pvr/pvr"
        });
    },
    shareRoomInfo: function(a) {
        var o = this;
        e.shareRoomInfo(this.roomIdPvr, this.friendCode, function(e, t) {
            e ? r.log("从影子战斗返回，查询房间信息:", e) : t ? (r.log("让pvr来决定下一步操作"), o.roomInfo = t, a && a()) : (o.roomInfo = null, 
            r.log("从影子战斗返回，查询房间信息，返回既没有报错，也没有房间信息"));
        });
    },
    makeMyShareImage: function() {
        if (this.roomInfo.list && 0 != this.roomInfo.list.length) if (this.roomInfo.had && !this.itsMe()) {
            for (var e = null, a = null, t = 0; t < this.roomInfo.list.length; t++) {
                var i = this.roomInfo.list[t];
                i.rivalUser.uid == this.roomInfo.rivalUser.uid ? a = i : i.rivalUser.uid == o.uid && (e = i);
            }
            e || (e = {
                rivalUser: {
                    avatarUrl: o.mainData.role.userInfo.avatarUrl
                }
            });
            var s = {
                isWin: this.roomInfo.myScore > a.score,
                rivalAvatarUrl: a.rivalUser.avatarUrl,
                userAvatarUrl: e.rivalUser.avatarUrl,
                score: this.roomInfo.myScore
            };
            this.pvrShareImg = null, this.saveShareImg2(s);
        } else {
            r.log("准备生成单图1");
            for (var n = null, l = 0; l < this.roomInfo.list.length; l++) {
                var v = this.roomInfo.list[l];
                if (v.rivalUser.uid == this.roomInfo.rivalUser.uid) {
                    n = v;
                    break;
                }
            }
            var h = {
                rivalAvatarUrl: n.rivalUser.avatarUrl,
                score: n.score
            };
            this.pvrShareImg = null, r.log("准备生成单图2"), this.saveShareImg1(h);
        }
    },
    saveShareImg2: function(e) {
        var a = this;
        r.cacheFile("rivalAvatar", e.rivalAvatarUrl, function(o) {
            a.rivalAvatarPath = o, r.cacheFile("Avatar", e.userAvatarUrl, function(o) {
                if (a.userAvatarPath = o, a.rivalAvatarPath && a.userAvatarPath) {
                    var t = wx.createCanvasContext("pvrShareCanvas");
                    t.drawImage(a.userAvatarPath, 37, 90, 107, 107), t.drawImage(a.rivalAvatarPath, 265, 90, 107, 107), 
                    t.drawImage("/image/pvr/img_ad_challenge_4.png", 0, 0, 400, 320), 1 == e.isWin && t.drawImage("/image/pvr/img_ad_challenge_4_banner.png", 76, 6, 248, 81), 
                    t.setFillStyle("#ffffff"), t.setTextAlign && t.setTextAlign("center"), t.setFontSize(60), 
                    t.fillText(e.score, 199.5, 255), t.draw(!0, function(e) {
                        console.log("======context.draw", e), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 320,
                            destWidth: 400,
                            destHeight: 320,
                            canvasId: "pvrShareCanvas",
                            success: function(e) {
                                e.tempFilePath && (a.pvrShareImg = e.tempFilePath, r.log("生在分享图this.pvrShareImg:", a.pvrShareImg));
                            }
                        }, a);
                    });
                }
            });
        });
    },
    saveShareImg1: function(e) {
        var a = this;
        r.cacheFile("rivalAvatar", e.rivalAvatarUrl, function(o) {
            a.rivalAvatarPath = o;
            var t = wx.createCanvasContext("pvrShareCanvas");
            t.drawImage(a.rivalAvatarPath, 147, 83, 107, 107), t.drawImage("/image/pvr/img_ad_challenge_3.png", 0, 0, 400, 320), 
            t.setFillStyle("#ffffff"), t.setTextAlign && t.setTextAlign("center"), t.setFontSize(60), 
            t.fillText(e.score, 199.5, 258), r.log("开始画"), t.draw(!0, function(e) {
                console.log(e), wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 320,
                    destWidth: 400,
                    destHeight: 320,
                    canvasId: "pvrShareCanvas",
                    success: function(e) {
                        r.log("画完成功回调"), e.tempFilePath && (a.pvrShareImg = e.tempFilePath, r.log("生在分享图this.pvrShareImg:", a.pvrShareImg));
                    }
                }, a);
            });
        });
    },
    makeMyShareTitle: function() {
        if (this.roomInfo.had && !this.itsMe()) {
            for (var r = null, e = 0; e < this.roomInfo.list.length; e++) {
                var a = this.roomInfo.list[e];
                if (a.rivalUser.uid == this.roomInfo.rivalUser.uid) {
                    r = a;
                    break;
                }
            }
            return this.roomInfo.myScore > r.score ? "我打败了" + r.rivalUser.nickName + "得了" + this.roomInfo.myScore + "分，你要不要也来试试？" : "我挑战" + r.rivalUser.nickName + "得了" + this.roomInfo.myScore + "分，你要不要也来试试？";
        }
        return "脑力比拼，点击来战，敢来和TA比拼一下吗？";
    },
    itsMe: function() {
        return this.friendCode == o.mainData.role.shareCode;
    }
};