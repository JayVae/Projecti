require("../../../net/settingNet");

var e = require("./../../../util/ChallengeRoomDataManager.js"), t = require("./../../../util/util.js"), o = require("./../../../const/consts.js"), n = require("./../../../net/challengeNet.js"), a = getApp();

Page({
    data: {
        start: 1,
        len: 100,
        max: 100,
        loading: !0,
        roomList: []
    },
    onLoad: function(e) {
        t.showShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        a.mainData.loginArgs.shareTicket ? wx.getShareInfo({
            shareTicket: a.mainData.loginArgs.shareTicket,
            success: function(o) {
                t.log("链接卡片信息解析成功：encryptedData：", o.encryptedData, "/iv", o.iv), e.joinRoom(null, o.encryptedData, o.iv);
            },
            fail: function(o) {
                t.log("链接卡片信息解析失败，app.mainData.role.challengeID = ", a.mainData.role.challengeID), 
                a.mainData.role.challengeID > 0 ? e.joinRoom(a.mainData.role.challengeID) : e.getRoomList();
            },
            complete: function() {
                a.mainData.loginArgs.shareTicket = null;
            }
        }) : a.mainData.role.challengeID > 0 ? this.joinRoom(a.mainData.role.challengeID) : this.getRoomList();
    },
    joinRoom: function(n, i, r) {
        var s = this;
        e.request_challengeJoin(n, i, r, function(e, l) {
            if (e) switch (e.errCode) {
              case 60113:
                s.askLeaveRoom(n, i, r, function(e) {
                    s.joinRoom(null, i, r);
                }, function(e) {
                    s.getRoomList();
                });
                break;

              case 60110:
              case 60190:
                t.ShowConfirm("提示", e.errMsg, function() {
                    a.mainData.role.challengeID = 0, s.getRoomList();
                });
                break;

              case o.ExitCode.SessionExpire:
                a.exitGame(e.errCode, e.errMsg);
            } else 0 == l.code ? wx.navigateTo({
                url: "/page/challenge/challenge_room/challenge_room"
            }) : (t.ShowToast("进入房间异常，请稍后重试。"), s.getRoomList());
        });
    },
    askLeaveRoom: function(e, o, i, r, s) {
        wx.showModal({
            title: "提示",
            content: "你已经在一场群比赛中，是否放弃此对战并加入新的对战？",
            showCancel: !0,
            confirmText: "加入",
            complete: function(e) {
                e.confirm ? n.challengeLeave(a.mainData.role.challengeID, function(e, o) {
                    e ? t.ShowConfirm("提示", "操作失败，请稍后重试", function() {
                        s && s();
                    }) : r && r();
                }) : e.cancel && s && s();
            }
        });
    },
    getRoomList: function() {
        var o = this, n = {};
        n.loading = !0, this.setData(n), e.request_getRoomListAsy(this.data.start, this.data.len, function(n, a) {
            if (n) t.ShowConfirm("提示", n.errMsg, function() {
                wx.navigateBack({
                    delta: 1
                });
            }); else {
                e.roomList.max && (o.data.max = e.roomList.max), e.roomList.list && e.roomList.list.length;
                var i = {};
                i.loading = !1, i.roomList = e.roomList.list, o.setData(i);
            }
        });
    },
    removeRoomById: function(t) {
        if (e.roomList.list && e.roomList.list.length > 0) for (var o = 0; o < e.roomList.list.length; o++) if (e.roomList.list[o].id == t) {
            e.roomList.list.splice(o, 1);
            break;
        }
    },
    onRoomlistItem_TapRank: function(o) {
        var n = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var a = o.currentTarget.dataset.id;
            e.request_challengeRank(a, !1, function(e, o) {
                e ? (t.ShowConfirm("提示", e.errMsg, function() {}), n.btnLock = !1) : wx.navigateTo({
                    url: "/page/challenge/challenge_rank/challenge_rank",
                    complete: function() {
                        setTimeout(function() {
                            n.btnLock = !1;
                        }, 500);
                    }
                });
            });
        }
    },
    onTapRoomItem: function(e) {
        var t = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var o = e.currentTarget.dataset.id;
            this.joinRoom(o), setTimeout(function() {
                t.btnLock = !1;
            }, 500);
        }
    },
    onRreviousPageRoomList: function(e) {
        this.data.start > 1 && (this.data.start -= this.data.len, this.onPageBtnState(), 
        this.getRoomList());
    },
    onNextPageRoomList: function(e) {
        this.data.max > this.data.start - 1 + this.data.len && (this.data.start += this.data.len, 
        this.onPageBtnState(), this.getRoomList());
    },
    onPageBtnState: function() {},
    onHide: function() {},
    onUnload: function() {
        this.btnLock = !1;
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        var i = a.mainData.role.shareCode;
        if (n && n.target && "createRoom" == n.target.id) {
            var r = e.getShareData(a.mainData.role.userInfo.nickName), s = {
                title: r.title,
                path: "/page/login/login?friendCode=" + i + "&challenge=" + !0,
                from: "challenge",
                imageUrl: r.imageUrl
            };
            return a.shareConf(s, !0, function(n) {
                var i = "", r = "";
                n.shareTickets && n.shareTickets[0] ? wx.getShareInfo({
                    shareTicket: n.shareTickets[0],
                    success: function(n) {
                        i = n.encryptedData, r = n.iv, e.request_challengeJoin(null, i, r, function(n, i) {
                            n ? n.errCode == o.ExitCode.SessionExpire ? a.exitGame(n.errCode, n.errMsg) : t.ShowConfirm("创建失败", n.errMsg, function() {}) : (t.log("创建成功 进房间", e.curRoom), 
                            wx.navigateTo({
                                url: "/page/challenge/challenge_room/challenge_room"
                            }));
                        });
                    },
                    fail: function(e) {
                        console.log("getShareInfo fail res:", e);
                    },
                    complete: function() {}
                }) : t.ShowConfirm("提示", "比赛需要分享到微信群", function() {});
            }, function() {});
        }
        var l = e.getShareData(a.mainData.role.userInfo.nickName), c = {
            title: l.title,
            path: "/page/login/login?friendCode=" + i + "&challenge=" + !0,
            from: "challenge",
            imageUrl: l.imageUrl
        };
        return a.shareConf(c, !0, function() {}, function() {});
    }
});