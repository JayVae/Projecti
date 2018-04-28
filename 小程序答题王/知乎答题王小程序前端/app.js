var e = require("./net/wsconnect.js"), t = require("./net/network.js"), a = require("./net/cash/cashNetwork.js"), i = require("./util/util.js"), n = require("./util/LoginManager.js"), r = require("./const/consts.js"), o = require("./const/modeConsts.js"), s = require("./util/EventDispatcher.js"), c = require("./util/RoomDataManager.js"), u = require("./util/PVERoomDataManager.js"), h = require("./util/ChallengeRoomDataManager.js"), l = require("./data/ItemsManager.js"), g = require("./data/MyQuestionsManager.js"), m = (require("./net/groupNet.js"), 
require("./net/fightNet.js"), require("./net/roleNet.js")), f = require("./net/bankNet.js"), d = (require("./util/liveExpiredController.js"), 
require("./libs/cryptojs/cryptojs.js").Crypto), v = {
    mainData: {
        roomData: {
            userInfo: {},
            rivalUser: {},
            viewNum: 0
        },
        roomData_pve: {
            userInfo: {},
            rivalUser: {},
            viewNum: 0
        },
        role: {
            signIn: {
                lastSignTime: 0
            },
            allSeeds: {},
            userInfo: {},
            gameConf: {}
        },
        loginArgs: {},
        isSharing: !1,
        fightAgain: !1,
        enterChallengeID: 0,
        enterRoomId: 0,
        user_to_detail: {},
        touchedShareCode: {},
        inLiving: !1,
        dpr: 2,
        windowWidth: 750,
        windowHeight: 1206,
        needCreateNewQRCode: !0,
        myQuestions: {
            backupSelectedItem: null,
            selectedItem: null,
            myQuestions: [ [], [], [] ]
        },
        bankShining: !1
    },
    cashLoginParam: {
        extraInfo: "",
        info: "",
        uid: ""
    },
    token: "",
    uid: 0,
    checkLoginOnShow: !1,
    eventDispatcher: new s(),
    isExitGame: !1,
    systemInfo: {},
    matchTimeoutCount: 0,
    reloginNum: 0,
    onLaunch: function(n) {
        console.log("app launch : ", JSON.stringify(n)), i.init(this), c.init(this), c.setEmptyData(), 
        u.init(this), u.setEmptyData(), h.init(this), h.setEmptyData(), l.init(this), t.init(this), 
        a.init(this), g.init(this), e.init(this), this.initAESKey();
        try {
            this.systemInfo = wx.getSystemInfoSync(), console.log("systemInfo", this.systemInfo), 
            0 != this.systemInfo.windowWidth && 0 != this.systemInfo.windowHeight ? (this.mainData.dpr = 750 / this.systemInfo.windowWidth, 
            this.mainData.windowHeight = this.mainData.dpr * this.systemInfo.windowHeight) : console.error("screenWidth or windowHeight is zero!"), 
            this.mainData.isIOS = !1, this.systemInfo.system && (this.mainData.isIOS = i.startsWith(this.systemInfo.system, "iOS"));
        } catch (e) {
            this.systemInfo = {};
        }
    },
    getEnterType: function(e) {
        switch (e.scene) {
          case 1047:
          case 1048:
          case 1049:
          case 1011:
          case 1012:
          case 1013:
            return "qrCode";
        }
        return e.query && e.query.from ? e.query.from : "normal";
    },
    getFriendFrom: function(e) {
        if (e.friendCode) switch (e.scene) {
          case 1047:
          case 1048:
          case 1049:
          case 1011:
          case 1012:
          case 1013:
            return "image";

          default:
            return "friend";
        }
    },
    makeEnterType: function(e) {
        return e || "normal";
    },
    onShow: function(e) {
        console.log("app show : ", JSON.stringify(e)), this.isShow = !0, e = e || {}, this.mainData.loginArgs = {}, 
        this.mainData.loginArgs.scene = e.scene, this.mainData.loginArgs.shareTicket = e.shareTicket, 
        this.mainData.loginArgs.from = this.getEnterType(e), !this.isExitGame && this.checkLoginOnShow && (this.uid && !this.mainData.isSharing ? this.showLogin() : this.login()), 
        this.mainData.isSharing = !1;
    },
    showLogin: function() {
        var e = this;
        m.ShowLogin(this.mainData.loginArgs, function(t, a) {
            if (t) e.exitGame(t.errCode, t.errMsg); else {
                if (a.version != e.mainData.role.version) return console.warn("版本不一致, ", a.version, e.mainData.role.version), 
                n.clearLoginData(), void e.exitGame(r.ExitCode.NewVersion);
                a.seasonInfo && (e.mainData.role.seasonInfo = i.assign({}, a.seasonInfo)), a.mails && e.addMailList(a.mails), 
                e.mainData.role.hadPlatOrder = a.hadPlatOrder, a.gameConf && (e.mainData.role.gameConf = a.gameConf), 
                e.mainData.role.nameIllegal = a.nameIllegal, e.eventDispatcher.dispatchEventWith("onShowLogin");
            }
        });
    },
    login: function(e) {
        var t = this;
        n.login(function(a) {
            a ? "20003" == a.errCode ? t.login(e) : t.exitGame(a.errCode, a.errMsg) : (t.checkLoginOnShow = !0, 
            t.eventDispatcher.dispatchEventWith("onLogin"), i.invokeCallback(e));
        });
    },
    reLogin: function() {
        var e = this;
        ++this.reloginNum > 5 && (n.clearLoginData(), this.reloginNum = 0), setTimeout(function() {
            e.login(function() {
                "page/cover/cover" != i.getCurPage().route && e.gotoCover();
            });
        }, 2e3);
    },
    onHide: function() {
        this.isShow = !1;
    },
    onError: function(e) {
        i.reportAnalytics_catch_err(e);
    },
    getPvPShareText: function() {
        var e = r.PvPShareTexts.length, t = Math.random() * e;
        return t = Math.floor(t), {
            index: t,
            text: this.mainData.role.userInfo.nickName + " " + r.PvPShareTexts[t],
            imageUrl: r.PvPShareImages[t]
        };
    },
    shareConf: function(e, t, a, n) {
        var r = this;
        this.mainData.isSharing = !0;
        var o = e && e.path ? e.path : "/page/login/login?friendCode=" + this.mainData.role.shareCode + "&compare=true";
        e && e.from && (o = o + "&from=" + this.makeEnterType(e.from));
        var s = "";
        return e && "cut" != e.imageUrl && (s = e.imageUrl ? e.imageUrl : "https://question-resource-zh.hortor.net/image/new_skin/AD/img_ad_groupranking.jpg"), 
        console.log(e.imageUrl, s), {
            success: function(e) {
                console.log(e);
                var n = !1;
                e.shareTickets && e.shareTickets[0] ? (n = !0, m.shareStats("group", function() {})) : (n = !1, 
                m.shareStats("friend", function() {})), i.invokeCallback(a, e), t || r.hasSharedWidhReward() || (n ? f.gainShare(function(e, t) {
                    if (e) ; else {
                        r.setLastShareTime(!1);
                        var a = r.mainData.role.gold, n = Math.abs(t.gold - a);
                        i.ShowConfirm("分享奖励", "金币奖励 +" + n, null), r.updateGold(t.gold), r.eventDispatcher.dispatchEventWith("shareTextUpdate");
                    }
                }) : i.ShowConfirm("提示", "分享到微信群才能获得奖励", function() {}));
            },
            fail: function(e) {
                console.log("邀请发送失败"), "function" == typeof n && n();
            },
            title: e && e.title ? e.title : "本群头脑段位排行在此，看看你能排第几？",
            path: o,
            imageUrl: s
        };
    },
    exitGame: function(t, a) {
        var i = this;
        if (!this.isExitGame) {
            e.closeSocket(), this.uid = 0, this.isExitGame = !0, 20015 != t && 20016 != t || n.clearLoginData();
            var s = "";
            if (a && t != r.ExitCode.RequestErr) s = a; else switch (t) {
              case r.ExitCode.EdgeOut:
                s = "您已在其它设备登录";
                break;

              case r.ExitCode.Maintaining:
                s = "服务器开启维护模式，请稍后登录";
                break;

              case r.ExitCode.NewVersion:
                s = "版本更新，请完全关闭微信后再重新登录";
                break;

              case r.ExitCode.UserErr:
                s = "用户数据需要更新，请重新登录";
                break;

              case r.ExitCode.Unauthorized:
                s = "登录信息已过期。";
                break;

              case r.ExitCode.RequestErr:
                s = o.RunMode == o.RunModeType.Prod ? "你似乎已断开与互联网的连接。" : "测试环境下，请开启[调试模式]";
                break;

              default:
                s = "连接异常，错误码：" + (t || "0");
            }
            t == r.ExitCode.SessionExpire && n.clearLoginData(), wx.showModal({
                title: "提示",
                content: s,
                showCancel: !1,
                confirmText: "重新登录",
                success: function(e) {
                    e.confirm ? (i.isExitGame = !1, i.reLogin()) : e.cancel && (i.isExitGame = !1);
                }
            });
        }
    },
    isNewUser: function() {
        return this.mainData.role.level <= 1 && this.mainData.role.exp <= 1;
    },
    isBeginnerTestUser: function() {
        return this.mainData.role.roomNum < 1 && this.mainData.role.level <= 1;
    },
    checkScope: function(e, t) {
        try {
            "function" == typeof wx.getSetting ? wx.getSetting({
                success: function(a) {
                    t(a && a.authSetting ? !!a.authSetting[e] : !1);
                },
                fail: function() {
                    t(!1);
                }
            }) : t(!1);
        } catch (e) {
            t(!1), i.reportAnalytics_Try(e);
        }
    },
    setUserInfo: function(e, a) {
        var n = this;
        if (e && e.userInfo && !this.mainData.role.nameIllegal) {
            var o = e.userInfo;
            this.mainData.role.unionId && this.mainData.role.userInfo.nickName == o.nickName && this.mainData.role.userInfo.avatarUrl == o.avatarUrl && this.mainData.role.userInfo.city == o.city ? i.invokeCallback(a) : (this.mainData.role.userInfo = o, 
            t.post(r.MessageHead.SetUserInfo, {
                params: {
                    encryptedData: e.encryptedData,
                    iv: e.iv,
                    userInfo: e.userInfo
                },
                success: function(e) {
                    n.mainData.role.unionId = e.unionId, i.invokeCallback(a);
                },
                fail: function(e) {
                    i.invokeCallback(a, e);
                }
            }));
        } else i.invokeCallback(a);
    },
    refreshUserInfo: function(e) {
        var t = this;
        wx.getUserInfo({
            lang: "zh_CN",
            success: function(a) {
                t.setUserInfo(a, e);
            },
            fail: function(t) {
                console.warn("获取用户信息失败。-", t.errMsg), e();
            }
        });
    },
    updateGold: function(e) {
        this.mainData.role.gold = Math.max(0, e), this.eventDispatcher.dispatchEventWith("goldUpdate");
    },
    showCode: function() {
        wx.previewImage({
            urls: [ "http://question-resource-zh.hortor.net/image/ui/code.png?v=0.1.07" ],
            fail: function(e) {
                console.log("previewImage err", e);
            },
            success: function(e) {
                console.log("previewImage success", e);
            }
        });
    },
    gotoCover: function(e, t) {
        if (!this.isExitGame) {
            for (var a = getCurrentPages(), i = 0, n = !1, r = a.length - 1; r >= 0; r--) {
                if ("page/cover/cover" == a[r].route) {
                    n = !0;
                    break;
                }
                i++;
            }
            n ? a.length > 1 ? wx.navigateBack({
                delta: i,
                success: e,
                fail: t
            }) : e && e() : a.length > 1 ? wx.navigateBack({
                delta: a.length - 1,
                success: function() {
                    setTimeout(function() {
                        wx.redirectTo({
                            url: "/page/cover/cover",
                            success: e,
                            fail: t
                        });
                    }, 500);
                },
                fail: t
            }) : wx.redirectTo({
                url: "/page/cover/cover",
                success: e,
                fail: t
            });
        }
    },
    gotoShop: function() {
        if (!this.isExitGame) {
            var e = i.getCurPage();
            "/page/cover/cover" == e.route ? wx.navigateTo({
                url: "/page/shop/shop"
            }) : "page/shop/shop" != e.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/shop/shop"
                    });
                }, 500);
            }, function() {});
        }
    },
    gotoKnow: function() {
        if (!this.isExitGame) {
            var e = i.getCurPage();
            "/page/cover/cover" == e.route ? wx.navigateTo({
                url: "/page/know/know"
            }) : "page/know/know" != e.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/know/know"
                    });
                }, 500);
            }, function() {});
        }
    },
    gotoPVE: function(e, t) {
        if (!this.isExitGame) {
            var a = i.getCurPage();
            "/page/cover/cover" == a.route ? wx.navigateTo({
                url: "/page/pve/pve",
                success: e,
                fail: t
            }) : "page/pve/pve" != a.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/pve/pve",
                        success: e,
                        fail: t
                    });
                }, 200);
            }, function() {});
        }
    },
    gotoLive: function(e, t, a, i) {
        var n = this;
        this.isExitGame || (c.needFightNow = t, this.gotoCover(function() {
            n.mainData.enterRoomId = e, setTimeout(function() {
                wx.navigateTo({
                    url: "/page/live/live",
                    success: a,
                    fail: i
                });
            }, 200);
        }, function() {
            setTimeout(function() {
                n.gotoLive(e, t, a, i);
            }, 200);
        }));
    },
    shareGotoLive: function() {
        if (!this.isExitGame) {
            var e = c.getData();
            e.roomId > 0 ? this.gotoLive(e.roomId, !1) : this.gotoLive(0, !1);
        }
    },
    gotoFight: function() {
        if (!this.isExitGame) {
            var e = c.getData();
            this.gotoLive(e.roomId, !0);
        }
    },
    goto_ugc_menu: function(e, t) {
        if (!this.isExitGame) {
            for (var a = getCurrentPages(), i = 0, n = a.length - 1; n >= 0; n--) {
                if ("page/ugc/ugc_menu/ugc_menu" == a[n].route) {
                    !0;
                    break;
                }
                i++;
            }
            console.log("goto_ugc_menu navigateBack delta = " + i), wx.navigateBack({
                delta: i,
                success: e,
                fail: t
            });
        }
    },
    goto_ugc_list: function() {
        var e = this;
        if (!this.isExitGame) {
            for (var t = getCurrentPages(), a = 0, i = !1, n = t.length - 1; n >= 0; n--) {
                if ("page/ugc/ugc_list/ugc_list" == t[n].route) {
                    i = !0;
                    break;
                }
                a++;
            }
            i ? wx.navigateBack({
                delta: a,
                success: null,
                fail: function() {
                    setTimeout(function() {
                        e.goto_ugc_list();
                    }, 500);
                }
            }) : this.goto_ugc_menu(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/ugc/ugc_list/ugc_list",
                        success: null,
                        fail: null
                    });
                }, 500);
            }, function() {
                setTimeout(function() {
                    e.goto_ugc_list();
                }, 500);
            });
        }
    },
    isInLivePage: function() {
        var e = getCurrentPages();
        return !(!e || 0 == e.length) && "page/live/live" == i.getCurPage().route;
    },
    initShareTimeWhenLogin: function() {
        this.mainData.role.perShareNum > 0 && this.setLastShareTime(!0);
    },
    getPerShareMaxNum: function() {
        return this.mainData.role.allSeeds && this.mainData.role.allSeeds.shareConf ? this.mainData.role.allSeeds.shareConf.shareNum : 1;
    },
    setLastShareTime: function(e) {
        var t = new Date(i.getServerTime()), a = t.getDate(), n = this.getShareParm(), r = "";
        if (n) if (n[0] == a) {
            var s = parseInt(n[1]);
            r = a + " " + (e ? this.mainData.role.perShareNum : s + 1);
        } else r = a + " " + (e ? this.mainData.role.perShareNum : 1); else r = a + " " + (e ? this.mainData.role.perShareNum : 1);
        try {
            i.setStorageSync(o.RunMode + "_LastShareTime", r);
        } catch (e) {
            console.log("本也存储 上一次分享时间 失败", t, a);
        }
    },
    getShareParm: function() {
        try {
            var e = o.RunMode + "_LastShareTime", t = i.getStorageSync(e);
            if (!t) return null;
            var a = t.split(" ");
            return a.length >= 2 ? a : null;
        } catch (e) {
            console.log("获取存档异常");
        }
        return null;
    },
    hasSharedWidhReward: function() {
        try {
            var e = this.getShareParm();
            if (!e) return !1;
            var t = e[0], a = parseInt(e[1]);
            if (t == new Date(i.getServerTime()).getDate()) return a >= this.getPerShareMaxNum();
        } catch (e) {
            console.log("获取存档异常");
        }
        return !1;
    },
    getShareRewardNum: function() {
        var e = this.mainData.role.curMatch - 1, t = i.GetMatchInfo(e);
        return t.fee || (t = i.GetMatchInfo(this.mainData.role.curMatch)), t.fee || 0;
    },
    getShareRewardText: function() {
        if (this.hasSharedWidhReward()) return "";
        var e = this.getShareRewardNum();
        if (e) {
            var t = e;
            if (t <= 0) return "分享到微信群，可获得";
            Math.max(1, this.getPerShareMaxNum());
            return "分享到微信群，可获得" + t;
        }
        return "";
    },
    getShareReward: function() {
        if (this.hasSharedWidhReward()) return 0;
        var e = this.mainData.role.curMatch - 1, t = i.GetMatchInfo(e);
        t.fee || (t = i.GetMatchInfo(this.mainData.role.curMatch));
        var a = t.fee;
        return a || 0;
    },
    initLiveRewardLogin: function() {
        this.mainData.role.lastFFTime > 0 && this.setLastLiveRewardTime();
    },
    setLastLiveRewardTime: function() {
        var e = new Date(i.getServerTime()), t = e.getDate();
        try {
            i.setStorageSync(o.RunMode + "_LastLiveTime", t);
        } catch (a) {
            console.log("本也存储 上一次对战时间 失败", e, t);
        }
    },
    hasLiveReward: function() {
        try {
            var e = o.RunMode + "_LastLiveTime";
            if (i.getStorageSync(e) == new Date(i.getServerTime()).getDate()) return !0;
        } catch (e) {
            console.log("获取存档异常");
        }
        return !1;
    },
    formatUserCups: function(e) {
        if (e && e.cups) {
            var t = [];
            for (var a in e.cups) if (e.cups[a] > 0) {
                if (!(t.length < 3)) break;
                t.push({
                    id: a
                });
            }
            if (t.length > 0) return t;
        }
        return null;
    },
    updatePVEData: function(e) {
        if (300014 == e.matchID && 300014 == this.mainData.role.curMatch) {
            var t = i.GetMatchInfo(this.mainData.role.curMatch);
            if (1 == e.isWin) t.star += 1; else if (2 == e.isWin) {
                var a = t.star - 1;
                a = Math.max(0, a), t.star = a;
            }
            this.eventDispatcher.dispatchEventWith("lastStageUpdate");
        } else if (e.matchID == this.mainData.role.curMatch) {
            var n = i.GetMatchInfo(this.mainData.role.curMatch), r = !1, o = !1, s = !1;
            1 == e.isWin && n.star < n.num ? (n.star += 1, s = !0, r = n.star >= n.num) : 2 == e.isWin && n.star > 0 && (n.star -= 1, 
            o = !0), r ? (this.mainData.role.curMatch = this.mainData.role.curMatch + 1, this.eventDispatcher.dispatchEventWith("stageAllClean")) : s ? this.eventDispatcher.dispatchEventWith("stageAddStar") : o && this.eventDispatcher.dispatchEventWith("stageSubStar");
        }
    },
    showPVEModal: function(e, t) {
        var a = "由于你离开了对战，上一次对战的结果是";
        switch (e.isWin) {
          case 0:
            a += "平局";
            break;

          case 1:
            a += "挑战成功";
            break;

          case 2:
            a += "挑战失败";
        }
        wx.showModal({
            title: "有未完成的战斗",
            content: a,
            showCancel: !1,
            confirmText: "确定",
            success: function() {
                t && t();
            }
        });
    },
    addMail: function(e) {
        if (e && this.uid > 0 && this.mainData.role.mails) {
            var t = e.id, a = !1, i = !0, n = !1, r = void 0;
            try {
                for (var o, s = this.mainData.role.mails[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) o.value.id == t && (a = !0);
            } catch (e) {
                n = !0, r = e;
            } finally {
                try {
                    !i && s.return && s.return();
                } finally {
                    if (n) throw r;
                }
            }
            a || (this.mainData.role.mails.push(e), this.mainData.role.mails.sort(function(e, t) {
                return e.CreatedAt - t.CreatedAt;
            }));
        }
    },
    removeMail: function(e) {
        if (e && this.uid && this.mainData.role.mails) for (var t = this.mainData.role.mails.length; t--; ) this.mainData.role.mails[t].id == e && this.mainData.role.mails.splice(t, 1);
    },
    addMailList: function(e) {
        if (e && this.uid && this.mainData.role.mails) {
            var t = !0, a = !1, i = void 0;
            try {
                for (var n, r = e[Symbol.iterator](); !(t = (n = r.next()).done); t = !0) {
                    var o = n.value;
                    this.addMail(o);
                }
            } catch (e) {
                a = !0, i = e;
            } finally {
                try {
                    !t && r.return && r.return();
                } finally {
                    if (a) throw i;
                }
            }
        }
    },
    getCurBankGold: function() {
        if (this.mainData.role && this.mainData.role.bankInfo) {
            var e = i.getServerTime() / 1e3, t = this.mainData.role.bankInfo.lastBankTime, a = Math.max(e - t, 0), n = Math.ceil(this.mainData.role.bankInfo.bankCap / this.mainData.role.bankInfo.bankIncome);
            return n *= this.mainData.role.bankInfo.bankPeriod, this.mainData.role.fbdTime < Date.now() / 1e3 && (this.mainData.role.fbdTime += 86400, 
            this.mainData.role.bankDoubleNum = 0), a >= n ? this.mainData.role.bankInfo.bankCap : Math.floor(a / this.mainData.role.bankInfo.bankPeriod) * this.mainData.role.bankInfo.bankIncome;
        }
    },
    getBankState: function() {
        return this.mainData.role.level >= 2 && 0 != this.uid;
    },
    getSeasonEndDeltaTime: function() {
        try {
            var e = 1e3 * this.mainData.role.seasonInfo.endTime, t = i.getServerTime();
            return t > e ? e + 1e3 * this.mainData.role.allSeeds.baseConf.seasonSetupDur - t : 0;
        } catch (e) {
            return 0;
        }
    },
    aesDecrypt: function(e) {
        try {
            var e = d.util.base64ToBytes(e), t = d.util.base64ToBytes(this.aeskey), a = d.util.base64ToBytes(this.aeskey), i = new d.mode.CBC(d.pad.pkcs7), n = d.AES.decrypt(e, t, {
                asBpytes: !0,
                iv: a,
                mode: i
            });
            return JSON.parse(n);
        } catch (e) {
            return null;
        }
    },
    initAESKey: function() {
        var e = d.util.randomBytes(24);
        this.aeskey = d.util.bytesToBase64(e);
    },
    getGameConf: function(e) {
        try {
            return this.mainData.role.gameConf[e];
        } catch (e) {
            return 0;
        }
    }
};

App(v);