function t(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function t(t, a) {
        for (var e = 0; e < a.length; e++) {
            var i = a[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(a, e, i) {
        return e && t(a.prototype, e), i && t(a, i), a;
    };
}(), e = require("./../../../net/connectNotify.js"), i = require("./../../../net/wsconnect.js"), n = require("./../../../const/consts.js"), r = require("./../../../util/util.js"), o = require("./../../../util/RoomDataManager.js"), s = require("./../../../util/PVERoomDataManager.js"), c = require("./../../../util/ChallengeRoomDataManager.js"), u = require("./../../../net/fightNet.js"), m = require("./../../../const/notifyConsts.js"), h = require("./../../../util/Tween.js"), p = getApp(), l = function() {
    function l(a) {
        t(this, l), this.page = a, this.name = "StateMatch";
    }
    return a(l, [ {
        key: "init",
        value: function(t) {
            var a = this, h = void 0;
            switch ((h = "live" == t || "ob" == t ? o.getData() : "challenge" == t || "obChallenge" == t ? c.getData() : s.getData()).type) {
              case "beginnerTest":
                var l = {};
                l["matchViewData.visible"] = !0, this.page.setData(l), this.setPageData(h.userInfo, null, h), 
                u.matchTest(p.mainData.loginArgs.friendCode, function(t, e) {
                    if (!t) {
                        var i = s.setData(e);
                        s.fixPVEAvatarUrl(), a.setPageData(i.userInfo, i.rivalUser, i), a.playAni();
                    }
                });
                break;

              case "pve":
                var g = {};
                if (g["matchViewData.visible"] = !0, this.page.setData(g), p.pvrShareImg = void 0, 
                p.pvrShareImg2 = void 0, this.page.isPvr) r.cacheFile("rivalAvatar", h.rivalUser.avatarUrl, function(t) {
                    a.page.rivalAvatarPath = t;
                }), r.cacheFile("Avatar", h.userInfo.avatarUrl, function(t) {
                    a.page.userAvatarPath = t;
                }), this.setPageData(h.userInfo, h.rivalUser, h), this.playAni(), this.page.matchOK = !0; else {
                    var f = h.matchId, v = h.npcId, w = p.mainData.role ? ~~p.mainData.role.rowWinNum : 0;
                    r.cacheFile("Avatar", h.userInfo.avatarUrl, function(t) {
                        a.page.userAvatarPath = t;
                    }), this.matchTimeout = setTimeout(function() {
                        a.matchTimeout = void 0, r.ShowConfirm("提示3", "匹配不到对手，请稍后重试。", function() {
                            wx.navigateBack();
                        });
                    }, 2e4), this.page.setData({
                        "battleViewData.winwinVisible": !0,
                        "matchViewData.rowWinNumLeft": w
                    }), this.setPageData(h.userInfo, null, h), e.register(m.ActionFightNotify, this.onFightNotify, this), 
                    u.fightMatch(f, v, function(t) {
                        if (t) if (a.page.matchErr = !0, t.errCode && t.errCode != n.ExitCode.RequestErr) switch (t.errCode) {
                          case 70027:
                            p.matchTimeoutCount += 1, p.matchTimeoutCount >= 2 && (p.matchTimeoutCount = 0, 
                            p.uid > 0 && i.reconnectServer()), a.matchTimeout && clearTimeout(a.matchTimeout), 
                            a.matchTimeout = setTimeout(function() {
                                a.matchTimeout = void 0, r.ShowConfirm("提示1", "匹配不到对手，请稍后重试。", function() {
                                    wx.navigateBack();
                                });
                            }, 5e3);
                            break;

                          case 70019:
                            r.ShowConfirm("提示", t.errMsg, function() {
                                wx.navigateBack();
                            });
                            break;

                          case 90002:
                            r.ShowConfirm("提示", t.errMsg, function() {
                                p.reLogin();
                            });
                            break;

                          case 401:
                            break;

                          case 70020:
                          case 70023:
                            r.ShowConfirm("提示", t.errMsg, function() {
                                wx.navigateBack();
                            });
                            break;

                          case 70024:
                            setTimeout(function() {
                                p.exitGame(t.errCode, t.errMsg);
                            }, 1e3);
                            break;

                          default:
                            r.ShowConfirm("提示", t.errMsg, function() {
                                wx.navigateBack();
                            });
                        } else p.exitGame(n.ExitCode.RequestErr); else console.log("匹配中..."), p.matchTimeoutCount = 0, 
                        a.page.matchErr = !1;
                    });
                }
                break;

              case "live":
                var d = {};
                d["matchViewData.visible"] = !0, this.page.setData(d), h.userInfo.uid == p.mainData.role.uid ? this.setPageData(h.userInfo, h.rivalUser, h) : this.setPageData(h.rivalUser, h.userInfo, h), 
                r.setStorageSync("roomData", JSON.stringify({
                    roomId: h.roomId,
                    notEnd: !0,
                    type: "live"
                })), this.matchOK();
                break;

              case "challenge":
                var x = c.getData();
                this.page.roomId = x.roomId;
                var D = c.getWinnerInfo(), A = c.getChallengerInfo();
                x.userInfo = D, x.rivalUser = A, x.userInfo.uid == p.mainData.role.uid ? this.setPageData(x.userInfo, x.rivalUser, x) : x.rivalUser.uid == p.mainData.role.uid ? this.setPageData(x.rivalUser, x.userInfo, x) : this.setPageData(x.userInfo, x.rivalUser, x), 
                r.setStorageSync("roomData", JSON.stringify({
                    roomId: x.roomId,
                    notEnd: !0,
                    type: "challenge"
                })), this.matchOK();
                break;

              case "ob":
                var I = {};
                I["matchViewData.visible"] = !0, this.page.setData(I), this.setPageData(h.userInfo, h.rivalUser, h), 
                this.matchOK();
                break;

              case "obChallenge":
                var y = c.getData();
                this.page.roomId = y.roomId;
                var V = c.getWinnerInfo(), b = c.getChallengerInfo();
                y.userInfo = V, y.rivalUser = b, r.setStorageSync("roomData", JSON.stringify({
                    roomId: y.roomId,
                    notEnd: !0,
                    type: "obChallenge"
                })), this.setPageData(y.userInfo, y.rivalUser, y), this.matchOK();
            }
        }
    }, {
        key: "setPageData",
        value: function(t, a, e) {
            var i = {};
            this.page.type = e.type, this.page.setRoomId(e.roomId), this.page.matchId = e.matchId, 
            this.page.npcId = e.npcId, t && (i["a.userInfo"] = t, i["a.fee"] = e.fee, i["a.feeLabel"] = e.fee, 
            i["a.nickName"] = t.nickName, i["a.avatarUrl"] = t.avatarUrl, i["a.uid"] = t.uid, 
            i["a.headId"] = t.headId, i["a.cupId"] = ~~r.getFirstCupId(t.cups)), a && (i["b.userInfo"] = a, 
            i["b.fee"] = e.fee, i["b.feeLabel"] = e.fee, i["b.nickName"] = a.nickName, i["b.avatarUrl"] = a.avatarUrl, 
            i["b.uid"] = a.uid, i["b.headId"] = a.headId, i["b.cupId"] = ~~r.getFirstCupId(a.cups)), 
            this.page.setData(i);
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {
            this.isEnd = !0, this.matchTimeout && (clearInterval(this.matchTimeout), this.matchTimeout = void 0), 
            e.remove(m.ActionFightNotify, this.onFightNotify), h.removeTweens("matchView");
        }
    }, {
        key: "onFightNotify",
        value: function(t, a) {
            this.matchTimeout && (clearInterval(this.matchTimeout), this.matchTimeout = void 0);
            try {
                var e = s.setData(a);
                s.fixPVEAvatarUrl(), e.userInfo.rowWinNum = a.rowWinNum;
                var i = a.rivalUser ? ~~a.rivalUser.rowWinNum : 0;
                this.page.setData({
                    "matchViewData.rowWinNumLeft": a.rowWinNum,
                    "matchViewData.rowWinNumRight": i
                }), this.roomId = e.roomId, this.setPageData(e.userInfo, e.rivalUser, e), a.noConfirm ? this.matchOK() : this.matchConfirm();
            } catch (t) {
                r.reportAnalytics_Try(t);
            }
        }
    }, {
        key: "matchConfirm",
        value: function() {
            var t = this;
            u.matchConfirm(this.roomId, function(a, e) {
                if (a) r.ShowConfirm("提示", a.errMsg, function() {
                    wx.navigateBack();
                }); else if (e.reqDur > 0) setTimeout(function() {
                    t.matchConfirm();
                }, e.reqDur); else if (-1 == e.reqDur) r.ShowConfirm("提示2", "匹配不到对手，请稍后重试。", function() {
                    wx.navigateBack();
                }); else {
                    var i = e.findTime - r.getServerTime();
                    i > 0 ? setTimeout(function() {
                        t.matchOK();
                    }, i) : t.matchOK();
                }
            });
        }
    }, {
        key: "matchOK",
        value: function() {
            this.page.matchOK = !0, "challenge" == this.page.type || "obChallenge" == this.page.type ? this.playChallengeAni() : this.playAni(), 
            r.setStorageSync("roomData", JSON.stringify({
                roomId: this.roomId,
                notEnd: !0,
                type: this.page.type
            }));
        }
    }, {
        key: "playChallengeAni",
        value: function() {
            var t = this, a = r.getServerTimeBaseSecond();
            r.log("~~~~~~~准备拿题playChallengeAni:curTime = ", r.formatTime(a), "/statusExpireAt = ", r.formatTime(c.curRoom.statusExpireAt));
            var e = c.curRoom.statusExpireAt - a;
            e <= 0 ? (this.page.stateChange("StateBegin"), this.page.setData({
                "matchViewData.visible": !1
            })) : setTimeout(function() {
                t.page.stateChange("StateBegin"), t.page.setData({
                    "matchViewData.visible": !1
                });
            }, e);
        }
    }, {
        key: "playAni",
        value: function() {
            var t = this, a = h.fastGet("vsView");
            a.call(function() {
                var a = {};
                a["matchViewData.visible"] = !0, a["matchViewData.vsViewVisible"] = !0, a["matchViewData.aViewVisible"] = !0, 
                a["matchViewData.bViewVisible"] = !0;
                var e = wx.createAnimation();
                e.left("-500rpx").top("-160rpx").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.aViewAni"] = e.export();
                var i = wx.createAnimation();
                i.left("500rpx").top("160rpx").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.bViewAni"] = i.export();
                var n = wx.createAnimation();
                n.left("-400rpx").top("calc(50% - 443rpx - 108rpx)").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.decorationAImgAni"] = n.export();
                var r = wx.createAnimation();
                r.left("750rpx").top("calc(50% - 163rpx + 176rpx)").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.decorationBImgAni"] = r.export();
                var o = wx.createAnimation();
                o.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.vsLogoAni"] = o.export();
                var s = wx.createAnimation();
                s.left("300rpx").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.winwinAniRight"] = s.export();
                var c = wx.createAnimation();
                c.right("300rpx").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.winwinAniLeft"] = c.export();
                var u = wx.createAnimation();
                u.right("300rpx").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.cupAniLeft"] = u.export();
                var m = wx.createAnimation();
                m.left("300rpx").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.cupAniRight"] = m.export(), t.page.setData(a);
            }), a.wait(100), this.page.data.a.fee && (a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.scale(3).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 200
                }), a["matchViewData.feeAniLeft"] = e.export(), t.page.setData(a);
            }), a.wait(800), a.tweenCall(function(a) {
                var e = {};
                e["a.feeLabel"] = Math.ceil(t.page.data.a.fee * (1 - a)), t.page.setData(e);
            }, 1e3), a.wait(500)), a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.top("-100%").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), a["matchViewData.matchViewAni"] = e.export(), t.page.setData(a);
            }), a.wait(Math.ceil(1e3 / 24 * 5)), a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.left("100rpx").top("33rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), e.left("0rpx").top("0rpx").step({
                    timingFunction: "ease-out",
                    duration: Math.ceil(1e3 / 24 * 2)
                }), a["matchViewData.aViewAni"] = e.export();
                var i = wx.createAnimation();
                i.left("-100rpx").top("-33rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4),
                    delay: Math.floor(250)
                }), i.left("0rpx").top("0rpx").step({
                    timingFunction: "ease-out",
                    duration: Math.ceil(1e3 / 24 * 2)
                }), a["matchViewData.bViewAni"] = i.export();
                var n = wx.createAnimation();
                n.right("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(1e3 / 24 * 7)
                }), a["matchViewData.winwinAniLeft"] = n.export();
                var r = wx.createAnimation();
                r.left("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(1e3 / 24 * 7)
                }), a["matchViewData.winwinAniRight"] = r.export();
                var o = wx.createAnimation();
                o.right("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(375)
                }), a["matchViewData.cupAniLeft"] = o.export();
                var s = wx.createAnimation();
                s.left("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(375)
                }), a["matchViewData.cupAniRight"] = s.export();
                var c = wx.createAnimation();
                c.left("75rpx").top("calc(50% - 443rpx)").step({
                    timingFunction: "ease-in-out",
                    duration: Math.ceil(250),
                    delay: Math.floor(1e3 / 24 * 2)
                }), a["matchViewData.decorationAImgAni"] = c.export();
                var u = wx.createAnimation();
                u.left("220rpx").top("calc(50% - 163rpx)").step({
                    timingFunction: "ease-in-out",
                    duration: Math.ceil(250),
                    delay: Math.floor(1e3 / 24 * 8)
                }), a["matchViewData.decorationBImgAni"] = u.export(), t.page.setData(a);
            }), a.wait(1e3), a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.opacity(1).scale(10).step({
                    timingFunction: "step-start",
                    duration: 0
                }), a["matchViewData.vsLogoAni"] = e.export(), t.page.setData(a);
            }), a.wait(50), a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.opacity(1).scale(.6).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), e.opacity(1).scale(1).step({
                    timingFunction: "ease-out",
                    duration: 150
                }), a["matchViewData.vsLogoAni"] = e.export(), t.page.setData(a);
            }), a.wait(1e3), a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.opacity(0).scale(4).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a["matchViewData.vsLogoAni"] = e.export(), t.page.setData(a);
            }), a.wait(300), a.call(function() {
                var a = {}, e = wx.createAnimation();
                e.left("-500rpx").top("-160rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), a["matchViewData.aViewAni"] = e.export();
                var i = wx.createAnimation();
                i.left("500rpx").top("160rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), a["matchViewData.bViewAni"] = i.export();
                var n = wx.createAnimation();
                n.left("-400rpx").top("calc(50% - 443rpx - 108rpx)").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), a["matchViewData.decorationAImgAni"] = n.export();
                var r = wx.createAnimation();
                r.left("750rpx").top("calc(50% - 163rpx + 176rpx)").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), a["matchViewData.decorationBImgAni"] = r.export(), t.page.setData(a), t.page.stateChange("StateBegin");
            }), a.wait(100), a.call(function() {
                t.page.setData({
                    "matchViewData.visible": !1
                });
            });
        }
    } ]), l;
}();

module.exports = l;