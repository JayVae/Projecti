function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = require("./../net/connectNotify.js"), n = require("./../const/notifyConsts.js"), a = require("./../net/fightNet.js"), o = (require("./../util/util.js"), 
require("./../util/liveExpiredController.js")), r = void 0, s = function() {
    function s() {
        t(this, s);
    }
    return e(s, [ {
        key: "init",
        value: function(t) {
            r = t, this.register();
        }
    }, {
        key: "setEmptyData",
        value: function() {
            var t = {
                roomId: 0,
                userInfo: {},
                rivalUser: {},
                viewNum: 0,
                fee: 0
            };
            r.mainData.roomData = t, r.mainData.role.dropRoomID = 0;
        }
    }, {
        key: "getData",
        value: function() {
            return r.mainData.roomData || this.setEmptyData(), r.mainData.roomData;
        }
    }, {
        key: "setRoomId",
        value: function(t) {
            this.getData().roomId = t;
        }
    }, {
        key: "setType",
        value: function(t) {
            this.getData().type = t;
        }
    }, {
        key: "setData",
        value: function(t, e) {
            t = t || {};
            var i = null;
            if (e) r.mainData.roomData = t, i = r.mainData.roomData; else {
                i = this.getData();
                for (var n in t) i[n] = t[n];
            }
            return 2 == t.status && (i.rivalIsFight = !0, i.userIsFight = !0), i.rivalUser && i.rivalUser.uid == r.uid && "无名氏" == i.rivalUser.nickName ? i.rivalUser.nickName = "我" : i.userInfo && i.userInfo.uid == r.uid && "无名氏" == i.userInfo.nickName && (i.userInfo.nickName = "我"), 
            i;
        }
    }, {
        key: "playerLogout",
        value: function(t) {
            var e = t, i = this.getData();
            console.log("RoomDataManager.playerLogout(" + t + ")", "/roomData.userInfo.uid:", i.userInfo.uid, "/roomData.rivalUser.uid:", i.rivalUser.uid, "isInLivePage:", r.isInLivePage()), 
            i.userInfo.uid == e ? (i.userInfo = {}, this.clearFightFlag(), r.isInLivePage() && (a.leaveRoom(i.roomId, function(t, e) {
                t && console.warn("leaveRoom err", t), r.mainData.enterRoomId = 0;
                r.gotoCover(function() {}, function() {}), o.show(i.userInfo.nickName);
            }), this.leaveRoom())) : i.rivalUser.uid == e ? (i.rivalUser = {}, this.clearFightFlag()) : (i.viewNum -= 1, 
            i.viewNum = Math.max(0, i.viewNum)), this.refreshStatue();
        }
    }, {
        key: "refreshStatue",
        value: function() {
            var t = this.getData();
            -1 != t.status && (t.userInfo.uid && t.rivalUser.uid ? t.rivalIsFight && t.userIsFight ? t.status : t.userIsFight || t.rivalIsFight ? t.status = 0 : t.status = 1 : t.status = 0);
        }
    }, {
        key: "invite",
        value: function(t) {
            var e = this.getData();
            switch (t.viewType) {
              case 1:
                e.userInfo = t.userInfo, this.clearFightFlag();
                break;

              case 2:
                e.rivalUser = t.userInfo, this.clearFightFlag();
                break;

              case 3:
                e.viewNum += 1;
            }
            this.refreshStatue();
        }
    }, {
        key: "inviteChange",
        value: function() {
            var t = this.getData();
            t.viewNum += 1, t.rivalUser = {}, this.setType("ob"), this.refreshStatue();
        }
    }, {
        key: "obChange",
        value: function(t) {
            var e = this.getData();
            e.viewNum -= 1, e.rivalUser = t, this.setType("live"), this.refreshStatue();
        }
    }, {
        key: "fightAgain",
        value: function(t) {
            var e = this.getData();
            t == e.userInfo.uid && (e.userIsFight = !1), t == e.rivalUser.uid && (e.rivalIsFight = !1), 
            this.refreshStatue();
        }
    }, {
        key: "fightBegin",
        value: function() {
            var t = this.getData();
            t.userIsFight = !0, t.rivalIsFight = !0, this.refreshStatue();
        }
    }, {
        key: "clearFightFlag",
        value: function() {
            var t = this.getData();
            t.userIsFight = !1, t.rivalIsFight = !1;
        }
    }, {
        key: "getViewTypeBase",
        value: function(t) {
            var e = this.getData();
            return e.userInfo && e.userInfo.uid == t ? 1 : e.rivalUser && e.rivalUser.uid == t ? 2 : 3;
        }
    }, {
        key: "getViewType",
        value: function() {
            return this.getViewTypeBase(r.mainData.role.uid);
        }
    }, {
        key: "intoRoom",
        value: function(t) {
            t = t || {}, this.setData(t, !0);
            var e = this.getViewType();
            this.setType(3 == e ? "ob" : "live"), r.mainData.role.dropRoomID = t.roomId;
        }
    }, {
        key: "removeRegister",
        value: function() {
            i.remove(n.ActionFightInviteInto, this.onActionFightInviteInto, this), i.remove(n.ActionFightInviteBegin, this.onActionFightInviteBegin, this), 
            i.remove(n.ActionFightInviteChange, this.onActionFightInviteChange, this), i.remove(n.ActionFightInviteAgain, this.onFightInviteAgain, this), 
            i.remove(n.ActionPlayerLogout, this.onPlayerLogout, this), i.remove(n.ActionFightOut, this.onFightOut, this);
        }
    }, {
        key: "register",
        value: function() {
            i.register(n.ActionFightInviteInto, this.onActionFightInviteInto, this), i.register(n.ActionFightInviteBegin, this.onActionFightInviteBegin, this), 
            i.register(n.ActionFightInviteChange, this.onActionFightInviteChange, this), i.register(n.ActionFightInviteAgain, this.onFightInviteAgain, this), 
            i.register(n.ActionPlayerLogout, this.onPlayerLogout, this), i.register(n.ActionFightOut, this.onFightOut, this);
        }
    }, {
        key: "leaveRoom",
        value: function() {
            this.setEmptyData();
        }
    }, {
        key: "onActionFightInviteInto",
        value: function(t, e) {
            console.log("RoomDataManager.onActionFightInviteInto:", e.viewType);
            var i = this.getData();
            this.invite(e), 2 != e.viewType || r.isInLivePage() || 1 == this.getViewType() && wx.showModal({
                title: "报告",
                content: "挑战者" + e.userInfo.nickName + "已经应邀加入了对战",
                showCancel: !0,
                confirmText: "立刻开始",
                cancelText: "回到房间",
                complete: function(t) {
                    t.confirm ? r.gotoFight() : t.cancel && r.gotoLive(i.roomId, !1);
                }
            });
        }
    }, {
        key: "onActionFightInviteBegin",
        value: function() {
            this.fightBegin(), r.mainData.inLiving || r.gotoFight();
        }
    }, {
        key: "onActionFightInviteChange",
        value: function(t, e) {
            if (r.mainData.role.uid != e.userInfo.uid) {
                var i = e.dir;
                if (console.log("RoomDataManager.onActionFightInviteChange value:", e, "/dir = " + i), 
                e) switch (i) {
                  case 1:
                    this.inviteChange();
                    break;

                  case 2:
                    this.obChange(e.userInfo);
                }
            }
        }
    }, {
        key: "onFightInviteAgain",
        value: function(t, e) {
            this.fightAgain(e);
        }
    }, {
        key: "onPlayerLogout",
        value: function(t, e) {
            this.playerLogout(e);
        }
    }, {
        key: "onFightOut",
        value: function(t, e) {
            this.fightAgain(e);
        }
    } ]), s;
}();

module.exports = new s();