function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = require("./../data/MainData.js"), n = function() {
    function n(e) {
        var i = this;
        t(this, n), this.app = getApp(), this.page = e, this.page.audio_playEff = function(t, e) {
            i.play(i.effCtx, t);
        }, this.page.audio_playBgm = function(t, e) {
            i.play(i.bgmCtx, t);
        }, this.page.audio_pause = function(t) {
            i.pause(t);
        }, this.page.audio_replay = function() {
            i.replay();
        }, this.page.audio_seekBgm = function(t) {
            i.seekBgm(t);
        }, this.page.audio_destory = function(t) {
            i.destory(t);
        }, this.soundGroup = {}, this.bgmCtx = wx.createInnerAudioContext(), this.effCtx = wx.createInnerAudioContext(), 
        this.lastRunTime = Date.now();
    }
    return e(n, [ {
        key: "addSound",
        value: function(t, e, i) {
            this.soundGroup[t] || (this.soundGroup[t] = {
                src: e,
                loop: i
            });
        }
    }, {
        key: "play",
        value: function(t, e) {
            if (!(i.role.settingsInfo || {}).soundOff && this.soundGroup[e]) {
                var n = this.soundGroup[e];
                t.pause(), t.src = n.src, t.loop = n.loop, "startTime" in t && (t.startTime = 0), 
                t.play(), this.lastRunTime = this.currentTime;
            }
        }
    }, {
        key: "pause",
        value: function(t) {
            this.bgmCtx && this.bgmCtx.pause();
        }
    }, {
        key: "replay",
        value: function() {
            this.bgmCtx && this.bgmCtx.play();
        }
    }, {
        key: "seekBgm",
        value: function(t) {
            this.bgmCtx && this.bgmCtx.seek(t);
        }
    }, {
        key: "destory",
        value: function() {
            this.bgmCtx && ("destory" in this.bgmCtx ? this.bgmCtx.destory() : this.bgmCtx.pause()), 
            this.effCtx && ("destory" in this.bgmCtx ? this.effCtx.destory() : this.effCtx.pause());
        }
    } ]), n;
}();

module.exports = n;