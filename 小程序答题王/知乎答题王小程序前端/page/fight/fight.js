var e = require("./../../util/util.js"), t = require("./../../net/fightNet.js"), i = require("./../../net/messageNet.js"), a = require("./../../page/fight/state/stateBegin.js"), o = require("./../../page/fight/state/stateChoose.js"), n = require("./../../page/fight/state/stateChooseEnd.js"), s = require("./../../page/fight/state/stateResult.js"), r = require("./../../page/fight/state/stateNone.js"), l = require("./../../page/fight/state/stateMatch.js"), h = require("./../../page/fight/state/stateTest.js"), u = require("./../../net/connectNotify.js"), c = require("./../../const/notifyConsts.js"), g = require("./../../const/consts.js"), m = require("./../../const/modeConsts.js"), d = require("./../../util/RoomDataManager.js"), f = require("./../../util/PVERoomDataManager.js"), p = require("./../../util/ChallengeRoomDataManager.js"), w = require("./../../util/EmojiSelectController.js"), v = require("./../../util/EmojiController.js"), b = require("./../../util/liveExpiredController.js"), C = require("./../../data/ItemsManager.js"), S = require("./../../net/wsconnect.js"), A = require("../pvr/template/PvrController.js"), D = require("/../challenge/template/audienceViewController.js"), I = getApp(), k = {
    curState: null,
    answerBtnLock: !0,
    round: 0,
    selectIndex: {
        1: {
            a: -1,
            b: -1
        },
        2: {
            a: -1,
            b: -1
        },
        3: {
            a: -1,
            b: -1
        },
        4: {
            a: -1,
            b: -1
        },
        5: {
            a: -1,
            b: -1
        },
        6: {
            a: -1,
            b: -1
        }
    },
    trueAnswerIndex: {
        1: -1,
        2: -1,
        3: -1,
        4: -1,
        5: -1,
        6: -1
    },
    playerLogout: !1,
    type: "",
    roomId: 0,
    answerList: [],
    matchOK: !1,
    matchErr: !1,
    resultOK: !1,
    npcId: 0,
    matchId: 0,
    hasDouble: !0,
    isPvr: !1,
    isOut: !1,
    rivalIsOut: !1,
    data: {
        lattice: [],
        a: {
            userInfo: {},
            nickName: "",
            avatarUrl: "",
            score: 0,
            scoreStr: 0,
            combo: 0,
            mult: 0,
            scoreAni: null,
            avatarAni: null,
            fee: 0,
            uid: 0,
            scoreProgressAni: null,
            scoreProgressViewAni: null
        },
        b: {
            userInfo: {},
            nickName: "",
            avatarUrl: "",
            score: 0,
            scoreStr: 0,
            combo: 0,
            mult: 0,
            scoreAni: null,
            avatarAni: null,
            fee: 0,
            uid: 0,
            scoreProgressAni: null,
            scoreProgressViewAni: null
        },
        matchViewData: {
            visible: !1,
            matchViewVisible: !0,
            vsViewVisible: !1,
            aViewVisible: !1,
            bViewVisible: !1,
            aViewAni: null,
            bViewAni: null,
            decorationAImgAni: null,
            decorationBImgAni: null,
            vsLogoAni: null,
            matchViewAni: null,
            rowWinNumLeft: 2,
            rowWinNumRight: 3
        },
        battleViewData: {
            winwinVisible: !1,
            isFirstShow: !0,
            countDown: 10,
            question: "",
            visible: !1,
            doubleAni: null,
            countDownStr: 10,
            roundText: "",
            titleViewAni: null,
            timeDecorationAni: null,
            timeViewAni: null,
            leftComboViewAni: null,
            rightComboViewAni: null,
            questionViewAni: null,
            leftScoreViewAni: null,
            rightScoreViewAni: null,
            bgAni: null,
            mainViewAni: null,
            fullShadeVisible: !1,
            fullShadeAni: null,
            answer: [ {
                index: 0,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            }, {
                index: 1,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            }, {
                index: 2,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            }, {
                index: 3,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            } ],
            timeViewStyle: "",
            timeOvalViewLeftStyle: "",
            timeOvalViewRightStyle: "",
            baseTimeViewScale: 0
        },
        resultViewData: {
            reportVisible: !1,
            reportEnabled: !0,
            visible: !1,
            scoreViewLeftAni: null,
            scoreViewRightAni: null,
            scoreTextViewLeftAni: null,
            scoreTextViewRightAni: null,
            titleAni: null,
            criticalAni: null,
            comboLeftAni: null,
            comboRightAni: null,
            wwLeftAni: null,
            wwRightAni: null,
            goldViewAni: null,
            expViewAni: null,
            rewardViewAni: null,
            rewardItemAni: null,
            goldLineAni: null,
            expLineAni: null,
            funcBntAni: null,
            shareBtnAni: null,
            shareDescAni: null,
            funcBtnLabel: "",
            isWin: 1,
            scoreLeft: 0,
            scoreRight: 0,
            addGold: "",
            addExp: "",
            hasShareReward: !0,
            criticalVisible: !1,
            shareGold: 0,
            rewardItem: {
                visible: !1,
                id: 0,
                num: 0,
                ani: null
            }
        },
        testResultBtnVisible: !1,
        wsconnectBreaking: !1,
        levelUpViewData: {
            visible: !1,
            level: 1
        }
    },
    onLoad: function(t) {
        e.showShareMenu(), I.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.init(t.from), "challenge" != this.type && "obChallenge" != this.type || wx.setNavigationBarTitle({
            title: p.curRoom.name || "群比赛"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    registerConnectNotify: function() {
        "challenge" != this.type && "obChallenge" != this.type || (e.log("====fight.注册群比赛广播事件===="), 
        u.register(c.ActionChallengeInfoBase, this.onActionChallengeInfoBase, this), u.register(c.ActionChallengeInfoMembers, this.onActionChallengeInfoMembers, this));
    },
    removeConnectNotify: function() {
        "challenge" != this.type && "obChallenge" != this.type || (e.log("====fight.注册群比赛广播事件===="), 
        u.remove(c.ActionChallengeInfoBase, this.onActionChallengeInfoBase), u.remove(c.ActionChallengeInfoMembers, this.onActionChallengeInfoMembers));
    },
    onUnload: function() {
        var e = this;
        this.isUnload = !0, this.removeConnectNotify(), u.remove(c.ActionPlayerLogout, this.onPlayerLogout), 
        u.remove(c.ActionFightAnswer, this.onFightAnswer), u.remove(c.ActionFightOut, this.onFightOut), 
        u.remove(c.ActionFightInviteAgain, this.onFightInviteAgain), u.remove(c.socketClose, this.onSocketClose), 
        u.remove(c.socketOpen, this.onSocketOpen), u.remove(c.ActionFightSendEmot, this.onActionFightSendEmot), 
        I.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        I.eventDispatcher.removeEventListener("onLogin", this.onLogin, this);
        for (var i = getCurrentPages(), a = i.length - 1; a >= 0; a--) {
            var o = i[a];
            o && "page/pve/pve" == o.route && (o.btnLock = !1);
        }
        if (this.curState && (this.curState.end(), this.curState = null), !this.reLogin) {
            switch (this.type) {
              case "live":
                this.leaveRoom || (I.mainData.enterRoomId = this.roomId, this.resultOK ? t.againFight(this.roomId, function() {}) : this.sendOutFight());
                break;

              case "ob":
                -1 != I.mainData.enterRoomId && (I.mainData.enterRoomId = this.roomId);
                break;

              case "pve":
                this.matchErr || (this.matchOK ? this.resultOK || this.sendOutFight() : t.cancelMatch(function(t, i) {
                    i || (console.log("取消匹配:OK", i), e.sendOutFight(1));
                }));
                break;

              case "beginnerTest":
                this.resultOK || this.sendOutFight();
                break;

              case "challenge":
                this.resultOK ? this.liveCountDownOver || p.request_challengeLeave(p.curRoom.id, function(e, t) {
                    e || p.leaveRoom();
                }) : this.sendOutFight();
                break;

              case "obChallenge":
                this.liveCountDownOver || p.request_challengeLeave(p.curRoom.id, function(e, t) {
                    e || p.leaveRoom();
                });
            }
            "challenge" != this.type && "obChallenge" != this.type || this.audienceViewController && this.audienceViewController.dispose();
        }
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onTapChooseBtn: function(e) {
        if (!this.answerBtnLock && this.curState && "StateChoose" == this.curState.name && "ob" != this.type) {
            this.audioTapCtx && this.audioTapCtx.play();
            var t = "obChallenge" == this.type;
            this.curState.mySelect(e.currentTarget.dataset.index, t);
        }
    },
    onTapFuncBtn: function(e) {
        var t = this;
        if (!this.btnLock) switch (this.btnLock = !0, this.type) {
          case "beginnerTest":
            i.markStats(g.event_point.click_to_cover, function() {}), I.mainData.fightAgain = !1, 
            I.mainData.enterRoomId = -1, wx.navigateBack({
                delta: 1,
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
            break;

          case "ob":
            I.mainData.fightAgain = !1, I.mainData.enterRoomId = -1, wx.navigateBack({
                delta: 1,
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
            break;

          case "live":
            wx.navigateBack({
                delta: 1,
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
            break;

          case "pve":
            this.isPvr ? wx.navigateBack({
                delta: 1
            }) : wx.navigateBack({
                delta: 1,
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
        }
    },
    init: function(e) {
        this.from = e;
        var t = void 0;
        t = "challenge" == this.from || "obChallenge" == this.from ? p.getData() : "live" == this.from || "ob" == this.from ? d.getData() : f.getData(), 
        this.type = t.type, this.registerConnectNotify(), u.register(c.ActionPlayerLogout, this.onPlayerLogout, this), 
        u.register(c.ActionFightAnswer, this.onFightAnswer, this), u.register(c.ActionFightOut, this.onFightOut, this), 
        u.register(c.ActionFightInviteAgain, this.onFightInviteAgain, this), u.register(c.socketClose, this.onSocketClose, this), 
        u.register(c.socketOpen, this.onSocketOpen, this), u.register(c.ActionFightSendEmot, this.onActionFightSendEmot, this), 
        I.eventDispatcher.addEventListener("onLogin", this.onLogin, this), this.userEmojiController = new v(this, "userEmoji", !0), 
        this.rivalEmojiController = new v(this, "rivalEmoji", !1), this.emojiSelectController = new w(this, this.userEmojiController), 
        this.emojiSelectController.setVisible(!1);
        var i = I.mainData.role.settingsInfo || {};
        i.soundOff || (wx.createAudioContext && !this.audioFalseCtx && (this.audioFalseCtx = wx.createAudioContext("audioFalse"), 
        this.audioFalseCtx.setSrc("http://question-resource-zh.hortor.net/image/soundEffect/answer_wrong.wav")), 
        wx.createAudioContext && !this.audioTrueCtx && (this.audioTrueCtx = wx.createAudioContext("audioTrue"), 
        this.audioTrueCtx.setSrc("http://question-resource-zh.hortor.net/image/soundEffect/answer_correct.wav")), 
        wx.createAudioContext && !this.audioTapCtx && (this.audioTapCtx = wx.createAudioContext("audioTap"), 
        this.audioTapCtx.setSrc("http://question-resource-zh.hortor.net/image/soundEffect/button_click.wav")));
        for (var a = [], o = 1; o <= 30; o++) a.push({
            t: 10 - 10 / 30 * o,
            deg: 12 * o
        });
        var n = {
            lattice: a
        };
        switch (n.soundOff = i.soundOff, this.roundMax = 5, this.type) {
          case "ob":
          case "live":
            this.hasDouble = !0, I.mainData.fightAgain = !0;
            break;

          case "pve":
            this.isPvr = t.isPvr, this.hasDouble = !0;
            break;

          case "beginnerTest":
            this.roundMax = 6, this.hasDouble = !1;
        }
        if (n = this.setTimeView(n), this.setData(n), this.stateChange("StateMatch"), S.socketOpen || this.startBreakingTimeout(), 
        "challenge" == this.type || "obChallenge" == this.type) {
            this.audienceViewController = new D(this, "audienceView"), this.audienceViewController.setMemberList(p.curRoom.members);
            p.getWinnerInfo(), p.getChallengerInfo();
        }
    },
    startBreakingTimeout: function() {
        var e = this;
        this.clearBreakingTimeout(), this.breakingTimeout = setTimeout(function() {
            e.setData({
                wsconnectBreaking: !S.socketOpen
            });
        }, 3e3);
    },
    clearBreakingTimeout: function() {
        this.breakingTimeout && (clearTimeout(this.breakingTimeout), this.breakingTimeout = void 0);
    },
    setTimeView: function(e) {
        return this.data.battleViewData.baseTimeViewScale = I.systemInfo.windowWidth / 750, 
        e;
    },
    setRoomId: function(e) {
        this.roomId = e, this.emojiSelectController.setRoomId(e);
    },
    stateChange: function(e) {
        if (!this.isUnload && (null == this.curState || this.curState.name != e)) {
            var t = null;
            switch (e) {
              case "StateNone":
                t = new r(this);
                break;

              case "StateBegin":
                t = new a(this);
                break;

              case "StateChoose":
                t = new o(this);
                break;

              case "StateChooseEnd":
                t = new n(this);
                break;

              case "StateResult":
                t = new s(this);
                break;

              case "StateMatch":
                t = new l(this);
                break;

              case "StateTest":
                t = new h(this);
                break;

              default:
                t = new a(this);
            }
            this.curState && this.curState.end(t), m.RunMode != m.RunModeType.Prod && console.log("curState:" + e), 
            this.curState = t, this.curState.init(this.from);
        }
    },
    getTrueIndex: function(e) {
        return this.trueAnswerIndex[e];
    },
    setTrueIndex: function(e, t) {
        this.trueAnswerIndex[e] = t;
    },
    onFightAnswer: function(t, i) {
        if (i && (e.log("onFightAnswer：", this.roomId, i), !i.roomId || i.roomId == this.roomId)) {
            var a = void 0;
            if (i.uid == this.data.a.uid) a = "a"; else if (i.uid == this.data.b.uid) a = "b"; else if (0 == i.uid) a = "b"; else {
                if (this.audienceViewController) {
                    var o = "无名氏", n = p.getMemberInfo(i.uid);
                    n && (o = n.name), 0 != i.option && o && this.audienceViewController.remindAnswer(o, this.data.battleViewData.answer[i.option - 1].answer);
                }
                e.log("收到围观群众选择的答案：", i);
            }
            if (a) {
                var s = {};
                this.setData(s), "StateChoose" == this.curState.name && this.curState.round == i.num ? this.curState.onFightAnswer(t, i) : this.answerList.push(i);
            }
        }
    },
    onFightOut: function(t, i) {
        try {
            switch (this.type) {
              case "live":
              case "ob":
                i == this.data.a.uid && (this.playerLogout = !0, "live" != this.type && e.ShowToast(this.data.a.nickName + "放弃了对战")), 
                i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast(this.data.b.nickName + "放弃了对战")), 
                this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i);
                break;

              case "pve":
                i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast(this.data.b.nickName + "放弃了对战")), 
                this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i);
            }
            this.onFightInviteAgain(null, i, !1);
        } catch (t) {
            e.reportAnalytics_Try(t);
        }
    },
    onPlayerLogout: function(t, i) {
        try {
            switch (this.type) {
              case "live":
              case "ob":
                i == this.data.a.uid && (this.playerLogout = !0, e.ShowToast(this.data.a.nickName + "离开了对战")), 
                i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast(this.data.b.nickName + "离开了对战")), 
                this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i), 
                this.playerLogout && this.curState && "StateResult" == this.curState.name && (this.curState.onPlayerLogout(t, i), 
                d.getData().userInfo.uid || this.roomMasterIsLogout || (this.roomMasterIsLogout = !0, 
                this.leaveRoom = !0, b.show("发起者"), I.gotoCover(function() {}, function() {})));
                break;

              case "pve":
                i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast("对手投降")), this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i);
            }
        } catch (t) {
            e.reportAnalytics_Try(t);
        }
    },
    updataRoleData: function(e) {
        var t = !1;
        return e && (e.addExp > 0 && (I.mainData.role.exp = e.exp, I.mainData.role.level != e.level && (t = !0, 
        I.mainData.role.maxExp = e.maxExp, I.mainData.role.level = e.level)), I.updateGold(e.gold), 
        1 == e.isWin && (I.mainData.role.winRoom += 1), I.mainData.role.roomNum += 1), t;
    },
    sendOutFight: function() {
        var i = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.outFightSending = !0, t.outFight(a, this.roomId, function(t, o) {
            if (t && t.errCode == g.ExitCode.RequestErr || e.setStorageSync("roomData", JSON.stringify({
                roomId: i.roomId,
                notEnd: !1
            })), t) console.error("outFight err", t); else if (o) {
                if (0 != a) return;
                var n = "";
                if (o.addGold < 0 && (n = "损失" + Math.abs(o.addGold) + "金币"), "pve" == i.type) if (C.refreshChangciBuffVal(o.myBuff), 
                300014 != o.matchID || 0 != I.mainData.role.curMatch && 300014 != I.mainData.role.curMatch) {
                    if (o.matchID == I.mainData.role.curMatch) {
                        var s = e.GetMatchInfo(I.mainData.role.curMatch);
                        s.star > 0 && (s.star -= 1, I.eventDispatcher.dispatchEventWith("stageSubStar"));
                    }
                } else {
                    var r = e.GetMatchInfo(I.mainData.role.curMatch);
                    r.star > 0 && (r.star -= 1, I.eventDispatcher.dispatchEventWith("lastStageUpdate"));
                }
                "ob" != i.type && "obChallenge" != i.type && wx.showModal({
                    title: "你放弃了战斗",
                    content: n,
                    showCancel: !1,
                    confirmText: "确定",
                    success: function() {}
                }), i.updataRoleData(o), "challenge" != i.type && "obChallenge" != i.type || (console.log("~~~~~~~~~~~~~" + e.formatTime(e.getServerTimeBaseSecond()) + "_challengeLeave liveCountDownOver:", i.liveCountDownOver), 
                i.liveCountDownOver || p.request_challengeLeave(p.curRoom.id, function(e, t) {
                    e || p.leaveRoom();
                }));
            }
        });
    },
    onFightInviteAgain: function(t, i) {
        var a = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        i == this.data.a.uid && (a && e.ShowToast(this.data.a.nickName + "准备再来一局"), this.userAgain = !0), 
        i == this.data.b.uid && (a && e.ShowToast(this.data.b.nickName + "准备再来一局"), this.rivalAgain = !0), 
        this.userAgain && this.rivalAgain && "ob" == this.type && wx.navigateBack({
            delta: 1
        });
    },
    onSocketClose: function(e) {
        this.startBreakingTimeout();
    },
    onSocketOpen: function(e) {
        this.clearBreakingTimeout(), this.setData({
            wsconnectBreaking: !S.socketOpen
        });
    },
    onActionFightSendEmot: function(e, t) {
        t && (this.data.a.uid == t.uid ? this.userEmojiController.showFace(t.emotID) : this.data.b.uid == t.uid && this.rivalEmojiController.showFace(t.emotID));
    },
    onActionChallengeInfoBase: function(t, i) {
        console.log(e.formatTime(e.getServerTimeBaseSecond()) + "_onActionChallengeInfoBase:", i), 
        p.curRoom.curWinner = i.challengeInfolist.curWinner, p.curRoom.curChallenger = i.challengeInfolist.curChallenger, 
        p.curRoom.expireAt = i.challengeInfolist.expireAt, p.curRoom.roomID = i.challengeInfolist.roomID, 
        p.curRoom.status = i.challengeInfolist.status, p.curRoom.statusExpireAt = i.challengeInfolist.statusExpireAt, 
        this.processMembersChange(i.membersChangeInfo);
    },
    onActionChallengeInfoMembers: function(e, t) {
        console.log("onActionChallengeInfoMembers:", t), this.processMembersChange(t);
    },
    processMembersChange: function(t) {
        if (t) {
            for (var i = 0; i < t.length; i++) {
                var a = t[i];
                1 == a.type ? this.audienceViewController.addMember(a) : 2 == a.type ? (this.audienceViewController.removeMember(a), 
                a.uid != this.data.a.userInfo.uid && a.uid != this.data.b.userInfo.uid || (e.ShowToast("参赛者逃跑了！"), 
                this.stateChange("StateResult"))) : 3 == a.type && this.audienceViewController.upDateMemberData(a);
            }
            this.audienceViewController && this.audienceViewController.setMemberList(p.curRoom.members);
        }
    },
    onShareAppMessage: function(e) {
        switch (this.shared = !0, this.type) {
          case "ob":
          case "live":
            var i = d.getViewType(), a = (d.getData(), 1 == i ? I.mainData.role.shareCode : d.masterShareCode), o = I.getPvPShareText(), n = {
                title: o.text,
                path: "/page/login/login?friendCode=" + a + "&liveFight=" + !0,
                from: "pvp_" + o.index,
                imageUrl: o.imageUrl
            };
            return I.shareConf(n);

          case "challenge":
          case "obChallenge":
            var s = p.getShareData(I.mainData.role.userInfo.nickName), r = {
                title: s.title,
                path: "/page/login/login?friendCode=" + I.mainData.role.shareCode + "&challenge=" + !0,
                from: "challenge",
                imageUrl: s.imageUrl
            };
            return I.shareConf(r, !0, function() {}, function() {});

          case "pve":
            f.getData();
            t.shareResult(this.roomId, function(e, t) {
                e && console.log("shareResult err", e);
            });
            var l = null, h = null, u = null;
            this.isPvr ? (u = 1 == this.data.resultViewData.isWin ? "我打败了" + this.data.b.nickName + "得了" + this.data.resultViewData.scoreLeft + "分，你要不要也来试试？" : "我挑战" + this.data.b.nickName + "得了" + this.data.resultViewData.scoreLeft + "分，你要不要也来试试？", 
            A.shareTitle = u, l = "/page/login/login?friendCode=" + A.friendCode + "&roomIdPvr=" + A.roomIdPvr, 
            h = I.pvrShareImg2 ? I.pvrShareImg2 : "cut") : (u = "脑力比拼，点击来战，敢来和我比拼一下吗？", l = "/page/login/login?friendCode=" + I.mainData.role.shareCode + "&roomIdPvr=" + this.roomId, 
            h = I.pvrShareImg ? I.pvrShareImg : "https://question-resource-zh.hortor.net/image/new_skin/AD/img_ad_score.jpg");
            var c = {
                title: u,
                path: l,
                from: "pve",
                imageUrl: h
            };
            return I.shareConf(c);

          default:
            var g = {
                title: "我在一场知乎答题王对决中获得了" + this.data.resultViewData.scoreLeft + "分，敢来和我比拼一下吗？",
                path: "/page/login/login?friendCode=" + I.mainData.role.shareCode + "&roomIdPvr=" + this.roomId,
                from: "pve",
                imageUrl: "https://question-resource-zh.hortor.net/image/new_skin/AD/img_ad_score.jpg"
            };
            return I.shareConf(g);
        }
    },
    btn_leaveRoom_clicked: function(e) {
        e && e.detail && e.detail.formId && "the formId is a mock one" != e.detail.formId && i.recordForm(e.detail.formId, function() {}), 
        this.leaveRoom = !0, t.leaveRoom(this.roomId, function(e, t) {
            e && console.warn("leaveRoom err", e), d.leaveRoom(), I.mainData.enterRoomId = 0, 
            I.gotoCover(function() {}, function() {});
        });
    },
    levelUpView_onTapClosedBtn: function(e) {
        var t = {};
        t["levelUpViewData.visible"] = !1, this.setData(t);
    },
    levelUpView_onTapBtn: function(e) {
        2 == I.mainData.role.level && i.markStats(g.event_point.uplevel1, function() {});
        var t = {};
        t["levelUpViewData.visible"] = !1, this.setData(t);
    },
    onShareTextUpdate: function() {
        this.setData({
            "resultViewData.hasShareReward": !this.shared && !!I.getShareRewardText()
        });
    },
    onLogin: function() {
        this.reLogin = !0;
    },
    avatar_onTapAvatar: function() {
        "ob" != this.type && "obChallenge" != this.type && this.emojiSelectController.setVisible(!0);
    },
    onTapRestultEmojiBtn: function() {
        "ob" != this.type && "obChallenge" != this.type && this.emojiSelectController.setVisible(!0);
    },
    onTapWifiBtn: function() {
        var e = this;
        this.wifiBtnLock || (this.wifiBtnLock = !0, setTimeout(function() {
            e.wifiBtnLock = !1;
        }, 5e3));
    },
    onTapReportBtn: function(e) {
        var t = {};
        t["resultViewData.reportVisible"] = !0, this.setData(t);
    },
    onTapKnowBtn: function(e) {
        I.gotoKnow();
    },
    onTapReportClose: function(e) {
        var t = {};
        t["resultViewData.reportVisible"] = !1, this.setData(t);
    },
    onTapBlackRole: function(e) {
        var t = {};
        t["resultViewData.blackRole"] = !this.data.resultViewData.blackRole, this.setData(t);
    },
    onTapBlackQuiz: function(e) {
        var t = {};
        t["resultViewData.blackQuiz"] = !this.data.resultViewData.blackQuiz, this.setData(t);
    },
    onTapBlackSubRole: function(e) {
        var t = {};
        t["resultViewData.blackSubRole"] = !this.data.resultViewData.blackSubRole, this.setData(t);
    },
    onTapReportOK: function(i) {
        var a = {};
        a["resultViewData.reportVisible"] = !1, a["resultViewData.reportEnabled"] = !1, 
        this.setData(a);
        var o = this.data.resultViewData.blackRole || this.data.resultViewData.blackSubRole ? this.data.b.uid : 0, n = this.data.resultViewData.blackQuiz ? e.randomInt(1, 5) : 0, s = this.data.resultViewData.blackQuiz ? "10011" : 0, r = [];
        this.data.resultViewData.blackRole && r.push("2001"), this.data.resultViewData.blackSubRole && r.push("9001");
        var l = r.join(",");
        t.playerReport(this.roomId, o, n, l, s, function(t, i) {
            e.ShowConfirm("", "举报成功。");
        });
    }
};

Page(k);