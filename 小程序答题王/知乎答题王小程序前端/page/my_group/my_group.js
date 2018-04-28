var t = require("./../../net/groupNet.js"), a = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), e = (require("./../../const/consts.js"), 
getApp());

Page({
    data: {
        isEditting: !1,
        isNewUser: !1,
        page: 0,
        tmpName: "",
        myGroup: {
            id: 123,
            name: "",
            openGId: ""
        },
        self: {
            avatarUrl: "",
            gender: 0,
            level: 0,
            nickName: "",
            rank: 0,
            score: 0,
            uid: 0
        },
        members: [],
        avatarList: [ "http://img3.imgtn.bdimg.com/it/u=1847607994,868758731&fm=26&gp=0.jpg" ]
    },
    callback_item_clicked: function(t) {
        for (var a = this, o = t.currentTarget.dataset.uid, n = 0; n < this.data.members.length; n++) {
            var i = this.data.members[n];
            i.uid == o && (e.mainData.user_to_detail = i, wx.navigateTo({
                url: "../../page/user_detail/user_detail",
                complete: function() {
                    setTimeout(function() {
                        a.btnLock = !1;
                    }, 500);
                }
            }));
        }
    },
    input_bindblur: function(e) {
        var o = this;
        if (!this.btnLock) {
            console.log("输入框失去焦点 bindblur");
            var n = a.trimStr(this.data.tmpName);
            n ? n && n != this.data.myGroup.name ? (console.log("我要修改群名，不要拦着我"), this.btnLock = !0, 
            t.modifyName(this.data.myGroup.id, this.data.myGroup.openGId, this.data.tmpName, function(t, e) {
                e && (a.ShowToast("群名已改为 " + o.data.tmpName), console.log("改了，改了"), o.setData({
                    "myGroup.name": n,
                    tmpName: "",
                    isEditting: !1
                })), o.btnLock = !1;
            })) : a.ShowToast("修改群名，并保证群名不能为空") : this.setData({
                isEditting: !1
            });
        }
    },
    btn_groupname_edit_clicked: function(t) {
        this.data.myGroup.id < 0 ? console.log("试图修改假群的群名") : this.setData({
            isEditting: !0
        });
    },
    btn_exit_group_clicked: function(a) {
        var e = this;
        this.btnLock || wx.showModal({
            title: "退出群组",
            content: "退出本群，得分会在本群组保留。",
            showCancel: !0,
            confirmText: "退出",
            success: function(a) {
                a.confirm ? (console.log("我要退群，没商量"), e.btnLock = !0, t.quitGroup(e.data.myGroup.id, e.data.myGroup.openGId, function(t, a) {
                    console.log("退了，退了"), wx.navigateBack({
                        delta: 2
                    }), e.btnLock = !1;
                })) : a.cancel;
            }
        });
    },
    callback_name_input: function(t) {
        this.setData({
            tmpName: t.detail.value
        }), console.log(this.data.tmpName);
    },
    btn_newuser_clicked: function(t) {
        e.gotoCover();
    },
    onLoad: function(o) {
        var n = this;
        a.showShareMenu(), o.groupId < 0 ? this.setData({
            "myGroup.id": o.groupId,
            "myGroup.name": "等待好友响应...",
            "myGroup.openGId": "",
            "self.rank": 0,
            "self.score": 0,
            tmpName: "等待好友响应...",
            members: [ {
                avatarUrl: e.mainData.role.userInfo.avatarUrl,
                gender: 0,
                level: e.mainData.role.level,
                nickName: e.mainData.role.userInfo.nickName,
                rank: 1,
                score: 0,
                uid: e.mainData.role.uid
            } ],
            avatarList: [ e.mainData.role.userInfo.avatarUrl ]
        }) : (this.setData({
            "myGroup.id": o.groupId,
            "myGroup.name": o.groupName,
            "myGroup.openGId": o.openGId,
            tmpName: o.groupName
        }), console.log("myGroup.openGId:" + this.data.myGroup.openGId), t.memberRank(this.data.page, this.data.myGroup.id, function(t, e) {
            if (e && e.list) {
                for (var o = e.list, i = [], r = 0; r < o.length; r++) {
                    var s = o[r];
                    i.length < 9 && i.push(s.avatarUrl), s.nickName = a.formatNameEx(s.nickName);
                }
                n.setData({
                    self: e.self,
                    members: e.list,
                    avatarList: i
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            isNewUser: e.isNewUser()
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = {
            title: "本群智商榜在此，看看你排第几",
            path: "/page/login/login?friendCode=" + e.mainData.role.shareCode,
            from: "my_group"
        };
        return e.shareConf(a);
    }
});