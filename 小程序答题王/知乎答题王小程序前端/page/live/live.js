var t = require("./../../net/fightNet.js"), e = require("./../../net/wsconnect.js"), i = require("./../../net/connectNotify.js"), o = require("./../../const/notifyConsts.js"), n = require("./../../util/RoomDataManager.js"), a = require("./../../util/util.js"), r = (require("./../../const/consts.js"), 
require("./../../util/EmojiSelectController.js")), s = require("./../../util/EmojiController.js"), c = (require("./../../util/LoginManager.js"), 
require("./../../util/Tween.js")), l = {
    emojiSelectController: null,
    data: {
        rightButtonStatus: 0,
        showRewardPicker: !1,
        propInfo: {
            name: "点击选择奖品",
            num: 0,
            img: null,
            callback_clicked: "btn_reward_clicked"
        },
        rewards: [ {
            pid: 1,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 2,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 3,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 4,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 5,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 6,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 7,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 8,
            name: "金币",
            num: 20,
            img: null
        }, {
            pid: 9,
            name: "金币",
            num: 20,
            img: null
        } ],
        roomInfo: {},
        viewType: 1,
        btnType: 1,
        btnLabel: "",
        message: "",
        userInfo: {},
        rivalUser: {},
        rewardTipVisible: !1,
        wsconnectBreaking: !1,
        aniFlower: null,
        aniAvartar: null,
        aniBtn1: null,
        aniBtn2: null,
        aniBtn3: null
    },
    btn_rewardPicker_clicked: function(t) {
        this.setData({
            showRewardPicker: !this.data.showRewardPicker
        }), console.log("showRewardPicker = " + this.data.showRewardPicker);
    },
    btn_reward_clicked: function(t) {
        this.data.roomInfo.userInfo.nickName && this.data.roomInfo.userInfo.uid == h.mainData.role.uid && this.setData({
            showRewardPicker: !this.data.showRewardPicker
        });
    },
    reward_list_item_clicked: function(t) {
        var e = t.currentTarget.dataset.rewardId, i = !0, o = !1, n = void 0;
        try {
            for (var a, r = this.data.rewards[Symbol.iterator](); !(i = (a = r.next()).done); i = !0) {
                var s = a.value;
                if (s.pid == e) {
                    this.setData({
                        propInfo: s
                    });
                    break;
                }
            }
        } catch (t) {
            o = !0, n = t;
        } finally {
            try {
                !i && r.return && r.return();
            } finally {
                if (o) throw n;
            }
        }
        this.setData({
            showRewardPicker: !this.data.showRewardPicker
        }), console.log("showRewardPicker = " + this.data.showRewardPicker);
    },
    do_leaveRoom: function() {
        n.leaveRoom(), h.mainData.enterRoomId = 0, t.leaveRoom(this.data.roomInfo.roomId, function(t, e) {
            t && console.warn("leaveRoom err", t);
        });
    },
    btn_leaveRoom_clicked: function(t) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否放弃对战并离开房间？",
            showCancel: !0,
            confirmText: "确定",
            success: function(t) {
                t.confirm && (e.do_leaveRoom(), wx.navigateBack());
            }
        });
    },
    btn_player_become_third: function(e) {
        var i = this;
        this.btnLock = !0, t.changeRole(this.data.roomInfo.roomId, function(t, e) {
            t ? (console.warn("changeRole err", t), i.btnLock = !1) : (i.btnLock = !1, n.inviteChange(), 
            i.refreshRoom());
        });
    },
    btn_third_become_master: function(t) {},
    btn_third_become_rival: function(e) {
        var i = this;
        3 == this.data.viewType && (this.btnLock = !0, t.changeRole(this.data.roomInfo.roomId, function(t, e) {
            i.btnLock = !1, t ? console.warn("changeRole err", t) : (n.obChange({
                nickName: h.mainData.role.userInfo.nickName,
                avatarUrl: h.mainData.role.userInfo.avatarUrl,
                uid: h.mainData.role.uid,
                level: h.mainData.role.level
            }), i.refreshRoom());
        }));
    },
    btn_start_clicked: function(e) {
        var i = this;
        if (!this.btnLock) switch (this.data.btnType) {
          case 1:
            1 != this.data.roomInfo.status ? a.ShowToast("等待选手上场") : 1 == this.data.roomInfo.status ? (this.btnLock = !0, 
            this.do_beginToFight()) : a.ShowToast("对手正在准备中");
            break;

          case 2:
            break;

          case -1:
            console.log("开新房间"), this.btnLock = !0;
            var o = this.data.roomInfo.roomId;
            t.leaveRoom(o, function(t, e) {
                i.btnLock = !1, t ? console.warn("leaveRoom err", t) : i.initRoom(-1);
            });
        }
    },
    do_beginToFight: function() {
        var e = this, i = n.getData();
        1 != this.getViewType(i.userInfo, i.rivalUser) ? (n.fightBegin(), wx.navigateTo({
            url: "../../page/fight/fight?from=live",
            complete: function() {
                setTimeout(function() {
                    e.btnLock = !1;
                });
            }
        })) : t.beginFight(this.data.roomInfo.roomId, function(t, i) {
            t ? a.ShowConfirm("提示", t.errMsg, function() {}) : (n.fightBegin(), e.btnLock = !0, 
            wx.navigateTo({
                url: "../../page/fight/fight?from=live",
                complete: function() {
                    setTimeout(function() {
                        e.btnLock = !1;
                    });
                }
            }), e.refreshRoom());
        });
    },
    getViewTypeBase: function(t, e, i) {
        return t && t.nickName && t.uid == i ? 1 : e && e.nickName && e.uid == i ? 2 : 3;
    },
    getViewType: function(t, e) {
        return this.getViewTypeBase(t, e, h.mainData.role.uid);
    },
    onLoad: function(t) {
        a.showShareMenu(), h.mainData.inLiving = !0, this.userEmojiController = new s(this, "userEmoji", !0, !0), 
        this.rivalEmojiController = new s(this, "rivalEmoji", !1, !1), this.emojiSelectController = new r(this, this.userEmojiController), 
        this.emojiSelectController.setVisible(!1), this.register();
    },
    register: function() {
        i.register(o.ActionFightInviteInto, this.onActionFightInviteInto, this), i.register(o.ActionFightInviteBegin, this.onActionFightInviteBegin, this), 
        i.register(o.ActionFightInviteChange, this.onActionFightInviteChange, this), i.register(o.ActionFightInviteAgain, this.onFightInviteAgain, this), 
        i.register(o.ActionPlayerLogout, this.onPlayerLogout, this), i.register(o.ActionFightOut, this.onFightOut, this), 
        i.register(o.ActionFightSendEmot, this.onActionFightSendEmot, this), i.register(o.socketClose, this.onSocketClose, this), 
        i.register(o.socketOpen, this.onSocketOpen, this);
    },
    onSocketClose: function(t, e) {
        console.log("推送 长连接中断瞬间"), this.setData({
            wsconnectBreaking: !0
        });
    },
    onSocketOpen: function(t, e) {
        console.log("推送 长连接开启瞬间"), this.setData({
            wsconnectBreaking: !1
        });
    },
    onActionFightSendEmot: function(t, e) {
        if (e) if (h.uid == e.uid) {
            var i = this.data.viewType;
            1 == i ? this.userEmojiController.showFace(e.emotID) : 2 == i && this.rivalEmojiController.showFace(e.emotID);
        } else this.data.userInfo.uid == e.uid ? this.userEmojiController.showFace(e.emotID) : this.data.rivalUser.uid == e.uid && this.rivalEmojiController.showFace(e.emotID);
    },
    initRoom: function(e) {
        var i = this;
        console.log("enterRoomId", e), t.intoRoom(e, function(t, e) {
            t ? (console.warn("intoRoom err", t.errMsg), 70024 == t.errMsg ? h.exitGame(t.errCode, t.errMsg) : i.showErr(t)) : e ? (n.intoRoom(e), 
            h.mainData.enterRoomId = e.roomId, i.refreshRoom(), n.needFightNow && (i.do_beginToFight(), 
            n.needFightNow = !1)) : i.showErr();
        });
    },
    showErr: function(t) {
        var e = this;
        wx.showModal({
            title: t.errCode,
            content: t.errMsg,
            showCancel: !1,
            confirmText: "确定",
            success: function() {
                e.do_leaveRoom(), wx.navigateBack();
            }
        });
    },
    refreshRoom: function() {
        var t = n.getData();
        this.emojiSelectController.setRoomId(t.roomId);
        var i = this.getViewType(t.userInfo, t.rivalUser), o = 0;
        2 == i ? o = 1 : 3 != i || t.rivalUser.nickName || (o = 2), console.log("进入房间时我的身份:" + i);
        var a = this.getBtnType(t, i), r = this.getBtnLabel(a), s = {};
        s.nickName = t.userInfo.nickName || "", s.avatarUrl = t.userInfo.avatarUrl, s.uid = t.userInfo.uid, 
        s.headId = t.userInfo.headId;
        var c = {};
        c.nickName = t.rivalUser.nickName || "", c.avatarUrl = t.rivalUser.avatarUrl, c.uid = t.rivalUser.uid, 
        c.headId = t.rivalUser.headId;
        var l = wx.createAnimation();
        this.setData({
            type: "live",
            roomInfo: t,
            userInfo: s,
            rivalUser: c,
            viewType: i,
            message: this.getLabel(t),
            btnType: a,
            btnLabel: r,
            rightButtonStatus: o,
            wsconnectBreaking: !e.socketOpen,
            aniRightUser: l.export()
        });
    },
    fightAgain: function() {
        n.getData(), h.mainData.fightAgain;
        console.log("fightAgain", h.uid), n.fightAgain(h.uid), this.refreshRoom();
    },
    getBtnType: function(t, e) {
        if (-1 == t.status || 2 == t.status) return -1;
        switch (e) {
          case 1:
            return 1 == t.status ? 1 : 0;

          case 2:
            return 2;

          case 3:
            return -1;
        }
        return -1;
    },
    getBtnLabel: function(t) {
        switch (t) {
          case -1:
            return "新开一场";

          case 0:
            return "";

          case 1:
            return "开始对战";

          case 2:
            return "选择围观";
        }
    },
    getLabel: function(t) {
        switch (t.status) {
          case 0:
            return "等待对手加入...";

          case 1:
            return 2 == this.getViewType(t.userInfo, t.rivalUser) ? "等待发起者开始" : "";

          case 2:
            return "答题进行中";

          case 3:
            return "";

          case -1:
            return "该房间已过期";
        }
    },
    onPlayerLogout: function(t, e) {
        var i = n.getData(), o = this.getViewTypeBase(i.userInfo, i.rivalUser, e);
        switch (console.log("玩家掉线了 onPlayerLogout" + e), o) {
          case 1:
            return;

          case 2:
            a.ShowToast("挑战者离开了");
        }
        this.refreshRoom();
    },
    onActionFightInviteChange: function(t, e) {
        if (h.mainData.role.uid != e.userInfo.uid) {
            var i = e.dir;
            console.log("live.onActionFightInviteChange value:", e, "/dir = " + i), 1 == i ? a.ShowToast("挑战者" + e.userInfo.nickName + "突然认怂了") : 2 == e.dir && a.ShowToast("围观者" + e.userInfo.nickName + "上场参赛了"), 
            this.refreshRoom();
        }
    },
    onActionFightInviteBegin: function(t, e) {
        wx.navigateTo({
            url: "../../page/fight/fight?from=live"
        });
    },
    onActionFightInviteInto: function(t, e) {
        switch (console.log("live.onActionFightInviteInto:", e.viewType), e.viewType) {
          case 1:
            a.ShowToast("发起者 " + e.userInfo.nickName + " 进来了"), console.log("发起者 " + e.userInfo.nickName + " 进来了");
            break;

          case 2:
            a.ShowToast("挑战者 " + e.userInfo.nickName + " 进来了"), console.log("挑战者 " + e.userInfo.nickName + " 进来了");
            break;

          case 3:
            a.ShowToast("围观者 " + e.userInfo.nickName + " 进来了"), console.log("围观者 " + e.userInfo.nickName + " 进来了");
        }
        this.refreshRoom();
    },
    onFightInviteAgain: function(t, e) {
        this.refreshRoom();
    },
    onFightOut: function(t, e) {
        console.log("onFightOut", e), this.refreshRoom();
    },
    onReady: function() {},
    onShow: function() {
        var t = this, e = n.getData();
        if (h.mainData.enterRoomId != e.roomId || 0 == h.mainData.enterRoomId) {
            var i = 0 == h.mainData.enterRoomId ? -1 : h.mainData.enterRoomId;
            this.initRoom(i);
        } else h.mainData.fightAgain ? this.fightAgain() : (this.refreshRoom(), n.needFightNow && (this.do_beginToFight(), 
        n.needFightNow = !1));
        h.mainData.fightAgain = !1, this.setData({
            rewardTipVisible: !h.hasLiveReward()
        });
        var o = c.fastGet("live");
        o.wait(800), o.call(function() {
            var e = wx.createAnimation({
                duration: 400
            });
            e.scale(1).opacity(1).step(), t.setData({
                aniFlower: e.export()
            });
        }), o.wait(500), o.call(function() {
            var e = wx.createAnimation({
                duration: 400
            }).width("100%").step().export();
            t.setData({
                aniAvartar: e
            });
        }), o.wait(500), o.call(function() {
            var e = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-in"
            });
            e.bottom("-140rpx").opacity(1).step(), t.setData({
                aniMainFlag: e.export()
            });
        }), o.wait(250), o.call(function() {
            var e = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            e.scale(1).opacity(1).step(), t.setData({
                aniBtn1: e.export()
            });
        }), o.wait(250), o.call(function() {
            var e = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            e.scale(1).opacity(1).step(), t.setData({
                aniBtn2: e.export()
            });
        }), o.wait(250), o.call(function() {
            var e = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            e.scale(1).opacity(1).step(), t.setData({
                aniBtn3: e.export()
            });
        }), o.wait(250), o.call(function() {
            var e = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            e.scale(1).opacity(1).step(), t.setData({
                aniAudience: e.export()
            });
        }), o.wait(250), o.call(function() {
            var e = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            e.opacity(1).step(), t.setData({
                aniMsg: e.export()
            });
        }), o.wait(250), o.call(function() {
            var e = n.getData();
            switch (t.getViewType(e.userInfo, e.rivalUser)) {
              case 1:
              case 2:
                t.emojiSelectController.setVisible(!0);
                break;

              case 3:
                t.emojiSelectController.setVisible(!1);
            }
        });
    },
    onHide: function() {
        this.setEnterRoomId();
    },
    onUnload: function() {
        c.removeTweens("live"), h.mainData.inLiving = !1, i.remove(o.ActionFightInviteInto, this.onActionFightInviteInto), 
        i.remove(o.ActionFightInviteBegin, this.onActionFightInviteBegin), i.remove(o.ActionFightInviteChange, this.onActionFightInviteChange), 
        i.remove(o.ActionFightInviteAgain, this.onFightInviteAgain), i.remove(o.ActionPlayerLogout, this.onPlayerLogout), 
        i.remove(o.ActionFightOut, this.onFightOut), i.remove(o.socketClose, this.onSocketClose), 
        i.remove(o.socketOpen, this.onSocketOpen), i.remove(o.ActionFightSendEmot, this.onActionFightSendEmot);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = this, i = n.getViewType(), o = n.getData(), a = 1 == i ? h.mainData.role.shareCode : n.masterShareCode, r = h.getPvPShareText(), s = {
            title: 1 == this.data.viewType ? r.text : o.userInfo.nickName + " 智商大赛已经开始，快来围观",
            path: "/page/login/login?friendCode=" + a + "&liveFight=" + !0,
            from: "pvp_" + r.index,
            imageUrl: r.imageUrl
        };
        return h.shareConf(s, !0, function() {
            e.setEnterRoomId();
        }, function() {
            e.setEnterRoomId();
        });
    },
    setEnterRoomId: function() {
        var t = n.getData();
        h.mainData.enterRoomId = t.roomId;
    },
    onTapAvatarEmoji: function() {
        this.emojiSelectController.setVisible(!0);
    },
    onTapWifiBtn: function() {
        var t = this;
        this.wifiBtnLock || (this.wifiBtnLock = !0, setTimeout(function() {
            t.wifiBtnLock = !1;
        }, 5e3));
    }
}, h = getApp();

Page(l);