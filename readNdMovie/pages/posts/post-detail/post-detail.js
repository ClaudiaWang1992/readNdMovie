var postDatasDetail = require("../../../data/post-data");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAudioPlaying: false,
        postData: "",
        currentPostId: 0,
        isCollected: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        const postId = option.id;
        const postDataDetail = postDatasDetail.postList[postId];
        this.setData({
            postData: postDataDetail,
            currentPostId: postId
        });
        let collectionStatus = wx.getStorageSync("isCollected");
        if (collectionStatus) {
            this.setData({
                isCollected: collectionStatus[postId] ? collectionStatus[postId] : false
            });
        } else {
            collectionStatus = {};
            collectionStatus[postId] = false;
            wx.setStorageSync("isCollected", collectionStatus);
        }

        const {
            currentId,
            musicOn
        } = wx.getStorageSync('currentMusicOn');
        if (musicOn && currentId == this.data.currentPostId) {
            this.setData({
                isAudioPlaying: true
            });
        }

        var that = this;
        wx.onBackgroundAudioPlay(function () {
            // callback
            that.setData({
                isAudioPlaying: true,
            });
            that.setMusicStatusStorage(that.data.currentPostId, true);
        });
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isAudioPlaying: false
            });
            that.setMusicStatusStorage(that.data.currentPostId, false);
        });

    },

    onCollectionTap: function () {
        var postDataStatus = this.data.isCollected;
        var collectionStatus = wx.getStorageSync("isCollected");
        collectionStatus[this.data.currentPostId] = !postDataStatus;
        this.setData({
            isCollected: !postDataStatus
        });
        wx.setStorageSync('isCollected', collectionStatus);
        this.showToast();
    },
    onShareTap: function () {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                wx.showModal({
                    title: "用户 " + itemList[res.tapIndex],
                    content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
                });
            }
        });
    },
    onPlayMusicTap: function () {
        const {
            url,
            title,
            coverImg
        } = this.data.postData.music;
        const isAudioPlayingStatus = !this.data.isAudioPlaying;
        this.setData({
            isAudioPlaying: isAudioPlayingStatus
        });
        if (isAudioPlayingStatus) {
            wx.playBackgroundAudio({
                dataUrl: url,
                title: title,
                coverImgUrl: coverImg
            });
        } else {
            wx.pauseBackgroundAudio();
        }
        this.setMusicStatusStorage(this.data.currentPostId, isAudioPlayingStatus);
    },
    setMusicStatusStorage: function (postId, status) {
        wx.setStorageSync('currentMusicOn', {
            currentId: status ? postId : -1,
            musicOn: status
        });
    },
    showToast: function () {
        wx.showToast({
            title: this.data.isCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        });
    }
});