var t = require("./../../../util/util.js"), e = require("./../../../net/ugcNet.js"), s = require("./../../../const/consts.js"), i = require("./../../../util/Tween.js"), a = require("./../../../data/MyQuestionsManager.js"), n = getApp();

Page({
    data: {
        selectedItem: null,
        err: null,
        showHelpView: !1,
        showSubmitRewardView: !1,
        grid9_O: s.Grid9_O,
        grid9_X: s.Grid9_X,
        stemEditting: !1,
        isNew: !0,
        showItem: [ !1, !1, !1, !1, !1, !1, !1 ],
        timer: 0,
        trySubmit: !1,
        arrowSubmit: !1
    },
    onLoad: function(e) {
        t.showShareMenu();
        var s = this.data;
        if (s.selectedItem = a.getSelectedItem(), s.err = this.check(s.selectedItem), s.isNew = !s.selectedItem.stem, 
        s.selectedItem) {
            var i = s.selectedItem.reason;
            if ("0" == i || "其他" == i) s.selectedItem.reason = "多数用户投票反对"; else for (var n = a.getReasonList(), l = 0; l < n.length; l++) {
                var r = n[l];
                r.id == i && (s.selectedItem.reason = r.title);
            }
        }
        this.setData(s), this.allSubjectList = a.getAllSubjectList();
    },
    onReady: function() {},
    onShow: function() {
        var t = this, e = i.fastGet("ugc_qedit");
        e.wait(100);
        for (var s = this.data.showItem, a = 0; a < s.length; a++) !function(i) {
            e.wait(200 - 10 * i), e.call(function() {
                s[i] = !0, t.setData({
                    showItem: s
                });
            });
        }(a);
    },
    onHide: function() {},
    onUnload: function() {
        if (i.removeTweens("ugc_qedit"), !this.submit) {
            var t = a.getBackupSelectedItem();
            a.setQuestionWithObj(t);
        }
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        this.shared = !0;
        var t = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&compare=true",
            from: "user_ugc_qedit"
        };
        return n.shareConf(t);
    },
    callback_stem_focus: function(t) {
        this.setData({
            stemEditting: !0
        });
    },
    fixStemText: function(t) {
        var e = this.data, s = this.data.selectedItem, i = t.detail.value;
        return e.stemEditting = !0, i.length >= 1 && "\n" == i.substring(i.length - 1) && (e.stemEditting = !1, 
        i = i.substring(0, i.length - 1)), s.stem = i, e.selectedItem = s, e;
    },
    callback_stem_input: function(t) {
        var e = this.fixStemText(t);
        e.arrowSubmit = !this.check(e.selectedItem).text, this.setData(e);
    },
    callback_answer1_input: function(t) {
        var e = t.currentTarget.dataset.id, s = this.data.selectedItem, i = t.detail.value;
        s.answers || (s.answers = [ {}, {}, {}, {} ]), s.answers[e].title = i, this.setData({
            selectedItem: s,
            arrowSubmit: !this.check(s).text
        });
    },
    callback_stem_bindblur: function(t) {
        if (this.data.stemEditting) {
            var e = this.fixStemText(t);
            e.stemEditting = !1;
            var s = this.check(e.selectedItem);
            e.arrowSubmit = !s.text;
            e.timer++;
            this.setData(e);
        } else this.setData({
            arrowSubmit: !this.check(this.data.selectedItem).text
        });
    },
    callback_1_bindblur: function(t) {
        var e = t.currentTarget.dataset.id, s = this.data.selectedItem;
        s.answers || (s.answers = [ {}, {}, {}, {} ]), s.answers[e].editting = !1, this.setData({
            selectedItem: s,
            arrowSubmit: !this.check(s).text
        });
    },
    btn_submit_edit_clicked: function(i) {
        var l = this;
        if (!this.btnLock && i && i.detail && i.detail.formId && (s.SuperMode || "the formId is a mock one" != i.detail.formId)) {
            var r = this.check(this.data.selectedItem);
            r.text ? t.ShowConfirm("提示", r.text, null) : setTimeout(function() {
                var s = l.data.selectedItem;
                s.stem_simple = s.stem, s.status = 0, s.statusSetting = a.getQuestionStatus(0), 
                console.log(s.stem_simple), l.btnLock = !0;
                var r = 5 * (s.type - 1) + s.subject;
                s.answers || t.reportAnalytics_debug_log("提交题目时q.answers为空"), e.makeQuiz(s.type, r, s.stem, s.answers[0].title, s.answers[1].title, s.answers[2].title, s.answers[3].title, i.detail.formId, function(e, i) {
                    if (l.btnLock = !1, e) wx.showModal({
                        title: "提交失败",
                        content: e.errMsg,
                        showCancel: !1,
                        confirmText: "确定",
                        complete: null
                    }); else if (i) if (i.repetition) wx.showModal({
                        title: "提交失败",
                        content: "题库中已经有这个题目了。",
                        showCancel: !1,
                        confirmText: "确定",
                        complete: null
                    }); else if (i.failType > 0) switch (i.failType) {
                      case 1:
                        wx.showModal({
                            title: "敏感词提示",
                            content: "您的题目有敏感词语，自动进入未通过题库内，请您自检。",
                            showCancel: !1,
                            confirmText: "确定",
                            complete: function() {
                                a.setList2DeltaParam({
                                    page: 1,
                                    id: i.quizId
                                }), n.goto_ugc_list();
                            }
                        });
                    } else {
                        s.id = i.quizId;
                        var r = Date.parse(new Date(t.getServerTime()));
                        r /= 1e3, s.createdAt = r, a.setQuestionWithObj(s), a.setSelectedItem(null), l.submit = !0, 
                        l.setData({
                            isNew: !1,
                            selectedItem: s
                        }), wx.showModal({
                            title: "提交成功",
                            content: "感谢您的支持，请等待审核。",
                            showCancel: !1,
                            confirmText: "确定",
                            complete: function() {
                                n.goto_ugc_list();
                            }
                        });
                    }
                });
            }, 50);
        }
    },
    check: function(t) {
        var e = {}, i = t.stem ? t.stem.length : 0;
        if (t.type <= 0) e.text = "请选择本题类别", e.color = "#ed4045"; else if (t.subject <= 0) e.text = "请选择本题科目", 
        e.color = "#ed4045"; else if (i < s.StemMinWidth || i > s.StemMaxWidth) e.text = "请将题目长度限制在" + s.StemMinWidth + "字到" + s.StemMaxWidth + "字以内", 
        e.color = "#ed4045"; else if (t.answers[0].title.length <= 0) e.text = "请为本题填写正确答案", 
        e.color = "#ed4045"; else if (t.answers[1].title.length <= 0) e.text = "错误答案1不能为空", 
        e.color = "#ed4045"; else if (t.answers[2].title.length <= 0) e.text = "错误答案2不能为空", 
        e.color = "#ed4045"; else if (t.answers[3].title.length <= 0) e.text = "错误答案3不能为空", 
        e.color = "#ed4045"; else if (t.answers[0].title.length > s.AnswerMaxWidth) e.text = "请将正确答案内容限制在1到" + s.AnswerMaxWidth + "个字以内", 
        e.color = "#ed4045"; else if (t.answers[1].title.length > s.AnswerMaxWidth) e.text = "请将错误答案1内容限制在1到" + s.AnswerMaxWidth + "个字以内", 
        e.color = "#ed4045"; else if (t.answers[2].title.length > s.AnswerMaxWidth) e.text = "请将错误答案2内容限制在1到" + s.AnswerMaxWidth + "个字以内", 
        e.color = "#ed4045"; else if (t.answers[3].title.length > s.AnswerMaxWidth) e.text = "请将错误答案3内容限制在1到" + s.AnswerMaxWidth + "个字以内", 
        e.color = "#ed4045"; else for (var a = 0; a < this.data.selectedItem.answers.length; a++) {
            for (var n = this.data.selectedItem.answers[a], l = !1, r = a + 1; r < this.data.selectedItem.answers.length; r++) {
                var c = this.data.selectedItem.answers[r];
                if (n && c && n.title == c.title && !n.editting && !c.editting) {
                    e.text = "有相同备选答案", e.color = "#f00", l = !0;
                    break;
                }
            }
            if (l) break;
        }
        return e;
    },
    btn_help_clicked: function(t) {
        this.setData({
            showHelpView: !0
        });
    },
    btn_closeHelp_clicked: function(t) {
        this.setData({
            showHelpView: !1
        });
    },
    btn_reward_instant_clicked: function(t) {
        this.setData({
            showSubmitRewardView: !1
        }), wx.navigateBack({
            delta: 2
        });
    },
    btn_trySubmit_clicked: function(e) {
        var s = this.check(this.data.selectedItem);
        s.text ? t.ShowConfirm("提示", s.text, null) : this.setData({
            trySubmit: !0
        });
    },
    btn_cancelSubmit_clicked: function(t) {
        this.setData({
            trySubmit: !1
        });
    },
    warning_closed: function() {
        this.setData({
            err: null
        });
    }
});