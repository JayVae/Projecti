var e = require("../../data/ItemsManager.js"), t = require("../../net/itemNet.js"), a = require("../../const/consts.js"), i = require("../../util/util.js"), l = require("../../util/ShakeController.js"), n = getApp();

Page({
    data: {
        notNull: !1,
        myItems: [],
        itemSelected: null,
        itemsFormFudai: null
    },
    onLoad: function(e) {
        i.showShareMenu(), this.shakeController = new l(this);
    },
    onReady: function() {},
    onShow: function() {
        var t = e.getItemInfos(), a = t && t.length > 0;
        this.setData({
            myItems: t,
            notNull: a
        });
    },
    onHide: function() {},
    onUnload: function() {
        this.shakeController.stop(), e.allClearNewItemCount();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&compare=true",
            from: "items"
        };
        return n.shareConf(t);
    },
    getSelectedItem: function(t) {
        var a = e.getItemDetail(t);
        return a.num > 0 ? (a.callback_back_clicked = "callback_back_clicked", a.callback_use_clicked = "callback_use_clicked", 
        a) : null;
    },
    callback_item_clicked: function(t) {
        var a = this, i = t.currentTarget.dataset.id;
        e.clearNewItemCount(i);
        var l = e.getItemInfos(), n = this.getSelectedItem(i);
        this.setData({
            itemSelected: n,
            myItems: l
        }), this.isGoldBag(i) && this.data.itemSelected.num > 0 && this.shakeController.shake(function() {
            a.tryUse(!1);
            var e = {};
            e["itemSelected.ani_form"] = "shake-Z", a.setData(e), setTimeout(function() {
                if (a.data.itemSelected) {
                    var e = {};
                    e["itemSelected.ani_form"] = "", a.setData(e);
                }
            }, 1e3);
        });
    },
    isGoldBag: function(e) {
        return e >= 202001 && e <= 202006;
    },
    tryUse: function(l) {
        var s = this;
        if (this.data && this.data.itemSelected && !this.data.isSending) {
            var o = this.data.itemSelected;
            this.setData({
                isSending: !0
            }), this.isGoldBag(o.id) && (l = !1), console.log("use" + o.id), t.use(o.id, function(t, c) {
                if (setTimeout(function() {
                    s.setData({
                        isSending: !1
                    });
                }, 200), t) i.ShowToast("物品使用失败"); else {
                    e.subItem(o.id, 1);
                    var d = {};
                    switch (o.typeId) {
                      case a.ItemType.buff:
                        var r = o.desc || "", u = r.indexOf("下"), m = r.indexOf("，"), f = r.substring(0, (u > 0 ? u : m) + 1), h = r.indexOf("小时"), k = r.indexOf("场"), g = r.substring(h > 0 ? h + 2 : k), I = i.getServerTime() / 1e3;
                        r = "" + f + (h > 0 ? i.formatTime(c.Buff.curVal - I) : c.Buff.curVal) + g, i.ShowToast("使用成功"), 
                        n.mainData.role.buff || (n.mainData.role.buff = {}), n.mainData.role.buff["" + o.selfId] = c.Buff.curVal;
                        break;

                      case a.ItemType.luckyBag:
                        for (var S = [], _ = 0; _ < c.items.length; _++) {
                            var b = c.items[_];
                            e.addItem(b.itemId, b.itemNum);
                            for (var v = null, D = 0; D < S.length; D++) {
                                var p = S[D];
                                if (p.id == b.itemId) {
                                    v = p;
                                    break;
                                }
                            }
                            if (v) v.num += b.itemNum; else {
                                if (v = e.getItemDetail(b.itemId), v.num = b.itemNum, 4 == v.typeId) {
                                    var y = Math.floor((v.selfId - 1) / 5);
                                    v.color = a.book_color[y];
                                }
                                S.push(v);
                            }
                        }
                        s.fudai = o;
                        var w = {
                            items: S,
                            fudai_id: o.id,
                            fudai_name: o.name,
                            callback_fudaiBack_clicked: "callback_fudaiBack_clicked"
                        };
                        d.itemsFormFudai = w;
                        break;

                      case a.ItemType.exchange:
                        var B = c.gold;
                        wx.showToast({
                            title: "金币+" + B,
                            duration: 1e3
                        }), n.updateGold(n.mainData.role.gold + B);
                    }
                    var C = e.getItemInfos();
                    d.myItems = C, d.notNull = C && C.length > 0, d.itemSelected = l ? null : s.getSelectedItem(s.data.itemSelected.id), 
                    s.setData(d);
                }
            });
        }
    },
    callback_use_clicked: function() {
        this.tryUse(!0);
    },
    callback_back_clicked: function() {
        this.data.isSending || (this.setData({
            itemSelected: null
        }), this.shakeController.stop());
    },
    callback_fudaiBack_clicked: function() {
        this.fudai && (this.fudai = this.getSelectedItem(this.fudai.id), this.setData({
            itemsFormFudai: null,
            itemSelected: this.fudai
        }));
    }
});