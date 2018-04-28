function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = require("./../net/connectNotify.js"), n = require("./../const/notifyConsts.js"), o = require("./../net/fightNet.js"), a = require("./../net/challengeNet.js"), r = (require("./../util/util.js"), 
require("./../util/liveExpiredController.js")), s = getApp(), u = function() {
    function u() {
        e(this, u);
    }
    return t(u, [ {
        key: "shareText",
        get: function() {
            return this._shareText || (this._shareText = [ "向你发起智商挑战，谁输谁请客", "向你发起智商挑战，谁输谁发红包", "向你发起智商挑战，谁输谁做俯卧撑", "向你发起智商挑战，谁输谁真心话大冒险" ]), 
            this._shareText;
        }
    }, {
        key: "shareGroupText",
        get: function() {
            return this._shareGroupText || (this._shareGroupText = [ "看看谁笑到最后！", "决战到天亮！", "我要打10个！" ]), 
            this._shareGroupText;
        }
    } ]), t(u, [ {
        key: "init",
        value: function(e) {
            s = e, this.register();
        }
    }, {
        key: "setEmptyData",
        value: function() {
            var e = {
                roomId: 0,
                userInfo: {},
                rivalUser: {},
                viewNum: 0,
                fee: 0
            };
            s.mainData.roomData = e;
        }
    }, {
        key: "getData",
        value: function() {
            return s.mainData.roomData || this.setEmptyData(), s.mainData.roomData;
        }
    }, {
        key: "setRoomId",
        value: function(e) {
            this.getData().roomId = e;
        }
    }, {
        key: "setType",
        value: function(e) {
            this.getData().type = e;
        }
    }, {
        key: "setData",
        value: function(e, t) {
            e = e || {};
            var i = null;
            if (t) s.mainData.roomData = e, i = s.mainData.roomData; else {
                i = this.getData();
                for (var n in e) i[n] = e[n];
            }
            return 2 == e.status && (i.rivalIsFight = !0, i.userIsFight = !0), i.rivalUser && i.rivalUser.uid == s.uid && "无名氏" == i.rivalUser.nickName ? i.rivalUser.nickName = "我" : i.userInfo && i.userInfo.uid == s.uid && "无名氏" == i.userInfo.nickName && (i.userInfo.nickName = "我"), 
            i;
        }
    }, {
        key: "playerLogout",
        value: function(e) {
            var t = e, i = this.getData();
            console.log("ChallengeRoomDataManager.playerLogout(" + e + ")", "/roomData.userInfo.uid:", i.userInfo.uid, "/roomData.rivalUser.uid:", i.rivalUser.uid, "isInLivePage:", s.isInLivePage()), 
            i.userInfo.uid == t ? (i.userInfo = {}, this.clearFightFlag(), s.isInLivePage() && (o.leaveRoom(i.roomId, function(e, t) {
                e && console.warn("leaveRoom err", e);
                s.gotoCover(function() {}, function() {}), r.show(i.userInfo.nickName);
            }), this.leaveRoom())) : i.rivalUser.uid == t ? (i.rivalUser = {}, this.clearFightFlag()) : (i.viewNum -= 1, 
            i.viewNum = Math.max(0, i.viewNum)), this.refreshStatue();
        }
    }, {
        key: "refreshStatue",
        value: function() {
            var e = this.getData();
            -1 != e.status && (e.userInfo.uid && e.rivalUser.uid ? e.rivalIsFight && e.userIsFight ? e.status : e.userIsFight || e.rivalIsFight ? e.status = 0 : e.status = 1 : e.status = 0);
        }
    }, {
        key: "invite",
        value: function(e) {
            var t = this.getData();
            switch (e.viewType) {
              case 1:
                t.userInfo = e.userInfo, this.clearFightFlag();
                break;

              case 2:
                t.rivalUser = e.userInfo, this.clearFightFlag();
                break;

              case 3:
                t.viewNum += 1;
            }
            this.refreshStatue();
        }
    }, {
        key: "inviteChange",
        value: function() {
            var e = this.getData();
            e.viewNum += 1, e.rivalUser = {}, this.setType("obChallenge"), this.refreshStatue();
        }
    }, {
        key: "obChange",
        value: function(e) {
            var t = this.getData();
            t.viewNum -= 1, t.rivalUser = e, this.setType("challenge"), this.refreshStatue();
        }
    }, {
        key: "fightAgain",
        value: function(e) {
            var t = this.getData();
            e == t.userInfo.uid && (t.userIsFight = !1), e == t.rivalUser.uid && (t.rivalIsFight = !1), 
            this.refreshStatue();
        }
    }, {
        key: "fightBegin",
        value: function() {
            var e = this.getData();
            e.userIsFight = !0, e.rivalIsFight = !0, this.refreshStatue();
        }
    }, {
        key: "clearFightFlag",
        value: function() {
            var e = this.getData();
            e.userIsFight = !1, e.rivalIsFight = !1;
        }
    }, {
        key: "getViewTypeBase",
        value: function(e) {
            var t = this.getData();
            return t.userInfo && t.userInfo.uid == e ? 1 : t.rivalUser && t.rivalUser.uid == e ? 2 : 3;
        }
    }, {
        key: "getViewType",
        value: function() {
            return this.getViewTypeBase(s.mainData.role.uid);
        }
    }, {
        key: "intoRoom",
        value: function(e) {
            e = e || {}, this.setData(e, !0);
            var t = this.getViewType();
            this.setType(3 == t ? "obChallenge" : "challenge");
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
        value: function(e, t) {
            console.log("ChallengeRoomDataManager.onActionFightInviteInto:", t.viewType);
            var i = this.getData();
            this.invite(t), 2 != t.viewType || s.isInLivePage() || 1 == this.getViewType() && wx.showModal({
                title: "报告",
                content: "挑战者" + t.userInfo.nickName + "已经应邀加入了对战",
                showCancel: !0,
                confirmText: "立刻开始",
                cancelText: "回到房间",
                complete: function(e) {
                    e.confirm ? s.gotoFight() : e.cancel && s.gotoLive(i.roomId, !1);
                }
            });
        }
    }, {
        key: "onActionFightInviteBegin",
        value: function() {
            this.fightBegin(), s.mainData.inLiving || s.gotoFight();
        }
    }, {
        key: "onActionFightInviteChange",
        value: function(e, t) {
            if (s.mainData.role.uid != t.userInfo.uid) {
                var i = t.dir;
                if (console.log("RoomDataManager.onActionFightInviteChange value:", t, "/dir = " + i), 
                t) switch (i) {
                  case 1:
                    this.inviteChange();
                    break;

                  case 2:
                    this.obChange(t.userInfo);
                }
            }
        }
    }, {
        key: "onFightInviteAgain",
        value: function(e, t) {
            this.fightAgain(t);
        }
    }, {
        key: "onPlayerLogout",
        value: function(e, t) {
            this.playerLogout(t);
        }
    }, {
        key: "onFightOut",
        value: function(e, t) {
            this.fightAgain(t);
        }
    }, {
        key: "leaveRoom",
        value: function() {
            this.curRoom = null;
        }
    }, {
        key: "setMemberList",
        value: function(e) {
            this.curRoom.members || (this.curRoom.members = []), this.curRoom.members = e;
        }
    }, {
        key: "addMember",
        value: function(e) {
            if (this.curRoom.members || (this.curRoom.members = []), e) {
                for (var t = !1, i = 0; i < this.curRoom.members.length; i++) if (this.curRoom.members[i].uid == e.uid) {
                    t = !0;
                    break;
                }
                t || this.curRoom.members.push(e);
            }
        }
    }, {
        key: "removeMember",
        value: function(e) {
            if (this.curRoom.members && this.curRoom.members.length > 0) for (var t = 0; t < this.curRoom.members.length; t++) if (this.curRoom.members[t].uid == e.uid) {
                this.curRoom.members.splice(t, 1);
                break;
            }
        }
    }, {
        key: "upDateMemberData",
        value: function(e) {
            for (var t = 0; t < this.curRoom.members.length; t++) this.curRoom.members[t].uid == e.uid && (this.curRoom.members[t] = e);
        }
    }, {
        key: "request_getRoomList",
        value: function(e, t, i) {
            var n = this;
            a.challengeList(e, t, function(e, t) {
                e ? i(e, void 0) : t && (n.roomList = t, i(void 0, t));
            });
        }
    }, {
        key: "request_getRoomListAsy",
        value: function(e, t, i) {
            var n = this;
            this.challengeLeaving ? this.timeInterval_getRoomListAsy || (this.timeInterval_getRoomListAsy = setInterval(function() {
                n.challengeLeaving || (clearInterval(n.timeInterval_getRoomListAsy), n.timeInterval_getRoomListAsy = void 0, 
                n.request_getRoomList(e, t, i));
            }, 200)) : this.request_getRoomList(e, t, i);
        }
    }, {
        key: "request_challengeJoin",
        value: function(e, t, i, n) {
            var o = this;
            a.challengeJoin(e, t, i, function(e, t) {
                e ? n(e, void 0) : t && (s.mainData.role.challengeID = 0, o.curRoom = t.challengeInfo, 
                n(void 0, t));
            });
        }
    }, {
        key: "request_challengeLeave",
        value: function(e, t) {
            var i = this;
            this.challengeLeaving = !0, a.challengeLeave(e, function(e, n) {
                i.challengeLeaving = !1, e ? t(e, void 0) : n && (s.mainData.role.challengeID = 0, 
                i.curRoom = null, t(void 0, n));
            });
        }
    }, {
        key: "request_challenge",
        value: function(e, t) {
            var i = this;
            a.challenge(e, function(e, n) {
                if (e) t(e, void 0); else if (n) {
                    var o = i.curRoom.members;
                    i.curRoom = n.challengeInfo, i.curRoom.members = o, t(void 0, n);
                }
            });
        }
    }, {
        key: "request_flushChallenge",
        value: function(e, t) {
            var i = this;
            a.flushChallenge(e, function(e, n) {
                e ? t(e, void 0) : n && (i.curRoom = n, t(void 0, n));
            });
        }
    }, {
        key: "request_challengeRank",
        value: function(e, t, i) {
            var n = this;
            this.curRoomIdFromRank = e, a.challengeRank(e, t, function(e, t) {
                e ? i(e, void 0) : t && (n.curRoomRankList = t, i(void 0, t));
            });
        }
    }, {
        key: "request_beginFight",
        value: function(e, t) {
            var i = this;
            o.beginFight(e, function(e, n) {
                e ? t(e, void 0) : n && (i.setData(n, !0), t(void 0, n));
            });
        }
    }, {
        key: "iAmWinner",
        value: function() {
            return this.curRoom.curWinner == s.uid && s.uid > 0;
        }
    }, {
        key: "iAmChallenger",
        value: function() {
            return this.curRoom.curChallenger == s.uid && s.uid > 0;
        }
    }, {
        key: "iAmAudience",
        value: function() {
            return !this.iAmWinner() && !this.iAmChallenger();
        }
    }, {
        key: "getWinnerInfo",
        value: function() {
            return this.getMemberInfo(this.curRoom.curWinner);
        }
    }, {
        key: "getChallengerInfo",
        value: function() {
            return this.getMemberInfo(this.curRoom.curChallenger);
        }
    }, {
        key: "getMyInfo",
        value: function() {
            return this.getMemberInfo(s.uid);
        }
    }, {
        key: "getMemberInfo",
        value: function(e) {
            if (this.curRoom && this.curRoom.members) for (var t = 0; t < this.curRoom.members.length; t++) {
                var i = this.curRoom.members[t];
                if (i.uid == e) return i;
            }
            return {};
        }
    }, {
        key: "getChallengeResultWaitDur",
        value: function() {
            return s && s.mainData.role.allSeeds && s.mainData.role.allSeeds.challengeConf ? s.mainData.role.allSeeds.challengeConf.challengeResultWaitDur : 0;
        }
    }, {
        key: "getrChallengeWaitDur",
        value: function() {
            return s && s.mainData.role.allSeeds && s.mainData.role.allSeeds.challengeConf ? s.mainData.role.allSeeds.challengeConf.challengeWaitDur : 0;
        }
    }, {
        key: "isChallengeStatusReady",
        value: function() {
            return 2 == this.curRoom.status;
        }
    }, {
        key: "isChallengeStatusChallenge",
        value: function() {
            return 3 == this.curRoom.status;
        }
    }, {
        key: "isChallengeStatusRunning",
        value: function() {
            return this.curRoom.status >= 4;
        }
    }, {
        key: "getShareText",
        value: function(e) {
            var t = Math.floor(Math.random() * this.shareText.length);
            return e + this.shareText[t];
        }
    }, {
        key: "getShareGroupText",
        value: function(e, t) {
            var i = Math.floor(Math.random() * this.shareGroupText.length);
            return e + "创建了" + t + "房间，" + this.shareGroupText[i];
        }
    }, {
        key: "getShareData",
        value: function(e) {
            return [ {
                title: "群比赛开始啦，用知识力压群雄吧！",
                imageUrl: "https://question-resource-zh.hortor.net/image/new_skin/AD/img_ad_challenge_4.png"
            }, {
                title: "【" + e + "@你】快来知识挑战，看看谁是群里的第一！",
                imageUrl: "https://question-resource-zh.hortor.net/image/new_skin/AD/img_ad_challenge_3.png"
            } ][Math.floor(2 * Math.random())];
        }
    }, {
        key: "roomList",
        get: function() {
            return this._roomList || (this._roomList = {}), this._roomList;
        },
        set: function(e) {
            this._roomList = e;
        }
    }, {
        key: "curRoomRankList",
        get: function() {
            return this._curRoomRankList || [];
        },
        set: function(e) {
            this._curRoomRankList = e;
        }
    }, {
        key: "curRoom",
        get: function() {
            return this._curRoom || (this._curRoom = {}), this._curRoom;
        },
        set: function(e) {
            this._curRoom = e;
        }
    } ]), u;
}();

module.exports = new u();