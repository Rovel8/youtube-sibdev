"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/HomeList.css");
function HomeList(_a) {
    var channelTitle = _a.channelTitle, videoTitle = _a.videoTitle, coverUrl = _a.coverUrl;
    return (react_1["default"].createElement("div", { className: "home-video" },
        react_1["default"].createElement("img", { className: "home-video", src: coverUrl, alt: "Video Cover" }),
        react_1["default"].createElement("div", { className: "home-video__text" },
            react_1["default"].createElement("span", { className: "home-video__title" }, videoTitle),
            react_1["default"].createElement("span", { className: "home-video__channel" }, channelTitle))));
}
exports["default"] = HomeList;
