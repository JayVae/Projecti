var t = require("./../../../util/util.js"), n = require("./../../../net/ugcNet.js"), e = require("./../../../data/MyQuestionsManager.js"), i = require("./../../../util/Tween.js"), a = getApp();

Page({
    data: {
        myQuestions: [ [], [], [] ],
        ani_iwill: null,
        ani_my: null,
        ani_check: null,
        ani_text: null,
        tabIndex: 0,
        quizStats: null
    },
    onLoad: function(n) {
        t.showShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        n.quizStats(function(n, e) {
            n || e && t.setData({
                quizStats: e
            });
        }), this.isShow || (this.isShow = !0, n.listQuiz(0, function(n, i) {
            if (n) ; else if (i) {
                t.unlock = !0, e.setMyQuestions(0, i.list);
                var a = {
                    myQuestions: e.getMyQuestions()
                };
                t.setData(a), t.setAnimation();
            }
        }));
    },
    setAnimation: function() {
        var t = this, n = i.fastGet("ugc_menu");
        n.wait(500), n.call(function() {
            var n = wx.createAnimation({
                timingFunction: "ease-out",
                transformOrigin: "100% 0"
            });
            n.translate3d(0, "-10px", 0).opacity(1).rotate(0).step({
                duration: 500
            }), t.setData({
                ani_iwill: n.export()
            });
        }), n.wait(200), n.call(function() {
            var n = wx.createAnimation({
                timingFunction: "ease-out",
                transformOrigin: "100% 0"
            });
            n.translate3d(0, "-10px", 0).opacity(1).rotate(0).step({
                duration: 500
            }), t.setData({
                ani_my: n.export()
            });
        }), n.wait(200), n.call(function() {
            var n = wx.createAnimation({
                timingFunction: "ease-out",
                transformOrigin: "100% 0"
            });
            n.translate3d(0, "-10px", 0).opacity(1).rotate(0).step({
                duration: 500
            }), t.setData({
                ani_check: n.export()
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        i.removeTweens("ugc_menu");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        this.shared = !0;
        var t = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + a.mainData.role.shareCode + "&compare=true",
            from: "user_ugc_menu"
        };
        return a.shareConf(t);
    },
    callback_iwill_clicked: function() {
        var n = this;
        if (this.unlock && !this.btnLock) if (this.btnLock = !1, e.isAllowedMakeNew()) {
            var i = e.getNewQuestion();
            e.setSelectedItem(i);
            var a = {};
            (a = t.assign(a, i)).answers = [], a.status = 0;
            for (var o = 0; o < i.answers.length; o++) {
                var s = {};
                s = t.assign(s, i.answers[o]), a.answers.push(s);
            }
            e.setBackupSelectedItem(a), this.btnLock = !0, console.log(i.stem), wx.navigateTo({
                url: "../../../page/ugc/ugc_qsetting/ugc_qsetting",
                complete: function() {
                    setTimeout(function() {
                        n.btnLock = !1;
                    }, 500);
                }
            });
        } else t.ShowConfirm("感谢支持", "等待审核的队伍又粗又长，客官歇会儿再来吧。", null);
    },
    callback_myquestions_clicked: function() {
        this.unlock && wx.navigateTo({
            url: "../../../page/ugc/ugc_list/ugc_list"
        });
    },
    callback_check_clicked: function() {
        this.unlock && wx.navigateTo({
            url: "../../../page/ugc/ugc_check/ugc_check"
        });
    }
});