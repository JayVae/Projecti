var e = require("./../util/util.js"), s = require("./../net/network.js"), n = require("./../const/consts.js"), a = require("./../const/modeConsts.js"), o = module.exports, i = "";

o.ShowLogin = function(e, o) {
    var t = {
        scene: e.scene
    };
    e.friendCode && i != e.friendCode && (i = e.friendCode, t.friendCode = i), t.appType = a.CurAppKey, 
    s.post(n.MessageHead.ShowLogin, {
        params: t,
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("show login failed。-" + e.errMsg), o(e);
        }
    });
}, o.getSubscribed = function(e) {
    s.get(n.MessageHead.GetSubscribed, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("GetSubscribed失败。-" + s.errMsg), e(s);
        }
    });
}, o.ListSeasonReward = function(e) {
    s.get(n.MessageHead.ListSeasonReward, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("listSeasonReward失败。-" + s.errMsg), e(s);
        }
    });
}, o.GetSeasonReward = function(e) {
    s.post(n.MessageHead.GetSeasonReward, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("getSeasonReward失败。-" + s.errMsg), e(s);
        }
    });
}, o.loginPivilege = function(e, a, o) {
    s.post(n.MessageHead.LoginPivilege, {
        params: {
            pivilege: e,
            isOpen: a
        },
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("loginPivilege失败。-" + e.errMsg), o(e);
        }
    });
}, o.shareStats = function(a, o) {
    s.post(n.MessageHead.ShareStats, {
        params: {
            way: a
        },
        success: function(s) {
            e.invokeCallback(o, null, s);
        },
        fail: function(s) {
            e.invokeCallback(o, s);
        }
    });
}, o.getQRPath = function(e) {
    s.get(n.MessageHead.GetQRPath, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("getQRPath失败。-" + s.errMsg), e(s);
        }
    });
}, o.updateMocha = function(e, a) {
    s.post(n.MessageHead.UpdateMocha, {
        params: {
            mocha: e
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("UpdateMocha失败。-" + e.errMsg), a(e);
        }
    });
};