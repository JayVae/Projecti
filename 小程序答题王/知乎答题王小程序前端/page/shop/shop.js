var e = require("./../../net/shopNet.js"), a = require("./../../data/ItemsManager.js"), t = require("./../../util/util.js"), i = (require("./../../const/consts.js"), 
getApp()), n = {
    data: {
        newHandItem: null,
        goodsArray: [],
        roleInfo: {
            userInfo: null
        },
        isShopClosed: "",
        IOSPayViewRight: -400,
        rewardEXData: {
            visible: !1
        },
        itemSelected: null
    },
    callback_item_clicked: function(e) {
        if (!this.btnLock) {
            var a = e.currentTarget.dataset.pid, t = !0, i = !1, n = void 0;
            try {
                for (var o, r = this.data.goodsArray[Symbol.iterator](); !(t = (o = r.next()).done); t = !0) {
                    var c = o.value;
                    if (c.id == a) return void this.setData({
                        itemSelected: c
                    });
                }
            } catch (e) {
                i = !0, n = e;
            } finally {
                try {
                    !t && r.return && r.return();
                } finally {
                    if (i) throw n;
                }
            }
        }
    },
    callback_back_clicked: function() {
        this.setData({
            itemSelected: null
        });
    },
    callback_newHanditem_clicked: function() {
        this.btnLock || this.setData({
            itemSelected: this.data.newHandItem
        });
    },
    pay: function(e) {
        this.createOrder(e.id);
    },
    createOrder: function(a) {
        var t = this;
        e.createOrder(a, function(e, i) {
            console.log("id = " + a, i), t.btnLock = !1, e ? wx.showModal({
                title: "购买失败",
                content: e.errMsg,
                showCancel: !1,
                confirmText: "确定"
            }) : t.requestPayment(i);
        });
    },
    requestPayment: function(e) {
        var n = this;
        wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: e.signType,
            paySign: e.paySign,
            success: function(e) {
                switch (n.data.itemSelected.typeId) {
                  case 1:
                    t.ShowToast("支付成功，获得金币" + n.data.itemSelected.num);
                    var o = i.mainData.role.gold + n.data.itemSelected.num;
                    i.updateGold(o), console.log("购买成功后 gold = " + i.mainData.role.gold), n.setData({
                        roleInfo: i.mainData.role
                    });
                    break;

                  case 2:
                    t.ShowToast("支付成功，获得" + n.data.itemSelected.name), a.addItem(n.data.itemSelected.itemId, n.data.itemSelected.num);
                }
                a.refreshPurchaseCount(n.data.itemSelected.id), n.refreshView(n.data);
            },
            fail: function(e) {
                t.ShowToast("支付失败");
            },
            complete: function(e) {
                console.log("支付完成");
            }
        });
    },
    onLoad: function(a) {
        var n = this;
        t.showShareMenu(), i.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        e.shopList(i.mainData.role.uid, function(e, a) {
            n.data = a, n.refreshView(a);
        });
    },
    refreshView: function(e) {
        e = e || {};
        var t = [], n = null;
        for (var o in e.goods) "502001" == e.goods[o].id ? a.haveNewHandItemCanBuy() && ((n = e.goods[o]).callback_back_clicked = "callback_back_clicked", 
        n.callback_use_clicked = "callback_use_clicked") : (e.goods[o].callback_back_clicked = "callback_back_clicked", 
        e.goods[o].callback_use_clicked = "callback_use_clicked", t.push(e.goods[o]));
        this.setData({
            newHandItem: n,
            goodsArray: t,
            shareRewardText: i.getShareRewardText()
        });
    },
    callback_use_clicked: function() {
        this.btnLock = !0, this.pay(this.data.itemSelected);
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            roleInfo: i.mainData.role,
            isShopClosed: this.getShopClosedDesc()
        }), this.playIOSPayViewAni(i.mainData.isIOS && 2 == i.mainData.role.gameConf.pay && i.mainData.role.gameConf.iosPay && i.mainData.role.level >= 6);
    },
    onHide: function() {},
    onUnload: function() {
        i.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.platformOrderTimeout && (clearTimeout(this.platformOrderTimeout), this.platformOrderTimeout = void 0);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        this.shared = !0;
        var a = {
            path: "/page/login/login?friendCode=" + i.mainData.role.shareCode + "&compare=true",
            from: "shop"
        };
        return i.shareConf(a);
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : i.getShareRewardText()
        });
    },
    getShopClosedDesc: function() {
        i.mainData.role.gameConf || (i.mainData.role.gameConf = {
            pay: 2
        });
        var e = i.mainData.role.level >= 3 && 0 != i.uid;
        switch (i.mainData.role.gameConf.pay) {
          case 0:
            return e ? [] : [ "等级不足" ];

          case 1:
            return [ "暂未开放支付", "更多精彩 敬请期待" ];

          case 2:
            return i.mainData.isIOS ? [ "暂未开放支付", "更多精彩 敬请期待" ] : e ? [] : [ "等级不足" ];
        }
        return [ "商店维护中", "敬请期待" ];
    },
    playIOSPayViewAni: function(e) {
        var a = this;
        e ? this.IOSPayViewAniTimeout || (this.IOSPayViewAniTimeout = setTimeout(function() {
            a.IOSPayViewAniTimeout = void 0, a.setData({
                IOSPayViewRight: -36
            });
        }, 500)) : (this.IOSPayViewAniTimeout && (clearTimeout(this.IOSPayViewAniTimeout), 
        this.IOSPayViewAniTimeout = void 0), this.setData({
            IOSPayViewRight: -400
        }));
    },
    onTapIOSPayView: function(e) {
        i.checkPayNum = 3;
    },
    addPayItem: function(e, a, t) {
        var n = i.mainData.role.allSeeds.itemConfs[a], o = void 0, r = !0, c = !1, s = void 0;
        try {
            for (var l, d = e[Symbol.iterator](); !(r = (l = d.next()).done); r = !0) {
                var u = l.value;
                if (u.itemId == a) {
                    u.itemNum += t, o = u;
                    break;
                }
            }
        } catch (e) {
            c = !0, s = e;
        } finally {
            try {
                !r && d.return && d.return();
            } finally {
                if (c) throw s;
            }
        }
        o || (o = {
            name: n.name,
            itemId: a,
            itemNum: t
        }, e.push(o));
    }
};

Page(n);