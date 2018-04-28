function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var n = t[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, s, n) {
        return s && e(t.prototype, s), n && e(t, n), t;
    };
}(), s = (require("defer"), require("cavenetPackage")), n = require("../../util/util.js"), a = (require("../../const/consts.js"), 
require("../../const/modeConsts.js")), i = require("tcp").Tcp, o = {
    init: "init",
    connecting: "connecting",
    connected: "connected",
    established: "established",
    recover: "recover",
    closing: "closing",
    closed: "closed"
}, c = function() {
    function c() {
        e(this, c), this.sessionId = "", this._lastSeq = 0, this._lastAck = 0, this._sSeq = 0, 
        this.state = o.init, this._debug = a.RunMode != a.RunModeType.Prod, this._isBreakReconnect = !1, 
        this._tcp = new i(), this._connectDefer = null, this.retryTimes = 0, this.onMessage = null, 
        this.onClose = null, this.onOpen = null, this.heartbeatTimer = null, this.lastHeartbeat = 0;
    }
    return t(c, [ {
        key: "connect",
        value: function(e) {
            var t = this;
            this.url = e, this.state = o.connecting, this._tcp.onMessage = this.onSocketMessage.bind(this), 
            this._tcp.onClose = this.onSocketClose.bind(this), this._tcp.onBreak = this.onSocketClose.bind(this), 
            this._tcp.onReopen = this.onSocketReopen.bind(this), this._connectDefer = this._tcp.connect(e, "cavenet"), 
            this._connectDefer.then(function() {
                t.onSocketOpen();
            }, function(e) {
                console.log(e);
            }).catch(function(e) {
                console.log(e);
            });
        }
    }, {
        key: "send",
        value: function(e) {
            if (!this.state != o.connected) {
                var t = s.CavenetPackage.Gen(s.CavenetPackage.actions.payload, this._sSeq, this._lastSeq++, e);
                this._tcp.send(t);
            }
        }
    }, {
        key: "close",
        value: function() {
            this.state = o.closing, this._tcp && this._tcp.close();
        }
    }, {
        key: "startHeartbeat",
        value: function() {
            clearTimeout(this.heartbeatTimer), this.lastHeartbeat = Date.now();
            var e = this;
            this.heartbeatTimer = setTimeout(function t() {
                if (e._debug && console.log("================startHeartbeat=================", e.state), 
                e.state != o.closed) if (Date.now() - e.lastHeartbeat > 4e3) e._debug && console.log("todo restart......"); else {
                    e.heartbeatTimer = setTimeout(t, 2e3);
                    var n = s.CavenetPackageHeartbeat.Gen(Math.floor(Date.now() / 1e3)), a = s.CavenetPackage.Gen(s.CavenetPackage.actions.heartbeat, this._sSeq, 0, n);
                    e._debug && console.log("================Heartbeat================="), e._tcp.send(a);
                }
            }, 2e3);
        }
    }, {
        key: "onSocketMessage",
        value: function(e) {
            var t = new s.CavenetPackage(e.data);
            if (this._debug && console.log("=========onSocketMessage===========", this.state, t.action(), t.payload()), 
            this.state === o.connected) {
                if (t.action() !== s.CavenetPackage.actions.handShake) return void this.close();
                var n = new s.CavenetPackageHandshake(t.payload());
                this.sessionId = n.sessionId(), this._debug && console.log("==========sessionId==========", this.sessionId), 
                this.state = o.established, this.startHeartbeat(), this.onOpen && this.onOpen();
            } else if (this.state == o.recover) {
                if (t.action() !== s.CavenetPackage.actions.handShake) return this._debug && console.log("==========pack.action()==========", t.action()), 
                void this.close();
                if (8 != new s.CavenetPackageHandshake(t.payload()).action()) return this._isBreakReconnect = !0, 
                this._tcp.breakReconnect(), void getApp().eventDispatcher.dispatchEventWith("onSocketReopen");
                this._isBreakReconnect = !1, this.state = o.established, this._debug && console.log("==========established=========="), 
                this.startHeartbeat(), this.onOpen && this.onOpen();
            } else this.state === o.established && (this._sSeq = t.seq(), this._debug && console.log("==========_sSeq==========", this._sSeq), 
            t.action() === s.CavenetPackage.actions.heartbeat ? this.lastHeartbeat = Date.now() : t.action() === s.CavenetPackage.actions.payload && this.onMessage && this.onMessage(t.payload()));
        }
    }, {
        key: "newSession",
        value: function() {
            var e = s.CavenetPackageHandshake.Gen(s.CavenetPackageHandshake.actions.newSession, ""), t = s.CavenetPackage.Gen(s.CavenetPackage.actions.handShake, this._sSeq, this._lastSeq, e);
            this._tcp.send(t);
        }
    }, {
        key: "restoreSession",
        value: function() {
            var e = s.CavenetPackageHandshake.Gen(s.CavenetPackageHandshake.actions.restoreSession, this.sessionId), t = s.CavenetPackage.Gen(s.CavenetPackage.actions.handShake, this._sSeq, this._lastSeq, e);
            this._debug && console.log("==========restoreSession==========", this.sessionId), 
            this._tcp.send(t);
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.state == o.closing || this.state == o.closed ? this.close() : (this.state = this.state == o.connecting ? o.connected : this.state, 
            "" !== this.sessionId ? this.restoreSession() : this.newSession());
        }
    }, {
        key: "onSocketReopen",
        value: function() {
            this.state == o.closing || this.state == o.closed ? this.close() : (this.state = o.recover, 
            "" !== this.sessionId ? this.restoreSession() : this.newSession());
        }
    }, {
        key: "onSocketClose",
        value: function(e) {
            this.state == o.recover || (this._state = o.closed, clearTimeout(this.heartbeatTimer)), 
            n.invokeCallback(this.onClose);
        }
    } ]), c;
}();

exports.CavenetSession = c;