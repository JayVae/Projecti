function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = require("./../const/consts.js"), a = require("./../util/util.js"), o = void 0, r = function() {
    function r() {
        e(this, r);
        var t = a.getStorageSync("newItem"), n = a.getStorageSync("newKnowledge");
        this.newItem = t || {}, this.newKnowledge = n || {};
    }
    return t(r, [ {
        key: "init",
        value: function(e) {
            o = e;
        }
    }, {
        key: "test_initSeeds",
        value: function() {
            o.mainData.role.allSeeds.itemConfs = {
                201004: {
                    id: 201004,
                    type: "福袋",
                    typeId: 1,
                    selfId: 4,
                    name: "大福袋",
                    desc: "使用后能够开出6件随机物品"
                },
                202001: {
                    id: 202001,
                    type: "兑换品",
                    typeId: 2,
                    selfId: 1,
                    name: "一袋金币",
                    desc: "使用后获得100金币"
                }
            };
        }
    }, {
        key: "hasAnyItems",
        value: function() {
            var e = o.mainData.role.items;
            if (e) for (var t in e) return !0;
            return !1;
        }
    }, {
        key: "hasAnyKnowledge",
        value: function() {
            if (o.mainData.role.knowInfo) for (var e in o.mainData.role.knowInfo) {
                if (o.mainData.role.knowInfo[e].level > 0) return !0;
                if (o.mainData.role.items) {
                    var t = this.getBookSeedIDBySelfId(e);
                    if ((o.mainData.role.items[t] || 0) > 0) return !0;
                }
            }
            return !1;
        }
    }, {
        key: "getItemInfos",
        value: function() {
            var e = [];
            for (var t in o.mainData.role.items) {
                var a = o.mainData.role.items[t] || 0, r = o.mainData.role.allSeeds.itemConfs[t];
                if (r) {
                    var i = r.typeId;
                    a > 0 && i > n.ItemType.gold && i < n.ItemType.book && e.push({
                        id: t,
                        num: a,
                        name: r.name,
                        desc: r.desc,
                        newCount: this.getNewItemCount(t)
                    });
                }
            }
            return e;
        }
    }, {
        key: "getItemDetail",
        value: function(e) {
            var t = {};
            t.num = o.mainData.role.items[e] || 0;
            var n = o.mainData.role.allSeeds.itemConfs[e];
            return t = a.assign(t, n);
        }
    }, {
        key: "getBookSeedIDBySelfId",
        value: function(e) {
            for (var t in o.mainData.role.allSeeds.itemConfs) {
                var a = o.mainData.role.allSeeds.itemConfs[t];
                if (a.selfId == e && a.typeId == n.ItemType.book) return a.id;
            }
            return 0;
        }
    }, {
        key: "getItemCount",
        value: function(e) {
            var t = o.mainData.role.items;
            return t && t[e] > 0 ? t[e] : 0;
        }
    }, {
        key: "subItem",
        value: function(e, t) {
            var n = o.mainData.role.items[e] || 0;
            o.mainData.role.items[e] = Math.max(0, n - t);
        }
    }, {
        key: "addItem",
        value: function(e, t) {
            if (2e5 != e) {
                o.mainData.role.items || (o.mainData.role.items = {});
                var n = o.mainData.role.items[e] || 0;
                o.mainData.role.items[e] = n ? n + t : t, this.addNewItemCount(e, t), o.eventDispatcher.dispatchEventWith("onHasNewItem");
            } else o.updateGold(o.mainData.role.gold + t);
        }
    }, {
        key: "getNewItemCount",
        value: function(e) {
            return ~~this.newItem[e];
        }
    }, {
        key: "getNewKnowledgeCount",
        value: function(e) {
            return ~~this.newKnowledge[e];
        }
    }, {
        key: "addNewItemCount",
        value: function(e, t) {
            if (2e5 != e && !(t <= 0)) {
                var o = this.getItemDetail(e);
                o && (o.typeId == n.ItemType.book ? (this.newKnowledge[e] ? this.newKnowledge[e] += t : this.newKnowledge[e] = t, 
                a.setStorageSync("newKnowledge", this.newKnowledge)) : (this.newItem[e] ? this.newItem[e] += t : this.newItem[e] = t, 
                a.setStorageSync("newItem", this.newItem)));
            }
        }
    }, {
        key: "clearNewItemCount",
        value: function(e) {
            if (2e5 != e) {
                var t = this.getItemDetail(e);
                t && (t.typeId == n.ItemType.book ? (delete this.newKnowledge[e], a.setStorageSync("newKnowledge", this.newKnowledge)) : (delete this.newItem[e], 
                a.setStorageSync("newItem", this.newItem)));
            }
        }
    }, {
        key: "allClearNewItemCount",
        value: function() {
            this.newItem = {}, a.setStorageSync("newItem", this.newItem);
        }
    }, {
        key: "allClearNewKnowledgeCount",
        value: function() {
            this.newKnowledge = {}, a.setStorageSync("newKnowledge", this.newKnowledge);
        }
    }, {
        key: "getKnowInfos",
        value: function() {
            var e = 15;
            try {
                e = o.mainData.role.gameConf.knowMaxLevel;
            } catch (e) {
                a.reportAnalytics_Try(e);
            }
            for (var t = [], r = 0; r < 6; r++) {
                var i = {};
                switch (r) {
                  case 0:
                    i.title = "文科", i.color = n.book_color[r];
                    break;

                  case 1:
                    i.title = "理科", i.color = n.book_color[r];
                    break;

                  case 2:
                    i.title = "文艺", i.color = n.book_color[r];
                    break;

                  case 3:
                    i.title = "流行", i.color = n.book_color[r];
                    break;

                  case 4:
                    i.title = "娱乐", i.color = n.book_color[r];
                    break;

                  case 5:
                    i.title = "生活", i.color = n.book_color[r];
                }
                i.index = r, i.items = [], t.push(i);
            }
            for (var l in o.mainData.role.knowInfo) {
                var s = this.getBookSeedIDBySelfId(l), u = parseInt(l) - 1, m = o.mainData.role.knowInfo[l], c = {};
                (c = a.assign(c, m)).bookNum = this.getItemCount(s);
                var f = o.mainData.role.allSeeds.itemConfs[s];
                (c = a.assign(c, f)).newCount = this.getNewKnowledgeCount(s), c.goldEnough = c.needGold <= o.mainData.role.gold, 
                c.levelMax = c.level >= e, c.desc = c.level < e ? "" + c.desc + c.curUp + "% > " + c.nextUp + "%" : "已经升到最高级！" + c.name + "类题目提高答对得分" + c.curUp + "%";
                var w = t[u = parseInt(u / 5)].items;
                w.push(c), t[u].row = Math.ceil(w.length / 2);
            }
            for (var d = t.length - 1; d >= 0; d--) 0 != t[d].items.length || t.splice(d, 1);
            return t;
        }
    }, {
        key: "refreshChangciBuffVal",
        value: function(e) {
            o.mainData.role.buff = e;
        }
    }, {
        key: "getExpBuffer",
        value: function() {
            return 0;
        }
    }, {
        key: "getGoldBffer",
        value: function() {
            return 0;
        }
    }, {
        key: "getScoreBuffer",
        value: function() {
            return 0;
        }
    }, {
        key: "haveNewHandItemCanBuy",
        value: function() {
            return !(o.mainData.role.purchaseCount && o.mainData.role.purchaseCount[502001] > 0);
        }
    }, {
        key: "refreshPurchaseCount",
        value: function(e) {
            o.mainData.role.purchaseCount || (o.mainData.role.purchaseCount = {}), o.mainData.role.purchaseCount[e] || (o.mainData.role.purchaseCount[e] = 0), 
            o.mainData.role.purchaseCount[e]++;
        }
    }, {
        key: "newItemCount",
        get: function() {
            var e = 0;
            if (this.newItem) for (var t in this.newItem) this.newItem[t] && (e += this.newItem[t]);
            return e;
        }
    }, {
        key: "newKnowledgeCount",
        get: function() {
            var e = 0;
            if (this.newKnowledge) for (var t in this.newKnowledge) this.newKnowledge[t] && (e += this.newKnowledge[t]);
            return e;
        }
    } ]), r;
}();

module.exports = new r();