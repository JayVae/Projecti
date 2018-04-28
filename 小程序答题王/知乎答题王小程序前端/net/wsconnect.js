function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = require("./../net/connectNotify.js"), i = require("./../const/notifyConsts.js"), o = (require("./../const/consts.js"), 
require("./../const/modeConsts.js")), a = (require("../libs/asyncLocker"), require("../util/util")), s = require("../libs/cavenet/tcp").Tcp, c = void 0, r = function() {
    function r() {
        e(this, r), this._tcp = null, this._debug = o.RunMode != o.RunModeType.Prod, this._heartbeatTimer = null, 
        this._lastHeartbeat = 0, this._isStopHeartBeat = !0, this.socketOpen = !1;
    }
    return t(r, [ {
        key: "init",
        value: function(e) {
            c = e, this.wsUrl = o.NetURL[o.RunMode].wsURL, this.register();
        }
    }, {
        key: "updateURL",
        value: function(e) {
            e.ws && (o.NetURL[o.RunMode].wsURL = e.ws, this.wsUrl = e.ws);
        }
    }, {
        key: "connectServer",
        value: function() {
            var e = this;
            this._tcp || (this._tcp = new s(), this._tcp.onMessage = this.onSocketMessage.bind(this), 
            this._tcp.onClose = this.onSocketClose.bind(this), this._tcp.onBreak = this.onBreak.bind(this), 
            this._tcp.onReopen = this.onSocketOpen.bind(this), this._tcp.connect(this.wsUrl, "wsconnect").then(function() {
                e.socketOpenHandler(0);
            }).catch(function(t) {
                e._debug && console.log(t);
            }));
        }
    }, {
        key: "reconnectServer",
        value: function() {
            this._tcp ? this._tcp.reconnect() : this.connectServer();
        }
    }, {
        key: "closeSocket",
        value: function() {
            this._debug && console.log("=== wsconnect closing"), this._tcp && this._tcp.close(), 
            this._tcp = void 0;
        }
    }, {
        key: "send",
        value: function(e, t) {
            this.socketOpen ? this._tcp && this._tcp.send(e) : t("socket cloesed", null);
        }
    }, {
        key: "socketOpenHandler",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            o.RunMode != o.RunModeType.Prod && o.RunMode != o.RunModeType.Test && a.ShowToast("长连接已经连上"), 
            this.socketOpen = !0, this.startHeartbeat(), this.send(JSON.stringify({
                action: 99,
                token: c.token,
                from_uid: c.uid,
                reconn: e
            }), function(e) {}), n.receive(i.socketOpen, "");
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.socketOpenHandler(1);
        }
    }, {
        key: "onSocketMessage",
        value: function(e) {
            var t = JSON.parse(e.data), n = this.handlers[t.action];
            a.invokeCallback(n, t.action, t.values);
        }
    }, {
        key: "onSocketClose",
        value: function(e) {
            this.socketOpen = !1, n.receive(i.socketClose, ""), o.RunMode != o.RunModeType.Prod && o.RunMode != o.RunModeType.Test && a.ShowToast("", "长连接关闭了", function() {});
        }
    }, {
        key: "onBreak",
        value: function() {
            this.socketOpen = !1, n.receive(i.socketClose, ""), o.RunMode != o.RunModeType.Prod && o.RunMode != o.RunModeType.Test && a.ShowToast("", "长连接断开了", function() {});
        }
    }, {
        key: "startHeartbeat",
        value: function() {
            clearTimeout(this._heartbeatTimer), this._lastHeartbeat = Date.now();
            var e = this;
            this._heartbeatTimer = setTimeout(function t() {
                if (Date.now() - e._lastHeartbeat > 4e3) return clearTimeout(e._heartbeatTimer), 
                e._debug && console.log("todo restart......"), o.RunMode != o.RunModeType.Prod && o.RunMode != o.RunModeType.Test && a.ShowToast("", "心跳超时", function() {}), 
                void (e._tcp && e._tcp.reconnect());
                e._heartbeatTimer = setTimeout(t, 2e3), e.send(JSON.stringify({
                    action: 1,
                    token: c.token,
                    from_uid: c.uid
                }), function(e) {});
            }, 2e3);
        }
    }, {
        key: "on",
        value: function(e, t) {
            this.handlers = this.handlers || {}, this.handlers[e] = t;
        }
    }, {
        key: "register",
        value: function() {
            this.on(i.hearbeat, this.onHearBeat.bind(this)), this.on(i.ActionGameConf, this.onGameConf.bind(this)), 
            this.on(i.ActionGameBoard, this.onGameBoard.bind(this)), this.on(i.ActionFightNotify, this.onFightNotify.bind(this)), 
            this.on(i.ActionFightAnswer, this.onFightAnswer.bind(this)), this.on(i.ActionPlayerLogout, this.onPlayerLogout.bind(this)), 
            this.on(i.ActionPlayerEdgeOut, this.onPlayerEdgeOut.bind(this)), this.on(i.ActionFightOut, this.onFightOut.bind(this)), 
            this.on(i.ActionFightInviteInto, this.onFightInviteInto.bind(this)), this.on(i.ActionFightInviteBegin, this.onFightInviteBegin.bind(this)), 
            this.on(i.ActionFightInviteAgain, this.onFightInviteAgain.bind(this)), this.on(i.ActionFightInviteChange, this.onFightInviteChange.bind(this)), 
            this.on(i.ActionFightSendEmot, this.onActionFightSendEmot.bind(this)), this.on(i.ActionDonatePay, this.onActionDonatePay.bind(this)), 
            this.on(i.ActionBCReward, this.onActionBCReward.bind(this)), this.on(i.ActionIsBanned, this.onActionIsBanned.bind(this)), 
            this.on(i.ActionNewMail, this.onActionNewMail.bind(this)), this.on(i.ActionPlayerNameIllegal, this.onActionPlayerNameIllegal.bind(this)), 
            this.on(i.ActionChallengeInfoBase, this.onActionChallengeInfoBase.bind(this)), this.on(i.ActionChallengeInfoMembers, this.onActionChallengeInfoMembers.bind(this));
        }
    }, {
        key: "onActionChallengeInfoMembers",
        value: function(e, t) {
            n.receive(i.ActionChallengeInfoMembers, JSON.parse(t[0]));
        }
    }, {
        key: "onActionChallengeInfoBase",
        value: function(e, t) {
            n.receive(i.ActionChallengeInfoBase, JSON.parse(t[0]));
        }
    }, {
        key: "onHearBeat",
        value: function(e, t) {
            this._lastHeartbeat = Date.now();
        }
    }, {
        key: "onGameConf",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                o && (c.mainData.serverConfs = t, c.mainData.role.gameConf = o, 1 == o.runMode ? c.exitGame(e) : 0 == o.runMode && n.receive(i.ActionGameConf, t));
            } catch (e) {}
        }
    }, {
        key: "onActionIsBanned",
        value: function(e, t) {
            c.exitGame(e, t[0]);
        }
    }, {
        key: "onGameBoard",
        value: function(e, t) {
            n.receive(i.ActionGameBoard, t);
        }
    }, {
        key: "onPlayerEdgeOut",
        value: function(e, t) {
            c.exitGame(e);
        }
    }, {
        key: "onFightNotify",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                n.receive(i.ActionFightNotify, o);
            } catch (e) {}
        }
    }, {
        key: "onFightAnswer",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                n.receive(i.ActionFightAnswer, o);
            } catch (e) {}
        }
    }, {
        key: "onPlayerLogout",
        value: function(e, t) {
            try {
                n.receive(i.ActionPlayerLogout, t[0]);
            } catch (e) {}
        }
    }, {
        key: "onFightInviteInto",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                n.receive(i.ActionFightInviteInto, o);
            } catch (e) {}
        }
    }, {
        key: "onFightInviteBegin",
        value: function(e, t) {
            n.receive(i.ActionFightInviteBegin);
        }
    }, {
        key: "onFightInviteAgain",
        value: function(e, t) {
            var o = t[0];
            n.receive(i.ActionFightInviteAgain, o);
        }
    }, {
        key: "onFightInviteChange",
        value: function(e, t) {
            var o = JSON.parse(t[0]);
            n.receive(i.ActionFightInviteChange, o);
        }
    }, {
        key: "onFightOut",
        value: function(e, t) {
            var o = t[0];
            n.receive(i.ActionFightOut, o);
        }
    }, {
        key: "onActionFightSendEmot",
        value: function(e, t) {
            var o = JSON.parse(t[0]);
            n.receive(i.ActionFightSendEmot, o);
        }
    }, {
        key: "onActionDonatePay",
        value: function(e, t) {
            n.receive(i.ActionDonatePay, t);
        }
    }, {
        key: "onActionBCReward",
        value: function(e, t) {
            n.receive(i.ActionBCReward, t);
        }
    }, {
        key: "onActionNewMail",
        value: function(e, t) {
            n.receive(i.ActionNewMail, t);
        }
    }, {
        key: "onActionPlayerNameIllegal",
        value: function(e, t) {
            try {
                var n = JSON.parse(t[0]);
                c.mainData.role.onActionPlayerNameIllegal = !0, c.mainData.role.userInfo.nickName = n.name, 
                c.mainData.role.userInfo.avatarUrl = n.avatarUrl, a.ShowConfirm("", n.reason, function() {});
            } catch (e) {
                a.reportAnalytics_Try(e);
            }
        }
    } ]), r;
}();

module.exports = new r();