require("./../util/util.js");

var s = require("./../net/network.js"), t = require("./../const/consts.js"), e = module.exports;

e.recordForm = function(e, r) {
    s.post(t.MessageHead.RecordForm, {
        params: {
            formId: e
        },
        success: function(s) {
            r(null, s);
        },
        fail: function(s) {
            console.warn("recordForm失败。-" + s.errMsg), r(s);
        }
    });
}, e.matchStats = function(e) {
    s.get(t.MessageHead.MatchStats, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("matchStats失败。-" + s.errMsg), e(s);
        }
    });
}, e.markStats = function(e, r) {
    s.post(t.MessageHead.MarkStats, {
        params: {
            event: e
        },
        success: function(s) {
            r(null, s);
        },
        fail: function(s) {
            console.warn("matchStats失败。-" + s.errMsg), r(s);
        }
    });
};