function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), a = (require("./../../../util/util.js"), require("./../../../const/consts.js"), 
require("./../../../util/Tween.js")), i = require("./../../../util/ChallengeRoomDataManager.js"), n = (getApp(), 
function() {
    function n(t, a) {
        e(this, n), this.page = t, this.sayList = [];
        var i = {};
        this.key = a || "audienceView", i[this.key] = {
            visible: !0,
            list: [],
            answerBgTop: -50
        }, this.page.setData(i);
    }
    return t(n, [ {
        key: "show",
        value: function(e) {}
    }, {
        key: "setMemberList",
        value: function(e) {
            i.setMemberList(e), this.upDateMemberList();
        }
    }, {
        key: "addMember",
        value: function(e) {
            i.addMember(e), this.upDateMemberList();
        }
    }, {
        key: "removeMember",
        value: function(e) {
            i.removeMember(e), this.upDateMemberList();
        }
    }, {
        key: "upDateMemberData",
        value: function(e) {
            i.upDateMemberData(e), this.upDateMemberList();
        }
    }, {
        key: "upDateMemberList",
        value: function() {
            var e = [], t = void 0;
            if (i.curRoom.members) for (var a = 0; a < i.curRoom.members.length; a++) t = i.curRoom.members[a], 
            e.push(t);
            e.sort(function(e, t) {
                return t.lastEntryMs - e.lastEntryMs;
            });
            var n = {};
            n[this.key + ".list"] = e, this.page.setData(n);
        }
    }, {
        key: "remindAnswer",
        value: function(e, t) {
            this.sayList.push({
                nickName: e,
                qIndex: t
            }), this.playSayAnswerAnimation();
        }
    }, {
        key: "playSayAnswerAnimation",
        value: function() {
            var e = this;
            if (!this.playing && this.sayList.length > 0) {
                this.playing = !0;
                var t = a.fastGet("sayAnswer_Ani"), i = wx.createAnimation();
                i.top("0px").opacity(.82).step({
                    timingFunction: "linear",
                    duration: 300
                });
                var n = {};
                n[this.key + ".answerTopAni"] = i.export(), this.page.setData(n), t.wait(200), t.call(function() {
                    var t = wx.createAnimation();
                    t.left("0px").step({
                        timingFunction: "linear",
                        duration: 300
                    }), e.state = 2;
                    var a = {};
                    e.sayList.length > 0 && (a[e.key + ".nickName"] = e.sayList[0].nickName + "说：", 
                    a[e.key + ".qIndex"] = "" + e.sayList[0].qIndex), a[e.key + ".answerLeftAni"] = t.export(), 
                    e.page.setData(a), e.sayList.shift();
                }), t.wait(1300), t.call(function() {
                    var t = wx.createAnimation();
                    t.left("-1000rpx").step({
                        timingFunction: "linear",
                        duration: 200
                    });
                    var a = {};
                    a[e.key + ".answerLeftAni"] = t.export(), e.page.setData(a);
                }), t.wait(200), t.call(function() {
                    var t = wx.createAnimation();
                    t.left("1000rpx").step({
                        timingFunction: "step-start",
                        duration: 0
                    });
                    var a = {};
                    if (a[e.key + ".answerLeftAni"] = t.export(), e.page.setData(a), e.playing = !1, 
                    e.sayList.length > 0) e.playSayAnswerAnimation(); else {
                        var i = wx.createAnimation();
                        i.top("-50rpx").opacity(.82).step({
                            timingFunction: "linear",
                            duration: 300
                        });
                        var n = {};
                        n[e.key + ".answerTopAni"] = i.export(), e.page.setData(n);
                    }
                });
            }
        }
    }, {
        key: "clear",
        value: function() {
            this.sayList = [];
        }
    }, {
        key: "dispose",
        value: function() {
            a.removeTweens("sayAnswer_Ani"), this.clear();
        }
    } ]), n;
}());

module.exports = n;