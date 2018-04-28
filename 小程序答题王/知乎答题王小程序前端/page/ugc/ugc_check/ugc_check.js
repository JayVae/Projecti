var t = require("./../../../net/ugcNet.js"), i = require("./../../../util/util.js"), a = require("./../../../util/Tween.js"), n = require("./../../../const/consts.js"), e = require("./../../../data/MyQuestionsManager.js"), o = getApp(), s = {
    normal: 0,
    answerComplete: 1,
    evaluate: 2
}, r = {
    n: "answer_normal",
    o: "answer_o",
    x: "answer_x"
};

Page({
    data: {
        quiz: null,
        typeAndSubjectText: {},
        answerList: [],
        stem: null,
        curState: s.normal,
        answerSelected: null,
        ani_type: null,
        ani_stem: null,
        ani_answers: null,
        ani_btn_left_show: null,
        ani_btn_right_show: null,
        ani_btn_bottom_show: null,
        ani_next: null,
        reasonList: null,
        grid9_panel: null,
        showReasonList: !1,
        showNull: !1
    },
    getReasonsText: function() {
        for (var t = e.getReasonList(), i = [], a = 0; a < t.length; a++) {
            var n = t[a];
            n.online && i.push(n);
        }
        return i = i.sort(function(t, i) {
            return i.id - t.id;
        });
    },
    onLoad: function(t) {
        i.showShareMenu(), (o.mainData.role.settingsInfo || {}).soundOff || (wx.createAudioContext && !this.audioFalseCtx && (this.audioFalseCtx = wx.createAudioContext("audioFalse")), 
        wx.createAudioContext && !this.audioTrueCtx && (this.audioTrueCtx = wx.createAudioContext("audioTrue")), 
        wx.createAudioContext && !this.audioTapCtx && (this.audioTapCtx = wx.createAudioContext("audioTap"))), 
        this.setData({
            reasonList: this.getReasonsText(),
            grid9_panel: n.Grid9_panel
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.data.quiz || this.instruction_getCheckQuiz(function() {
            t.senceIn();
        });
    },
    instruction_getCheckQuiz: function(a) {
        var n = this;
        this.btnLock = !0, i.showLoading("加载中..."), t.getCheckQuiz(function(t, o) {
            if (n.btnLock = !1, n.thisQuizChecked = !1, i.hideLoading(), t) console.log("getCheckQuiz err:", t), 
            n.setData({
                showNull: !0
            }); else if (o) {
                var r = n.makeAnswerList(o);
                console.log("answerList:", r), n.setData({
                    curState: s.normal,
                    quiz: o,
                    answerList: r,
                    answerSelected: null,
                    typeAndSubjectText: e.getTypeAndSubjectText(o.schoolId, o.quizType)
                }), a && a();
            }
        });
    },
    makeAnswerList: function(t) {
        for (var a = [ {
            idx: 0,
            title: t.option0,
            class: r.n,
            flag: null
        }, {
            idx: 1,
            title: t.option1,
            class: r.n,
            flag: null
        }, {
            idx: 2,
            title: t.option2,
            class: r.n,
            flag: null
        }, {
            idx: 3,
            title: t.option3,
            class: r.n,
            flag: null
        } ], n = [], e = 0; e < 4; e++) {
            var o = i.randomInt(0, a.length - 1);
            n.push(a[o]), a.splice(o, 1);
        }
        return n;
    },
    onHide: function() {},
    onUnload: function() {
        a.removeTweens("ugc_check");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        this.shared = !0;
        var t = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + o.mainData.role.shareCode + "&compare=true",
            from: "user_ugc_menu"
        };
        return o.shareConf(t);
    },
    btn_answer_clicked: function(t) {
        var i = this;
        if (!this.CantOpration() && !this.thisQuizChecked && this.data.curState == s.normal) {
            this.btnLock = !0;
            var n = t.currentTarget.dataset.idx, e = null;
            console.log("答题~~~~~idx = " + n);
            for (var o = -1, c = -1, u = 0; u < this.data.answerList.length; u++) {
                var l = this.data.answerList[u];
                l.idx == n && (e = l, o = u), 0 == l.idx && (c = u);
            }
            e || console.log("警告 没有找到idx为" + idex + "的答案");
            var h = e.title == this.data.quiz.option0;
            h ? this.audioTrueCtx && this.audioTrueCtx.play() : this.audioFalseCtx && this.audioFalseCtx.play();
            var d = wx.createAnimation({
                timingFunction: "ease-out"
            });
            d.opacity(0).right("-320rpx").step({
                duration: 200
            });
            var p = d.export();
            this.setData({
                ani_next: p,
                answerSelected: e,
                curState: s.answerComplete
            });
            var x = a.fastGet("ugc_check");
            x.call(function() {
                var t = {}, a = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                a.opacity(1).step({
                    duration: 100
                }), a.scale(1.1).opacity(0).step({
                    duration: 200
                }), t["answerList[" + o + "].effFrameAni"] = a.export(), t["answerList[" + o + "].class"] = h ? r.o : r.x, 
                t["answerList[" + o + "].flag"] = h ? "o" : "x", i.setData(t);
            }), x.wait(300), x.call(function() {
                var t = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                t.opacity(0).scale(1).step({
                    duration: 10
                });
                var a = {};
                a["answerList[" + o + "].effFrameAni"] = t.export(), i.setData(a);
            }), h || (x.wait(800), x.call(function() {
                var t = {};
                t["answerList[" + c + "].class"] = r.o, t["answerList[" + c + "].flag"] = "o", i.setData(t);
            })), x.wait(1e3), x.call(function() {
                var t = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                t.opacity(0).step({
                    duration: 500
                }), i.setData({
                    ani_answers: t.export(),
                    curState: s.evaluate
                });
            }), x.wait(500), x.call(function() {
                var t = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                t.left("0px").opacity(1).step({
                    duration: 200
                });
                var a = t.export(), n = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                n.right("0px").opacity(1).step({
                    duration: 200
                });
                var e = n.export(), o = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                o.bottom("215rpx").opacity(1).step({
                    duration: 200
                });
                var s = o.export(), r = wx.createAnimation({
                    timingFunction: "ease-out"
                });
                r.opacity(0).right("-320rpx").step({
                    duration: 200
                });
                var c = r.export();
                i.setData({
                    ani_next: c,
                    ani_btn_left_show: a,
                    ani_btn_right_show: e,
                    ani_btn_bottom_show: s
                }), i.btnLock = !1;
            });
        }
    },
    btn_next_click: function() {
        var t = this;
        this.CantOpration() || this.data.curState != s.normal || this.senceOut(function() {
            t.instruction_getCheckQuiz(function() {
                t.senceIn();
            });
        });
    },
    callback_reasonitem_clicked: function(t) {
        if (this.setData({
            showReasonList: !1
        }), !(this.data.curState < s.evaluate || this.btnLock || this.thisQuizChecked)) {
            this.audioTapCtx && this.audioTapCtx.play();
            var i = t.currentTarget.dataset.id;
            this.instruction_check(i);
        }
    },
    btn_bad_clicked: function() {
        this.data.curState < s.evaluate || this.CantOpration() || this.thisQuizChecked || (this.audioTapCtx && this.audioTapCtx.play(), 
        this.instruction_check(-2));
    },
    btn_good_clicked: function() {
        this.data.curState < s.evaluate || this.CantOpration() || this.thisQuizChecked || (console.log("btn_good_clicked:" + this.data.curState + "/ thisQuizChecked:" + this.thisQuizChecked + "/ btnLock:" + this.btnLock + "/ outting" + this.outting + "/ senceInning" + this.senceInning), 
        this.audioTapCtx && this.audioTapCtx.play(), this.instruction_check(-1));
    },
    btn_showReason_clicked: function() {
        this.data.curState < s.evaluate || this.CantOpration() || this.thisQuizChecked || (this.audioTapCtx && this.audioTapCtx.play(), 
        this.setData({
            showReasonList: !0
        }));
    },
    instruction_check: function(a) {
        var n = this;
        this.btnLock = !0, this.thisQuizChecked = !0;
        var e = !!this.data.answerSelected && this.data.answerSelected.title == this.data.quiz.option0;
        i.showLoading("加载中..."), t.checkOneQuiz(this.data.quiz.id, e, a, function(t, a) {
            n.btnLock = !1, i.hideLoading(), t ? i.ShowToast("网络异常，请稍后重试") : n.senceOut(function() {
                n.instruction_getCheckQuiz(function() {
                    n.senceIn();
                });
            });
        });
    },
    CantOpration: function() {
        return this.senceInning || this.outting || this.btnLock;
    },
    senceIn: function() {
        var t = this;
        this.senceInning = !0;
        var i = a.fastGet("ugc_check");
        i.wait(200), i.call(function() {
            var i = wx.createAnimation({
                timingFunction: "ease-out"
            });
            i.opacity(1).left("0px").step({
                duration: 200
            }), t.setData({
                ani_type: i.export()
            });
        }), i.wait(200), i.call(function() {
            var i = wx.createAnimation({
                timingFunction: "ease-out"
            });
            i.opacity(1).top("180rpx").step({
                duration: 200
            }), t.setData({
                ani_stem: i.export()
            });
        }), i.wait(200), i.call(function() {
            var i = wx.createAnimation({
                timingFunction: "ease-out"
            });
            i.opacity(1).step({
                duration: 200
            }), t.setData({
                ani_answers: i.export()
            });
        }), i.wait(200), i.call(function() {
            var i = wx.createAnimation({
                timingFunction: "ease-out"
            });
            i.opacity(1).right("-2px").step({
                duration: 200
            }), t.setData({
                ani_next: i.export()
            }), t.senceInning = !1;
        });
    },
    senceOut: function(t) {
        var i = this;
        this.outting = !0;
        var n = a.fastGet("ugc_check");
        n.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out"
            });
            t.opacity(0).right("-320rpx").step({
                duration: 200
            }), i.setData({
                ani_next: t.export()
            });
        }), this.data.curState == s.normal ? (n.wait(250), n.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out"
            });
            t.opacity(0).step({
                duration: 200
            });
            var a = t.export();
            i.setData({
                ani_answers: a
            });
        })) : (n.wait(200), n.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out"
            });
            t.left("-350rpx").opacity(0).step({
                duration: 200
            });
            var a = t.export(), n = wx.createAnimation({
                timingFunction: "ease-out"
            });
            n.right("-350rpx").opacity(0).step({
                duration: 200
            });
            var e = n.export(), o = wx.createAnimation({
                timingFunction: "ease-out"
            });
            o.bottom("0px").opacity(0).step({
                duration: 200
            });
            var s = o.export();
            i.setData({
                ani_answers: null,
                ani_btn_left_show: a,
                ani_btn_right_show: e,
                ani_btn_bottom_show: s
            });
        })), n.wait(550), n.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out"
            });
            t.opacity(0).top("140rpx").step({
                duration: 200
            });
            var a = t.export();
            i.setData({
                ani_stem: a
            });
        }), n.wait(200), n.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out"
            });
            t.opacity(0).right("-320rpx").step({
                duration: 200
            }), i.setData({
                ani_type: t.export()
            });
        }), n.wait(200), n.call(function() {
            t && t(), i.outting = !1;
        });
    }
});