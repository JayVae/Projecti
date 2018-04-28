var n = require("./../util/util.js"), s = require("./../net/network.js"), o = require("./../const/consts.js"), e = module.exports;

getApp();

e.fightMatch = function(n, e, a) {
    s.post(o.MessageHead.FightMatch, {
        params: {
            matchId: n,
            npcId: e
        },
        success: function() {
            console.warn("匹配等待"), a(null);
        },
        fail: function(n) {
            console.warn("匹配战友失败。-" + n.errMsg), a(n);
        }
    });
}, e.matchConfirm = function(n, e) {
    s.post(o.MessageHead.MatchConfirm, {
        params: {
            roomId: n
        },
        success: function(n) {
            console.warn("等待匹配确认"), e(null, n);
        },
        fail: function(n) {
            console.warn("匹配确认失败。-" + n.errMsg), e(n);
        }
    });
}, e.findQuiz = function(n, e, a) {
    s.post(o.MessageHead.FightFindQuiz, {
        params: {
            roomID: n,
            quizNum: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("获取题目失败。-" + n.errMsg), a(n);
        }
    });
}, e.choose = function(n, e, a, c, t, r, i) {
    s.post(o.MessageHead.FightChoose, {
        params: {
            roomID: n,
            quizNum: e,
            option: a,
            magic: c,
            cfTime: t,
            ccTime: r
        },
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            console.warn("答题失败。-" + n.errMsg), i(n);
        }
    });
}, e.fightResult = function(n, e, a) {
    s.post(o.MessageHead.FightResult, {
        params: {
            roomID: n,
            type: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("获取战果失败。-" + n.errMsg), a(n);
        }
    });
}, e.outFight = function(n, e) {
    s.post(o.MessageHead.OutFight, {
        params: {
            type: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("放弃比赛退出失败。-" + n.errMsg), e(n.errMsg);
        }
    });
}, e.shareResult = function(n, e) {
    s.post(o.MessageHead.ShareResult, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("分享对战-分享请求失败。-" + n.errMsg), e(n);
        }
    });
}, e.matchShare = function(n, e, a) {
    s.post(o.MessageHead.MatchShare, {
        params: {
            roomID: n,
            friendCode: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("分享对战-匹配请求失败。-" + n.errMsg), a(n);
        }
    });
}, e.shareRoomInfo = function(n, e, a) {
    s.post(o.MessageHead.ShareRoomInfo, {
        params: {
            roomID: n,
            friendCode: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("分享对战-匹配请求失败。-" + n.errMsg), a(n);
        }
    });
}, e.GetSharedRoom = function(n, e) {
    s.post(o.MessageHead.GetSharedRoom, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            e(n);
        }
    });
}, e.intoRoom = function(n, e) {
    s.post(o.MessageHead.IntoRoom, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("好友对战-进入房间失败。-" + n.errMsg), e(n);
        }
    });
}, e.leaveRoom = function(n, e) {
    s.post(o.MessageHead.LeaveRoom, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("好友对战-离开房间失败。-" + n.errMsg), e(n.errMsg);
        }
    });
}, e.beginFight = function(n, e) {
    s.post(o.MessageHead.BeginFight, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("好友对战-开始对战失败。-" + n), e(n);
        }
    });
}, e.changeRole = function(n, e) {
    s.post(o.MessageHead.ChangeRole, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("好友对战-改变角色失败。-" + n.errMsg), e(n.errMsg);
        }
    });
}, e.againFight = function(n, e) {
    s.post(o.MessageHead.AgainFight, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("好友对战-再来一局请求失败。-" + n.errMsg), e(n.errMsg);
        }
    });
}, e.cancelMatch = function(n) {
    s.post(o.MessageHead.CancelMatch, {
        params: {},
        success: function(s) {
            n(null, s.ok);
        },
        fail: function(s) {
            console.warn("对战匹配取消失败。-" + s.errMsg), n(s.errMsg);
        }
    });
}, e.outFight = function(n, e, a) {
    s.post(o.MessageHead.OutFight, {
        params: {
            type: n,
            roomID: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("放弃比赛退出失败。-" + n.errMsg), a(n.errMsg);
        }
    });
}, e.SendEmot = function(n, e, a) {
    s.post(o.MessageHead.SendEmot, {
        params: {
            emotId: n,
            roomId: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("发表情。-" + n.errMsg), a(n.errMsg);
        }
    });
}, e.IsExpiredRoom = function(n, e) {
    s.post(o.MessageHead.IsExpiredRoom, {
        params: {
            roomID: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("判断房间是否过期-" + n.errMsg), e(n.errMsg);
        }
    });
}, e.findRoomID = function(n, e) {
    s.get(o.MessageHead.FindRoomID, {
        params: {
            friendCode: n
        },
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            e(n.errMsg);
        }
    });
}, e.matchTest = function(n, e) {
    var a = n ? {
        friendCode: n
    } : {};
    s.post(o.MessageHead.MatchTest, {
        params: a,
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            e(n.errMsg);
        }
    });
}, e.playerReport = function(e, a, c, t, r, i) {
    s.post(o.MessageHead.PlayerReport, {
        params: {
            roomId: e,
            blackRole: a,
            blackQuiz: c,
            blackSubRole: t,
            blackSubQuiz: r
        },
        success: function(s) {
            n.invokeCallback(i, null, s);
        },
        fail: function(s) {
            n.invokeCallback(i, s);
        }
    });
}, e.getAnswer = function(n, e, a) {
    var c = {
        roomID: n,
        quizNum: e
    };
    s.post(o.MessageHead.GetAnswer, {
        params: c,
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            a(n.errMsg);
        }
    });
};