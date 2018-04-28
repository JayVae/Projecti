var n = require("./../../net/groupNet.js"), a = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), e = (require("./../../const/consts.js"), 
getApp());

Page({
    data: {
        championPlayers: [ {
            avatarUrl: "",
            gender: 0,
            level: 0,
            nickName: "牛逼",
            rank: 1,
            score: 100,
            uid: 0
        } ],
        listDataSource: [ {
            rank: 1,
            id: 2e4,
            name: "最炫牛逼群",
            score: 100
        } ],
        avatarList: []
    },
    callback_item_clicked: function(n) {},
    btn_back_clicked: function(n) {
        wx.navigateBack();
    },
    onLoad: function(e) {
        var t = this;
        a.showShareMenu(), n.groupRank(function(n, a) {
            if (a) {
                var e = a.list;
                e || (e = []);
                var r = [];
                if (a.firstPlayers) for (var o = 0; o < a.firstPlayers.length; o++) {
                    var i = a.firstPlayers[o];
                    r.length < 9 && r.push(i.avatarUrl);
                }
                0 == e.length && e.push({
                    id: -1
                }), t.setData({
                    championPlayers: a.firstPlayers,
                    listDataSource: e,
                    avatarList: r
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = {
            title: "本群智商榜在此，看看你排第几",
            path: "/page/login/login?friendCode=" + e.mainData.role.shareCode,
            from: "rank_global"
        };
        return e.shareConf(t, !1, function() {
            0 == e.mainData.role.groupInvite && n.groupInvite(function(n, a) {
                e.mainData.role.groupInvite = 1, wx.redirectTo({
                    url: "/page/groups/groups"
                });
            });
        });
    }
});