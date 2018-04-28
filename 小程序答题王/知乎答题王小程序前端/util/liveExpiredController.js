function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var n = i[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(i, t, n) {
        return t && e(i.prototype, t), n && e(i, n), i;
    };
}(), t = (require("./../util/util.js"), function() {
    function t() {
        e(this, t);
    }
    return i(t, [ {
        key: "register",
        value: function(e) {
            e.liveExpiredView_onTapCloseBtn = this.liveExpiredView_onTapCloseBtn.bind(this), 
            e.liveExpiredView_onTapShareBtn = this.liveExpiredView_onTapShareBtn.bind(this), 
            e.liveExpiredView_onTapPVEBtn = this.liveExpiredView_onTapPVEBtn.bind(this);
            var i = this, t = e.onShow.bind(e);
            e.onShow = function(n) {
                t(n), i.onPageShow(e);
            };
            var n = e.onHide.bind(e);
            e.onHide = function(t) {
                n(t), i.onPageHide(e);
            }.bind(e);
            var a = {};
            a.liveExpiredViewData = {
                visible: !1
            }, e.setData(a);
        }
    }, {
        key: "onPageShow",
        value: function(e) {
            this.curPage = e, this.needShow && this.show(this.title);
        }
    }, {
        key: "onPageHide",
        value: function(e) {
            this.curPage = null;
        }
    }, {
        key: "liveExpiredView_onTapCloseBtn",
        value: function() {
            if (this.curPage) {
                var e = {};
                e["liveExpiredViewData.visible"] = !1, this.curPage.setData(e);
            }
        }
    }, {
        key: "liveExpiredView_onTapShareBtn",
        value: function() {
            if (this.curPage) {
                var e = {};
                e["liveExpiredViewData.visible"] = !1, this.curPage.setData(e);
            }
        }
    }, {
        key: "liveExpiredView_onTapPVEBtn",
        value: function() {
            if (getApp().gotoPVE(function() {}, function() {}), this.curPage) {
                var e = {};
                e["liveExpiredViewData.visible"] = !1, this.curPage.setData(e);
            }
        }
    }, {
        key: "show",
        value: function(e) {
            if (this.curPage) {
                var i = {};
                i["liveExpiredViewData.title"] = e, i["liveExpiredViewData.visible"] = !0, this.curPage.setData(i), 
                this.needShow = !1, this.title = "";
            } else this.needShow = !0, this.title = e;
        }
    } ]), t;
}());

module.exports = new t();