function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t;
    };
}(), a = (require("./../../../const/consts.js"), require("./../../../util/Tween.js")), n = function() {
    function n(t) {
        e(this, n), this.page = t, this.name = "StateChooseEnd";
    }
    return t(n, [ {
        key: "init",
        value: function() {
            this.round = this.page.round, this.page.answerBtnLock = !0, this.playAni();
        }
    }, {
        key: "playAni",
        value: function() {
            var e = this, t = a.fastGet("StateEndAni");
            t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var n = "battleViewData.answer[" + a + "]", i = a == e.page.getTrueIndex(e.round), r = !1, o = !1;
                    if (i && (t[n + ".className"] = i ? "true" : "", r = !0, o = !0), a == e.page.selectIndex[e.round].a && (t[n + ".lImg"] = i ? 2 : 1, 
                    t[n + ".className"] = i ? "true" : "false", r = !0, o = "ob" == e.page.type || "obChallenge" == e.page.type), 
                    a == e.page.selectIndex[e.round].b && (t[n + ".rImg"] = i ? 2 : 1, t[n + ".className"] = i ? "true" : "false", 
                    r = !0, o = a != e.page.selectIndex[e.round].a), r) {
                        if (o) {
                            var s = wx.createAnimation();
                            s.scale(1.1).step({
                                timingFunction: "ease-in",
                                duration: 150
                            }), s.scale(1).step({
                                timingFunction: "linear",
                                duration: 50
                            }), t[n + ".ani"] = s;
                        }
                    } else {
                        var u = wx.createAnimation();
                        u.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), t[n + ".ani"] = u;
                    }
                }
                t.fullShadeVisible = !1, t["battleViewData.contributor"] = "", t["battleViewData.contributorZhihu"] = !1, 
                e.page.setData(t);
            }), t.wait(2500), t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var n = wx.createAnimation();
                    n.scale(0).step({
                        timingFunction: "ease-in",
                        duration: 300
                    }), t["battleViewData.answer[" + a + "].ani"] = n.export();
                }
                var i = wx.createAnimation();
                i.opacity(0).step({
                    duration: 300
                }), t["battleViewData.questionViewAni"] = i.export(), e.page.setData(t);
            }), t.wait(700), t.call(function() {
                e.isEnd || (e.page.playerLogout || e.round >= e.page.roundMax ? e.page.stateChange("StateResult") : e.page.stateChange("StateBegin"));
            });
        }
    }, {
        key: "update",
        value: function(e) {}
    }, {
        key: "end",
        value: function(e) {
            this.isEnd = !0;
        }
    } ]), n;
}();

module.exports = n;