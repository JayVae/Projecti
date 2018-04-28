require("../../net/fightNet"), require("./../../net/groupNet.js");

var e = require("./../../net/fightNet"), t = require("./../../net/bankNet.js"), i = require("./../../net/itemNet.js"), a = require("./../../net/roleNet.js"), n = require("./../../net/shopNet.js"), o = require("./../../net/messageNet.js"), s = (require("./../../net/cash/loginNet.js"), 
require("./../../net/settingNet.js")), r = require("./../../net/connectNotify.js"), c = require("./../../const/notifyConsts.js"), l = require("./../../util/util.js"), h = require("./../../const/consts.js"), u = require("./../../const/modeConsts.js"), d = require("./../../util/LoginManager.js"), m = require("./../../util/RoomDataManager.js"), f = require("./../../util/ShakeController.js"), g = require("./../../net/wsconnect.js"), b = require("./../../util/liveExpiredController.js"), w = require("./template/GotoTNWZView.js"), v = require("./template/BeginnerTestViewController.js"), k = require("./template/SeasonRewardController.js"), p = require("./template/SettingViewController.js"), D = require("./template/NoticeController.js"), S = require("./template/DailyRewardViewController.js"), I = require("./../../data/ItemsManager.js"), C = require("./../../util/Tween.js"), T = require("./../../net/rewardNet"), _ = require("./GoldAniDisplayItem.js"), N = require("../pvr/template/PvrController.js"), y = getApp(), A = {
    data: {
        isGM: !1,
        gmCommand: null,
        mainRatio: 1,
        showNewUser: !1,
        liveShareBtnVisible: !1,
        bankShareViewVisible: !1,
        subscribeViewVisible: !1,
        subscribeViewAni: "",
        noticeData: "",
        goldInBank: 0,
        fullTime: "00:00:00",
        newKnowledgeCount: 0,
        newItemCount: 0,
        knowledgePromptVisible: !0,
        itemPromptVisible: !0,
        liveExpiredViewData: {
            title: "",
            visible: !1
        },
        goldAniData: {
            count: 10,
            itemList: []
        },
        function_switch: {
            goods: !1,
            shop: !1,
            challenge: !0,
            bank: !1,
            knowledge: !1,
            ugc: !1,
            friends_ranking: !1,
            live: !1,
            cash: !1,
            groupChallenge: !1
        },
        roleInfo: {
            userInfo: {},
            gold: 0,
            level: 0,
            exp: 0,
            maxExp: 0
        },
        mask_live_show: !1,
        mask_challenge_show: !1,
        mask_cash_show: !1,
        subscribeReward: null,
        bcReward: {
            visible: !1
        },
        matchStats: 0,
        matchScale: 1,
        zhihuDog: !1,
        contestStatusTip: "",
        contestTime: "",
        contestCash: "",
        contestTimeOutId: -1,
        isShowContestTimeAni: !1
    },
    btn_know_clicked: function(e) {
        this.data.function_switch.knowledge && wx.navigateTo({
            url: "../../page/know/know"
        });
    },
    btn_items_clicked: function(e) {
        this.data.function_switch.goods && wx.navigateTo({
            url: "../../page/items/items"
        });
    },
    btn_avatar_clicked: function(e) {
        var t = this;
        this.btnLock || (this.btnLock = !0, y.mainData.user_to_detail = y.mainData.role, 
        wx.navigateTo({
            url: "../../page/user_detail/user_detail",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }));
    },
    btn_shop_clicked: function(e) {
        var t = this;
        !this.btnLock && this.data.function_switch.shop && (this.btnLock = !0, wx.navigateTo({
            url: "../../page/shop/shop",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }));
    },
    btn_friends_ranking_clicked: function(e) {
        var t = this;
        if (console.log("tap rank btn. btnLock:", this.btnLock, "enabled:", this.data.function_switch.friends_ranking, "uid:", y.uid), 
        !this.btnLock && this.data.function_switch.friends_ranking && 0 != y.uid) {
            this.btnLock = !0;
            var i = y.getSeasonEndDeltaTime();
            console.log("deltaTime:", i), i <= 0 ? wx.navigateTo({
                url: "/page/rank_friends/rank_friends",
                fail: function(e) {
                    console.log(e);
                },
                complete: function() {
                    console.log("navigateTo rank ok"), setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            }) : (l.ShowConfirm("提醒", "排位赛结算中，剩余时间还有" + l.formatTime_mm_ss(Math.floor(i / 1e3))), 
            this.btnLock = !1);
        }
    },
    btn_live_clicked: function(t) {
        var i = this;
        if (console.log("btn_live_clicked btnLock:", this.btnLock, "liveShareBtnVisible:", this.data.liveShareBtnVisible), 
        !this.btnLock && this.data.function_switch.live) {
            var a = !1, n = l.getStorageSync("roomData");
            n && (a = (n = JSON.parse(n)).notEnd), a && n.roomId > 0 ? e.fightResult(n.roomId, 0, function(e, t) {
                e && e.errCode == h.ExitCode.RequestErr || l.setStorageSync("roomData", JSON.stringify({
                    roomId: n.roomId,
                    notEnd: !1
                })), e || "pve" == n.type && (y.updateGold(t.gold), y.showPVEModal(t, function() {
                    var e = {};
                    e.liveShareBtnVisible = !y.mainData.role.dropRoomID, i.setData(e);
                }), y.updatePVEData(t));
            }) : this.goToLive();
        }
    },
    btn_groupChallenge_clicked: function(e) {
        var t = this;
        !this.btnLock && this.data.function_switch.groupChallenge && (this.btnLock = !0, 
        wx.navigateTo({
            url: "/page/challenge/challenge_roomlist/challenge_roomlist",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }));
    },
    goToLive: function() {
        var t = this;
        this.btnLock = !0;
        m.getData();
        y.mainData.enterRoomId > 0 ? e.IsExpiredRoom(y.mainData.enterRoomId, function(e, i) {
            e || (i.isExpired ? (m.setEmptyData(), m.leaveRoom(), y.mainData.enterRoomId = 0, 
            wx.navigateTo({
                url: "/page/live/live"
            })) : wx.navigateTo({
                url: "/page/live/live"
            })), setTimeout(function() {
                t.btnLock = !1;
            }, 500);
        }) : wx.navigateTo({
            url: "../../page/live/live",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }), this.setData({
            mask_live_show: !1
        });
    },
    form_submit: function(e) {
        console.error("form_submit:", e && e.detail && e.detail.formId), e && e.detail && e.detail.formId && "the formId is a mock one" != e.detail.formId && (l.checkSaveTime(h.StorageKey.FormTime) || o.recordForm(e.detail.formId, function(e, t) {
            l.setSaveTime(h.StorageKey.FormTime, h.MaxFormId);
        }));
    },
    setUpserInfo: function() {
        this.setData({
            "roleInfo.userInfo": y.mainData.role.userInfo,
            "roleInfo.headId": y.mainData.role.headId
        });
    },
    btn_challenge_clicked: function(e) {
        var t = this;
        if (!this.btnLock && 0 != y.uid) {
            this.btnLock = !0, this.data.showNewUser && o.markStats(h.event_point.click_new_guide, function() {});
            var i = y.getSeasonEndDeltaTime();
            i <= 0 ? wx.navigateTo({
                url: "../../page/pve/pve",
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            }) : (l.ShowConfirm("提醒", "排位赛结算中，剩余时间还有" + l.formatTime_mm_ss(Math.floor(i / 1e3))), 
            this.btnLock = !1);
        }
    },
    btn_ugc_clicked: function(e) {
        var t = this;
        if (!this.btnLock && this.data.function_switch.ugc && this.data.function_switch.ugc) {
            this.btnLock = !0;
            wx.navigateTo({
                url: "../../page/ugc/ugc_menu/ugc_menu",
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
        }
    },
    onLoad: function(e) {
        var t = this;
        if (wx.setNavigationBarTitle) {
            var i = "知乎答题王";
            u.RunMode != u.RunModeType.Prod && (i += u.RunMode), wx.setNavigationBarTitle({
                title: i
            });
        }
        this.scrollTop = 0, l.showShareMenu();
        var n = (y.mainData.windowHeight - 146) / 1060;
        n = isNaN(n) ? 1 : n, n = Math.min(1, n), this.setData({
            mainRatio: n
        }), N.onCoverLoad(this), y.eventDispatcher.addEventListener("onLogin", this.onLogin, this), 
        y.eventDispatcher.addEventListener("onShowLogin", this.onShowLogin, this), y.eventDispatcher.addEventListener("goldUpdate", this.onGoldUpdate, this), 
        y.eventDispatcher.addEventListener("onHasNewItem", this.onHasNewItem, this), r.register(c.ActionDonatePay, this.onActionDonatePay, this), 
        r.register(c.ActionNewMail, this.onActionNewMail, this), r.register(c.ActionBCReward, this.onActionBCReward, this), 
        r.register(c.ActionGameConf, this.onActionGameConf, this), r.register(h.Route.reLoad, this.onCashReload, this), 
        b.register(this), this.gotoTNWZView = new w(this), this.beginnerTestViewController = new v(this), 
        this.dailyRewardViewController = new S(this), this.shakeController = new f(this), 
        this.noticeController = new D(this), this.seasonRewardController = new k(this), 
        this.settingViewController = new p(this), this.shakeController.shake(function() {
            t.btn_bank_clicked(null);
        }), this.GoldAniInit(), y.checkPivilege && (a.loginPivilege(y.channel, 1, function(e, t) {
            if (!e && t.items && t.items[0]) {
                var i = t.items[0], a = y.mainData.role.allSeeds.itemConfs[i.itemId].name;
                I.addItem(i.itemId, i.itemNum), l.ShowConfirm("公众号特权奖励", "获得" + a + "×" + i.itemNum + "，请明日继续努力！", function() {});
            }
        }), y.checkPivilege = !1), this.checkPay(), this.checkPlayerNameIllegal(), this.checkLoginMsg();
    },
    onActionGameConf: function(e, t) {
        var i = this.refreshSwitch({});
        console.log("onActionGameConf p:", i);
        var a = {};
        a["function_switch.cash"] = i.function_switch.cash, a["function_switch.groupChallenge"] = i.function_switch.groupChallenge, 
        console.log("onActionGameConf tmpP:", a), this.setData(a);
    },
    onActionDonatePay: function(e, t) {
        y.mainData.role.hadPlatOrder = !0, this.checkPay();
    },
    refreshRoleInfo: function(e) {
        return y.uid > 0 && (e["roleInfo.bankInfo"] = y.mainData.role.bankInfo, e["roleInfo.headId"] = y.mainData.role.headId, 
        e["roleInfo.userInfo"] = y.mainData.role.userInfo, e["roleInfo.gold"] = y.mainData.role.gold, 
        e["roleInfo.exp"] = y.mainData.role.exp, e["roleInfo.level"] = y.mainData.role.level, 
        e["roleInfo.maxExp"] = y.mainData.role.maxExp, e["roleInfo.userInfo.nickName"] = y.mainData.role.userInfo.nickName), 
        e;
    },
    onReady: function() {},
    onShow: function() {
        this.isShow || (!g.socketOpen && y.uid > 0 && g.reconnectServer(), this.isShow = !0, 
        y.mainData.fightAgain = !1, this.refreshUI(), this.startBackgroundPositionTimeout(), 
        y.uid > 0 ? (this.getMatchStats(), this.getContestStatus(), d.checkResult(y, function() {}, function() {}), 
        this.gotoTNWZView.onShow(), this.beginnerTestViewController.onShow(), this.dailyRewardViewController.onShow(), 
        this.noticeController.onShow(), this.seasonRewardController.onShow(), this.checkBucang(), 
        this.checkPay()) : y.login(), this.setData({
            bankShining: y.mainData.bankShining
        }));
    },
    checkBucang: function() {
        !(y.mainData.role.mails && y.mainData.role.mails.length > 0) || this.data.bcReward && this.data.bcReward.visible || this.showBucangView(y.mainData.role.mails[0]);
    },
    showBucangView: function(e) {
        var t = {
            id: e.id,
            title: e.title,
            content: e.content,
            type: "bcReward",
            visible: !0,
            items: []
        };
        if (e.attachments) for (var i = 0; i < e.attachments.length; i += 2) {
            var a = {};
            a.itemId = e.attachments[i], a.itemNum = e.attachments[i + 1];
            var n = y.mainData.role.allSeeds.itemConfs[a.itemId];
            a.name = n ? n.name : "", t.items.push(a);
        }
        this.setData({
            bcReward: t
        });
    },
    onActionNewMail: function(e, t) {
        if (t) if (this.data.bcReward && this.data.bcReward.visible) {
            var i = t[0];
            i = JSON.parse(i), y.addMail(i[0]);
        } else {
            var a = t[0];
            a = JSON.parse(a), this.showBucangView(a[0]);
        }
    },
    onBucangViewBtn: function(e) {
        var t = this, i = this.data.bcReward;
        T.gainBc(function(e, a) {
            if (e) l.ShowConfirm("", e.errMsg, function() {}), e.errCode != h.ExitCode.RequestErr && (y.removeMail(i.id), 
            t.checkBucang()); else {
                if (a && a.items) for (var n = 0; n < a.items.length; n++) {
                    var o = a.items[n];
                    I.addItem(o.itemId, o.itemNum);
                }
                y.removeMail(i.id), t.checkBucang();
            }
        }), this.setData({
            bcReward: {
                visible: !1
            }
        });
    },
    getMatchStats: function() {
        var e = this;
        setTimeout(function() {
            e.request_matchstates();
        }, 1e3);
    },
    request_matchstates: function() {
        var e = this;
        y.uid && o.matchStats(function(t, i) {
            if (t) ; else if (i && i) {
                var a = 0;
                for (var n in i) a += parseInt(i[n]);
                if (e.datamatchStats != a) {
                    C.fastGet("matchStats", !0).tweenCall(function(t) {
                        e.setData({
                            matchStats: Math.ceil(a * t)
                        });
                    }, 1e3);
                    var o = wx.createAnimation();
                    o.scale(1.3).step({
                        timingFunction: "ease-in",
                        duration: 300
                    }), o.scale(1).step({
                        timingFunction: "ease-out",
                        duration: 200,
                        delay: 800
                    }), e.setData({
                        matchStatsAni: o.export()
                    });
                }
            }
        });
    },
    getContestStatus: function() {
        this.request_conteststates();
    },
    request_conteststates: function() {
        y.uid && (this.data.contestTimeOutId && (clearInterval(this.data.contestTimeOutId), 
        this.data.contestTimeOutId = void 0), this.data.isShowContestTimeAni = !1, this.setData({
            isShowContestTimeAni: this.data.isShowContestTimeAni
        }));
    },
    btnUnlock: function() {
        var e = this;
        setTimeout(function() {
            e.btnLock = !1;
        }, 500);
    },
    refreshUI: function() {
        var e = this, t = {};
        if (t = this.refreshRoleInfo(t), t = this.refreshSwitch(t), t = this.refreshNewItem(t), 
        this.refreshCurBankGold(), y.uid > 0) {
            t.showNewUser = y.mainData.role.level <= 1, this.bankTimer || (this.bankTimer = setInterval(this.refreshCurBankGold.bind(this), 1e3));
            var i = !1, a = l.getStorageSync("roomData");
            a && (i = (a = JSON.parse(a)).notEnd), t.liveShareBtnVisible = !i && !y.mainData.role.dropRoomID, 
            t.zhihuDog = y.mainData.role.gameConf.zhihuDog, y.mainData.role.subscribedReward ? this.saveNeedCheckSubscribed(!1) : y.mainData.role.isSubscribed ? (this.saveNeedCheckSubscribed(!1), 
            this.showSubscribeRewardView()) : this.checkNeedCheckSubscribed(function(t) {
                t && e.checkSubscribed();
            }), this.playSubscribeViewAni(y.mainData.role.gameConf.subscribed), t.bannerZhihu = 1 == y.mainData.role.seasonInfo.seasonId;
        } else t.showNewUser = !1, t.zhihuDog = !1, t.liveShareBtnVisible = !1, t.bannerZhihu = !1, 
        this.playSubscribeViewAni(!1);
        this.setData(t);
    },
    refreshSwitch: function(e) {
        var t = !!y.mainData.role.gameConf && y.mainData.role.gameConf.cash;
        return e.function_switch = {
            goods: y.mainData.role.level > 1 && 0 != y.uid,
            shop: this.isOpenShop() && 0 != y.uid,
            challenge: !0,
            bank: y.getBankState(),
            knowledge: y.mainData.role.level > 2 && 0 != y.uid,
            ugc: this.isOpenUgc() && 0 != y.uid,
            friends_ranking: y.mainData.role.level > 1 && 0 != y.uid,
            live: y.mainData.role.level > 1 && 0 != y.uid,
            groupChallenge: this.isOpenGroupChallenge() && 0 != y.uid,
            cash: t
        }, e;
    },
    onHasNewItem: function() {
        var e = this.refreshNewItem({});
        e = this.refreshSwitch(e), this.setData(e);
    },
    refreshNewItem: function(e) {
        try {
            e.newKnowledgeCount = I.newKnowledgeCount, e.newItemCount = I.newItemCount;
            var t = y.mainData.windowHeight / y.mainData.dpr, i = 1350 / y.mainData.dpr, a = 1150 / y.mainData.dpr, n = this.scrollTop + t < a, o = this.scrollTop + t < i;
            e.knowledgePromptVisible = n && e.newKnowledgeCount > 0, e.itemPromptVisible = o && e.newItemCount > 0;
        } catch (e) {
            l.reportAnalytics_Try(e);
        }
        return e;
    },
    onLogin: function() {
        this.refreshUI(), this.gotoTNWZView.onShow(), this.beginnerTestViewController.onShow(), 
        this.dailyRewardViewController.onShow(), this.noticeController.onShow(), this.seasonRewardController.onShow(), 
        this.checkBucang(), this.checkPay(), this.checkPlayerNameIllegal(), this.checkLoginMsg();
    },
    onShowLogin: function() {
        y.uid > 0 && (this.gotoTNWZView.onShow(), this.beginnerTestViewController.onShow(), 
        this.dailyRewardViewController.onShow(), this.noticeController.onShow(), this.seasonRewardController.onShow(), 
        this.checkBucang(), this.checkPay(), this.checkCash(), this.checkPlayerNameIllegal(), 
        this.checkLoginMsg());
    },
    onGoldUpdate: function() {
        var e = this.refreshRoleInfo({});
        this.setData(e);
    },
    isOpenUgc: function() {
        return y.mainData.role.gameConf && y.mainData.role.gameConf.ugc && y.mainData.role.level > 2 && 0 != y.uid;
    },
    isOpenShop: function() {
        return y.mainData.role.level >= 3 && 0 != y.uid;
    },
    isOpenGroupChallenge: function() {
        return y.mainData.role.gameConf && y.mainData.role.gameConf.groupChallenge && y.mainData.role.level > 2 && 0 != y.uid;
    },
    onHide: function() {
        clearInterval(this.bankTimer), this.bankTimer = void 0, this.isShow = !1, this.seasonRewardController.onHide(), 
        this.playSubscribeViewAni(!1), this.platformOrderTimeout && (clearTimeout(this.platformOrderTimeout), 
        this.platformOrderTimeout = void 0), this.clearBackgroundPositionTimeout(), y.mainData.bankShining = !1, 
        this.setData({
            bankShining: y.mainData.bankShining
        });
    },
    onUnload: function() {
        this.shakeController.stop(), y.eventDispatcher.removeEventListener("onLogin", this.onLogin, this), 
        y.eventDispatcher.removeEventListener("goldUpdate", this.onGoldUpdate, this), y.eventDispatcher.removeEventListener("onHasNewItem", this.onHasNewItem, this), 
        this.noticeController.onUnload(), r.remove(c.ActionDonatePay, this.onActionDonatePay), 
        r.remove(c.ActionNewMail, this.onActionNewMail), r.remove(c.ActionBCReward, this.onActionBCReward), 
        r.remove(h.Route.reLoad, this.onCashReload), r.remove(c.ActionGameConf, this.onActionGameConf), 
        N.onCoverUnLoad(this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this;
        if (e && e.target) {
            if ("liveFight" == e.target.id) {
                var i = y.getPvPShareText(), a = {
                    title: i.text,
                    path: "/page/login/login?friendCode=" + y.mainData.role.shareCode + "&liveFight=" + !0,
                    from: "pvp_" + i.index,
                    imageUrl: i.imageUrl
                };
                return y.shareConf(a, !0, function() {
                    y.shareGotoLive();
                }, function() {
                    console.log("liveFight share cancel"), t.btnLock = !1;
                });
            }
            if ("bank" == e.target.id) {
                var n = {
                    title: "本群头脑段位排行在此，看看你能排第几？",
                    path: "/page/login/login?friendCode=" + y.mainData.role.shareCode + "&compare=true",
                    from: "bank"
                };
                return y.shareConf(n, !0, function() {
                    t.setData({
                        bankShareViewVisible: !1
                    }), t.gainBank(!0, function() {
                        t.btnUnlock();
                    });
                }, function() {
                    t.setData({
                        bankShareViewVisible: !1
                    }), t.btnUnlock();
                });
            }
            if ("seasonReward" == e.target.id) {
                var o = "";
                try {
                    var s = y.mainData.role.seasonInfo, r = this.seasonRewardController.selfRank;
                    o = r.rank <= 100 ? "我在" + s.seasonName + "是世界第" + r.rank + "名，" + r.matchName + "段位，我就想问，还有谁！" : r.rank <= 1e5 ? "我在" + s.seasonName + "是世界第" + r.rank + "名，" + r.matchName + "段位，下个赛季你能比我强么？" : "我在" + s.seasonName + "是世界第" + r.rank + "名，" + r.matchName + "段位，下赛季陪我一起上个分？";
                } catch (e) {}
                var c = {
                    title: o,
                    path: "/page/login/login?friendCode=" + y.mainData.role.shareCode + "&compare=true",
                    from: "seasonReward",
                    imageUrl: "cut"
                };
                return y.shareConf(c);
            }
        }
        var l = {
            title: "本群头脑段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + y.mainData.role.shareCode + "&compare=true",
            from: "cover"
        };
        return y.shareConf(l);
    },
    callback_command_input: function(e) {
        this.setData({
            gmCommand: e.detail.value
        });
    },
    btn_command_exec: function(e) {
        var t = this;
        i.exec(y.mainData.role.uid, this.data.gmCommand, function(e, i) {
            if (!e && (l.ShowToast("添加道具成功，刷新游戏确认。"), "reset" == t.data.gmCommand)) {
                var a = h.BaseStorageKey;
                for (var n in a) for (var o in u.RunModeType) l.removeStorageByKeySync(o + n);
            }
        });
    },
    callback_mode_gm: function(e) {
        h.SuperMode && this.setData({
            isGM: !this.data.isGM
        });
    },
    btn_code_clicked: function() {
        wx.navigateTo({
            url: "/page/qrCode/qrCode"
        });
    },
    getSubscribed: function() {
        var e = this;
        y.mainData.role.isSubscribed || a.getSubscribed(function(t, i) {
            e.subscribeLock = !1, !t && i && (y.mainData.role.isSubscribed = i.isSubscribed, 
            i.isSubscribed && (e.saveNeedCheckSubscribed(!1), e.showSubscribeRewardView()));
        });
    },
    gainSubscribed: function() {
        var e = this;
        T.gainSubscribed(function(t, i) {
            if (!t && i) {
                if (y.mainData.role.subscribedReward = !0, i.items && i.items[0]) {
                    I.addItem(i.items[0].itemId, i.items[0].itemNum);
                    var a = e.refreshSwitch({});
                    e.setData(a);
                }
                e.saveNeedCheckSubscribed(!1);
            }
        });
    },
    playSubscribeViewAni: function(e) {
        var t = this;
        if (e) this.SubscribeViewAniTimeout || (this.SubscribeViewAniTimeout = setTimeout(function() {
            t.SubscribeViewAniTimeout = void 0;
            var e = wx.createAnimation();
            e.right("-40rpx").step({
                timingFunction: "ease-in",
                duration: 500
            }), t.setData({
                subscribeViewVisible: !0,
                subscribeViewAni: e.export()
            });
        }, 1e3)); else {
            this.SubscribeViewAniTimeout && (clearTimeout(this.SubscribeViewAniTimeout), this.SubscribeViewAniTimeout = void 0);
            var i = wx.createAnimation();
            i.right("-317rpx").step({
                timingFunction: "ease-in",
                duration: 500
            }), this.setData({
                subscribeViewVisible: !0,
                subscribeViewAni: i.export()
            });
        }
    },
    onTapSubscribeView: function() {
        o.markStats(h.event_point.click_Subscribe, function() {}), this.saveNeedCheckSubscribed(!0);
    },
    saveNeedCheckSubscribed: function(e) {
        wx.setStorage({
            key: "NeedCheckSubscribe",
            data: e
        });
    },
    checkNeedCheckSubscribed: function(e) {
        wx.getStorage({
            key: "NeedCheckSubscribe",
            success: function(t) {
                e(t && t.data ? !0 : !1);
            },
            fail: function(t) {
                e(!1);
            }
        });
    },
    clearCheckSubscribed: function() {
        this.getSubscribedTimeout && (clearTimeout(this.getSubscribedTimeout), this.getSubscribedTimeout = void 0);
    },
    checkSubscribed: function() {
        var e = this;
        if (y.mainData.role.isSubscribed) return this.clearCheckSubscribed(), void this.saveNeedCheckSubscribed(!1);
        this.getSubscribedTimeout || (this.checkSubscribedNum = 0, this.getSubscribedTimeout = setTimeout(function() {
            e.checkSubscribedNum > 2 && (e.clearCheckSubscribed(), e.checkSubscribedNum++, e.saveNeedCheckSubscribed(!1)), 
            e.getSubscribed();
        }, 1e3));
    },
    showSubscribeRewardView: function() {
        var e = {
            subscribeReward: {
                title: "关注奖励",
                content: "恭喜您获得关注奖励"
            }
        };
        this.setData(e), this.clearCheckSubscribed();
    },
    onTapSubscribeRewardViewBtn: function(e) {
        this.gainSubscribed(), this.setData({
            subscribeReward: null
        });
    },
    refreshCurBankGold: function() {
        if (y.mainData.role && y.mainData.role.bankInfo) {
            var e = l.getServerTime() / 1e3, t = y.mainData.role.bankInfo.lastBankTime, i = Math.max(e - t, 0), a = Math.ceil(y.mainData.role.bankInfo.bankCap / y.mainData.role.bankInfo.bankIncome);
            if (a *= y.mainData.role.bankInfo.bankPeriod, y.mainData.role.fbdTime < Date.now() / 1e3 && (y.mainData.role.fbdTime += 86400, 
            y.mainData.role.bankDoubleNum = 0), i >= a) this.setData({
                goldInBank: y.mainData.role.bankInfo.bankCap,
                fullTime: "00:00:00"
            }); else {
                var n = Math.floor(i / y.mainData.role.bankInfo.bankPeriod), o = a - i;
                this.setData({
                    goldInBank: n * y.mainData.role.bankInfo.bankIncome,
                    fullTime: l.formatTime(o)
                });
            }
        }
    },
    btn_bank_clicked: function(e) {
        var t = this;
        !this.btnLock && this.data.function_switch.bank && (this.refreshCurBankGold(), this.data.goldInBank > 0 && (this.btnLock = !0, 
        this.gainBank(!1, function() {
            t.btnUnlock();
        })));
    },
    gainBank: function(e, i) {
        var a = this;
        t.gainBank(e, function(e, t) {
            if (e) l.ShowToast("收取王者币失败"); else {
                a.PlayGoldAni();
                var n = t.gold - y.mainData.role.gold;
                setTimeout(function() {
                    l.ShowToast("金币+" + n);
                }, 500), y.mainData.role.gold = t.gold, y.mainData.role.bankInfo.lastBankTime = t.lastBankTime, 
                y.mainData.role.fbdTime = t.fbdTime, y.mainData.role.bankDoubleNum = t.bankDoubleNum, 
                a.setData({
                    goldInBank: 0,
                    bankShining: !1,
                    "roleInfo.gold": t.gold,
                    "roleInfo.bankInfo.lastBankTime": t.lastBankTime
                }), a.refreshCurBankGold();
            }
            i();
        });
    },
    GoldAniInit: function() {
        for (var e = 0; e < this.data.goldAniData.count; e++) {
            var t = new _(e, {
                x: 200,
                y: 1e3
            }, {
                x: 375,
                y: 215
            }, y.mainData.windowHeight - 32, function(e) {});
            this.data.goldAniData.itemList.push(t);
        }
        this.setData({
            goldAniData: this.data.goldAniData
        });
    },
    PlayGoldAni: function() {
        var e = this;
        if (!this.goldAniInterval) {
            for (var t = Math.max(1, Math.min(10, Math.ceil(this.data.goldInBank / 6))), i = 0; i < t; i++) this.data.goldAniData.itemList[i].play();
            this.setData({
                goldAniData: this.data.goldAniData
            }), this.goldAniInterval = setInterval(function() {
                for (var t = !0, i = 0; i < e.data.goldAniData.itemList.length; i++) {
                    var a = e.data.goldAniData.itemList[i];
                    a && a.visible && (a.logic(), t = !1);
                }
                t && (clearInterval(e.goldAniInterval), e.goldAniInterval = void 0), e.setData({
                    "goldAniData.itemList": e.data.goldAniData.itemList
                });
            }, 1e3 / 30);
        }
    },
    onTapBankShareViewCloseBtn: function() {
        var e = this;
        this.setData({
            bankShareViewVisible: !1
        }), this.gainBank(!1, function() {
            e.btnUnlock();
        });
    },
    onTapRewardEXViewBtn: function(e) {
        var t = this;
        switch (e.currentTarget.dataset.type) {
          case "platformOrder":
            n.gainOrder(y.uid, this.orderIds, function(e, i) {
                if (e) l.ShowToast(e.errMsg); else {
                    y.mainData.role.hadPlatOrder = i.hadPlatOrder;
                    var a = !0, n = !1, o = void 0;
                    try {
                        for (var s, r = i.items[Symbol.iterator](); !(a = (s = r.next()).done); a = !0) {
                            var c = s.value;
                            I.addItem(c.itemId, c.itemNum);
                        }
                    } catch (e) {
                        n = !0, o = e;
                    } finally {
                        try {
                            !a && r.return && r.return();
                        } finally {
                            if (n) throw o;
                        }
                    }
                    var h = {
                        rewardEXData: {
                            visible: !1
                        }
                    };
                    h = t.refreshRoleInfo(h), h = t.refreshSwitch(h), t.orderIds = void 0, t.setData(h), 
                    t.checkPay();
                }
            });
            break;

          case "bcReward":
            this.onBucangViewBtn(null);
            break;

          default:
            this.setData({
                bcReward: {
                    visible: !1
                }
            });
        }
    },
    checkPay: function() {
        var e = this;
        y.mainData.role.hadPlatOrder && n.platformOrder(y.uid, function(t, i) {
            if (!t) {
                y.mainData.role.hadPlatOrder = i.hadPlatOrder, e.orderIds = "";
                var a = [];
                e.orderItems = [];
                for (var n in i.orders) {
                    a.push(n);
                    var o = i.orders[n];
                    e.addPayItem(e.orderItems, o.itemId, o.itemNum);
                }
                e.orderIds = a.join(","), e.orderIds && e.setData({
                    rewardEXData: {
                        type: "platformOrder",
                        title: "领取物品",
                        content: "感谢你的打赏，以下是赠予你的礼物，请查收。",
                        items: e.orderItems,
                        visible: !0
                    }
                });
            }
        });
    },
    addPayItem: function(e, t, i) {
        var a = y.mainData.role.allSeeds.itemConfs[t], n = void 0, o = !0, s = !1, r = void 0;
        try {
            for (var c, l = e[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
                var h = c.value;
                if (h.itemId == t) {
                    h.itemNum += i, n = h;
                    break;
                }
            }
        } catch (e) {
            s = !0, r = e;
        } finally {
            try {
                !o && l.return && l.return();
            } finally {
                if (s) throw r;
            }
        }
        n || (n = {
            name: a.name,
            itemId: t,
            itemNum: i
        }, e.push(n));
    },
    onTapSettingBtn: function(e) {
        this.settingViewController.show(function() {});
    },
    onTapZhihuBtn: function(e) {
        var t = this;
        if (this.data.bigZhihuDogVisible) l.reportAnalytics_debug_log("大狗"), wx.navigateToMiniProgram && wx.navigateToMiniProgram({
            appId: "wxeb39b10e39bf6b54",
            success: function(e) {},
            fail: function(e) {}
        }), this.setData({
            bigZhihuDogVisible: !1
        }), C.removeTweens("zhihuDog"); else {
            l.reportAnalytics_debug_log("小狗"), this.setData({
                bigZhihuDogVisible: !0,
                bigZhihuDogImg: "http://question-resource-zh.hortor.net/image/new_skin/zhihu/goto_zhihu.gif?v=1." + l.randomInt(0, 1e3)
            });
            var i = C.fastGet("zhihuDog");
            i.wait(6e3), i.call(function() {
                t.setData({
                    bigZhihuDogVisible: !1
                });
            });
        }
    },
    onTapZhihuCloseBtn: function() {
        this.setData({
            bigZhihuDogVisible: !1
        }), C.removeTweens("zhihuDog");
    },
    checkCash: function() {
        var e = {};
        e["function_switch.cash"] = y.mainData.role.gameConf.cash, this.setData(e);
    },
    onTapCash: function() {
        this.btnLock || (this.btnLock = !0, this.data.contestTimeOutId && (clearInterval(this.data.contestTimeOutId), 
        this.data.contestTimeOutId = void 0), this.request_Cash_getAppInfo());
    },
    onBindscroll: function(e) {
        this.scrollTop = ~~e.detail.scrollTop;
        var t = this.refreshNewItem({});
        this.setData(t);
    },
    request_Cash_getAppInfo: function() {
        var e = this;
        s.getAppInfo(function(t, i) {
            t ? (console.log("getAppInfo err:", t), setTimeout(function() {
                e.btnLock = !1;
            }, 500)) : (console.log("getAppInfo ok:", i), y.cashLoginParam = i, wx.navigateTo({
                url: "/page/cash/home/home",
                complete: function() {
                    setTimeout(function() {
                        e.btnLock = !1;
                    }, 500);
                }
            }));
        });
    },
    onTapItemRP: function(e) {
        var t = y.mainData.windowHeight / y.mainData.dpr, i = 1400 / y.mainData.dpr - t;
        this.setData({
            scrollTop: i
        });
    },
    onTapKnowledgeRP: function(e) {
        var t = y.mainData.windowHeight / y.mainData.dpr, i = 1200 / y.mainData.dpr - t;
        this.setData({
            scrollTop: i
        });
    },
    onCashReload: function(e, t) {
        this.getContestStatus();
    },
    startBackgroundPositionTimeout: function() {
        var e = this;
        this.backgroundPositionTimeout || (this.backgroundPosition || (this.backgroundPosition = {}), 
        this.backgroundPosition.x = l.randomInt(-y.systemInfo.windowWidth, 0), this.backgroundPosition.y = l.randomInt(-y.systemInfo.windowHeight, 0), 
        this.setData({
            backgroundPosition: this.backgroundPosition.x + "px, " + this.backgroundPosition.y + "px"
        }), this.backgroundPositionTimeout = setTimeout(function() {
            e.backgroundPositionTimeout = void 0, e.startBackgroundPositionTimeout();
        }, 1e4));
    },
    clearBackgroundPositionTimeout: function() {
        this.backgroundPositionTimeout && (clearTimeout(this.backgroundPositionTimeout), 
        this.backgroundPositionTimeout = void 0);
    },
    checkPlayerNameIllegal: function() {
        try {
            y.mainData.role.nameIllegal && l.ShowConfirm("", y.mainData.role.nameIllegalReason, function() {});
        } catch (e) {
            l.reportAnalytics_Try(e);
        }
    },
    checkLoginMsg: function() {
        try {
            y.mainData.role.message && (l.ShowConfirm("", y.mainData.role.message, function() {}), 
            y.mainData.role.message = "");
        } catch (e) {
            l.reportAnalytics_Try(e);
        }
    }
};

Page(A);