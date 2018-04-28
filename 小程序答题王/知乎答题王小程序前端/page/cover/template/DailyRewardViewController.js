function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var n = 0; n < a.length; n++) {
            var i = a[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(a, n, i) {
        return n && e(a.prototype, n), i && e(a, i), a;
    };
}(), n = require("./../../../util/util.js"), i = require("./../../../const/consts.js"), t = require("./../../../net/rewardNet"), r = require("./../../../net/messageNet"), s = require("./../../../data/ItemsManager.js"), o = require("./../../../util/Tween.js"), l = getApp(), u = function() {
    function u(a) {
        var o = this;
        e(this, u), this.page = a, this.page.dailyRewardView_onTapOKBtn = function(e) {
            o.btnLock || (o.btnLock = !0, t.gainSignIn(function(e, a) {
                e ? (40001 == e.errCode && (l.mainData.role.signIn.lastSignTime = Math.floor(n.getServerTime() / 1e3), 
                o.setVisible(!1)), n.ShowConfirm("", e.errMsg, function() {}), o.btnLock = !1) : (n.ShowConfirm("", "领取成功", function() {
                    o.btnLock = !1, o.setVisible(!1);
                }), s.addItem(a.itemId, a.itemNum), l.mainData.role.signIn.signNum = (l.mainData.role.signIn.signNum + 1) % 7, 
                l.mainData.role.signIn.lastSignTime = Math.floor(n.getServerTime() / 1e3), r.markStats(i.event_point.click_dailyReward, function() {}));
            }));
        };
    }
    return a(u, [ {
        key: "onShow",
        value: function() {
            l.uid > 0 ? this.checkDailyReward() : this.setVisible(!1);
        }
    }, {
        key: "checkDailyReward",
        value: function() {
            var e = getApp(), a = !1;
            e.isNewUser() ? a = !1 : 0 == e.mainData.role.signIn.lastSignTime ? a = !0 : 0 != e.mainData.role.signIn.lastSignTime && (a = new Date(n.getServerTime()).getDate() != new Date(1e3 * e.mainData.role.signIn.lastSignTime).getDate());
            var i = [];
            if (e.mainData.role.allSeeds.signinConfs) for (var t = e.mainData.role.allSeeds.signinConfs.length, r = 0; r < t; r++) {
                var s = e.mainData.role.allSeeds.signinConfs[r];
                i.push({
                    name: e.mainData.role.allSeeds.itemConfs[s.itemId].name,
                    id: s.itemId,
                    num: s.itemNum,
                    receive: r < e.mainData.role.signIn.signNum,
                    activate: r == e.mainData.role.signIn.signNum,
                    dayLabel: this.getDayLabel(r, e.mainData.role.signIn.signNum),
                    aniIcon: null
                });
            }
            var o = {};
            return o["dailyRewardViewData.visible"] = a, o["dailyRewardViewData.source"] = i, 
            this.page.setData(o), a;
        }
    }, {
        key: "getDayLabel",
        value: function(e, a) {
            if (e < a) return "已领";
            if (e == a) return "今天";
            switch (e - a) {
              case 1:
                return "明天";

              case 2:
                return "第3天";

              case 3:
                return "第4天";

              case 4:
                return "第5天";

              case 5:
                return "第6天";

              case 6:
                return "第7天";
            }
        }
    }, {
        key: "setVisible",
        value: function(e) {
            o.removeTweens("DailyReward");
            var a = {};
            a["dailyRewardViewData.visible"] = e, this.page.setData(a);
        }
    } ]), u;
}();

module.exports = u;