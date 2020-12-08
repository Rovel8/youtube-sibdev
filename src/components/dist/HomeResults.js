"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
require("../styles/HomeResults.css");
var antd_1 = require("antd");
var API_1 = require("../API/API");
var search_reducer_1 = require("../state/search-reducer");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("@ant-design/icons");
var HomeList_1 = require("./HomeList");
var HomeGrid_1 = require("./HomeGrid");
var Search = antd_1.Input.Search;
function HomeResults() {
    var _this = this;
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var query = react_redux_1.useSelector(function (state) { return state.search.query; });
    var totalResults = react_redux_1.useSelector(function (state) { return state.search.totalResults; });
    var videosTotal = react_redux_1.useSelector(function (state) { return state.search.videos; });
    var _a = react_1.useState(false), grid = _a[0], setGrid = _a[1];
    var onSearch = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var result, videos_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, API_1.getVideos(value)];
                case 1:
                    result = _a.sent();
                    dispatch(search_reducer_1.setTotalResults(result.data.pageInfo.totalResults));
                    videos_1 = [];
                    result.data.items.forEach(function (item) {
                        var video = {};
                        video.id = item.id.videoId;
                        video.channelTitle = item.snippet.channelTitle;
                        video.videoTitle = item.snippet.title;
                        video.description = item.snippet.description;
                        video.coverUrl = item.snippet.thumbnails["default"].url;
                        videos_1.push(video);
                    });
                    dispatch(search_reducer_1.setVideos(videos_1));
                    dispatch(search_reducer_1.setQuery(value));
                    console.log(result);
                    history.push('/search');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("main", { className: "home-results" },
        react_1["default"].createElement("div", { className: "home-results__container" },
            react_1["default"].createElement("h2", { className: "home-result__title" }, "\u041F\u043E\u0438\u0441\u043A \u0432\u0438\u0434\u0435\u043E"),
            react_1["default"].createElement(Search, { size: 'large', placeholder: "\u0427\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C?", onSearch: onSearch, enterButton: "\u041D\u0430\u0439\u0442\u0438" }),
            react_1["default"].createElement("div", { className: "home-results__results results-home" },
                react_1["default"].createElement("section", { className: "results-home__header" },
                    react_1["default"].createElement("div", { className: "results-home__info" },
                        react_1["default"].createElement("h3", { className: "results-home__label" },
                            "\u0412\u0438\u0434\u0435\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \"",
                            query,
                            "\""),
                        react_1["default"].createElement("h3", { className: "results-home__total" },
                            " ",
                            totalResults)),
                    react_1["default"].createElement("div", { className: "results-home__view" },
                        react_1["default"].createElement(icons_1.UnorderedListOutlined, { style: { cursor: "pointer" }, onClick: function () { return setGrid(false); } }),
                        react_1["default"].createElement(icons_1.AppstoreOutlined, { onClick: function () { return setGrid(true); }, style: { marginLeft: "18px", cursor: "pointer" } }))),
                react_1["default"].createElement("section", { className: grid ? "results-home__body--grid" : "results-home__body" }, grid ? videosTotal.map(function (item) { return (react_1["default"].createElement(HomeGrid_1["default"], { channelTitle: item.channelTitle, coverUrl: item.coverUrl, videoTitle: item.videoTitle })); })
                    : videosTotal.map(function (item) { return (react_1["default"].createElement(HomeList_1["default"], { channelTitle: item.channelTitle, coverUrl: item.coverUrl, videoTitle: item.videoTitle })); }))))));
}
exports["default"] = HomeResults;
