function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var i = a[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(a, t, i) {
        return t && e(a.prototype, t), i && e(a, i), a;
    };
}(), t = require("./../../../util/util.js"), i = require("./../../../net/rankNet.js"), n = require("./../../../net/roleNet.js"), s = require("./../../../util/Tween.js"), r = require("./../../../data/ItemsManager.js"), o = getApp(), c = function() {
    function c(a) {
        var i = this;
        e(this, c), this.page = a, this.page.setData({
            seasonRewardData: {
                list: [],
                visible: !1,
                rewardViewVisible: !1,
                rewardSubViewVisible: !1,
                subjectVisible: !1,
                tierVisible: !1,
                trophyVisible: !1,
                goldViewVisible: !1,
                awardGold: 500,
                seasonImgSrc: "",
                nextSeasonImgSrc: "",
                itemImgSrc: "",
                headIdIconSrc: "",
                cupImgSrc: "",
                avatarUrl: o.mainData.role.userInfo.avatarUrl,
                nickName: o.mainData.role.userInfo.nickName
            }
        }), this.page.seasonReward_onTapGetBtn3 = function() {
            wx.redirectTo({
                url: "/page/cover/cover"
            });
        }, this.page.seasonReward_onTapGetBtn = function() {
            i.btnLock_getBtn || (i.btnLock_getBtn = !0, n.GetSeasonReward(function(e, a) {
                if (i.btnLock_getBtn = !1, e) i.page.setData({
                    "seasonRewardData.visible": !1
                }); else if (a) {
                    var n = a.seasonInfo ? a.seasonInfo.openTime : 0, s = a.seasonInfo ? a.seasonInfo.endTime : 0, c = t.formatTime_yymmdd(n), d = t.formatTime_yymmdd(s);
                    i.nextSeasonTime = c + "--" + d, i.rewardData = {
                        seasonInfo: {
                            seasonId: 1,
                            seasonName: "第二个赛季",
                            seasonDes: "我是第二个赛季",
                            openTime: 1513785600,
                            endTime: 1517241600
                        },
                        items: [ {
                            itemId: 2e5,
                            itemNum: 3e4
                        }, {
                            itemId: 201004,
                            itemNum: 2
                        }, {
                            itemId: 201006,
                            itemNum: 1
                        } ],
                        curMatch: 300010,
                        matchStar: 0,
                        headId: 205005,
                        cupId: 206001,
                        oldGold: 1678199,
                        convertGold: 1679,
                        awardGold: 500,
                        gold: 32179
                    }, i.rewardData = a, r.addItem(i.rewardData.items[0].itemId, i.rewardData.items[0].itemNum), 
                    o.mainData.role.seasonInfo = i.rewardData.seasonInfo, o.mainData.role.headId = i.rewardData.headId, 
                    o.mainData.role.gold = i.rewardData.gold, o.mainData.role.curMatch = 300001;
                    var l = !0, u = !1, m = void 0;
                    try {
                        for (var w, p = o.mainData.role.matchInfo[Symbol.iterator](); !(l = (w = p.next()).done); l = !0) w.value.star = 0;
                    } catch (e) {
                        u = !0, m = e;
                    } finally {
                        try {
                            !l && p.return && p.return();
                        } finally {
                            if (u) throw m;
                        }
                    }
                    i.rewardData.cupId && (o.mainData.role.cups || (o.mainData.role.cups = {}), o.mainData.role.cups[i.rewardData.cupId] = 1), 
                    i.getReward();
                }
            }));
        }, this.page.seasonReward_onTapGetBtn2 = function() {
            i.getReward();
        };
    }
    return a(c, [ {
        key: "onShow",
        value: function() {
            var e = this;
            if (o.uid && o.mainData.role.seasonInfo) try {
                var a = o.mainData.role.allSeeds.baseConf.seasonSetupDur, n = o.mainData.role.seasonInfo.endTime, s = t.getServerTime();
                if (1e3 * (n + a) < s) this.page.setData({
                    "seasonRewardData.visible": !0,
                    "seasonRewardData.seasonImgSrc": "http://question-resource-zh.hortor.net/image/new_skin/season/img_bg_season_" + o.mainData.role.seasonInfo.seasonId + "_account.png"
                }), i.seasonWorldMatch(function(a, i) {
                    if (a) console.warn("seasonWorldMatch err", a); else if (i && i.list) {
                        e.selfRank = i.self;
                        var n = !1, s = !0, r = !1, c = void 0;
                        try {
                            for (var d, l = i.list[Symbol.iterator](); !(s = (d = l.next()).done); s = !0) {
                                var u = d.value, m = Math.floor(u.score / 100);
                                m > 300014 && (m = 300014), u.matchName = t.GetMatchInfo(m).name, u.star = u.score - 100 * m, 
                                u.uid == o.mainData.role.uid && (u.nickName = "我", u.itsMe = !0, n = u.rank <= 3);
                            }
                        } catch (a) {
                            r = !0, c = a;
                        } finally {
                            try {
                                !s && l.return && l.return();
                            } finally {
                                if (r) throw c;
                            }
                        }
                        var w = [];
                        w.push(i.list[0]), w.push(i.list[1]), w.push(i.list[2]);
                        var p = Math.floor(i.self.score / 100);
                        p > 300014 && (p = 300014), i.self.matchName = t.GetMatchInfo(p).name, i.self.star = i.self.score - 100 * p, 
                        i.self.nickName = "我", i.self.itsMe = !0, n || w.push(i.self), e.page.setData({
                            "seasonRewardData.list": w
                        });
                    }
                }); else {
                    var r = 1e3 * (n + a) - s;
                    r < 36e5 && (this.timeout && (clearTimeout(this.timeout), this.timeout = void 0), 
                    this.timeout = setTimeout(function() {
                        e.timeout = void 0, e.onShow();
                    }, r));
                }
            } catch (e) {
                console.error("try catch", e), t.reportAnalytics_Try(e);
            } else this.page.setData({
                "seasonRewardData.visible": !1
            });
        }
    }, {
        key: "onHide",
        value: function() {
            this.timeout && (clearTimeout(this.timeout), this.timeout = void 0);
        }
    }, {
        key: "getReward",
        value: function() {
            var e = this;
            if (!this.btnLock_getBtn2) {
                if (!this.mainViewOut) {
                    var a = wx.createAnimation();
                    a.opacity(0).step({
                        timingFunction: "ease-in",
                        duration: 300
                    });
                    var i = wx.createAnimation();
                    i.opacity(1).step({
                        timingFunction: "ease-in",
                        duration: 300
                    }), this.mainViewOut = !0, this.page.setData({
                        "seasonRewardData.mainViewAni": a.export(),
                        "seasonRewardData.rewardViewAni": i.export(),
                        headId: o.mainData.role.seasonInfo.headId
                    });
                }
                if (this.rewardData.cupId > 0 && !this.cup_get) {
                    var n = wx.createAnimation();
                    n.scale(1.3).opacity(1).step({
                        timingFunction: "ease-in",
                        duration: 300
                    }), n.scale(1).step({
                        timingFunction: "ease-out",
                        duration: 150
                    });
                    var r = wx.createAnimation();
                    r.scale(1, 1).step({
                        timingFunction: "ease-in",
                        duration: 150
                    });
                    var c = wx.createAnimation();
                    c.scale(1, 1).step({
                        timingFunction: "ease-in",
                        duration: 150
                    });
                    var d = wx.createAnimation();
                    d.scale(1).step({
                        timingFunction: "ease-in",
                        duration: 200
                    }), this.page.setData({
                        "seasonRewardData.rewardViewVisible": !0,
                        "seasonRewardData.rewardSubViewVisible": !0,
                        "seasonRewardData.trophyVisible": !0,
                        "seasonRewardData.cupImgSrc": "http://question-resource-zh.hortor.net/image/new_skin/icon/trophy/" + this.rewardData.cupId + ".png",
                        "seasonRewardData.rewardDesc": "恭喜获得本赛季全球第" + this.selfRank.rank + "名",
                        "seasonRewardData.trophyAni": n.export(),
                        "seasonRewardData.titleImgAni": r.export(),
                        "seasonRewardData.titleLabelAni": c.export(),
                        "seasonRewardData.getBtn2Ani": d.export()
                    }), this.cup_get = !0;
                } else if (this.rewardData.headId > 0 && !this.head_get) {
                    var l = s.fastGet("headTween");
                    this.rewardData.cupId > 0 && (this.btnLock_getBtn2 = !0, l.call(function() {
                        var a = wx.createAnimation();
                        a.scale(0).opacity(0).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var t = wx.createAnimation();
                        t.scale(0, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var i = wx.createAnimation();
                        i.scale(0, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var n = wx.createAnimation();
                        n.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), e.page.setData({
                            "seasonRewardData.trophyVisible": !0,
                            "seasonRewardData.trophyAni": a.export(),
                            "seasonRewardData.titleImgAni": t.export(),
                            "seasonRewardData.titleLabelAni": i.export(),
                            "seasonRewardData.getBtn2Ani": n.export()
                        });
                    }), l.wait(300), l.call(function() {
                        e.btnLock_getBtn2 = !1;
                    })), l.call(function() {
                        var a = wx.createAnimation();
                        a.scale(1.3).opacity(1).step({
                            timingFunction: "ease-in",
                            duration: 300
                        }), a.scale(1).step({
                            timingFunction: "ease-out",
                            duration: 150
                        });
                        var i = wx.createAnimation();
                        i.scale(1, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var n = wx.createAnimation();
                        n.scale(1, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var s = wx.createAnimation();
                        s.scale(1).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), e.page.setData({
                            "seasonRewardData.rewardViewVisible": !0,
                            "seasonRewardData.rewardSubViewVisible": !0,
                            "seasonRewardData.trophyVisible": !1,
                            "seasonRewardData.tierVisible": !0,
                            "seasonRewardData.headIdIconSrc": "http://question-resource-zh.hortor.net/image/new_skin/icon/tiers/" + e.rewardData.headId + ".png",
                            "seasonRewardData.rewardDesc": "恭喜获得" + t.GetMatchInfo(e.rewardData.curMatch).name + "头像框",
                            "seasonRewardData.tierAni": a.export(),
                            "seasonRewardData.titleImgAni": i.export(),
                            "seasonRewardData.titleLabelAni": n.export(),
                            "seasonRewardData.getBtn2Ani": s.export()
                        });
                    }), this.head_get = !0;
                } else if (this.rewardData.items && this.rewardData.items[0] && !this.item_get) {
                    var u = s.fastGet("rewardTween");
                    this.rewardData.headId > 0 && (this.btnLock_getBtn2 = !0, u.call(function() {
                        var a = wx.createAnimation();
                        a.scale(.6).opacity(1).top("-44rpx").step({
                            timingFunction: "ease-in",
                            duration: 500
                        });
                        var t = wx.createAnimation();
                        t.scale(0, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var i = wx.createAnimation();
                        i.scale(0, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var n = wx.createAnimation();
                        n.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), e.page.setData({
                            "seasonRewardData.tierAni": a.export(),
                            "seasonRewardData.titleImgAni": t.export(),
                            "seasonRewardData.titleLabelAni": i.export(),
                            "seasonRewardData.getBtn2Ani": n.export()
                        });
                    }), u.wait(500), u.call(function() {
                        e.page.setData({
                            "seasonRewardData.headId": e.rewardData.headId
                        });
                    }), u.wait(150), u.call(function() {
                        e.btnLock_getBtn2 = !1;
                    })), u.call(function() {
                        var a = wx.createAnimation();
                        a.scale(1.3).opacity(1).step({
                            timingFunction: "ease-in",
                            duration: 300
                        }), a.scale(1).step({
                            timingFunction: "ease-out",
                            duration: 150
                        });
                        var t = wx.createAnimation();
                        t.scale(1, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var i = wx.createAnimation();
                        i.scale(1, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var n = wx.createAnimation();
                        n.scale(1).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), e.page.setData({
                            "seasonRewardData.rewardViewVisible": !0,
                            "seasonRewardData.rewardSubViewVisible": !0,
                            "seasonRewardData.trophyVisible": !1,
                            "seasonRewardData.tierVisible": !1,
                            "seasonRewardData.subjectVisible": !0,
                            "seasonRewardData.itemImgSrc": "http://question-resource-zh.hortor.net/image/new_skin/icon/icon_items/" + e.rewardData.items[0].itemId + ".png",
                            "seasonRewardData.itemNum": e.rewardData.items[0].itemNum,
                            "seasonRewardData.rewardDesc": "恭喜获得该段位奖励",
                            "seasonRewardData.itemAni": a.export(),
                            "seasonRewardData.titleImgAni": t.export(),
                            "seasonRewardData.titleLabelAni": i.export(),
                            "seasonRewardData.getBtn2Ani": n.export()
                        });
                    }), this.item_get = !0;
                } else if (this.showNext) {
                    return void wx.redirectTo({
                        url: "/page/cover/cover"
                    });
                } else {
                    var m = s.fastGet("showNext");
                    m.call(function() {
                        var a = wx.createAnimation();
                        a.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var t = wx.createAnimation();
                        t.scale(0, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var i = wx.createAnimation();
                        i.scale(0, 1).step({
                            timingFunction: "ease-in",
                            duration: 150
                        });
                        var n = wx.createAnimation();
                        n.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), e.page.setData({
                            "seasonRewardData.itemAni": a.export(),
                            "seasonRewardData.titleImgAni": t.export(),
                            "seasonRewardData.titleLabelAni": i.export(),
                            "seasonRewardData.getBtn2Ani": n.export()
                        });
                    }), m.wait(200), m.call(function() {
                        e.btnLock_getBtn2 = !1;
                    }), m.call(function() {
                        var a = wx.createAnimation();
                        a.opacity(1).step({
                            timingFunction: "ease-in",
                            duration: 300
                        }), e.page.setData({
                            "seasonRewardData.nextViewAni": a.export(),
                            "seasonRewardData.nextSeasonImgSrc": "http://question-resource-zh.hortor.net/image/new_skin/season/img_bg_season_" + e.rewardData.seasonInfo.seasonId + "_2.png",
                            "seasonRewardData.rewardViewVisible": !0,
                            "seasonRewardData.nextViewVisible": !0,
                            "seasonRewardData.nextSeasonTime": e.nextSeasonTime
                        });
                    }), m.wait(function() {
                        e.page.setData({
                            "seasonRewardData.rewardSubViewVisible": !1
                        });
                    }), this.showNext = !0;
                }
            }
        }
    } ]), c;
}();

module.exports = c;