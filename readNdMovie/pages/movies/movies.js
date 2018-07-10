// pages/movies/movie.js
var util = require("../../util/util.js");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3";
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "top250");
    },
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: "more-movie/more-movie?category=" + category
        });
    },
    getMovieListData: function (url, categoryType, categoryTitle) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "json"
            }, // 设置请求的 header
            success: function (res) {
                that.processMovieData(res.data, categoryType, categoryTitle);
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        });
    },
    processMovieData: function (data, categoryType, categoryTitle) {
        var resSubjects = [];
        for (var index in data.subjects) {
            var subject = data.subjects[index];
            if (subject.title.length > 6) {
                subject.title = subject.title.substr(0, 6) + "...";
            }
            resSubjects.push({
                id: subject.id,
                title: subject.title,
                rating: subject.rating.average,
                stars: util.ratingToArray(subject.rating.stars / 10),
                images: subject.images.large
            });
        }
        var resMovieListData = {};
        resMovieListData[categoryType] = {
            movies: resSubjects,
            categoryTitle: categoryTitle
        };
        this.setData(resMovieListData);
    }
});