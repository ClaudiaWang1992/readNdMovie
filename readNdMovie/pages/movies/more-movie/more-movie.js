// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../util/util.js");
Page({

    /**
   * 页面的初始数据
   */
    data: {
        category: ''
    },

    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var category = options.category;
        this.setData({
            category: category
        });
        var dataUrl = "";
        switch (category) {
        case "正在热映":
            dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
            break;
        case "即将上映":
            dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
            break;
        case "top250":
            dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
            break;

        }
        util.http(dataUrl, this.callBack);
    },
    callBack: function(data){
        console.log(data);
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.category,
            success: function (res) {
                // success
                console.log(res);
            }
        });
    }
});