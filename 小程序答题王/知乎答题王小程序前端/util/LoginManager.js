function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var o = 0; o < n.length; o++) {
            var r = n[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, o, r) {
        return o && e(n.prototype, o), r && e(n, r), n;
    };
}(), o = require("./../net/network.js"), r = require("./../net/wsconnect.js"), a = require("./../net/fightNet.js"), t = require("./../net/roleNet.js"), i = require("./../const/consts.js"), s = require("./../const/modeConsts.js"), c = require("./../util/util.js"), l = require("./../libs/rsa.js"), u = void 0, d = function() {
    function d() {
        e(this, d);
    }
    return n(d, [ {
        key: "login",
        value: function(e) {
            var n = this;
            (u = getApp()).uid ? c.invokeCallback(e) : this.underWay || (c.showLoading("登录中..."), 
            this.underWay = !0, this.next = e, this.checkLoginStorage(), this.storageData = this.getStorage(), 
            this.queryServer(function(o, a) {
                n.checkSession(function(o, t) {
                    o || !n.storageData ? n.wxLogin(function(o, t, i, s) {
                        n.entry(a, t, i, s, function(o, a) {
                            n.postLogin(a, function(o, a) {
                                r.connectServer(), n.updateMocha(function() {
                                    u.refreshUserInfo(function(o) {
                                        o ? n.loginErr(o) : n.checkVersion() ? n.loginOK() : (n.underWay = !1, n.login(i, s, e));
                                    });
                                });
                            });
                        });
                    }) : n.postLogin(n.storageData, function(o, a) {
                        r.connectServer(), n.updateMocha(function() {
                            u.refreshUserInfo(function(o) {
                                o ? n.loginErr(o) : n.checkVersion() ? n.loginOK() : (n.underWay = !1, n.login(encryptedData, iv, e));
                            });
                        });
                    });
                });
            }));
        }
    }, {
        key: "checkSession",
        value: function(e) {
            wx.checkSession({
                success: function() {
                    console.info("登录未过期", s.RunMode, s.Version), c.invokeCallback(e);
                },
                fail: function() {
                    console.warn("登录已过期", s.RunMode, s.Version), e({
                        errCode: i.ExitCode.LoginErr1
                    });
                }
            });
        }
    }, {
        key: "getStorage",
        value: function() {
            var e = c.getStorageSync(i.StorageKey.BaseRole);
            if (e && e.uid && e.ver == s.Version) return e;
        }
    }, {
        key: "checkLoginStorage",
        value: function() {
            var e = i.BaseStorageKey;
            for (var n in e) for (var o in s.RunModeType) o != s.RunMode && c.removeStorageByKeySync(o + n);
        }
    }, {
        key: "wxLogin",
        value: function(e) {
            var n = this;
            wx.login({
                success: function(o) {
                    if (o && o.code) wx.getUserInfo({
                        withCredentials: !0,
                        lang: "zh_CN",
                        success: function(n) {
                            c.invokeCallback(e, null, o.code, n.encryptedData, n.iv);
                        },
                        fail: function() {
                            c.invokeCallback(e, null, o.code, null, null);
                        }
                    }); else {
                        console.warn("获取用户登录凭证失败。-" + o.errMsg);
                        var r = {
                            errCode: i.ExitCode.LoginErr4
                        };
                        n.loginErr(r);
                    }
                },
                fail: function(e) {
                    console.warn("获取用户登录态失败! -" + e.errMsg);
                    var o = {
                        errCode: i.ExitCode.LoginErr5
                    };
                    n.loginErr(o);
                }
            });
        }
    }, {
        key: "queryServer",
        value: function(e) {
            var n = this, r = this, a = {
                version: s.Version
            };
            this.storageData && this.storageData.openId && (a.openId = this.storageData.openId), 
            a.appType = s.CurAppKey, o.post(i.MessageHead.Query, {
                params: a,
                success: function(n) {
                    o.updateURL(n), c.invokeCallback(e, null, n);
                },
                fail: function(e) {
                    console.warn("查询服务器地址失败，使用默认。-" + e.errMsg), r.loginErr(e), n.storageData && o.updateURL(n.storageData);
                }
            });
        }
    }, {
        key: "entry",
        value: function(e, n, r, a, t) {
            var l = this, d = {}, g = u.mainData.loginArgs;
            d.code = n, d.scene = g.scene, g.from && (d.from = g.from), d.clinentVersion = s.ClientVer, 
            u.systemInfo && (d.SDKVersion = u.systemInfo.SDKVersion, d.wxVersion = u.systemInfo.version, 
            d.systemVersion = u.systemInfo.system, d.model = u.systemInfo.model), g.friendCode && c.getStorageSync("friendCode") != g.friendCode && (d.friendCode = g.friendCode), 
            g.mp && (d.mp = g.mp);
            var f = u.getFriendFrom(g);
            f && (d.friendFrom = f), this.storageData && this.storageData.openId && (d.openId = this.storageData.openId), 
            r && (d.encryptedData = r), a && (d.iv = a), d.appType = s.CurAppKey, o.get(i.MessageHead.Entry, {
                params: d,
                success: function(n) {
                    n && n.openId ? (n.http = e.http, n.ws = e.ws, n.ver = s.Version, wx.setStorage({
                        key: i.StorageKey.BaseRole,
                        data: n
                    }), c.invokeCallback(t, null, n)) : (console.warn("获取数据格式错误。--", JSON.stringify(n)), 
                    l.loginErr({
                        errCode: i.ExitCode.LoginErr6
                    }));
                },
                fail: function(e) {
                    console.warn("尝试登录失败。-" + e.errMsg), l.loginErr(e);
                }
            });
        }
    }, {
        key: "postLogin",
        value: function(e, n) {
            var a = {
                scene: u.mainData.loginArgs.scene,
                openId: e.openId,
                playerId: e.uid,
                clientVer: s.ClientVer
            };
            u.mainData.loginArgs.friendCode && c.getStorageSync("friendCode") != u.mainData.loginArgs.friendCode && (a.friendCode = u.mainData.loginArgs.friendCode);
            var t = this;
            a.appType = s.CurAppKey, o.post(i.MessageHead.Login, {
                params: a,
                success: function(o) {
                    e.playerId = o.uid, o.openId = e.openId, o.sign = e.sign, o.unionId = e.unionId, 
                    u.mainData.role = o, u.openId = e.openId, u.token = o.token, u.uid = o.uid, u.playerId = o.uid, 
                    c.setServerTime(o.sysTime), u.initShareTimeWhenLogin(), u.initLiveRewardLogin(), 
                    r.updateURL(o), a.friendCode && c.setStorageSync("friendCode", a.friendCode), c.invokeCallback(n, null);
                },
                fail: function(e) {
                    console.warn("玩家登录失败。-" + e.errMsg), 20003 == e.errCode && (wx.clearStorageSync(), 
                    console.warn("清除用户缓存")), t.loginErr(e);
                }
            });
        }
    }, {
        key: "loginOK",
        value: function() {
            this.underWay = !1, c.hideLoading(), c.invokeCallback(this.next), this.next = void 0;
        }
    }, {
        key: "loginErr",
        value: function(e) {
            c.hideLoading(), this.underWay = !1, c.invokeCallback(this.next, e), this.next = void 0;
        }
    }, {
        key: "clearLoginData",
        value: function() {
            try {
                wx.removeStorageSync(i.StorageKey.BaseRole), wx.removeStorageSync(i.StorageKey.ServerVer);
            } catch (e) {
                console.warn("clearLoginData failed.", e);
            }
        }
    }, {
        key: "checkVersion",
        value: function() {
            try {
                var e = c.getStorageSync(i.StorageKey.ServerVer);
                if (e) {
                    if (e != u.mainData.role.version) return console.warn("版本不一致, ", e, u.mainData.role.version), 
                    this.clearLoginData(), !1;
                } else wx.setStorage({
                    key: i.StorageKey.ServerVer,
                    data: u.mainData.role.version
                });
            } catch (e) {}
            return !0;
        }
    }, {
        key: "checkResult",
        value: function(e, n, o) {
            e.mainData.role.roomID ? e.mainData.role.roomID > 0 && a.fightResult(e.mainData.role.roomID, 1, function(o, r) {
                if (o && o.errCode == i.ExitCode.RequestErr || c.setStorageSync("roomData", JSON.stringify({
                    roomId: e.mainData.role.roomID,
                    notEnd: !1
                })), o) n(); else if (e.mainData.role.roomID = 0, r) {
                    if (e.mainData.role.rowWinNum = r.rowWinNum, e.updateGold(r.gold), 1 == r.isWin && (e.mainData.role.winRoom += 1), 
                    e.mainData.role.roomNum += 1, 300014 != r.matchID || 0 != e.mainData.role.curMatch && 300014 != e.mainData.role.curMatch) {
                        if (r.matchID == e.mainData.role.curMatch) {
                            var a = c.GetMatchInfo(e.mainData.role.curMatch);
                            1 == r.isWin && a.star < a.num ? a.star += 1 : 2 == r.isWin && a.star > 0 && (a.star -= 1);
                        }
                    } else {
                        var t = c.GetMatchInfo(e.mainData.role.curMatch);
                        1 == r.isWin ? t.star += 1 : 2 == r.isWin && t.star > 0 && (t.star -= 1);
                    }
                    var s = "";
                    switch (r.isWin) {
                      case 0:
                        s = "";
                        break;

                      case 1:
                        s = "由于你离开了对战，上一次对战的结果是挑战成功";
                        break;

                      case 2:
                        s = "由于你离开了对战，上一次对战的结果是挑战失败";
                    }
                    s && wx.showModal({
                        title: "有未完成的战斗",
                        content: s,
                        showCancel: !1,
                        confirmText: "确定",
                        success: function() {
                            n();
                        }
                    });
                }
            }) : n();
        }
    }, {
        key: "updateMocha",
        value: function(e) {
            var n = this;
            if (u.getGameConf(i.gameConf.encryptedQuiz)) {
                var o = new l.JSEncrypt();
                o.setPublicKey(i.publicKey);
                var r = o.encrypt(u.aeskey);
                t.updateMocha(r, function(o, r) {
                    o ? n.loginErr(o) : console.error(r), c.invokeCallback(e);
                });
            } else c.invokeCallback(e);
        }
    } ]), d;
}();

module.exports = new d();