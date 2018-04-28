function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var o = a[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(a, t, o) {
        return t && e(a.prototype, t), o && e(a, o), a;
    };
}(), t = require("./../../../util/util.js"), o = (require("./../../../const/consts.js"), 
require("./../../../data/ItemsManager.js"), require("./../../../util/Tween.js"), 
getApp()), n = function() {
    function n(a) {
        var i = this;
        e(this, n), this.page = a, this.page.onPveWatchdog_closed = function() {
            var e = {};
            e["pveWatchdog.visible"] = !1, i.page.setData(e);
        }, this.page.onPveWatchdog_gotoShop = function() {
            var e = {};
            e["pveWatchdog.visible"] = !1, i.page.setData(e), i.page.btnLock = !0, wx.navigateTo({
                url: "../../page/shop/shop",
                complete: function() {
                    setTimeout(function() {
                        i.page.btnLock = !1;
                    }, 500);
                }
            });
        }, this.page.onPveWatchdog_gotoDraw = function() {
            o.mainData.bankShining = !0;
            var e = {};
            e["pveWatchdog.visible"] = !1, i.page.setData(e), o.gotoCover(function() {}, function() {});
        }, this.page.onPveWatchdog_gotoPve = function(e) {
            var a = e.currentTarget.dataset.stageId - 300001, n = 184 * a / o.mainData.dpr;
            t.log("====index:" + a, "px:" + n);
            var r = {};
            r["pveWatchdog.visible"] = !1, r["pvePickerViewData.scrollTop"] = n, i.page.setData(r);
        };
    }
    return a(n, [ {
        key: "onShow",
        value: function() {}
    }, {
        key: "onKnowUplevelClicked",
        value: function() {
            var e = {};
            if (e.pveWatchdog = {
                visible: !1,
                youCanShare: !1,
                youCanDraw: !1,
                youShopping: !1,
                money2MaxDan: null
            }, o.hasSharedWidhReward()) {
                var a = o.getBankState(), t = o.getCurBankGold();
                a && t > 0 ? (e["pveWatchdog.visible"] = !0, e["pveWatchdog.youCanDraw"] = !0) : (e["pveWatchdog.visible"] = !0, 
                e["pveWatchdog.youShopping"] = !0);
            } else e["pveWatchdog.visible"] = !0, e["pveWatchdog.youCanShare"] = !0, e["pveWatchdog.shareRewardNum"] = o.getShareRewardNum();
            this.page.setData(e);
        }
    }, {
        key: "onPveGateClicked",
        value: function(e) {
            var a = {};
            if (a.pveWatchdog = {
                visible: !1,
                youCanShare: !1,
                youCanDraw: !1,
                youShopping: !1,
                money2MaxDan: null
            }, o.hasSharedWidhReward()) {
                var t = o.getBankState(), n = o.getCurBankGold();
                if (t && n > 0) a["pveWatchdog.visible"] = !0, a["pveWatchdog.youCanDraw"] = !0; else {
                    for (var i = !1, r = o.mainData.role.matchInfo.length - 1; r >= 0; r--) {
                        var g = o.mainData.role.matchInfo[r];
                        if (o.mainData.role.gold >= g.fee) {
                            a["pveWatchdog.visible"] = !0, a["pveWatchdog.money2MaxDan"] = {
                                id: g.id,
                                kuang: r - 5 + 205001,
                                name: g.name
                            }, i = !0;
                            break;
                        }
                    }
                    i || (a["pveWatchdog.visible"] = !0, a["pveWatchdog.youShopping"] = !0);
                }
            } else a["pveWatchdog.visible"] = !0, a["pveWatchdog.youCanShare"] = !0, a["pveWatchdog.shareRewardNum"] = o.getShareRewardNum();
            this.page.setData(a);
        }
    } ]), n;
}();

module.exports = n;