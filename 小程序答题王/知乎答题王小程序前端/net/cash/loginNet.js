var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = require("../../const/consts.js"), s = require("./../../net/cash/cashNetwork.js"), n = module.exports;

n.login = function(s) {
    return console.log("cash login params:", s), e.request(t.Route.login, s);
}, n.getContestStatus = function(e) {
    s.get(t.MessageHead.getContestStatus, {
        params: {},
        success: function(t) {
            e(null, t);
        },
        fail: function(t) {
            e(t);
        }
    });
};