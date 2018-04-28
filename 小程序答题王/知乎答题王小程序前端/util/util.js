function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("./../libs/md5/md5.js"), r = require("./../const/consts.js"), o = require("./../const/modeConsts.js"), a = require("/AudioController.js"), i = require("/AudioController_Old.js"), u = null, l = [ "", "K", "M", "B", "T", "aa", "bb", "cc" ], c = function() {
    function c() {
        e(this, c);
    }
    return t(c, null, [ {
        key: "init",
        value: function(e) {
            u = e;
        }
    }, {
        key: "invokeCallback",
        value: function(e) {
            e && "function" == typeof e && e.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }, {
        key: "assign",
        value: function(e, t) {
            if (Object.assign) return Object.assign(e, t);
            for (var n in t) e[n] = t[n];
            return e;
        }
    }, {
        key: "formatNumber",
        value: function(e) {
            e = Math.floor(e);
            var t = Math.floor(c.getExponent(e)), n = Math.floor(t / 3), r = t % 3;
            return String(e / Math.pow(10, 3 * n)).substr(0, 4 + r) + c.getUnit(t);
        }
    }, {
        key: "getExponent",
        value: function(e) {
            for (var t = 0; e > 10; ) t++, e /= 10;
            return t;
        }
    }, {
        key: "getUnit",
        value: function(e) {
            var t = Math.floor(e / 3);
            if (e < 15) return l[t];
            if (e < 93) {
                var n = 92 + t, r = String.fromCharCode(n);
                return r + r;
            }
            return "e+" + 3 * (t = Math.floor(e / 3));
        }
    }, {
        key: "formatTime",
        value: function(e) {
            if ("number" != typeof e || e < 0) return e;
            var t = parseInt(e / 3600);
            e %= 3600;
            var n = parseInt(e / 60);
            return e %= 60, [ t, n, parseInt(e) ].map(function(e) {
                return (e = e.toString())[1] ? e : "0" + e;
            }).join(":");
        }
    }, {
        key: "formatTime_mm_ss",
        value: function(e) {
            if ("number" != typeof e || e < 0) return e;
            var t = parseInt(e / 60);
            return e %= 60, [ t, parseInt(e) ].map(function(e) {
                return (e = e.toString())[1] ? e : "0" + e;
            }).join(":");
        }
    }, {
        key: "formatTime_yymmdd",
        value: function(e) {
            var t = new Date(1e3 * e);
            return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日";
        }
    }, {
        key: "showPastTime",
        value: function(e) {
            var t = "刚刚", n = e, r = Math.floor(n / 60), o = Math.floor(n / 60 / 60), a = Math.floor(n / 60 / 60 / 24);
            return a < 1 ? o < 1 ? r > 0 && (t = r + "分钟前") : t = o + "小时前" : t = (a = a > 30 ? 30 : a) + "天前", 
            t;
        }
    }, {
        key: "ShowConfirm",
        value: function(e, t, n) {
            wx.showModal({
                title: e,
                content: t,
                showCancel: !1,
                complete: function() {
                    n && "function" == typeof n && n();
                }
            });
        }
    }, {
        key: "GetMatchInfo",
        value: function(e) {
            if (u.mainData.role.matchInfo) {
                var t = !0, n = !1, r = void 0;
                try {
                    for (var o, a = u.mainData.role.matchInfo[Symbol.iterator](); !(t = (o = a.next()).done); t = !0) {
                        var i = o.value;
                        if (i.id == e) return i;
                    }
                } catch (e) {
                    n = !0, r = e;
                } finally {
                    try {
                        !t && a.return && a.return();
                    } finally {
                        if (n) throw r;
                    }
                }
            }
            return u.mainData.role.matchInfo[0];
        }
    }, {
        key: "ShakeLong",
        value: function(e) {
            wx.vibrateLong && wx.vibrateLong({
                success: function() {},
                fail: function() {},
                complete: function() {
                    e && e();
                }
            });
        }
    }, {
        key: "ShowToast",
        value: function(e) {
            wx.showToast({
                title: e,
                duration: 2e3
            });
        }
    }, {
        key: "showLoading",
        value: function(e) {
            !this.loading && wx.showLoading && (this.loading = !0, wx.showLoading({
                title: e,
                mask: !0
            }));
        }
    }, {
        key: "hideLoading",
        value: function(e) {
            this.loading = !1, wx.showLoading && wx.hideLoading();
        }
    }, {
        key: "GenNetSign",
        value: function(e, t) {
            var r = "", o = (t += "&token=" + e).split("&");
            o.sort();
            for (var a = 0; a < o.length; a++) r += o[a];
            return r = n.hex_md5(r);
        }
    }, {
        key: "randomFloat",
        value: function(e, t) {
            return Math.random() * (t - e) + e;
        }
    }, {
        key: "randomInt",
        value: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e;
        }
    }, {
        key: "andomRate",
        value: function(e) {
            return Math.random() < e;
        }
    }, {
        key: "formatGroupName",
        value: function(e) {
            return c.formatNameBase(e, r.UserNameWidth, null);
        }
    }, {
        key: "formatNameEx",
        value: function(e) {
            return c.formatName(e, r.UserNameWidth);
        }
    }, {
        key: "formatName",
        value: function(e, t) {
            return c.formatNameBase(e, t, "---");
        }
    }, {
        key: "formatNameBase",
        value: function(e, t, n) {
            if (!e) return n;
            if (n && c.isStringEndWith(e, "...")) return e;
            for (var r = String(e), o = new RegExp("^[一-龥]"), a = 0, i = 0; i < r.length; i++) {
                var u = r.substr(i, 1);
                if ((a += o.test(u) ? 1 : .6) > t) return r.substring(0, i) + "...";
            }
            return r;
        }
    }, {
        key: "getWordLength",
        value: function(e) {
            if (!e) return 0;
            for (var t = String(e), n = new RegExp("^[一-龥]"), r = 0, o = 0; o < t.length; o++) {
                var a = t.substr(o, 1);
                r += n.test(a) ? 1 : .5;
            }
            return r;
        }
    }, {
        key: "getWord",
        value: function(e, t) {
            if (!e) return 0;
            for (var n = String(e), r = new RegExp("^[一-龥]"), o = 0, a = 0; a < n.length; a++) {
                var i = n.substr(a, 1);
                if ((o += r.test(i) ? 1 : .5) >= t) return e.substr(0, a);
            }
            return e;
        }
    }, {
        key: "getServerTimeBaseSecond",
        value: function() {
            return Math.floor(c.getServerTime() / 1e3);
        }
    }, {
        key: "setServerTime",
        value: function(e) {
            c.serverTime = 1e3 * e, c.time = new Date().getTime();
        }
    }, {
        key: "getServerTime",
        value: function() {
            if (!c.serverTime) return new Date().getTime();
            var e = new Date(c.serverTime).getTime();
            return new Date().getTime() + (e - c.time);
        }
    }, {
        key: "isStringStartWith",
        value: function(e, t) {
            return !!e && (t.length >= 0 && 0 == e.indexOf(t));
        }
    }, {
        key: "isStringEndWith",
        value: function(e, t) {
            if (!e) return !1;
            var n = e.length - t.length;
            return n >= 0 && e.lastIndexOf(t) == n;
        }
    }, {
        key: "trimStr",
        value: function(e) {
            return e.replace(/(^\s*)|(\s*$)/g, "");
        }
    }, {
        key: "showShareMenu",
        value: function() {
            "function" == typeof wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            });
        }
    }, {
        key: "removeStorageByKeySync",
        value: function(e) {
            try {
                wx.removeStorageSync(e), console.log("removeStorage [" + e + "] success");
            } catch (t) {
                console.log("removeStorage [" + e + "] failed");
            }
        }
    }, {
        key: "getCurPage",
        value: function() {
            var e = getCurrentPages();
            return e && e.length > 0 && e[e.length - 1] ? e[e.length - 1] : {};
        }
    }, {
        key: "startsWith",
        value: function(e, t) {
            return !(!e || !t) && e.slice(0, t.length) === t;
        }
    }, {
        key: "getCity",
        value: function(e, t) {
            return "北京" == e ? e : "上海" == e ? e : "天津" == e ? e : "重庆" == e ? e : t;
        }
    }, {
        key: "getCurPath",
        value: function() {
            var e = c.getCurPage();
            return e.route ? e.route : "";
        }
    }, {
        key: "getFullPath",
        value: function() {
            var e = "", t = getCurrentPages();
            if (t) for (var n = t.length, r = 0; r < n; r++) {
                var o = t[r];
                if (o && o.route) {
                    var a = o.route.lastIndexOf("/"), i = o.route.substr(a + 1, o.route.length - a - 1);
                    e += r != n - 1 ? i + "/" : i;
                }
            }
            return e;
        }
    }, {
        key: "reportAnalytics_Try",
        value: function(e) {
            "function" == typeof wx.reportAnalytics && e && o.RunMode == o.RunModeType.Prod && wx.reportAnalytics("try", {
                uid: u.uid + "",
                msg: e.message,
                stack: e.stack,
                pages: c.getFullPath(),
                cur_page: c.getCurPath(),
                sdk_version: u.systemInfo ? u.systemInfo.SDKVersion : "---"
            });
        }
    }, {
        key: "reportAnalytics_catch_err",
        value: function(e) {
            "function" == typeof wx.reportAnalytics && (o.RunMode, o.RunModeType.Prod);
        }
    }, {
        key: "reportAnalytics_cmd_err",
        value: function(e, t, n, r, a) {
            "function" == typeof wx.reportAnalytics && (o.RunMode, o.RunModeType.Prod);
        }
    }, {
        key: "reportAnalytics_debug_log",
        value: function(e) {
            "function" == typeof wx.reportAnalytics && o.RunMode == o.RunModeType.Prod && wx.reportAnalytics("debug_log_event", {
                user_id: u.uid + "",
                debug_log: e
            });
        }
    }, {
        key: "getSavedFileList",
        value: function(e) {
            wx.getSavedFileList ? wx.getSavedFileList({
                success: function(t) {
                    e(void 0, t);
                },
                fail: function(t) {
                    e(t, void 0);
                }
            }) : e("不兼容", void 0);
        }
    }, {
        key: "getSavedFileInfo",
        value: function(e, t) {
            wx.getSavedFileInfo ? wx.getSavedFileInfo({
                filePath: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "removeSavedFile",
        value: function(e, t) {
            wx.removeSavedFile ? wx.removeSavedFile({
                filePath: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "saveFile",
        value: function(e, t) {
            wx.saveFile ? wx.saveFile({
                tempFilePath: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "downloadFile",
        value: function(e, t) {
            wx.downloadFile ? wx.downloadFile({
                url: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "getNumLinearArray",
        value: function(e, t) {
            for (var n = e, r = [ n ]; ;) {
                var o = t - n;
                if (Math.abs(o) <= 1) {
                    r.push(t);
                    break;
                }
                n += Math.floor(.5 * o), r.push(n);
            }
            return r;
        }
    }, {
        key: "addSound",
        value: function(e, t, n, r) {
            e.audioCtrl || ("createInnerAudioContext" in wx ? e.audioCtrl = new a(e) : e.audioCtrl = new i(e)), 
            e.audioCtrl.addSound(t, n, r);
        }
    }, {
        key: "destoryAudio",
        value: function(e) {
            e.audioCtrl && e.audioCtrl.destory();
        }
    }, {
        key: "playTapSound",
        value: function(e) {
            e.audioCtrl && e.audio_playEff("audioTap", "sound_eff");
        }
    }, {
        key: "setSaveTime",
        value: function(e, t) {
            var n = o.RunMode + "_" + e, r = c.getStorageSync(n);
            if (r && c.isSameDay(c.getServerTime(), r.time)) r.num = r.num - 1, c.setStorageSync(n, r); else {
                var a = {
                    time: new Date(c.getServerTime()).getTime(),
                    num: t
                };
                c.setStorageSync(n, a);
            }
        }
    }, {
        key: "removeSaveTime",
        value: function(e) {
            var t = o.RunMode + "_" + e;
            wx.removeStorageSync(t);
        }
    }, {
        key: "getSaveTime",
        value: function(e) {
            var t = o.RunMode + "_" + e;
            return c.getStorageSync(t);
        }
    }, {
        key: "checkSaveTime",
        value: function(e) {
            var t = c.getSaveTime(e);
            return !(!t || !c.isSameDay(t.time, c.getServerTime())) && t.num <= 1;
        }
    }, {
        key: "isSameDay",
        value: function(e, t) {
            var n = new Date(e);
            n.setHours(0, 0, 0, 0);
            var r = new Date(t);
            return r.setHours(0, 0, 0, 0), n.getTime() == r.getTime();
        }
    }, {
        key: "setStorageSync",
        value: function(e, t) {
            try {
                wx.setStorageSync(e, t);
            } catch (n) {
                console.error("setStorageSync err", n, e, t);
            }
        }
    }, {
        key: "getStorageSync",
        value: function(e) {
            try {
                return wx.getStorageSync(e);
            } catch (t) {
                console.error("getStorageSync err", t, e, value);
            }
        }
    }, {
        key: "getFirstCupId",
        value: function(e) {
            if (e) for (var t in e) return t;
        }
    }, {
        key: "solveName",
        value: function(e, t) {
            for (var n = 0, r = "", o = 0; o < e.length; o++) {
                if (e.charCodeAt(o) > 127 || 94 == e.charCodeAt(o) ? n += 2 : n++, n > t) return [ r + "...", n ];
                r += e.charAt(o);
            }
            return [ r, n ];
        }
    }, {
        key: "log",
        value: function() {
            o.RunMode != o.RunModeType.Prod && console.log.apply(console, arguments);
        }
    }, {
        key: "getCallStack",
        value: function(e) {
            function t() {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function() {
            for (var e = [], t = getCallStack; t = t.caller; ) e.push(t);
            return e;
        })
    }, {
        key: "cacheFile",
        value: function(e, t, n) {
            e || c.invokeCallback(n), t || c.invokeCallback(n);
            var r = c.getStorageSync(e + "Url"), o = c.getStorageSync(e + "File");
            o ? r != t ? c.removeSavedFile(o, function() {
                c._downloadCache(e, t, n);
            }) : c.getSavedFileInfo(o, function(r, a) {
                r || !a || 0 == a.size ? c._downloadCache(e, t, n) : c.invokeCallback(n, o);
            }) : c._downloadCache(e, t, n);
        }
    }, {
        key: "_downloadCache",
        value: function(e, t, n) {
            c.setStorageSync(e + "Url", ""), c.setStorageSync(e + "File", ""), c.downloadFile(t, function(r, o) {
                r || !o || 200 != o.statusCode ? c.invokeCallback(n) : c.saveFile(o.tempFilePath, function(r, o) {
                    r ? c.invokeCallback(n) : (c.setStorageSync(e + "Url", t), c.setStorageSync(e + "File", o.savedFilePath), 
                    c.invokeCallback(n, o.savedFilePath));
                });
            });
        }
    }, {
        key: "removeAllCache",
        value: function() {
            c.getSavedFileList(function(e, t) {
                if (!e) {
                    var n = !0, r = !1, o = void 0;
                    try {
                        for (var a, i = t.fileList[Symbol.iterator](); !(n = (a = i.next()).done); n = !0) {
                            var u = a.value;
                            c.removeSavedFile(u.filePath, function() {});
                        }
                    } catch (e) {
                        r = !0, o = e;
                    } finally {
                        try {
                            !n && i.return && i.return();
                        } finally {
                            if (r) throw o;
                        }
                    }
                }
            });
        }
    }, {
        key: "randomPassword",
        value: function(e) {
            for (var t = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "Q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"), n = t.length, r = "", o = 0; o < e; o++) r += t[Math.floor(Math.random() * n)];
            return r;
        }
    } ]), c;
}();

module.exports = c;