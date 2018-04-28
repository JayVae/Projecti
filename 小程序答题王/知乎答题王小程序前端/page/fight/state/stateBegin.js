function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), a = require("./../../../util/util.js"), i = require("./../../../const/consts.js"), n = require("./../../../net/fightNet.js"), r = require("./../../../util/Tween.js"), o = require("./../../../util/ChallengeRoomDataManager.js"), s = getApp(), p = function() {
    function p(e) {
        t(this, p), this.page = e, this.name = "StateBegin";
    }
    return e(p, [ {
        key: "init",
        value: function() {
            var t = this.page.roomId;
            this.page.audioFalseCtx && this.page.audioFalseCtx.seek(0), this.page.audioTrueCtx && this.page.audioTrueCtx.seek(0), 
            this.findQuiz(t, this.page.round + 1), this.page.data.battleViewData.isFirstShow ? this.playInit() : this.playNextInit();
        }
    }, {
        key: "playAni",
        value: function() {
            var t = this, e = r.fastGet("StateBeginAni");
            if (this.page.data.battleViewData.isFirstShow) {
                this.page.data.battleViewData.isFirstShow = !1;
                var a = 0;
                a = this.playFirstIn(e), e.wait(a), a = this.playTitleInOut(e), e.wait(a), a = this.playScoreIn(e), 
                e.wait(a), a = this.playTimeViewIn(e), e.wait(a), a = this.playQuestionIn(e), e.wait(a), 
                a = this.playBtnIn(e), e.wait(a);
            } else {
                var i = 0;
                e.wait(i), i = this.playTitleInOut(e), e.wait(i), i = this.playQuestionIn(e), e.wait(i), 
                i = this.playBtnIn(e), e.wait(i);
            }
            e.call(function() {
                t.isEnd || t.page.stateChange("StateChoose");
            });
        }
    }, {
        key: "getCountDown",
        value: function(t) {
            var e = Math.ceil((1e3 * t - a.getServerTime()) / 1e3);
            return e = Math.max(0, e);
        }
    }, {
        key: "findQuiz",
        value: function(t, e) {
            var r = this;
            "challenge" != this.page.type && "obChallenge" != this.page.type || !o.isChallengeStatusReady() ? ("challenge" != this.page.type && "obChallenge" != this.page.type || this.page.audienceViewController && this.page.audienceViewController.clear(), 
            n.findQuiz(t, e, function(t, e) {
                if (!r.isEnd) if (t) t.errCode, r.page.stateChange("StateResult"); else {
                    var n = e;
                    if (s.getGameConf(i.gameConf.encryptedQuiz) && e.encryptedData && (n = s.aesDecrypt(e.encryptedData)), 
                    !n) return void r.page.stateChange("StateResult");
                    a.setServerTime(n.curTime);
                    var o = r.getCountDown(n.endTime);
                    r.setData(n, o), 0 == o && n.num >= r.page.roundMax && r.page.stateChange("StateChooseEnd");
                }
            })) : 0 == this.page.roomId ? wx.navigateBack({
                delta: 1
            }) : this.page.stateChange("StateResult");
        }
    }, {
        key: "setData",
        value: function(t, e) {
            this.page.round = t.num, this.page.answerBtnLock = !0, this.page.endTime = t.endTime;
            var i = !1;
            e > 4 && (i = !0, e -= 4, e = Math.min(10, e)), this.doubleLabelVisible = this.page.hasDouble && t.num >= this.page.roundMax;
            var n = "第 " + t.num + " 题";
            t.num >= this.page.roundMax && (n = "最后一题", this.lastRound = !0), this.countDown = e;
            var r = e, o = !1, s = 0, p = "";
            t.contributor ? "知乎" == t.contributor ? o = !0 : p = "本题目由" + a.formatName(t.contributor, 10) + "贡献" : t.partner > 0 && (s = t.partner);
            var u = {};
            u["battleViewData.visible"] = !0, u["battleViewData.roundText"] = n, u["battleViewData.countDown"] = this.countDown, 
            u["battleViewData.countDownStr"] = r, u["battleViewData.contributor"] = p, u["battleViewData.contributorZhihu"] = o, 
            u["battleViewData.partner"] = s, u["battleViewData.typeID"] = t.typeID, u["battleViewData.questionTypeName"] = t.type, 
            u["battleViewData.question"] = t.quiz, u["battleViewData.answer"] = [ {
                index: 0,
                answer: t.options[0],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0
            }, {
                index: 1,
                answer: t.options[1],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0
            }, {
                index: 2,
                answer: t.options[2],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0
            }, {
                index: 3,
                answer: t.options[3],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0
            } ], this.page.setData(u), i ? this.playAni() : (this.playNoAni(), this.isEnd || this.page.stateChange("StateChoose"));
        }
    }, {
        key: "playInit",
        value: function() {
            var t = {}, e = wx.createAnimation();
            e.left("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = wx.createAnimation();
            a.right("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var i = wx.createAnimation();
            i.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var n = wx.createAnimation();
            n.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var r = wx.createAnimation();
            r.left("-400rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var o = wx.createAnimation();
            o.right("-400rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var s = wx.createAnimation();
            s.opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var p = wx.createAnimation();
            p.left("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var u = wx.createAnimation();
            u.right("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var l = wx.createAnimation();
            l.bottom("-502rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var c = wx.createAnimation();
            c.opacity(0).top("-100rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var w = wx.createAnimation();
            w.scale(0).opacity(1).step({
                timingFunction: "step-start",
                duration: 0
            });
            var m = wx.createAnimation();
            m.opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var g = wx.createAnimation();
            g.opacity(1).step({
                timingFunction: "step-start",
                duration: 0
            });
            for (var x = 0; x < 4; x++) {
                var d = "battleViewData.answer[" + x + "].ani", v = wx.createAnimation();
                v.scale(0).step({
                    timingFunction: "step-start",
                    duration: 0
                }), t[d] = v.export();
            }
            t["battleViewData.visible"] = !0, t["a.avatarAni"] = e.export(), t["b.avatarAni"] = a.export(), 
            t["battleViewData.timeDecorationAni"] = i.export(), t["battleViewData.timeViewAni"] = n.export(), 
            t["battleViewData.leftComboViewAni"] = r.export(), t["battleViewData.rightComboViewAni"] = o.export(), 
            t["battleViewData.questionViewAni"] = s.export(), t["battleViewData.leftScoreViewAni"] = p.export(), 
            t["battleViewData.rightScoreViewAni"] = u.export(), t["battleViewData.bgAni"] = l.export(), 
            t["battleViewData.titleViewAni"] = c.export(), t["battleViewData.roundAni"] = w.export(), 
            t["battleViewData.btnViewAni"] = g.export(), t["battleViewData.doubleAni"] = m.export(), 
            this.page.setData(t);
        }
    }, {
        key: "playNextInit",
        value: function(t) {
            var e = wx.createAnimation();
            e.left("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = wx.createAnimation();
            a.right("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var i = wx.createAnimation();
            i.bottom("0rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var n = wx.createAnimation();
            n.left("72rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var r = wx.createAnimation();
            r.right("72rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var o = wx.createAnimation();
            o.scale(1 * this.page.data.battleViewData.baseTimeViewScale).step({
                timingFunction: "step-start",
                duration: 0
            });
            var s = wx.createAnimation();
            s.scale(1).step({
                timingFunction: "step-start",
                duration: 0
            });
            var p = wx.createAnimation();
            p.left("-400rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var u = wx.createAnimation();
            u.right("-400rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var l = wx.createAnimation();
            l.opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var c = wx.createAnimation();
            c.opacity(0).top("-100rpx").step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0
            });
            var w = wx.createAnimation();
            w.scale(0).opacity(1).step({
                timingFunction: "step-start",
                duration: 0
            });
            var m = wx.createAnimation();
            m.opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var g = wx.createAnimation();
            g.opacity(1).step({
                timingFunction: "step-start",
                duration: 0
            });
            for (var x = {}, d = 0; d < 4; d++) {
                var v = "battleViewData.answer[" + d + "].ani", b = wx.createAnimation();
                b.scale(0).step({
                    timingFunction: "step-start",
                    duration: 0
                }), x[v] = b.export();
            }
            x["battleViewData.visible"] = !0, x["a.avatarAni"] = e.export(), x["b.avatarAni"] = a.export(), 
            x["battleViewData.bgAni"] = i.export(), x["battleViewData.leftScoreViewAni"] = n.export(), 
            x["battleViewData.rightScoreViewAni"] = r.export(), x["battleViewData.timeDecorationAni"] = s.export(), 
            x["battleViewData.timeViewAni"] = o.export(), x["battleViewData.leftComboViewAni"] = p.export(), 
            x["battleViewData.rightComboViewAni"] = u.export(), x["battleViewData.questionViewAni"] = l.export(), 
            x["battleViewData.titleViewAni"] = c.export(), x["battleViewData.roundAni"] = w.export(), 
            x["battleViewData.btnViewAni"] = g.export(), x["battleViewData.doubleAni"] = m.export(), 
            this.page.setData(x);
        }
    }, {
        key: "playFirstIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.left("0px").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var a = wx.createAnimation();
                a.right("0px").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var i = wx.createAnimation();
                i.bottom("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 100
                });
                var n = {};
                n["battleViewData.visible"] = !0, n["a.avatarAni"] = t.export(), n["b.avatarAni"] = a.export(), 
                n["battleViewData.bgAni"] = i.export(), e.page.setData(n);
            }), 200;
        }
    }, {
        key: "playTitleInOut",
        value: function(t) {
            var e = this;
            return t.call(function() {
                "ob" != e.page.type && e.page.emojiSelectController.setVisible(!0);
                var t = wx.createAnimation();
                t.opacity(1).top("197rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 0
                }), t.opacity(0).top("230rpx").step({
                    timingFunction: "ease-in",
                    duration: 300,
                    delay: 1200
                });
                var a = wx.createAnimation();
                a.scale(1.3).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a.scale(1).step({
                    timingFunction: "linear",
                    duration: 100
                }), 0 == e.page.round || e.lastRound ? (a.scale(10).opacity(0).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 1100
                }), a.scale(0).step({
                    timingFunction: "step-start",
                    duration: 0
                })) : a.scale(0).opacity(0).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 1100
                });
                var i = Math.max(0, e.countDown - 5), n = Math.max(0, e.countDown - i), r = i >= 5 ? 0 : 180 * (5 - i) / 5, o = n >= 5 ? 0 : 180 * (5 - n) / 5, s = wx.createAnimation();
                s.rotateZ(r).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 200,
                    transformOrigin: "0% 50%"
                });
                var p = wx.createAnimation();
                p.rotateZ(o).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 0,
                    transformOrigin: "100% 50%"
                });
                var u = {};
                if (e.lastRound) {
                    var l = wx.createAnimation();
                    l.opacity(1).step({
                        timingFunction: "ease-in",
                        duration: 200,
                        delay: 300
                    }), l.opacity(0).step({
                        timingFunction: "ease-in",
                        duration: 500,
                        delay: 700
                    }), u["battleViewData.doubleAni"] = l.export();
                }
                u["battleViewData.ovalViewRight"] = s.export(), u["battleViewData.ovalViewLeft"] = p.export(), 
                u["battleViewData.titleViewAni"] = t.export(), u["battleViewData.roundAni"] = a.export(), 
                e.page.setData(u);
            }), 2200;
        }
    }, {
        key: "playTimeViewIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.8 * e.page.data.battleViewData.baseTimeViewScale).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.scale(1 * e.page.data.battleViewData.baseTimeViewScale).step({
                    timingFunction: "linear",
                    duration: 150
                });
                var a = wx.createAnimation();
                a.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 150
                }), a.scale(1).step({
                    timingFunction: "linear",
                    duration: 150
                });
                var i = {};
                i["battleViewData.timeDecorationAni"] = a.export(), i["battleViewData.timeViewAni"] = t.export(), 
                e.page.setData(i);
            }), 0;
        }
    }, {
        key: "playScoreIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.left("72rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 150
                });
                var a = wx.createAnimation();
                a.right("72rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 150
                });
                var i = {};
                i["battleViewData.leftScoreViewAni"] = t.export(), i["battleViewData.rightScoreViewAni"] = a.export(), 
                e.page.setData(i);
            }), 0;
        }
    }, {
        key: "playQuestionIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 500
                });
                var a = {};
                a["battleViewData.questionViewAni"] = t.export(), e.page.setData(a);
            }), 1500;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var i = "battleViewData.answer[" + a + "].ani", n = wx.createAnimation();
                    n.opacity(1).scale(1.1).step({
                        timingFunction: "ease-in",
                        duration: 200
                    }), n.scale(1).step({
                        timingFunction: "linear",
                        duration: 100
                    }), t[i] = n.export();
                }
                e.page.setData(t);
            }), 300;
        }
    }, {
        key: "playNoAni",
        value: function() {
            "ob" != this.page.type && this.page.emojiSelectController.setVisible(!0);
            var t = wx.createAnimation();
            t.opacity(0).top("230rpx").step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0
            });
            var e = wx.createAnimation();
            e.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = Math.max(0, this.countDown - 5), i = Math.max(0, this.countDown - a), n = a >= 5 ? 0 : 180 * (5 - a) / 5, r = i >= 5 ? 0 : 180 * (5 - i) / 5, o = wx.createAnimation();
            o.rotateZ(n).step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0,
                transformOrigin: "0% 50%"
            });
            var s = wx.createAnimation();
            s.rotateZ(r).step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0,
                transformOrigin: "100% 50%"
            });
            var p = {};
            if (this.lastRound) {
                var u = wx.createAnimation();
                u.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 0,
                    delay: 0
                }), p["battleViewData.doubleAni"] = u.export();
            }
            p["battleViewData.ovalViewRight"] = o.export(), p["battleViewData.ovalViewLeft"] = s.export(), 
            p["battleViewData.titleViewAni"] = t.export(), p["battleViewData.roundAni"] = e.export();
            var l = wx.createAnimation();
            l.opacity(1).step({
                timingFunction: "step-start",
                duration: 0
            }), p["battleViewData.questionViewAni"] = l.export();
            for (var c = 0; c < 4; c++) {
                var w = "battleViewData.answer[" + c + "].ani", m = wx.createAnimation();
                m.opacity(1).scale(1.1).step({
                    timingFunction: "step-start",
                    duration: 0
                }), m.scale(1).step({
                    timingFunction: "step-start",
                    duration: 0
                }), p[w] = m.export();
            }
            this.page.setData(p);
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {
            this.isEnd = !0, r.removeTweens("StateBeginAni");
        }
    } ]), p;
}();

module.exports = p;