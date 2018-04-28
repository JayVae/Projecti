require("./../util/util.js");

var e = require("./../net/network.js"), r = require("./../const/consts.js"), s = module.exports;

s.shopList = function(s, n) {
    e.get(r.MessageHead.ShopList, {
        params: {
            uid: s
        },
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("shopList失败。-" + e.errMsg), n(e);
        }
    });
}, s.createOrder = function(s, n) {
    e.post(r.MessageHead.CreateOrder, {
        params: {
            shopID: s
        },
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("createOrder失败。-" + e.errMsg), n(e);
        }
    });
}, s.platformOrder = function(s, n) {
    e.get(r.MessageHead.PlatformOrder, {
        params: {
            uid: s
        },
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("platformOrder失败。-" + e.errMsg), n(e);
        }
    });
}, s.gainOrder = function(s, n, o) {
    e.post(r.MessageHead.GainOrder, {
        params: {
            uid: s,
            orderIds: n
        },
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("platformOrder失败。-" + e.errMsg), o(e);
        }
    });
};