var postData = require("../../data/post-data.js");
// 你好
Page({
    data: {

    },
    onLoad: function () {
        // 生命周期函数--监听页面加载

        this.setData({
            postDataList: postData.postList
        });
    },
    onPostTap: function (e) {
        var postId = e.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId
        });
    },
    onSwiperTap: function(e){
        var postId = e.target.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId
        });
    }
});