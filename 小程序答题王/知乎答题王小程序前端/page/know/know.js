var e = require("../../data/ItemsManager.js"), t = require("../../net/itemNet.js"), o = (require("../../const/consts.js"), 
require("../../util/util.js")), n = require("../../util/Tween.js"), a = require("../pve/template/PveWatchdogController.js"), i = getApp();

Page({
    data: {
        groups: [],
        aniGroups: [],
        itemSelected: null,
        newKnow: null
    },
    onLoad: function(t) {
        var i = this;
        this.watchdogController = new a(this), o.showShareMenu();
        var l = e.getKnowInfos();
        this.setData({
            groups: l
        }), console.log(this.data.groups);
        var c = n.fastGet("know");
        c.wait(500);
        for (var s = 0; s < l.length; s++) !function(e) {
            c.call(function() {
                var t = i.data.aniGroups, o = wx.createAnimation({
                    duration: 400,
                    timingFunction: "step-start",
                    transformOrigin: "100% 0"
                });
                o.opacity(1).rotate(0).step(), t[e] = o.export(), i.setData({
                    aniGroups: t
                });
            });
        }(s);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        n.removeTweens("know"), e.allClearNewKnowledgeCount();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this;
        if (e && e.target && "noMoneyShare" == e.target.id) {
            var o = {
                title: "本群知乎答题王段位排行在此，看看你能排第几？",
                path: "/page/login/login?friendCode=" + i.mainData.role.shareCode + "&compare=true",
                from: "pve"
            };
            return i.shareConf(o, !1, function() {
                var e = {};
                e["pveWatchdog.visible"] = !1, t.setData(e);
            });
        }
        var n = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + i.mainData.role.shareCode + "&compare=true",
            from: "know"
        };
        return i.shareConf(n);
    },
    callback_booknone_goshop_clicked: function() {
        var e = this;
        this.setData({
            showBookNone: !1
        }), wx.navigateTo({
            url: "../../page/shop/shop",
            complete: function() {
                setTimeout(function() {
                    e.btnLock = !1;
                }, 500);
            }
        });
    },
    callback_booknone_close_clicked: function() {
        this.setData({
            itemSelected: null,
            showBookNone: !1
        });
    },
    callback_nomoney_close_clicked: function() {
        this.setData({
            itemSelected: null,
            showNoMoney_share: !1,
            showNoMoney_shop: !1
        });
    },
    callback_nomoney_shop_clicked: function() {
        var e = this;
        this.setData({
            showNoMoney_shop: !1
        }), wx.navigateTo({
            url: "../../page/shop/shop",
            complete: function() {
                setTimeout(function() {
                    e.btnLock = !1;
                }, 500);
            }
        });
    },
    callback_use_clicked: function(n) {
        var a = this;
        if (this.data.itemSelected) if (i.mainData.role.gold < this.data.itemSelected.needGold) this.watchdogController.onKnowUplevelClicked(); else if (this.data.itemSelected.bookNum < this.data.itemSelected.needBook) this.setData({
            showBookNone: !0
        }); else if (!this.isSending) {
            var l = this.data.itemSelected;
            this.isSending = !0, console.log("use" + l.selfId), t.upgradeKnow(l.selfId, function(t, n) {
                if (t) return a.isSending = !1, void o.ShowToast(t.errMsg);
                e.subItem(l.id, l.needBook);
                var c = i.mainData.role.knowInfo[l.selfId];
                c.curUp = n.curUp, c.level = n.level, c.needBook = n.needBook, c.needGold = n.needGold, 
                c.nextUp = n.nextUp, i.updateGold(i.mainData.role.gold - l.needGold);
                var s = {};
                s.groups = e.getKnowInfos(), s.newKnow = a.data.itemSelected, s.itemSelected = null, 
                s.newKnow.callback_uplevel_back_clicked = "callback_uplevel_back_clicked", a.setData(s);
            });
        }
    },
    callback_uplevel_back_clicked: function() {
        this.setData({
            newKnow: null
        }), this.isSending = !1;
    },
    callback_item_clicked: function(t) {
        if (!this.isSending) {
            var o = t.currentTarget.dataset.id;
            e.clearNewItemCount(o);
            for (var n = e.getKnowInfos(), a = null, i = 0; i < this.data.groups.length; i++) {
                for (var l = this.data.groups[i], c = 0; c < l.items.length; c++) {
                    var s = l.items[c];
                    if (s.id == o) {
                        a = s;
                        break;
                    }
                }
                if (a) break;
            }
            a.callback_back_clicked = "callback_back_clicked", a.callback_use_clicked = "callback_use_clicked", 
            this.setData({
                groups: n,
                itemSelected: a
            });
        }
    },
    callback_back_clicked: function() {
        this.isSending || this.setData({
            itemSelected: null
        });
    }
});