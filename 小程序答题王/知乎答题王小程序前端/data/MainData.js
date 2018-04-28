var e = require("../const/consts.js"), s = require("../net/connectNotify.js");

module.exports = {
    role: {
        uid: -1,
        signIn: {
            lastSignTime: 0
        },
        allSeeds: {},
        userInfo: {
            nickName: "",
            avatarUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515329878249&di=d7c17201f86012b7be2c096346618ac5&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-02-02%2F211841154.jpg"
        },
        settingsInfo: {
            soundOff: !1,
            messagePushOff: !0,
            isAttention: !0
        }
    },
    myQuestions: {
        backupSelectedItem: null,
        selectedItem: null,
        myQuestions: [ [], [], [] ]
    },
    videoSrc: {
        countDown: {
            key: "countDown",
            ver: 1,
            url: "http://question-resource-zh.hortor.net/image/media/count_down_new.mp4?v=0.1.18",
            tmp: null,
            save: null
        },
        ready12: {
            key: "ready12",
            ver: 1,
            url: "http://question-resource-zh.hortor.net/image/media/question_12.mp4?v=0.1.18",
            tmp: null,
            save: null
        },
        reward: {
            key: "reward",
            ver: 1,
            url: "http://question-resource-zh.hortor.net/image/media/get_reward.mp4?v=0.1.18",
            tmp: null,
            save: null
        }
    },
    goldenHouse: {
        baseConf: {
            id: -1,
            openTime: 123123,
            maxQuizNum: 12,
            bonus: 500,
            name: "现金答题大赛",
            des: "你浪，我出钱",
            status: 0,
            relifeTimesMax: 3,
            relifeAt12: !1,
            startCountDownTime: 600,
            shareTitle: "连续答对12题，瓜分巨额现金大奖！",
            shareImageUrl: "http://question-resource-zh.hortor.net/image/cash/share/img_ad_share_1.jpg",
            shareImageUrl2: "http://question-resource-zh.hortor.net/image/cash/share/img_ad_share_2.jpg?v=0.01",
            shareImageUrlZhihu: "http://question-resource-zh.hortor.net/image/cash/share/img_ad_share_zhihu.jpg",
            withdrawalsUpperLimit: 2e4
        },
        baseInfo: {
            balance: 0,
            cid: 0,
            title: "",
            desc: "",
            startAt: 0,
            bonus: 0,
            mStatus: 1,
            rank: 0,
            friendsInfo: [ {
                uid: 0,
                nickname: "",
                avatarUrl: "",
                gender: 0
            } ],
            friendsHash: {},
            playerCount: 0,
            reviveAmount: 0,
            curStatus: 0,
            remainTime: 0,
            remainTimePoint: 0,
            globalTotalCash: 0,
            myTotalCash: 0,
            reviveUsed: !1,
            subscribe: !1
        }
    },
    contestInfo: {
        curQuiz: {
            idx: -1,
            question: "",
            answers: []
        },
        curQuizResult: {
            idx: -1,
            correctAnswer: -1,
            questionResult: -1,
            reviveResult: -1,
            choosedCount: [],
            friendAnswers: [],
            myAnswer: -1,
            tmpIdx: -1,
            tmpMyAnswer: -1
        },
        curQuizFinalResult: {
            playerCount: 0,
            isWinner: !1,
            bonus: -1,
            winnerBonus: -1,
            friendWinners: [],
            otherWinners: [],
            aliveCounts: [],
            review: []
        },
        passNum: 0,
        curMoney: 0,
        friendAnswers: [],
        friendCommont: [],
        friendResultData: []
    },
    rankInfo: {
        global: [ {
            player: {
                uid: 0,
                nickname: "",
                avatarUrl: "",
                gender: 0
            },
            cash: "",
            entriesNum: 0,
            winNum: 0,
            rank: 0
        } ],
        week: [ {
            player: {
                uid: 0,
                nickname: "",
                avatarUrl: "",
                gender: 0
            },
            cash: "",
            entriesNum: 0,
            winNum: 0,
            rank: 0
        } ],
        friend: [ {
            player: {
                uid: 0,
                nickname: "",
                avatarUrl: "",
                gender: 0
            },
            cash: "",
            entriesNum: 0,
            winNum: 0,
            rank: 0
        } ],
        selfWeek: {
            player: {
                uid: 0,
                nickname: "",
                avatarUrl: "",
                gender: 0
            },
            cash: "",
            entriesNum: 0,
            winNum: 0,
            rank: ""
        },
        selfGlobal: {
            player: {
                uid: 0,
                nickname: "",
                avatarUrl: "",
                gender: 0
            },
            cash: "",
            entriesNum: 0,
            winNum: 0,
            rank: ""
        }
    },
    friendContest: [ {
        uid: 0,
        outAt: 0,
        reviveAt: 0
    } ],
    register: function() {
        var n = this;
        s.register(e.Route.updatePlayerCount, function(e, s) {
            n.setUpdatePlayerCountData(s);
        }, this), s.register(e.Route.nextQuestion, function(e, s) {
            n.setNextQuestionData(s);
        }, this), s.register(e.Route.questionResult, function(e, s) {
            n.setQuestionResultData(s);
        }, this), s.register(e.Route.finalResult, function(e, s) {
            n.setFinalResultData(s);
        }, this), s.register(e.Route.getReady, function(e, s) {
            n.setGetReadyData(s);
        }, this), s.register(e.Route.reLoad, function(e, s) {
            n.setReloadData(s);
        }, this);
    },
    setInitData: function(e) {
        this.role.uid = e.role.uid, this.role.userInfo.avatarUrl = e.role.userInfo.avatarUrl, 
        this.role.userInfo.nickName = e.role.userInfo.nickName, this.role.settingsInfo.soundOff = e.role.settingsInfo.soundOff, 
        this.role.settingsInfo.messagePushOff = e.role.settingsInfo.messagePushOff, this.role.settingsInfo.isAttention = e.role.settingsInfo.isAttention;
    },
    setLoginData: function(e) {
        this.goldenHouse.baseInfo.balance = this.toFixed(e.balance / 100), this.goldenHouse.baseInfo.reviveAmount = e.reviveAmount, 
        this.goldenHouse.baseInfo.globalTotalCash = this.toFixed(e.globalTotalCash / 100), 
        this.goldenHouse.baseInfo.myTotalCash = this.toFixed(e.myTotalCash / 100), this.goldenHouse.baseInfo.rank = e.rank, 
        this.goldenHouse.baseInfo.friendsInfo = e.friendsInfo || [];
        var s = -1;
        if (this.goldenHouse.baseInfo.friendsInfo && this.goldenHouse.baseInfo.friendsInfo.length > 0) for (var n = 0; n < this.goldenHouse.baseInfo.friendsInfo.length; n++) s = this.goldenHouse.baseInfo.friendsInfo[n].uid, 
        this.goldenHouse.baseInfo.friendsHash[s] = this.goldenHouse.baseInfo.friendsInfo[n];
    },
    addJoinFriendData: function(e) {
        e && (this.goldenHouse.baseInfo.friendsHash[e.info.uid] || (this.goldenHouse.baseInfo.friendsInfo.push(e.info), 
        this.goldenHouse.baseInfo.friendsHash[e.info.uid] = e.info));
    },
    setJoinData: function(e) {
        this.resetData(), this.goldenHouse.baseInfo.title = e.title, this.goldenHouse.baseInfo.desc = e.desc, 
        this.goldenHouse.baseInfo.playerCount = e.playerCount, this.goldenHouse.baseInfo.startAt = e.startAt, 
        this.goldenHouse.baseInfo.curStatus = e.curStatus, this.goldenHouse.baseInfo.mStatus = e.mStatus, 
        this.goldenHouse.baseInfo.remainTime = e.remainTime, this.goldenHouse.baseInfo.bonus = this.toFixed(e.bonus / 100), 
        e.hasOwnProperty("subscribe") && (this.goldenHouse.baseInfo.subscribe = e.subscribe);
    },
    setUpdatePlayerCountData: function(e) {
        this.goldenHouse.baseInfo.playerCount = e.playerCount;
    },
    setNextQuestionData: function(e) {
        this.contestInfo.curQuiz.idx = e.idx, this.contestInfo.curQuiz.question = e.question, 
        this.contestInfo.curQuiz.answers = e.answers, this.goldenHouse.baseInfo.curStatus = e.curStatus, 
        this.goldenHouse.baseInfo.remainTime = e.remainTime, this.goldenHouse.baseInfo.reviveAmount = e.reviveAmount, 
        this.goldenHouse.baseInfo.reviveUsed = e.reviveUsed, this.contestInfo.curQuiz.tmpIdx = -1, 
        this.contestInfo.curQuiz.tmpMyAnswer = -1, this.contestInfo.curQuizResult.myAnswer = -1, 
        this.contestInfo.friendAnswers = [], this.contestInfo.friendCommont = [], this.contestInfo.friendResultData = [];
    },
    setQuestionResultData: function(e) {
        this.contestInfo.curQuizResult.idx = e.idx, this.contestInfo.curQuizResult.correctAnswer = e.correctAnswer, 
        this.contestInfo.curQuizResult.questionResult = e.questionResult, this.contestInfo.curQuizResult.reviveResult = e.reviveResult, 
        this.contestInfo.curQuizResult.choosedCount = e.choosedCount, this.contestInfo.curQuizResult.friendAnswers = e.friendAnswers, 
        this.contestInfo.curQuizResult.myAnswer = e.myAnswer, this.goldenHouse.baseInfo.curStatus = e.curStatus, 
        this.goldenHouse.baseInfo.mStatus = e.mStatus, this.goldenHouse.baseInfo.remainTime = e.remainTime, 
        this.goldenHouse.baseInfo.reviveAmount = e.reviveAmount, this.goldenHouse.baseInfo.reviveUsed = e.reviveUsed, 
        this.contestInfo.curQuiz.question = e.question, this.contestInfo.curQuiz.answers = e.answers, 
        this.contestInfo.curQuiz.tmpMyAnswer = -1, this.contestInfo.curQuiz.tmpIdx = -1;
    },
    setFinalResultData: function(e) {
        this.contestInfo.curQuizFinalResult.playerCount = e.playerCount, this.contestInfo.curQuizFinalResult.isWinner = e.isWinner, 
        this.contestInfo.curQuizFinalResult.bonus = this.toFixed(e.bonus / 100), this.contestInfo.curQuizFinalResult.winnerBonus = this.toFixed(e.winnerBonus / 100), 
        this.contestInfo.curQuizFinalResult.friendWinners = e.friendWinners, this.contestInfo.curQuizFinalResult.otherWinners = e.otherWinners, 
        this.contestInfo.curQuizFinalResult.aliveCounts = e.aliveCounts, this.contestInfo.curQuizFinalResult.review = e.review, 
        e.isWinner && (this.goldenHouse.baseInfo.balance += this.toFixed(e.winnerBonus / 100)), 
        this.goldenHouse.baseInfo.reviveAmount = e.reviveAmount;
    },
    setFriendResultData: function(e) {
        this.contestInfo.friendResultData.push(e);
    },
    setGetReadyData: function(e) {
        this.goldenHouse.baseInfo.mStatus = e.mStatus, this.goldenHouse.baseInfo.curStatus = e.curStatus, 
        this.goldenHouse.baseInfo.remainTime = e.remainTime, this.goldenHouse.baseInfo.reviveAmount = e.reviveAmount;
    },
    setReloadData: function(e) {
        this.goldenHouse.baseInfo.title = e.title, this.goldenHouse.baseInfo.desc = e.desc, 
        this.goldenHouse.baseInfo.playerCount = e.playerCount, this.goldenHouse.baseInfo.startAt = e.startAt, 
        this.goldenHouse.baseInfo.curStatus = e.curStatus, this.goldenHouse.baseInfo.remainTime = e.remainTime, 
        this.goldenHouse.baseInfo.bonus = this.toFixed(e.bonus / 100), this.goldenHouse.baseInfo.reviveAmount = e.reviveAmount, 
        e.hasOwnProperty("rank") && (this.goldenHouse.baseInfo.rank = e.rank), this.resetData();
    },
    pushFriendContestData: function(e) {
        var s = {};
        s.uid = e.uid, s.outAt = e.outAt, s.reviveAt = e.reviveAt, this.friendContest.push(s);
    },
    clearFriendContestData: function() {
        this.friendContest = [];
    },
    resetData: function() {
        this.contestInfo.curQuizResult.reviveResult = -1, this.contestInfo.curQuizResult.questionResult = -1, 
        this.goldenHouse.baseInfo.mStatus = 1, this.goldenHouse.baseInfo.reviveUsed = !1;
    },
    isEndQuiz: function() {
        return this.contestInfo.curQuiz.idx >= this.goldenHouse.baseConf.maxQuizNum - 1;
    },
    toFixed: function(e) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
        return parseFloat(e.toFixed(s));
    },
    getShareImageUrl: function() {
        return "zhihu" == this.goldenHouse.baseInfo.title ? this.goldenHouse.baseConf.shareImageUrlZhihu : this.goldenHouse.baseConf.shareImageUrl;
    },
    setRankData: function(e) {
        var s = this;
        this.rankInfo.selfGlobal = e.selfGlobal, this.rankInfo.selfGlobal.rank = this.rankInfo.selfGlobal.rank < 0 ? "--" : this.rankInfo.selfGlobal.rank, 
        this.rankInfo.selfGlobal.cash = this.toFixed(this.rankInfo.selfGlobal.cash / 100), 
        this.rankInfo.selfWeek = e.selfWeek, this.rankInfo.selfWeek.rank = this.rankInfo.selfWeek.rank < 0 ? "--" : this.rankInfo.selfWeek.rank, 
        this.rankInfo.selfWeek.cash = this.toFixed(this.rankInfo.selfWeek.cash / 100);
        e.global.map(function(e, n) {
            e.cash = (.01 * e.cash).toFixed(2), e.player.isMy = e.player.uid == s.role.uid, 
            e.player.type = e.player.uid == s.role.uid || s.goldenHouse.baseInfo.friendsHash.hasOwnProperty(e.player.uid) ? -1 : 0;
        }), this.rankInfo.global = e.global, e.week.map(function(e, n) {
            e.cash = (.01 * e.cash).toFixed(2), e.player.isMy = e.player.uid == s.role.uid, 
            e.player.type = e.player.uid == s.role.uid || s.goldenHouse.baseInfo.friendsHash.hasOwnProperty(e.player.uid) ? -1 : 0;
        }), this.rankInfo.week = e.week;
        for (var n = e.friend.length - 1; n >= 0; n--) e.friend[n] || e.friend.splice(n, 1);
        e.friend.map(function(e, n) {
            e.cash = (.01 * e.cash).toFixed(2), e.player.isMy = e.player.uid == s.role.uid, 
            e.player.type = e.player.uid == s.role.uid || s.goldenHouse.baseInfo.friendsHash.hasOwnProperty(e.player.uid) ? -1 : 0;
        }), this.rankInfo.friend = e.friend, this.rankInfo.friend.push({
            player: {
                uid: this.rankInfo.selfGlobal.player.uid,
                nickname: this.rankInfo.selfGlobal.player.nickname,
                avatarUrl: this.rankInfo.selfGlobal.player.avatarUrl,
                gender: this.rankInfo.selfGlobal.player.gender,
                city: this.rankInfo.selfGlobal.player.city,
                province: this.rankInfo.selfGlobal.player.province,
                type: -1
            },
            cash: this.rankInfo.selfGlobal.cash,
            entriesNum: this.rankInfo.selfGlobal.entriesNum,
            winNum: this.rankInfo.selfGlobal.winNum,
            rank: this.rankInfo.selfGlobal.rank
        }), this.rankInfo.friend.sort(function(e, s) {
            return e.cash < s.cash;
        });
        for (var t = this.rankInfo.friend.length - 1; t >= 0; t--) this.rankInfo.friend[t].rank = t + 1;
    },
    setGetFriendAnswerData: function(e) {
        this.contestInfo.friendAnswers = this.contestInfo.friendAnswers.concat(e.answers);
    },
    setGetFriendCommontData: function(e) {
        this.contestInfo.friendCommont.push(e);
    },
    getFriendAvataUrlByUid: function(e) {
        if (this.goldenHouse.baseInfo.friendsInfo.length > 0) for (var s = 0; s < this.goldenHouse.baseInfo.friendsInfo; s++) if (this.goldenHouse.baseInfo.friendsInfo[s].uid == e) return this.goldenHouse.baseInfo.friendsInfo[s].avatarUrl;
        return "";
    }
};