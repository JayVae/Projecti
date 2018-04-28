var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = (require("../../util/util.js"), 
require("../../const/consts.js")), r = module.exports;

r.getListWithdrawOrders = function() {
    return e.request(t.Route.getListWithdrawOrders, {});
}, r.doWithdraw = function(r) {
    return e.request(t.Route.doWithdraw, r);
};