var t = require("./../../../data/MyQuestionsManager.js"), e = require("./../../../util/Tween.js"), n = require("./../../../util/util.js"), l = getApp();

Page({
    data: {
        typeList: t.getTypeList(),
        subjectList: null,
        leveList: t.getLeveList(),
        selectedItem: null,
        showHelp: !1,
        anis_type: [ null, null, null, null, null, null ],
        ani_subject_panel: null,
        ani_subject_list: null,
        anis_subject: [ null, null, null, null, null, null ],
        ani_btn_continue: null
    },
    onLoad: function(t) {
        n.showShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var n = this, l = t.getSelectedItem();
        l && function() {
            var t = {
                selectedItem: l
            };
            n.setData(t);
            var a = e.fastGet("ugc_setting"), i = [ null, null, null, null, null, null ], s = n.data.anis_type;
            a.wait(500);
            for (var u = 0; u < s.length; u++) !function(t) {
                a.wait(100), a.call(function() {
                    i[t] = wx.createAnimation({
                        timingFunction: "ease-out"
                    }), i[t].opacity(1).rotate(0).step({
                        duration: 400
                    }), s[t] = i[t].export(), n.setData({
                        anis_type: s
                    });
                });
            }(u);
        }();
    },
    onHide: function() {},
    onUnload: function() {
        e.removeTweens("ugc_setting"), this.setData({
            subjectList: null
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        this.shared = !0;
        var t = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + l.mainData.role.shareCode + "&compare=true",
            from: "user_ugc_qsetting"
        };
        return l.shareConf(t);
    },
    item_type_clicked: function(n) {
        var l = this, a = n.currentTarget.dataset.id, i = t.getSubjectList(a), s = e.fastGet("ugc_setting");
        s.wait(50);
        for (var u = [ null, null, null, null, null, null ], c = this.data.anis_subject, o = 0; o < c.length; o++) !function(t) {
            s.wait(100), s.call(function() {
                u[t] = wx.createAnimation({
                    timingFunction: "ease-out"
                }), u[t].opacity(1).rotate(0).step({
                    duration: 400
                }), c[t] = u[t].export(), l.setData({
                    anis_subject: c
                });
            });
        }(o);
        var r = this.data.selectedItem || t.getNewQuestion();
        r.type = a, r.typeText = this.data.typeList[a - 1].title, r.subject = 0, r.subjectText = null, 
        r.level = 0, r.levelText = null, this.setData({
            subjectList: i,
            selectedItem: r
        });
    },
    item_subject_clicked: function(t) {
        var e = t.currentTarget.dataset.id, n = this.data.selectedItem;
        n.level = 0, n.levelText = null, n.subject = e, n.subjectText = this.data.subjectList[e - 1].title, 
        this.setData({
            selectedItem: n
        });
    },
    item_level_clicked: function(t) {
        var e = t.currentTarget.dataset.id, n = this.data.selectedItem;
        n.level = e, n.levelText = this.data.leveList[e - 1].title, this.setData({
            selectedItem: n
        });
    },
    btn_goon_clicked: function(e) {
        t.setSelectedItem(this.data.selectedItem), wx.navigateTo({
            url: "../../../page/ugc/ugc_qedit/ugc_qedit"
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
    callback_subjectsForm_closed: function(t) {
        e.fastGet("ugc_setting");
        for (var n = [ null, null, null, null, null, null ], l = this.data.anis_subject, a = 0; a < l.length; a++) l[a] = wx.createAnimation().export();
        this.setData({
            anis_subject: n,
            selectedItem: null
        });
    }
});