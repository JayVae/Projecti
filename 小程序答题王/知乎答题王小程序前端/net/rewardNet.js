require("./../util/util.js");

var n = require("./../net/network.js"), s = require("./../const/consts.js"), i = module.exports;

i.gainSignIn = function(i) {
    n.post(s.MessageHead.GainSignIn, {
        params: {},
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            console.warn("GainSignIn失败。-" + n.errMsg), i(n);
        }
    });
}, i.gainBc = function(i) {
    n.post(s.MessageHead.GainBc, {
        params: {},
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            console.warn("gainBc失败。-" + n.errMsg), i(n);
        }
    });
}, i.gainSubscribed = function(i) {
    n.post(s.MessageHead.GainSubscribed, {
        params: {},
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            console.warn("GainSubscribed失败。-" + n.errMsg), i(n);
        }
    });
};