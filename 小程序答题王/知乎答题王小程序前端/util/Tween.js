function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), s = [], n = !1, r = 0, a = [], u = function() {
    function u(e, i, s, n) {
        t(this, u), this._id = i, this._target = e, this._curQueueProps = {}, this._initQueueProps = {}, 
        this._steps = [], this.paused = !1, this.loop = !1, this.pluginData = null, this.duration = 0, 
        this._prevPos = -1, this.position = null, this._prevPosition = 0, this.passive = !1, 
        this._page = s, this._prefix = n, u._register(this, !0);
    }
    return i(u, [ {
        key: "_tick",
        value: function(e) {
            this.paused || this.setPosition(this._prevPosition + e);
        }
    }, {
        key: "setPosition",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            e < 0 && (e = 0);
            var i = e, s = !1;
            if (i >= this.duration) if (this.loop) {
                var n = i % this.duration;
                i = i > 0 && 0 === n ? this.duration : n;
            } else i = this.duration, s = !0;
            if (i == this._prevPos) return s;
            s && this.setPaused(!0);
            var r = this._prevPos;
            if (this.position = this._prevPos = i, this._prevPosition = e, this._id && this._steps.length > 0) {
                for (var a = this._steps.length, u = -1, o = 0; o < a; o++) {
                    var l = this._steps[o];
                    if ("step" == l.type) {
                        if (u = o, l.t <= i && l.t + l.d >= i) break;
                    } else if ("tweenCall" == l.type && (u = o, l.t <= i && !l.end)) {
                        l.t + l.d < i && (l.end = !0);
                        break;
                    }
                }
                for (var h = 0; h < a; h++) if ("action" == this._steps[h].type) 0 != t && (this._useTicks ? this._runAction(this._steps[h], i, i) : 1 == t && i < r ? (r != this.duration && this._runAction(this._steps[h], r, this.duration), 
                this._runAction(this._steps[h], 0, i, !0)) : this._runAction(this._steps[h], r, i)); else if ("step" == this._steps[h].type) {
                    if (u == h) {
                        var p = this._steps[u];
                        this._updateTargetProps(p, Math.min((i - p.t) / p.d, 1));
                    }
                } else if ("tweenCall" == this._steps[h].type && u == h) {
                    var v = this._steps[u];
                    if (v.tweenCall && "function" == typeof v.tweenCall) {
                        var f = Math.min((i - v.t) / v.d, 1);
                        v.tweenCall(f);
                    }
                }
            }
            return s;
        }
    }, {
        key: "_runAction",
        value: function(e, t, i) {
            var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], n = t, r = i;
            t > i && (n = i, r = t);
            var a = e.t;
            (a == r || a > n && a < r || s && a == t) && e.f.apply(e.o, e.p);
        }
    }, {
        key: "_addAction",
        value: function(e) {
            return e.t = this.duration, e.type = "action", this._steps.push(e), this;
        }
    }, {
        key: "_updateTargetProps",
        value: function(e, t) {
            var i = void 0, s = void 0, n = void 0, r = void 0, a = void 0;
            if (e || 1 != t) {
                if (this.passive = !!e.v, this.passive) return;
                e.e && (t = e.e(t, 0, 1, 1)), i = e.p0, s = e.p1;
            } else this.passive = !1, i = s = this._curQueueProps;
            for (var o in this._initQueueProps) if (null == (r = i[o]) && (i[o] = r = this._initQueueProps[o]), 
            null == (a = s[o]) && (s[o] = a = r), n = r == a || 0 == t || 1 == t || "number" != typeof r ? 1 == t ? a : r : r + (a - r) * t, 
            this._page) {
                var l = this._prefix + "." + o;
                u._AddDataSet(this._page, {
                    key: l,
                    value: n
                });
            } else this._target && (this._target[o] = n);
        }
    }, {
        key: "_appendQueueProps",
        value: function(e) {
            if (this._target) for (var t in e) if (void 0 === this._initQueueProps[t]) {
                var i = this._target[t];
                this._initQueueProps[t] = void 0 === i ? null : i;
            }
            for (var s in e) this._curQueueProps[s] = e[s];
            return this._curQueueProps;
        }
    }, {
        key: "_set",
        value: function(e, t) {
            for (var i in e) if (this._page) {
                var s = this._prefix + "." + i;
                u._AddDataSet(this._page, {
                    key: s,
                    value: e[i]
                });
            } else t && (t[i] = e[i]);
        }
    }, {
        key: "_addStep",
        value: function(e) {
            return e.d > 0 && (e.type = "step", this._steps.push(e), e.t = this.duration, this.duration += e.d), 
            this;
        }
    }, {
        key: "_addTweenCall",
        value: function(e) {
            return e.d > 0 && (e.type = "tweenCall", this._steps.push(e), e.t = this.duration, 
            this.duration += e.d), this;
        }
    }, {
        key: "_cloneProps",
        value: function(e) {
            var t = {};
            for (var i in e) t[i] = e[i];
            return t;
        }
    }, {
        key: "set",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return this._appendQueueProps(e), this._addAction({
                f: this._set,
                o: this,
                p: [ e, t || this._target ]
            });
        }
    }, {
        key: "setPaused",
        value: function(e) {
            return this.paused == e ? this : (this.paused = e, u._register(this, !e), this);
        }
    }, {
        key: "to",
        value: function(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            (isNaN(t) || !t || t < 0) && (t = 0);
            var s = {
                d: t || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: i,
                p1: this._cloneProps(this._appendQueueProps(e))
            };
            return this._addStep(s), this.set(e);
        }
    }, {
        key: "tweenCall",
        value: function(e, t) {
            (isNaN(t) || t < 0) && (t = 0);
            var i = {
                d: t || 0,
                tweenCall: e
            };
            return this._addTweenCall(i);
        }
    }, {
        key: "wait",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (null == e || e <= 0) return this;
            var i = this._cloneProps(this._curQueueProps);
            return this._addStep({
                d: e,
                p0: i,
                p1: i,
                v: t
            });
        }
    }, {
        key: "call",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            return this._addAction({
                f: e,
                p: i || [],
                o: t || this._target
            });
        }
    }, {
        key: "pause",
        value: function() {
            this.setPaused(!0);
        }
    }, {
        key: "play",
        value: function(e) {
            this.setPaused(!1);
        }
    } ], [ {
        key: "get",
        value: function(e, t, i, s, n) {
            return n && u.removeTweens(t), new u(e, t, i, s);
        }
    }, {
        key: "fastGet",
        value: function(e, t) {
            return t && u.removeTweens(e), new u(null, e, null, null);
        }
    }, {
        key: "pageGet",
        value: function(e, t, i, s) {
            return s && u.removeTweens(e), new u(null, e, t, i);
        }
    }, {
        key: "removeTweens",
        value: function(e) {
            for (var t = s, i = t.length; i--; ) t[i] && t[i]._id == e && (t[i].paused = !0, 
            t.splice(i, 1));
        }
    }, {
        key: "_register",
        value: function(e, t) {
            e._id;
            var i = s;
            if (t) e ? i.push(e) : console.error("tweens.push 还真有tween为空的情况出现"), n || (r = Date.now(), 
            setInterval(u._tick, 1e3 / 30), n = !0); else for (var a = i.length; a--; ) if (i[a] == e) return void i.splice(a, 1);
        }
    }, {
        key: "_tick",
        value: function() {
            var e = Date.now(), t = e - r;
            r = e;
            for (var i = s, n = i.length; n--; ) {
                var u = i[n];
                if (u) {
                    if (u.paused) continue;
                    u._tick(t);
                } else console.error("还真有tween为空的情况出现");
            }
            var o = a, l = !0, h = !1, p = void 0;
            try {
                for (var v, f = o[Symbol.iterator](); !(l = (v = f.next()).done); l = !0) {
                    var d = v.value;
                    d && d.page && d.page.setData(d.value);
                }
            } catch (e) {
                h = !0, p = e;
            } finally {
                try {
                    !l && f.return && f.return();
                } finally {
                    if (h) throw p;
                }
            }
            return a.splice(0, a.length), !1;
        }
    }, {
        key: "_AddDataSet",
        value: function(t, i) {
            var s = !1, n = !0, r = !1, u = void 0;
            try {
                for (var o, l = a[Symbol.iterator](); !(n = (o = l.next()).done); n = !0) {
                    var h = o.value;
                    if (h && h.page == t) {
                        h.value[i.key] = i.value, s = !0;
                        break;
                    }
                }
            } catch (e) {
                r = !0, u = e;
            } finally {
                try {
                    !n && l.return && l.return();
                } finally {
                    if (r) throw u;
                }
            }
            if (!s) {
                var p = {
                    page: t,
                    value: e({}, i.key, i.value)
                };
                a.push(p);
            }
        }
    } ]), u;
}();

module.exports = u;