function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), a = require("../const/consts.js"), o = require("../util/util.js"), i = require("../net/friendNet.js"), n = getApp(), s = [ "虽然文科不太好", "虽然对宇宙认识不深", "虽然没啥文艺范儿", "虽然没追上潮流", "虽然不怎么熟悉娱乐圈", "虽然生活阅历不太多" ], r = [ "但是个文科学霸", "但是上知天文下知地理", "但仍是个文艺青年", "但是永远站在流行前沿", "但影视歌动漫游门儿清", "但是生活阅历相当丰富" ], c = function() {
    function c(t) {
        e(this, c), this.page = t;
    }
    return t(c, [ {
        key: "showQRCode",
        value: function() {
            this.createQRCode();
        }
    }, {
        key: "createQRCode",
        value: function() {
            var e = this;
            o.showLoading("生成中..."), this.findFriend(function() {
                e.loadRes(function() {
                    e.drawQRCode(function() {
                        e.clearSaveFile(function() {
                            e.canvasToTempFilePath(function() {
                                o.hideLoading(), n.mainData.needCreateNewQRCode = !1, e.previewImage(function() {});
                            });
                        });
                    });
                });
            });
        }
    }, {
        key: "findFriend",
        value: function(e) {
            var t = this;
            i.findFriend(n.mainData.role.uid, function(a, o) {
                if (a) return console.warn(a), void t.fail();
                if (o) {
                    t.scoreStats = [], t.scoreStats.push(o.scoreStats[1] || 0), t.scoreStats.push(o.scoreStats[2] || 0), 
                    t.scoreStats.push(o.scoreStats[3] || 0), t.scoreStats.push(o.scoreStats[4] || 0), 
                    t.scoreStats.push(o.scoreStats[5] || 0), t.scoreStats.push(o.scoreStats[6] || 0);
                    for (var i = 0, n = 5, s = t.scoreStats.length, r = t.scoreStats[0], c = t.scoreStats[5], l = 1; l < s; l++) t.scoreStats[l] > r && (i = l, 
                    r = t.scoreStats[l]);
                    for (var u = 5; u >= 0; u--) t.scoreStats[u] < c && (n = u, c = t.scoreStats[u]);
                    t.maxType = i + 1, t.minType = n + 1, e();
                }
            });
        }
    }, {
        key: "drawQRCode",
        value: function(e) {
            var t = wx.createCanvasContext("QRCodeCanvas");
            t.drawImage("../../image/qr/bg.jpg", 0, 0, 750, 1060), t.drawImage("../../image/user_detail/img_info_coordinate.png", 138.5, 271, 473, 476), 
            t.setFillStyle("rgba(255,255,255,1)"), t.fillRect(465, 729, 285, 331), t.drawImage(this.baseQRCodeUrl, 505.5, 770.5, 215, 215), 
            t.drawImage("../../image/qr/img_share_user.png", 465, 729, 285, 331), t.setFillStyle("rgba(122,251,255,0.5)"), 
            t.beginPath();
            for (var a = {
                "-90": this.scoreStats[2],
                "-30": this.scoreStats[3],
                30: this.scoreStats[4],
                90: this.scoreStats[5],
                150: this.scoreStats[1],
                210: this.scoreStats[0]
            }, o = -90; o < 270; o += 60) {
                var i = Math.PI / 180 * o, n = 70 + Math.min(100, a[o + ""]) / 100 * 110, c = 375 + n * Math.cos(i), l = 512 + n * Math.sin(i);
                -90 == o ? t.moveTo(c, l) : t.lineTo(c, l);
            }
            t.closePath(), t.fill(), t.beginPath(), t.setStrokeStyle("rgba(217,180,66,1)");
            for (var u = -90; u < 270; u += 60) {
                var h = Math.PI / 180 * u, f = 70 + Math.min(100, a[u + ""]) / 100 * 110, d = 375 + f * Math.cos(h), v = 512 + f * Math.sin(h);
                -90 == u ? t.moveTo(d, v) : t.lineTo(d, v);
            }
            t.closePath(), t.setFillStyle("#8EBCFE"), t.setFontSize(36), t.fillText(s[this.minType - 1], 231, 105), 
            t.setFillStyle("#4353A4"), t.fillText(r[this.maxType - 1], 231, 150), "clip" in t && (t.beginPath(), 
            t.arc(130.5, 113.5, 52.5, 0, 2 * Math.PI), t.fill(), t.clip(), t.drawImage(this.avatarUrl, 78, 61, 105, 105)), 
            t.draw(), setTimeout(function() {
                e();
            }, 100);
        }
    }, {
        key: "loadRes",
        value: function(e) {
            var t = this;
            this.avatarUrl = void 0, this.baseQRCodeUrl = void 0, o.cacheFile("Avatar", n.mainData.role.userInfo.avatarUrl, function(a) {
                t.avatarUrl = a || "/image/qr/avatar.png", t.checkLoadEnd(e);
            }), o.cacheFile("BaseQRCode", "https://questionimage-zh.hortor.net/images/prod/qr" + n.mainData.role.shareCode + ".png", function(a) {
                t.baseQRCodeUrl = a || "/image/qr/base_code.jpg", t.checkLoadEnd(e);
            });
        }
    }, {
        key: "checkLoadEnd",
        value: function(e) {
            this.avatarUrl && this.baseQRCodeUrl && e();
        }
    }, {
        key: "canvasToTempFilePath",
        value: function(e) {
            var t = this;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1060,
                destWidth: 750,
                destHeight: 1060,
                canvasId: "QRCodeCanvas",
                success: function(i) {
                    wx.saveFile({
                        tempFilePath: i.tempFilePath,
                        success: function(t) {
                            o.setStorageSync(a.StorageKey.QRCodeFile, t.savedFilePath), e();
                        },
                        fail: function(e) {
                            console.log(e), t.fail();
                        }
                    });
                },
                fail: function(e) {
                    console.log(e), t.fail();
                }
            });
        }
    }, {
        key: "clearSaveFile",
        value: function(e) {
            var t = o.getStorageSync(a.StorageKey.QRCodeFile);
            t ? o.removeSavedFile(t, function(t, a) {
                e();
            }) : e();
        }
    }, {
        key: "previewImage",
        value: function(e) {
            var t = this;
            wx.getStorage({
                key: a.StorageKey.QRCodeFile,
                success: function(e) {
                    "function" == typeof wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                        filePath: e.data,
                        success: function(e) {
                            o.ShowConfirm("", "已保存到相册，你可以进行分享了。", function() {}), t.btnLock = !1;
                        },
                        fail: function(e) {
                            o.ShowToast("保存失败。"), t.btnLock = !1;
                        }
                    }) : o.ShowConfirm("", "保存失败。", function() {
                        t.btnLock = !1;
                    });
                },
                fail: function(e) {
                    o.ShowConfirm("", "保存失败。", function() {
                        t.btnLock = !1;
                    });
                }
            });
        }
    }, {
        key: "fail",
        value: function() {
            o.hideLoading(), o.ShowToast("生成失败");
        }
    } ]), c;
}();

module.exports = c;