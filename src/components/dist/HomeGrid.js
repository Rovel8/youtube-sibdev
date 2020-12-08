"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/HomeGrid.css");
function HomeGrid(_a) {
    var channelTitle = _a.channelTitle, videoTitle = _a.videoTitle, coverUrl = _a.coverUrl;
    return (react_1["default"].createElement("div", { className: "home-video--grid" },
        react_1["default"].createElement("img", { className: "home-video--grid", src: coverUrl, alt: "Video Cover" }),
        react_1["default"].createElement("div", { className: "home-video__text--grid" },
            react_1["default"].createElement("span", { className: "home-video__title--grid" }, videoTitle),
            react_1["default"].createElement("span", { className: "home-video__channel--grid" }, channelTitle))));
}
exports["default"] = HomeGrid;
