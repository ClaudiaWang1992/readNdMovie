function ratingToArray(ratingNumber){
    var number = Math.floor(ratingNumber);
    var array = [0,0,0,0,0];
    return array.map(function(item){
        if(number > 0){
            number --;
            item ++;
        }
        return item;
    });
}
function http(url, callBack){
    wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "Content-Type": "json"
        }, // 设置请求的 header
        success: function(res){
            // success
            callBack(res.data);
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
        }
    });
}

module.exports = {
    ratingToArray : ratingToArray,
    http: http
};