var t = require("./../../net/fightNet.js"), a = require("./../../util/Tween.js"), e = require("./../../util/util.js"), i = (require("./../../net/wsconnect.js"), 
require("./../../net/messageNet.js")), n = (require("./../../net/connectNotify.js"), 
require("./../../const/consts")), o = (require("./../../const/notifyConsts.js"), 
require("./../../util/PVERoomDataManager.js")), r = (require("./../../util/LoginManager.js"), 
require("./../../data/ItemsManager.js")), s = require("./../../net/itemNet.js"), c = require("./template/PveWatchdogController.js"), l = getApp(), u = {
    data: {
        showHelp: !1,
        isNewUser: !1,
        roleInfo: {
            userInfo: {}
        },
        pvePickerViewData: {
            dataSource: [ {
                id: 300001,
                name: "入门场I",
                fee: 25,
                exp: 1,
                star: 3,
                num: 0,
                lock: !1,
                lockAni: "",
                starGroup: []
            } ],
            matchStats: [],
            scrollTop: 0,
            hasLock: !1,
            callback_item_clicked: "callback_pve_item_clicked"
        },
        curStage: {},
        btn_code_clicked: "btn_code_clicked",
        showGuideArrow: !1,
        seasonId: 0
    },
    onLoad: function(t) {
        var a = this;
        e.showShareMenu(), l.eventDispatcher.addEventListener("stageAllClean", this.onStageAllClean, this), 
        l.eventDispatcher.addEventListener("goldUpdate", this.onGoldUpdate, this), l.eventDispatcher.addEventListener("stageAddStar", this.onAddStar, this), 
        l.eventDispatcher.addEventListener("stageSubStar", this.onSubStar, this), l.eventDispatcher.addEventListener("lastStageUpdate", this.onLastStageUpdate, this), 
        this.pveWatchdogController = new c(this), this.refreshStageData(), this.refreshUI(), 
        this.refreshRole(), setTimeout(function() {
            a.setData({
                "pvePickerViewData.scrollTop": 99999,
                resVer: l.mainData.role.resVer
            });
        }, 500);
    },
    onUnload: function() {
        o.setEmptyData(), l.eventDispatcher.removeEventListener("stageAllCLean", this.onStageAllClean, this), 
        l.eventDispatcher.removeEventListener("goldUpdate", this.onGoldUpdate, this), l.eventDispatcher.removeEventListener("stageAddStar", this.onAddStar, this), 
        l.eventDispatcher.removeEventListener("stageSubStar", this.onSubStar, this), l.eventDispatcher.removeEventListener("lastStageUpdate", this.onLastStageUpdate, this), 
        e.hideLoading(), this.clearBuffTimer();
    },
    onLastStageUpdate: function() {
        this.isShow ? this.playLastStageUpdate() : this.needPlay = this.playLastStageUpdate.bind(this);
    },
    onAddStar: function() {
        this.isShow ? this.playAddStar() : this.needPlay = this.playAddStar.bind(this);
    },
    onSubStar: function() {
        this.isShow ? this.playSubStar() : this.needPlay = this.playSubStar.bind(this);
    },
    onStageAllClean: function() {
        if (0 != l.mainData.role.curMatch) for (var t = 0; t < l.mainData.role.matchInfo.length; t++) {
            var a = l.mainData.role.matchInfo[t];
            if (l.mainData.role.curMatch == a.id) {
                a.lock = !1;
                break;
            }
        }
        if (0 != l.mainData.role.curMatch) for (var e = l.mainData.role.curMatch + 1, i = 0; i < l.mainData.role.matchInfo.length; i++) {
            var n = l.mainData.role.matchInfo[i];
            if (n && e == l.mainData.role.matchInfo[i].id) {
                n.lock = !0;
                for (var o = [], r = 0; r < n.num; r++) o.push({
                    index: r,
                    src: ""
                });
                n.starGroup = o, this.data.pvePickerViewData.dataSource.push(n);
                break;
            }
        }
        this.isShow ? this.playAllClear() : this.needPlay = this.playAllClear.bind(this);
    },
    onGoldUpdate: function() {
        this.setData({
            roleInfo: l.mainData.role
        });
    },
    refreshStageData: function() {
        var t = [];
        this.data.pvePickerViewData.dataSource = t;
        for (var a = l.mainData.role.matchInfo.length, e = 0; e < a; e++) {
            var i = l.mainData.role.matchInfo[e];
            i.lock = !1;
            for (var n = [], o = 0; o < i.num; o++) {
                var r = "";
                l.mainData.role.curMatch > i.id ? r = "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_white.png" : l.mainData.role.curMatch == i.id && o < i.star && (r = "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_default.png"), 
                n.push({
                    index: o,
                    src: r
                });
            }
            if (i.starGroup = n, t.push(i), l.mainData.role.curMatch < i.id) {
                i.lock = !0, this.data.pvePickerViewData.showQMark = a - 1 > e;
                break;
            }
        }
    },
    refreshUI: function() {
        this.setData({
            pvePickerViewData: this.data.pvePickerViewData
        });
    },
    refreshRole: function() {
        var t = e.assign({}, l.mainData.role), a = l.mainData.role.seasonInfo ? l.mainData.role.seasonInfo.seasonId : 0, i = l.mainData.role.seasonInfo ? l.mainData.role.seasonInfo.openTime : 0, n = l.mainData.role.seasonInfo ? l.mainData.role.seasonInfo.endTime : 0, o = e.formatTime_yymmdd(i) + "--" + e.formatTime_yymmdd(n);
        this.setData({
            roleInfo: t,
            seasonId: a,
            seasonTime: o
        });
    },
    playLastStageUpdate: function() {
        var t = {}, a = l.mainData.role.matchInfo.length - 1;
        t["pvePickerViewData.dataSource[" + a + "]"] = l.mainData.role.matchInfo[a], this.setData(t);
    },
    playAddStar: function() {
        for (var t = this, a = 0; a < l.mainData.role.matchInfo.length; a++) !function(a) {
            var e = l.mainData.role.matchInfo[a];
            if (l.mainData.role.curMatch == e.id && e.starGroup) {
                for (var i = Math.max(0, e.star - 1), n = 0; n < e.starGroup.length; n++) {
                    var o = e.starGroup[n];
                    o.src = n < i ? "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_default.png" : "", 
                    o.animation = "", o.lightAni = "";
                }
                setTimeout(function() {
                    t._playAddStar(a, i);
                }, 500);
            }
        }(a);
    },
    _playAddStar: function(t, a) {
        var e = this, i = l.mainData.role.matchInfo[t];
        if (i && i.starGroup && i.starGroup[a]) {
            var n = i.starGroup[a];
            n.src = "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_default.png", 
            n.animation = "addStar", n.lightAni = "addStar";
            var o = {};
            o["pvePickerViewData.dataSource[" + t + "]"] = i, this.setData(o), setTimeout(function() {
                var n = i.starGroup[a];
                n.animation = "", n.lightAni = "";
                var o = {};
                o["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(o);
            }, 1e3);
        }
    },
    playSubStar: function() {
        for (var t = this, a = 0; a < l.mainData.role.matchInfo.length; a++) !function(a) {
            var e = l.mainData.role.matchInfo[a];
            if (l.mainData.role.curMatch == e.id && e.starGroup) {
                for (var i = Math.max(0, e.star), n = 0; n < e.starGroup.length; n++) {
                    var o = e.starGroup[n];
                    o.src = n <= i ? "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_default.png" : "", 
                    o.animation = "", o.lightAni = "";
                }
                setTimeout(function() {
                    t._playSubStar(a, i);
                }, 500);
            }
        }(a);
    },
    _playSubStar: function(t, a) {
        var e = this, i = l.mainData.role.matchInfo[t];
        if (i && i.starGroup && i.starGroup[a]) {
            var n = i.starGroup[a];
            n.src = "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_default.png", 
            n.animation = "subStar", n.lightAni = "subStar";
            var o = {};
            o["pvePickerViewData.dataSource[" + t + "]"] = i, this.setData(o), setTimeout(function() {
                var n = i.starGroup[a];
                n.src = "", n.animation = "", n.lightAni = "";
                var o = {};
                o["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(o);
            }, 900);
        }
    },
    playAllClear: function() {
        for (var t = this, e = l.mainData.role.matchInfo.length, i = 0, n = 0, o = null, r = 0; r < e; r++) if (o = l.mainData.role.matchInfo[r], 
        l.mainData.role.curMatch - 1 == o.id) {
            n = o.num - 1, i = r;
            break;
        }
        var s = i + 1, c = s + 1, u = -1 == c || c >= e - 1;
        setTimeout(function() {
            var e = a.fastGet("allClear");
            e.call(function() {
                t._playAddStar(i, n);
            }), e.wait(1e3);
            for (var r = 0; r < o.num; r++) !function(a) {
                e.call(function() {
                    t.playWhiteStar(i, a);
                }), e.wait(500);
            }(r);
            -1 != s && (e.call(function() {
                t.playUnlock(s);
            }), e.wait(1e3)), -1 != c && e.call(function() {
                t.playNewLock(c);
            }), u && e.call(function() {
                t.playHideLock();
            }), e.call(function() {
                setTimeout(function() {
                    t.setData({
                        "pvePickerViewData.scrollTop": t.data.pvePickerViewData.scrollTop + 1
                    });
                }, 500);
            });
        }, 500);
    },
    playHideLock: function() {
        this.setData({
            "pvePickerViewData.showQMark": !1
        });
    },
    playUnlock: function(t) {
        var a = this, e = l.mainData.role.matchInfo[t];
        e.lockAni = "lockAni", e.bannerAni = "bannerAni";
        var i = {};
        i["pvePickerViewData.dataSource[" + t + "]"] = e, this.setData(i), setTimeout(function() {
            e.lockAni = "", e.bannerAni = "";
            var i = {};
            i["pvePickerViewData.dataSource[" + t + "]"] = e, a.setData(i);
        }, 1e3);
    },
    playNewLock: function(t) {
        var a = l.mainData.role.matchInfo[t], e = {};
        e["pvePickerViewData.dataSource[" + t + "]"] = a, this.setData(e);
    },
    playWhiteStar: function(t, a) {
        var e = this, i = l.mainData.role.matchInfo[t];
        if (i && i.starGroup && i.starGroup[a]) {
            var n = i.starGroup[a];
            n.src = "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_default.png", 
            n.animation = "allClearStar", n.lightAni = "allClearStar";
            var o = {};
            o["pvePickerViewData.dataSource[" + t + "]"] = i, this.setData(o), setTimeout(function() {
                i.starGroup[a].src = "http://question-resource-zh.hortor.net/image/new_skin/challenge/icon_star_white.png";
                var n = {};
                n["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(n);
            }, 400), setTimeout(function() {
                var n = i.starGroup[a];
                n.animation = "", n.lightAni = "";
                var o = {};
                o["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(o);
            }, 750);
        }
    },
    callback_pve_item_clicked: function(a) {
        var o = this;
        if (!this.btnLock) {
            this.data.isNewUser && i.markStats(n.event_point.click_new_to_pve, function() {});
            var r = a.currentTarget.dataset.stageId, s = !0, c = !1, u = void 0;
            try {
                for (var h, f = this.data.pvePickerViewData.dataSource[Symbol.iterator](); !(s = (h = f.next()).done); s = !0) {
                    var d = h.value;
                    if (d && d.id == r) {
                        if (d.lock) return;
                        this.setData({
                            curStage: d
                        });
                    }
                }
            } catch (t) {
                c = !0, u = t;
            } finally {
                try {
                    !s && f.return && f.return();
                } finally {
                    if (c) throw u;
                }
            }
            this.btnLock = !0;
            var m = !1, p = e.getStorageSync("roomData");
            p && (m = (p = JSON.parse(p)).notEnd), m && p.roomId > 0 ? t.fightResult(p.roomId, 0, function(t, a) {
                o.btnLock = !1, t && t.errCode == n.ExitCode.RequestErr || e.setStorageSync("roomData", JSON.stringify({
                    roomId: p.roomId,
                    notEnd: !1
                })), t || "pve" == p.type && (l.updateGold(a.gold), l.showPVEModal(a), l.updatePVEData(a));
            }) : this.data.curStage.fee <= l.mainData.role.gold ? (this.setRoomData(this.data.curStage.id, this.data.curStage.fee), 
            wx.navigateTo({
                url: "../../page/fight/fight?from=pve",
                complete: function() {}
            })) : (this.btnLock = !1, this.pveWatchdogController.onPveGateClicked(this.data.curStage.id));
        }
    },
    setRoomData: function(t, a) {
        o.setData({
            type: "pve",
            matchId: t,
            fee: a,
            userInfo: {
                uid: l.mainData.role.uid,
                nickName: l.mainData.role.userInfo.nickName,
                avatarUrl: l.mainData.role.userInfo.avatarUrl,
                level: l.mainData.role.level,
                city: e.getCity(l.mainData.role.userInfo.province, l.mainData.role.userInfo.city),
                headId: l.mainData.role.headId,
                cups: l.mainData.role.cups
            }
        }, !0);
    },
    onReady: function() {},
    onShow: function() {
        this.isShow = !0, this.needPlay && (this.needPlay(), this.needPlay = null), this.setData({
            isNewUser: l.isNewUser(),
            showGuideArrow: l.isNewUser()
        }), this.refreshRole(), this.refreshBuff(), this.startBuffTimer(), this.startBackgroundPositionTimeout(), 
        l.getSeasonEndDeltaTime() > 0 && wx.navigateBack();
    },
    startBackgroundPositionTimeout: function() {
        var t = this;
        this.backgroundPositionTimeout || (this.backgroundPosition || (this.backgroundPosition = {}), 
        this.backgroundPosition.x = e.randomInt(-l.systemInfo.windowWidth, 0), this.backgroundPosition.y = e.randomInt(-l.systemInfo.windowHeight, 0), 
        this.setData({
            backgroundPosition: this.backgroundPosition.x + "px, " + this.backgroundPosition.y + "px"
        }), this.backgroundPositionTimeout = setTimeout(function() {
            t.backgroundPositionTimeout = void 0, t.startBackgroundPositionTimeout();
        }, 1e4));
    },
    clearBackgroundPositionTimeout: function() {
        this.backgroundPositionTimeout && (clearTimeout(this.backgroundPositionTimeout), 
        this.backgroundPositionTimeout = void 0);
    },
    onHide: function() {
        this.isShow = !1, this.clearBuffTimer(), this.clearBackgroundPositionTimeout(), 
        this.backgroundPositionInterval && (clearInterval(this.backgroundPositionInterval), 
        this.backgroundPositionInterval = void 0);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = this;
        if (t && t.target && "noMoneyShare" == t.target.id) {
            var e = {
                title: "本群知乎答题王段位排行在此，看看你能排第几？",
                path: "/page/login/login?friendCode=" + l.mainData.role.shareCode + "&compare=true",
                from: "pve"
            };
            return l.shareConf(e, !1, function() {
                var t = {};
                t["pveWatchdog.visible"] = !1, a.setData(t);
            });
        }
        var i = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + l.mainData.role.shareCode + "&compare=true",
            from: "pve"
        };
        return l.shareConf(i);
    },
    btn_code_clicked: function() {
        wx.navigateTo({
            url: "/page/qrCode/qrCode"
        });
    },
    onTapTestBtn: function() {},
    btn_close_clicked: function() {
        this.setData({
            showHelp: !1
        });
    },
    btn_help_clicked: function() {
        wx.navigateTo({
            url: "pve_season_detail/pve_season_detail"
        });
    },
    onTapWifiBtn: function() {
        var t = this;
        this.wifiBtnLock || (this.wifiBtnLock = !0, setTimeout(function() {
            t.wifiBtnLock = !1;
        }, 5e3));
    },
    onTapBuffBtn: function(t) {
        console.log(t);
        try {
            var a = t.currentTarget.dataset.buffId, e = 203e3 + parseInt(a), i = r.getItemDetail(e);
            i.num > 0 ? (i.callback_back_clicked = "callback_back_clicked", i.callback_use_clicked = "callback_use_clicked", 
            this.setData({
                buffItemSelected: i
            })) : (i.callback_back_clicked = "callback_back_clicked_buy", i.callback_use_clicked = "callback_use_clicked_buy", 
            this.setData({
                buyBuffItemSelected: i,
                canBuy: l.mainData.role.level >= 3
            }));
        } catch (t) {}
    },
    refreshBuff: function() {
        var t = {}, a = l.mainData.role.buff ? l.mainData.role.buff : {}, i = a[1];
        t.buffActivate1 = !!i, t.buffText1 = i || "";
        var n = a[3];
        t.buffActivate3 = !!n, t.buffText3 = n || "";
        var o = a[5];
        t.buffActivate5 = !!o, t.buffText5 = o || "";
        var r = e.getServerTime(), s = 1e3 * ~~a[2], c = s > r;
        t.buffActivate2 = c, t.buffText2 = c ? e.formatTime_mm_ss((s - r) / 1e3) : "";
        var u = 1e3 * ~~a[4], h = u > r;
        t.buffActivate4 = h, t.buffText4 = h ? e.formatTime_mm_ss((u - r) / 1e3) : "", this.setData(t);
    },
    startBuffTimer: function() {
        var t = this;
        this.buffTimer || (this.buffTimer = setTimeout(function() {
            t.refreshBuff(), t.clearBuffTimer(), t.startBuffTimer();
        }, 1e3));
    },
    clearBuffTimer: function() {
        this.buffTimer && (clearTimeout(this.buffTimer), this.buffTimer = void 0);
    },
    callback_back_clicked: function() {
        this.setData({
            buffItemSelected: null
        });
    },
    callback_use_clicked: function() {
        if (this.data && this.data.buffItemSelected) {
            var t = this.data.buffItemSelected;
            s.use(t.id, function(a, i) {
                if (a) e.ShowToast("物品使用失败"); else {
                    r.subItem(t.id, 1);
                    switch (t.typeId) {
                      case n.ItemType.buff:
                        e.ShowToast("使用成功"), l.mainData.role.buff || (l.mainData.role.buff = {}), l.mainData.role.buff["" + t.selfId] = i.Buff.curVal;
                    }
                }
            }), this.setData({
                buffItemSelected: null
            });
        }
    },
    callback_use_clicked_buy: function() {
        this.buyBuff_btn || (this.buyBuff_btn = !0, l.gotoShop());
    },
    callback_back_clicked_buy: function() {
        this.buyBuff_btn = !1, this.setData({
            buyBuffItemSelected: null
        });
    }
};

Page(u);