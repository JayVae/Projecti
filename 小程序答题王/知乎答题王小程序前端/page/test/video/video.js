Page({
    data: {
        seek: 0,
        src: ""
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function(n) {
        var o = {
            title: "本群知乎答题王段位排行在此，看看你能排第几？",
            path: "/page/login/login?friendCode=" + app.mainData.role.shareCode + "&compare=true",
            from: "pvr"
        };
        return app.shareConf(o);
    }
});