var t = require("./../../../util/util.js"), e = require("./../../../net/ugcNet.js"), a = require("./../../../data/MyQuestionsManager.js"), i = require("./../../../util/Tween.js"), n = getApp();

Page({
    data: {
        myQuestions: [ [], [], [] ],
        flagReqested: [ !1, !1, !1 ],
        showHelp: !1,
        tabIndex: 0,
        allowedMakeNew: !1,
        ani_list: null
    },
    onLoad: function(e) {
        t.showShareMenu();
        var i = a.getList2DeltaParam();
        i && this.setData({
            tabIndex: i.page
        });
    },
    onReady: function() {},
    onShow: function() {
        var i = this;
        t.showShareMenu(), e.listQuiz(this.data.tabIndex, function(t, e) {
            if (t) ; else if (e) {
                var n = e.list;
                n && n.length > 1 && (n = n.sort(function(t, e) {
                    return e.createdAt - t.createdAt;
                })), a.setMyQuestions(i.data.tabIndex, n);
                var s = {
                    myQuestions: i.getQuizFixReason(i.data.tabIndex),
                    allowedMakeNew: a.isAllowedMakeNew(),
                    flagReqested: [ !0, !1, !1 ]
                };
                i.setData(s);
                var o = a.getList2DeltaParam();
                if (o) {
                    var r = {
                        currentTarget: {
                            dataset: {
                                id: o.id
                            }
                        }
                    };
                    i.callback_item_clicked(r), a.setList2DeltaParam();
                } else i.setListAni_onload();
            }
        });
    },
    getQuizFixReason: function(t) {
        var e = a.getMyQuestions();
        if (1 == t) for (var i = a.getReasonList(), n = 0; n < e[1].length; n++) {
            var s = e[1][n], o = s.reason;
            if ("0" == o || "其他" == o) s.reason = "多数用户投票反对"; else for (var r = 0; r < i.length; r++) {
                var l = i[r];
                l.id == o && (s.reason = l.title);
            }
        }
        return e;
    },
    sortByCreateTime: function(t, e) {
        return e.createdAt - t.createdAt;
    },
    onHide: function() {},
    onUnload: function() {
        i.removeTweens("ugc_list");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        this.shared = !0;
        var t = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&compare=true",
            from: "user_ugc_list"
        };
        return n.shareConf(t);
    },
    callback_item_clicked: function(e) {
        var i = e.currentTarget.dataset.id;
        console.log(i);
        for (var n = 0; n < this.data.myQuestions[this.data.tabIndex].length; n++) {
            var s = this.data.myQuestions[this.data.tabIndex][n];
            if (s.id == i) {
                var o = {};
                (o = t.assign(o, s)).answers = [];
                for (var r = 0; r < s.answers.length; r++) {
                    var l = {};
                    l = t.assign(l, s.answers[r]), o.answers.push(l);
                }
                a.setBackupSelectedItem(o), a.setSelectedItem(s), wx.navigateTo({
                    url: "../../../page/ugc/ugc_qedit/ugc_qedit"
                });
            }
        }
    },
    btn_iwill_clicked: function() {
        var e = a.getNewQuestion();
        a.setSelectedItem(e);
        var i = {};
        (i = t.assign(i, e)).answers = [], i.status = 0;
        for (var n = 0; n < e.answers.length; n++) {
            var s = {};
            s = t.assign(s, e.answers[n]), i.answers.push(s);
        }
        a.setBackupSelectedItem(i), console.log(e.stem), wx.navigateTo({
            url: "../../../page/ugc/ugc_qsetting/ugc_qsetting"
        });
    },
    btn_help_clicked: function(t) {
        this.setData({
            showHelp: !0
        });
    },
    btn_closeHelp_clicked: function(t) {
        this.setData({
            showHelp: !1
        });
    },
    callback_tapbar_clicked: function(t) {
        var i = this, n = parseInt(t.currentTarget.dataset.index);
        if (this.data.tabIndex != n) {
            var s = this.data;
            this.setListAni_onchange(s, n), this.data.flagReqested[n] || e.listQuiz(n, function(t, e) {
                if (t) ; else if (e) {
                    a.setMyQuestions(n, e.list);
                    var s = i.getQuizFixReason(n), o = i.data.flagReqested;
                    o[n] = !0;
                    var r = {
                        myQuestions: s,
                        flagReqested: o
                    };
                    i.setData(r);
                }
            });
        }
    },
    setListAni_onload: function() {
        var t = this, e = i.fastGet("ugc_list");
        e.wait(500), e.call(function() {
            var e = wx.createAnimation({
                timingFunction: "ease-out"
            });
            e.opacity(1).left("0px").scale(1).step({
                duration: 400
            });
            var a = {};
            a.ani_list = e.export(), t.setData(a);
        }), a.getList2DeltaParam() && (e.wait(500), e.call(function() {
            var e = {};
            e.ani_list = ani.export(), t.setData(e);
        }), callback_item_clicked);
    },
    setListAni_onchange: function(t, e) {
        var a = this, n = this.data.tabIndex, s = i.fastGet("ugc_list");
        e > n ? (s.call(function() {
            var e = wx.createAnimation({
                timingFunction: "ease-out"
            });
            e.opacity(0).left("-105%").scale(.8).step({
                duration: 200
            }), t.ani_list = e.export(), a.setData(t);
        }), s.wait(220), s.call(function() {
            var i = wx.createAnimation({
                timingFunction: "ease-out"
            });
            i.opacity(0).left("105%").step({
                duration: 100
            }), t.ani_list = i.export(), t.tabIndex = e, a.setData(t);
        }), s.wait(120), s.call(function() {
            var e = wx.createAnimation({
                timingFunction: "ease-out"
            });
            e.opacity(1).left("0px").scale(1).step({
                duration: 400
            }), t.ani_list = e.export(), a.setData(t);
        })) : e < n && (s.call(function() {
            var e = wx.createAnimation({
                timingFunction: "ease-out"
            });
            e.opacity(0).left("105%").scale(.8).step({
                duration: 200
            }), t.ani_list = e.export(), a.setData(t);
        }), s.wait(220), s.call(function() {
            var i = wx.createAnimation({
                timingFunction: "ease-out"
            });
            i.opacity(0).left("-105%").step({
                duration: 100
            }), t.ani_list = i.export(), t.tabIndex = e, a.setData(t);
        }), s.wait(120), s.call(function() {
            var e = wx.createAnimation({
                timingFunction: "ease-out"
            });
            e.opacity(1).left("0px").scale(1).step({
                duration: 400
            }), t.ani_list = e.export(), a.setData(t);
        }));
    }
});