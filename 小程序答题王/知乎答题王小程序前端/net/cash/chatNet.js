var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = (require("../../util/util.js"), 
require("../../const/consts.js")), n = module.exports;

n.send = function(n) {
    return e.notify(t.Route.chatSend, n);
}, n.commentFriend = function(n) {
    return e.notify(t.Route.commentFriend, n);
};