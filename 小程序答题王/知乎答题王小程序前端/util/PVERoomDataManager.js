function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var r = 0; r < a.length; r++) {
            var t = a[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(a, r, t) {
        return r && e(a.prototype, r), t && e(a, t), a;
    };
}(), r = (require("./../net/connectNotify.js"), require("./../const/notifyConsts.js"), 
require("./../util/util.js")), t = void 0, n = function() {
    function n() {
        e(this, n);
    }
    return a(n, [ {
        key: "init",
        value: function(e) {
            t = e;
        }
    }, {
        key: "setEmptyData",
        value: function(e) {
            var a = {
                type: "pve",
                roomId: 0,
                userInfo: {},
                rivalUser: {},
                viewNum: 0,
                fee: 0,
                isPvr: !1
            };
            t.mainData.roomData_pve = a;
        }
    }, {
        key: "createBeginnerTestData",
        value: function() {
            var e = {
                type: "beginnerTest",
                roomId: 0,
                userInfo: {
                    uid: t.mainData.role.uid,
                    nickName: t.mainData.role.userInfo.nickName,
                    avatarUrl: t.mainData.role.userInfo.avatarUrl,
                    level: t.mainData.role.level,
                    city: r.getCity(t.mainData.role.userInfo.province, t.mainData.role.userInfo.city)
                },
                rivalUser: {},
                viewNum: 0,
                fee: 0,
                isPvr: !1
            };
            t.mainData.roomData_pve = e;
        }
    }, {
        key: "getData",
        value: function() {
            return t.mainData.roomData_pve || this.setEmptyData(), t.mainData.roomData_pve;
        }
    }, {
        key: "setData",
        value: function(e, a) {
            var r = null;
            if (a) t.mainData.roomData_pve = e, r = t.mainData.roomData_pve; else {
                r = this.getData();
                for (var n in e) r[n] = e[n];
            }
            return r;
        }
    }, {
        key: "fixPVEAvatarUrl",
        value: function() {
            var e = this.getData("pve");
            e.rivalUser && e.rivalUser.uid < 1e7 && (e.rivalUser.avatarUrl = "http://question-resource-zh.hortor.net/image/npc/" + e.rivalUser.avatarUrl + ".png"), 
            e.userInfo && e.userInfo.uid < 1e7 && (e.userInfo.avatarUrl = "http://question-resource-zh.hortor.net/image/npc/" + e.userInfo.avatarUrl + ".png");
        }
    } ]), n;
}();

module.exports = new n();