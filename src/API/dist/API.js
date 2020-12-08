"use strict";
exports.__esModule = true;
exports.getVideos = void 0;
var axios_1 = require("axios");
var instance = axios_1["default"].create({
    baseURL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDC3Veeb7YDqti5oS9pYND-MjsZ3Ejzxvs&type=video&'
});
exports.getVideos = function (query, order, maxResults) {
    if (order === void 0) { order = 'rating'; }
    if (maxResults === void 0) { maxResults = 6; }
    var trimQuery = query.trim().toLocaleLowerCase();
    var regex = /\s/g;
    var queryWithoutWhitespaces = trimQuery.replace(regex, '+');
    return instance.get("order=" + order + "&maxResults=" + maxResults + "&q=" + queryWithoutWhitespaces);
};
