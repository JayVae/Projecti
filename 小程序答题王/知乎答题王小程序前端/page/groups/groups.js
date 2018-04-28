var o = require("./../../net/groupNet.js"), e = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), t = (require("./../../const/consts.js"), 
getApp());

Page({
    data: {
        requesting: !1,
        roleInfo: {},
        iq: 199,
        listDataSource: []
    },
    callback_item_clicked: function(o) {
        var e = this;
        if (!this.btnLock) {
            var t = o.currentTarget.dataset.id;
            if (t < 0) {
                var n = "../../page/my_group/my_group?groupId=-1";
                console.log("groups.callback_item_clicked url" + n), this.btnLock = !0, wx.navigateTo({
                    url: n,
                    complete: function() {
                        setTimeout(function() {
                            e.btnLock = !1;
                        }, 500);
                    }
                });
            } else for (var a = 0; a < this.data.listDataSource.length; a++) {
                var r = this.data.listDataSource[a];
                if (r.id == t) {
                    var i = "../../page/my_group/my_group?groupId=" + r.id + "&groupName=" + r.name + "&openGId=" + r.openGId;
                    return console.log("groups.callback_item_clicked url" + i, r), this.btnLock = !0, 
                    void wx.navigateTo({
                        url: i,
                        complete: function() {
                            setTimeout(function() {
                                e.btnLock = !1;
                            }, 500);
                        }
                    });
                }
            }
        }
    },
    btn_global_clicked: function(o) {
        wx.navigateTo({
            url: "../../page/rank_global/rank_global"
        });
    },
    onLoad: function(o) {
        e.showShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var n = this;
        this.setData({
            requesting: !0,
            roleInfo: t.mainData.role
        }), e.showLoading("加载中..."), o.selfGroupRank(function(o, a) {
            if (a) {
                var r = [];
                if (a.list) {
                    (r = a.list).sort(function(o, e) {
                        return o.rank - e.rank;
                    });
                    for (var i = 0; i < r.length; i++) {
                        var u = r[i];
                        u.name = e.formatGroupName(u.name);
                    }
                }
                0 == r.length && t.mainData.role.groupInvite > 0 && r.push({
                    rank: 0,
                    id: -1,
                    name: "等待好友响应...",
                    score: 0,
                    roleNum: 1,
                    openGId: ""
                }), r.length > 0 ? n.setData({
                    iq: a.selfScore,
                    listDataSource: r
                }) : wx.redirectTo({
                    url: "/page/rank_global/rank_global"
                });
            }
            n.setData({
                requesting: !1
            }), e.hideLoading();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        var e = {
            title: "本群智商榜在此，看看你排第几",
            path: "/page/login/login?friendCode=" + t.mainData.role.shareCode,
            from: "groups"
        };
        return t.shareConf(e);
    }
});