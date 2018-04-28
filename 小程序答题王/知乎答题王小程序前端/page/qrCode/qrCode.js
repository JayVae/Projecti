var t = require("./../../net/friendNet.js"), e = require("../../const/consts.js"), a = require("../../util/util.js"), n = require("./../../util/QRCodeCreater.js"), o = require("./../../net/messageNet.js"), r = require("./../../net/roleNet.js"), s = getApp(), i = [ "虽然文科不太好", "虽然对宇宙认识不深", "虽然没啥文艺范儿", "虽然没追上潮流", "虽然不怎么熟悉娱乐圈", "虽然生活阅历不太多" ], f = [ "但是个文科学霸", "但是上知天文下知地理", "但仍是个文艺青年", "但是永远站在流行前沿", "但影视歌动漫游门儿清", "但是生活阅历相当丰富" ], c = {
    data: {},
    onLoad: function(e) {
        var o = this;
        this.QRCodeCreater = new n(this), this.setData({
            screenWidth: s.systemInfo.windowWidth,
            screenHeight: s.systemInfo.windowHeight
        }), a.showShareMenu(), t.findFriend(s.uid, function(t, e) {
            if (t) console.warn("findFriend err", t); else if (e) {
                for (var n = 1, r = 6, c = e.scoreStats[1], l = e.scoreStats[6], u = 1; u <= 6; u++) e.scoreStats[u] > c && (n = u, 
                c = e.scoreStats[u]);
                for (var h = 6; h >= 1; h--) e.scoreStats[h] < l && (r = h, l = e.scoreStats[h]);
                o.setData({
                    text1: i[r - 1],
                    text2: f[n - 1]
                }), a.cacheFile("Avatar", s.mainData.role.userInfo.avatarUrl, function(t) {
                    o.avatarUrl = t || "../../image/qr/avatar.png", o.draw(e);
                });
            }
        });
    },
    draw: function(t) {
        if (t) {
            var e = t, n = {};
            if (n.roleInfo = e, t.scoreStats) {
                var o = t.scoreStats[1], r = t.scoreStats[2], s = t.scoreStats[3], i = t.scoreStats[4], f = t.scoreStats[5], c = t.scoreStats[6];
                o = o || 0, r = r || 0, s = s || 0, i = i || 0, f = f || 0, c = c || 0, e.userInfo ? (n.roleInfo.userInfo = a.assign({}, n.roleInfo.userInfo), 
                n.roleInfo.userInfo.nickName = e.userInfo.nickName) : (e.userInfo = {}, e.userInfo.nickName = e.nickName, 
                e.userInfo.avatarUrl = e.avatarUrl);
                var l = this.data.screenWidth / 750, u = 110 * l, h = 70 * l, d = 120.5, m = 120.5, v = wx.createCanvasContext("myCanvas");
                v.setFillStyle("#7AFBFF"), v.setStrokeStyle("#7AFBFF"), v.setGlobalAlpha(.5), v.beginPath();
                for (var I = {
                    "-90": s,
                    "-30": i,
                    30: f,
                    90: c,
                    150: r,
                    210: o
                }, S = -90; S < 270; S += 60) {
                    var g = Math.PI / 180 * S, w = u * (Math.min(100, I[S + ""]) / 100), p = d + (w += h) * Math.cos(g), C = m + w * Math.sin(g);
                    v.lineTo(p, C);
                }
                if (v.fill(), "clip" in v) {
                    v.setGlobalAlpha(1), v.beginPath(), v.arc(d, m, 60 * l, 0, 2 * Math.PI), v.setFillStyle("#ffffff"), 
                    v.fill();
                    var F = 51 * l;
                    v.beginPath(), v.arc(d, m, F, 0, 2 * Math.PI), v.fill(), v.clip(), v.drawImage(this.avatarUrl, d - F, m - F, 2 * F, 2 * F);
                }
                v.draw();
            }
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + s.mainData.role.shareCode + "&compare=true",
            from: "qrCode"
        };
        return s.shareConf(e);
    },
    onTapGameBtn: function() {
        var t = this;
        this.btnLock || (this.btnLock = !0, s.gotoPVE(function() {}, function() {}), setTimeout(function() {
            t.btnLock = !1;
        }, 2e3));
    },
    onTapSaveBtn: function(t) {
        t && t.detail && t.detail.formId && "the formId is a mock one" != t.detail.formId && o.recordForm(t.detail.formId, function() {}), 
        this.QRCodeCreater.showQRCode(), o.markStats(e.event_point.show_test_result, function() {}), 
        r.shareStats("image", function() {});
    }
};

Page(c);