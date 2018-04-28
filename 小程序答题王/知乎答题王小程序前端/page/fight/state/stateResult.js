function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), a = require("./../../../net/fightNet.js"), i = (require("./../../../net/connectNotify.js"), 
require("./../../../const/notifyConsts.js"), require("./../../../util/Tween.js")), n = require("./../../../util/util.js"), r = require("./../../../const/consts.js"), s = require("./../../../util/ChallengeRoomDataManager.js"), o = require("./../../../data/ItemsManager.js"), l = getApp(), u = function() {
    function u(e) {
        t(this, u), this.page = e, this.name = "StateResult";
    }
    return e(u, [ {
        key: "init",
        value: function() {
            var t = this;
            this.page.outFightSending || (this.roomId = this.page.roomId, this.playInit(), this.page.resultOK = !0, 
            a.fightResult(this.roomId, 0, function(e, a) {
                if (e && e.errCode == r.ExitCode.RequestErr || n.setStorageSync("roomData", JSON.stringify({
                    roomId: t.roomId,
                    notEnd: !1
                })), l.mainData.needCreateNewQRCode = !0, e) switch (e.errCode) {
                  case 70017:
                    n.ShowConfirm("提示", "本局比赛已结束", function() {
                        wx.navigateBack({
                            delta: -1
                        });
                    });
                    break;

                  default:
                    l.exitGame(e.errCode, e.errMsg);
                } else switch (t.page.type) {
                  case "ob":
                    t.playAni(a);
                    break;

                  case "live":
                    t.isLevelUp = t.page.updataRoleData(a), a.itemInfo && a.itemInfo.itemId > 0 && a.itemInfo.itemNum > 0 && (o.addItem(a.itemInfo.itemId, a.itemInfo.itemNum), 
                    l.setLastLiveRewardTime()), t.playAni(a);
                    break;

                  case "challenge":
                  case "obChallenge":
                    var i = s.getWinnerInfo();
                    s.iAmWinner() && i && (i.successCount = a.rowWinNum);
                    s.getData();
                    var u = {};
                    u["liveData.aSuccessCount"] = a.rowWinNum, u["liveData.bSuccessCount"] = a.rivalRowWinNum, 
                    s.request_challengeRank(s.curRoom.id, !0, function(e, i) {
                        if (e) n.ShowConfirm("提示", e.errMsg, function() {}); else {
                            var r = n.getServerTimeBaseSecond(), o = 2 == s.curRoom.status ? s.curRoom.statusExpireAt : r, l = i.list, c = o + s.getChallengeResultWaitDur(), p = c - r, w = t.getOverText(a.isWin, p);
                            u["resultViewData.liveRank"] = l, u["resultViewData.liveMyWinNum"] = t.getMyChallengeRankText(l), 
                            u["resultViewData.liveCountDown2back"] = w, t.page.setData(u), t.playAni(a), t.timeInterval_countdownToBack || (t.timeInterval_countdownToBack = setInterval(function() {
                                var e = n.getServerTimeBaseSecond(), i = {}, r = p = c - e;
                                w = t.getOverText(a.isWin, p), i["resultViewData.liveCountDown2back"] = w, t.page.setData(i), 
                                r <= 0 && (clearInterval(t.timeInterval_countdownToBack), t.timeInterval_countdownToBack = void 0, 
                                t.page.liveCountDownOver = !0, s.curRoom.status = 2, s.curRoom.curChallenger = 0, 
                                wx.redirectTo({
                                    url: "/page/challenge/challenge_room/challenge_room",
                                    success: function() {},
                                    fail: function() {}
                                }));
                            }, 1e3));
                        }
                    });
                    break;

                  case "pve":
                    try {
                        l.mainData.role.rowWinNum = a.rowWinNum;
                    } catch (t) {
                        n.reportAnalytics_Try(t);
                    }
                    l.updatePVEData(a), t.isLevelUp = t.page.updataRoleData(a), a.itemInfo && a.itemInfo.itemId > 0 && a.itemInfo.itemNum > 0 && o.addItem(a.itemInfo.itemId, a.itemInfo.itemNum), 
                    o.refreshChangciBuffVal(a.myBuff), t.saveShareImg(a), t.playAni(a);
                    break;

                  case "beginnerTest":
                    t.isLevelUp = t.page.updataRoleData(a), wx.navigateTo({
                        url: "/page/qrCode/qrCode"
                    });
                }
            }));
        }
    }, {
        key: "getOverText",
        value: function(t, e) {
            var a = "";
            return s.iAmAudience() ? a = 0 == t ? "竟然不相上下，" + e + "秒后准备抢位挑战！" : "我上我也行，" + e + "秒后准备抢位挑战！" : 0 == t ? a = s.iAmWinner() ? "竟然不相上下，" + e + "秒后继续迎接挑战！" : "竟然不相上下，" + e + "秒后准备抢位挑战！" : 1 == t ? a = "轻松获胜，" + e + "秒后准备迎接下一位挑战者！" : 2 == t && (a = "一定是题目有问题，" + e + "秒后准备抢位挑战！"), 
            a;
        }
    }, {
        key: "getChalleneRank",
        value: function(t) {
            var e = [];
            if (t.list) for (var a = 0; a < t.list.length; a++) {
                var i = t.list[a];
                i.score > 0 && e.push(i);
            }
            if (e.sort(function(t, e) {
                return t.rank - e.rank;
            }), e.length > 0) {
                for (var n = [], r = 0; r < e.length; r++) n.length < 3 && n.push(e[r]);
                return n;
            }
            return [];
        }
    }, {
        key: "getMyChallengeRankText",
        value: function(t) {
            var e = s.getMyInfo();
            n.log("~~~~~~~~myInfo:", e);
            for (var a = 0; a < t.length; a++) if (t[a].uid == e.uid) return "";
            return "我的成绩：" + e.successCount + "胜";
        }
    }, {
        key: "saveShareImg",
        value: function(t) {
            var e = this;
            if (this.page.isPvr) {
                if (this.page.rivalAvatarPath && this.page.userAvatarPath) {
                    var a = wx.createCanvasContext("pvrShareCanvas");
                    a.drawImage(this.page.userAvatarPath, 37, 90, 107, 107), a.drawImage(this.page.rivalAvatarPath, 265, 90, 107, 107), 
                    a.drawImage("/image/pvr/img_ad_challenge_4.png", 0, 0, 400, 320), 1 == t.isWin && a.drawImage("/image/pvr/img_ad_challenge_4_banner.png", 76, 6, 248, 81), 
                    a.setFillStyle("#ffffff"), a.setTextAlign && a.setTextAlign("center"), a.setFontSize(60), 
                    a.fillText(t.score, 199.5, 255), a.draw(!0, function(t) {
                        console.log(t), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 320,
                            destWidth: 400,
                            destHeight: 320,
                            canvasId: "pvrShareCanvas",
                            success: function(t) {
                                t.tempFilePath && (l.pvrShareImg2 = t.tempFilePath);
                            }
                        }, e);
                    });
                }
            } else if (this.page.userAvatarPath) {
                var i = wx.createCanvasContext("pvrShareCanvas");
                i.drawImage(this.page.userAvatarPath, 147, 83, 107, 107), i.drawImage("/image/pvr/img_ad_challenge_3.png", 0, 0, 400, 320), 
                i.setFillStyle("#ffffff"), i.setTextAlign && i.setTextAlign("center"), i.setFontSize(60), 
                i.fillText(t.score, 199.5, 258), i.draw(!0, function(t) {
                    console.log(t), wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 320,
                        destWidth: 400,
                        destHeight: 320,
                        canvasId: "pvrShareCanvas",
                        success: function(t) {
                            t.tempFilePath && (l.pvrShareImg = t.tempFilePath);
                        }
                    }, e);
                });
            }
        }
    }, {
        key: "onPlayerLogout",
        value: function(t, e) {}
    }, {
        key: "playAni",
        value: function(t) {
            var e = this, a = {};
            switch (this.page.type) {
              case "ob":
                a["resultViewData.shareBtnVisible"] = !1, a["resultViewData.funcBtnLabel"] = "自己开一局", 
                a.testResultBtnVisible = !1;
                break;

              case "live":
                a["resultViewData.shareBtnVisible"] = !0, a["resultViewData.funcBtnLabel"] = "再来一局", 
                a.testResultBtnVisible = !1, t.itemInfo && t.itemInfo.itemId > 0 && t.itemInfo.itemNum > 0 && (a["resultViewData.rewardItem.id"] = t.itemInfo.itemId, 
                a["resultViewData.rewardItem.num"] = t.itemInfo.itemNum, a["resultViewData.rewardItem.visible"] = !0);
                break;

              case "challenge":
              case "obChallenge":
                a["resultViewData.shareBtnVisible"] = !1, a["resultViewData.hideFuncBtn"] = !0, 
                a["resultViewData.hideReward"] = !0, a["resultViewData.rewardItem.visible"] = !1;
                break;

              case "pve":
                a["resultViewData.funcBtnLabel"] = this.page.isPvr ? "返回排行榜" : "继续挑战", a["resultViewData.shareBtnVisible"] = !0, 
                a.testResultBtnVisible = !1, t.itemInfo && t.itemInfo.itemId > 0 && t.itemInfo.itemNum > 0 && (a["resultViewData.rewardItem.id"] = t.itemInfo.itemId, 
                a["resultViewData.rewardItem.num"] = t.itemInfo.itemNum, a["resultViewData.rewardItem.visible"] = !0);
                break;

              case "beginnerTest":
                a["resultViewData.funcBtnLabel"] = "回首页", a["resultViewData.shareBtnVisible"] = !1, 
                a.testResultBtnVisible = !0;
            }
            var n = t.baseGold;
            t.extraGold && (n += ~~t.extraGold[3], n += ~~t.extraGold[4], a["resultViewData.buff3Visible"] = t.extraGold.hasOwnProperty("3"), 
            a["resultViewData.buff4Visible"] = t.extraGold.hasOwnProperty("4"), n >= 0 && (n = "+" + n));
            var r = t.baseExp;
            t.extraExp && (r += ~~t.extraExp[1], r += ~~t.extraExp[2], a["resultViewData.buff1Visible"] = t.extraExp.hasOwnProperty("1"), 
            a["resultViewData.buff2Visible"] = t.extraExp.hasOwnProperty("2"), r >= 0 && (r = "+" + r)), 
            a["resultViewData.gold"] = n, a["resultViewData.exp"] = r, a["resultViewData.showKnowBtn"] = "pve" == this.page.type && !this.page.isPvr && 1 != t.isWin && l.mainData.role.level > 2, 
            a["resultViewData.isWin"] = t.isWin, a["resultViewData.shareText"] = l.getShareRewardText(), 
            a["resultViewData.hasShareReward"] = "live" != this.page.type && "ob" != this.page.type && "challenge" != this.page.type && "obChallenge" != this.page.type && !!l.getShareRewardText(), 
            a["resultViewData.criticalVisible"] = t.winBack, a["resultViewData.visible"] = !0, 
            a["resultViewData.comboLeft"] = t.rowNum, a["resultViewData.comboRight"] = t.rivalRowNum, 
            a["resultViewData.rowWinNumLeft"] = l.mainData.role.rowWinNum, 2 == t.isWin && (a["resultViewData.rowWinNumRight"] = this.page.data.b.userInfo.rowWinNum + 1), 
            this.page.setData(a);
            var s = i.fastGet("stateResult"), o = 0;
            o = "challenge" == this.page.type || "obChallenge" == this.page.type ? this.playMainOutFast(s, t) : this.playMainOut(s, t), 
            s.wait(o), o = this.playScoreIn(s, t), s.wait(o + 200), o = this.playTitleIn(s, t), 
            "challenge" == this.page.type || "obChallenge" == this.page.type ? (s.wait(o), o = this.playLiveIn(s, t)) : (s.wait(o), 
            o = this.playAddIn(s, t), s.wait(o), o = this.playBtnIn(s, t), s.wait(o), this.isLevelUp && s.call(function() {
                e.showLevelUpView();
            }));
        }
    }, {
        key: "playInit",
        value: function() {
            var t = wx.createAnimation();
            t.width("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var e = wx.createAnimation();
            e.width("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = wx.createAnimation();
            a.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var i = wx.createAnimation();
            i.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var n = wx.createAnimation();
            n.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var r = wx.createAnimation();
            r.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var s = wx.createAnimation();
            s.left("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var o = wx.createAnimation();
            o.right("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var l = wx.createAnimation();
            l.left("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var u = wx.createAnimation();
            u.right("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var c = wx.createAnimation();
            c.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var p = wx.createAnimation();
            p.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var w = wx.createAnimation();
            w.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var m = wx.createAnimation();
            m.scaleX(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var g = wx.createAnimation();
            g.scaleX(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var d = wx.createAnimation();
            d.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var x = wx.createAnimation();
            x.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var v = wx.createAnimation();
            v.opacity(0).scale(5).step({
                timingFunction: "step-start",
                duration: 0
            });
            var f = wx.createAnimation();
            f.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var h = wx.createAnimation();
            h.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var D = wx.createAnimation();
            D.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var V = wx.createAnimation();
            V.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var A = wx.createAnimation();
            A.bottom("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var y = {};
            y["resultViewData.scoreViewLeftAni"] = t.export(), y["resultViewData.scoreViewRightAni"] = e.export(), 
            y["resultViewData.scoreTextViewLeftAni"] = a.export(), y["resultViewData.scoreTextViewRightAni"] = i.export(), 
            y["resultViewData.titleAni"] = n.export(), y["resultViewData.criticalAni"] = r.export(), 
            y["resultViewData.comboLeftAni"] = s.export(), y["resultViewData.comboRightAni"] = o.export(), 
            y["resultViewData.wwLeftAni"] = l.export(), y["resultViewData.wwRightAni"] = u.export(), 
            y["resultViewData.goldViewAni"] = c.export(), y["resultViewData.expViewAni"] = p.export(), 
            y["resultViewData.rewardViewAni"] = w.export(), y["resultViewData.goldLineAni"] = m.export(), 
            y["resultViewData.expLineAni"] = g.export(), y["resultViewData.funcBntAni"] = d.export(), 
            y["resultViewData.shareBtnAni"] = x.export(), y["resultViewData.shareDescAni"] = v.export(), 
            y["resultViewData.buff1Ani"] = f.export(), y["resultViewData.buff2Ani"] = h.export(), 
            y["resultViewData.buff3Ani"] = D.export(), y["resultViewData.buff4Ani"] = V.export(), 
            y["resultViewData.reportImgAni"] = A.export(), this.page.setData(y);
        }
    }, {
        key: "playMainOut",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.scale(0).step({
                    timingFunction: "ease-in",
                    duration: 100
                });
                var i = wx.createAnimation();
                i.left("-200rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var n = wx.createAnimation();
                n.right("-200rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                for (var r = 0; r < 4; r++) {
                    var s = wx.createAnimation();
                    s.scale(0).step({
                        timingFunction: "step-start",
                        duration: 0
                    }), t["battleViewData.answer[" + r + "].ani"] = s.export();
                }
                var o = wx.createAnimation();
                o.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 0
                }), t["battleViewData.questionViewAni"] = o.export(), t["battleViewData.timeViewAni"] = e.export(), 
                t["battleViewData.leftScoreViewAni"] = i.export(), t["battleViewData.rightScoreViewAni"] = n.export(), 
                a.page.setData(t);
            }), 200;
        }
    }, {
        key: "playMainOutFast",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.scale(0).step({
                    timingFunction: "step-start",
                    duration: 100
                });
                var i = wx.createAnimation();
                i.left("-200rpx").step({
                    timingFunction: "step-start",
                    duration: 100
                });
                var n = wx.createAnimation();
                n.right("-200rpx").step({
                    timingFunction: "step-start",
                    duration: 100
                });
                for (var r = 0; r < 4; r++) {
                    var s = wx.createAnimation();
                    s.scale(0).step({
                        timingFunction: "step-start",
                        duration: 100
                    }), t["battleViewData.answer[" + r + "].ani"] = s.export();
                }
                var o = wx.createAnimation();
                o.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t["battleViewData.questionViewAni"] = o.export(), t["battleViewData.timeViewAni"] = e.export(), 
                t["battleViewData.leftScoreViewAni"] = i.export(), t["battleViewData.rightScoreViewAni"] = n.export(), 
                a.page.setData(t);
            }), 100;
        }
    }, {
        key: "playLiveIn",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1, 1).step({
                    timingFunction: "ease-in",
                    duration: 250
                });
                var e = wx.createAnimation();
                e.top("0px").step({
                    delay: 250,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var i = wx.createAnimation();
                i.top("0px").step({
                    delay: 250,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var n = wx.createAnimation();
                n.scale(1, 1).step({
                    delay: 250,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var r = wx.createAnimation();
                r.scale(1).step({
                    delay: 450,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var s = {};
                s["resultViewData.ani_condition"] = t.export(), s["resultViewData.ani_title"] = e.export(), 
                s["resultViewData.ani_rank"] = i.export(), s["resultViewData.ani_myNum"] = n.export(), 
                s["resultViewData.ani_countDown2back"] = r.export(), a.page.setData(s);
            }), 650;
        }
    }, {
        key: "playScoreIn",
        value: function(t, e) {
            var a = this;
            t.call(function() {
                var t = wx.createAnimation(), n = wx.createAnimation();
                switch (t.width("50%").step({
                    timingFunction: "ease-in",
                    duration: 100
                }), n.width("50%").step({
                    timingFunction: "ease-in",
                    duration: 100
                }), e.isWin) {
                  case 0:
                    t.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), n.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                    break;

                  case 1:
                    t.width("60%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), n.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                    break;

                  case 2:
                    t.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), n.width("60%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                }
                var r = wx.createAnimation();
                r.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 150
                }), r.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var s = wx.createAnimation();
                s.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 150
                }), s.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var o = wx.createAnimation();
                o.left("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), o.left("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var l = wx.createAnimation();
                l.right("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), l.right("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var u = wx.createAnimation();
                u.left("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 650
                }), u.left("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var c = wx.createAnimation();
                c.right("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 650
                }), c.right("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var p = {};
                p["resultViewData.scoreViewLeftAni"] = t.export(), p["resultViewData.scoreViewRightAni"] = n.export(), 
                p["resultViewData.scoreTextViewLeftAni"] = r.export(), p["resultViewData.scoreTextViewRightAni"] = s.export(), 
                p["resultViewData.comboLeftAni"] = o.export(), p["resultViewData.comboRightAni"] = l.export(), 
                p["resultViewData.wwLeftAni"] = u.export(), p["resultViewData.wwRightAni"] = c.export(), 
                a.page.setData(p);
                var w = e.score, m = e.rivalScore, g = i.fastGet("scoreText", !0);
                g.wait(110), g.tweenCall(function(t) {
                    var e = {};
                    e["resultViewData.scoreLeft"] = Math.ceil(w * t), e["resultViewData.scoreRight"] = Math.ceil(m * t), 
                    a.page.setData(e);
                }, 550);
            });
            var n = 300;
            return (e.rowNum > 0 || e.rivalRowNum > 0) && (n += 200), (this.page.data.a.userInfo.rowWinNum > 0 || this.page.data.b.userInfo.rowWinNum > 0) && (n += 200), 
            n;
        }
    }, {
        key: "playTitleIn",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 250
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var e = wx.createAnimation();
                e.scale(5).opacity(0).step({
                    timingFunction: "step-start",
                    duration: 500
                }), e.scale(.8).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), e.scale(1).opacity(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.titleAni"] = t.export(), i["resultViewData.criticalAni"] = e.export(), 
                a.page.setData(i);
            }), 650;
        }
    }, {
        key: "playAddIn",
        value: function(t, e) {
            var a = this, i = ~~e.baseGold, n = ~~e.baseExp, r = 0, s = 0, o = 0, l = 0;
            return this.page.data.resultViewData.hideReward || (t.call(function() {
                var t = wx.createAnimation();
                t.scale(0, 1).step({
                    timingFunction: "step-start",
                    duration: 50
                }), t.scale(.2, 1).step({
                    timingFunction: "linear",
                    duration: 100
                }), t.scale(1.5, 1).step({
                    timingFunction: "ease-in",
                    duration: 100,
                    delay: 50
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var e = wx.createAnimation();
                e.scale(0, 1).step({
                    timingFunction: "step-start",
                    duration: 50
                }), e.scale(.2, 1).step({
                    timingFunction: "linear",
                    duration: 100
                }), e.scale(1.5, 1).step({
                    timingFunction: "ease-in",
                    duration: 100,
                    delay: 50
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.goldLineAni"] = t.export(), i["resultViewData.expLineAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(400), t.call(function() {
                var t = wx.createAnimation();
                t.left("250rpx").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.left("250rpx").step({
                    timingFunction: "ease-in-out",
                    duration: 200,
                    delay: 100
                });
                var i = {};
                i["resultViewData.goldViewAni"] = t.export(), i["resultViewData.expViewAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(500), t.tweenCall(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (i >= 0 ? "+" : "") + Math.ceil(i * t), a.page.setData(e);
            }, 500), t.tweenCall(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + Math.ceil(n * t), a.page.setData(e);
            }, 500)), "pve" == this.page.type && e.extraGold && (e.extraGold.hasOwnProperty("3") && (o = ~~e.extraGold[3], 
            t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff3Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), o > 0 && t.tweenCall(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (i >= 0 ? "+" : "") + (i + Math.ceil(o * t)), a.page.setData(e);
            }, 500)), e.extraGold.hasOwnProperty("4") && (l = ~~e.extraGold[4], t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff4Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), l > 0 && t.tweenCall(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (i >= 0 ? "+" : "") + (i + o + Math.ceil(l * t)), 
                a.page.setData(e);
            }, 500))), "pve" == this.page.type && e.extraExp && (e.extraExp.hasOwnProperty("1") && (r = ~~e.extraExp[1], 
            t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff1Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), r > 0 && t.tweenCall(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + (n + Math.ceil(r * t)), a.page.setData(e);
            }, 500)), e.extraExp.hasOwnProperty("2") && (s = ~~e.extraExp[2], t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff2Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), s > 0 && t.tweenCall(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + (n + r + Math.ceil(s * t)), a.page.setData(e);
            }, 500))), t.wait(100), e.itemInfo && e.itemInfo.itemId > 0 && e.itemInfo.itemNum > 0 && (t.call(function() {
                var t = wx.createAnimation();
                t.left("0px").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 150,
                    delay: 200
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.rewardViewAni"] = t.export(), i["resultViewData.rewardItemAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(450)), 100;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var a = wx.createAnimation();
                a.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 200
                }), a.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = wx.createAnimation();
                i.opacity(1).scale(.8).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 400
                }), i.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var n = wx.createAnimation();
                n.bottom("0px").step({
                    timingFunction: "ease-in",
                    duration: 300,
                    delay: 600
                });
                var r = {};
                r["resultViewData.funcBntAni"] = t.export(), r["resultViewData.shareBtnAni"] = a.export(), 
                r["resultViewData.shareDescAni"] = i.export(), "pve" == e.page.type && (r["resultViewData.reportImgAni"] = n.export()), 
                e.page.setData(r);
            }), 1e3;
        }
    }, {
        key: "playMainViewAni",
        value: function(t) {
            var e = this;
            t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("5rpx").top("-5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("-5rpx").top("5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("5rpx").top("-5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("-5rpx").top("5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("0px").top("0px").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            });
        }
    }, {
        key: "showLevelUpView",
        value: function() {
            var t = void 0, e = l.mainData.role.level;
            3 == e ? t = [ {
                index: 0,
                label: "解锁知识升级"
            }, {
                index: 1,
                label: "解锁群比赛 "
            }, {
                index: 2,
                label: "解锁商店  "
            } ] : 2 == e && (t = [ {
                index: 0,
                label: "解锁好友排行"
            }, {
                index: 1,
                label: "解锁好友对战"
            }, {
                index: 2,
                label: "解锁银行  "
            } ]);
            var a = {};
            a["levelUpViewData.visible"] = !0, a["levelUpViewData.level"] = e, a["levelUpViewData.unlockSource"] = t, 
            this.page.setData(a);
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {
            clearInterval(this.timeInterval_countdownToBack), this.timeInterval_countdownToBack = void 0, 
            i.removeTweens("ressultAni"), i.removeTweens("live2rank");
        }
    } ]), u;
}();

module.exports = u;