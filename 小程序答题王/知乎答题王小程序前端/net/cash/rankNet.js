var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = require("../../const/consts.js");

module.exports.getRank = function() {
    return e.request(t.Route.getRank, {});
};