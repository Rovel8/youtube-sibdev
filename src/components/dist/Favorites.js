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
var react_redux_1 = require("react-redux");
var firebase_config_1 = require("../firebase/firebase-config");
require("../styles/Favorites.css");
var firebase_1 = require("firebase");
var API_1 = require("../API/API");
var search_reducer_1 = require("../state/search-reducer");
var react_router_dom_1 = require("react-router-dom");
var SearchModal_1 = require("./SearchModal");
var antd_1 = require("antd");
function Favorites() {
    var _this = this;
    var _a = react_1.useState([]), favs = _a[0], setFavs = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var form = antd_1.Form.useForm()[0];
    var _b = react_1.useState(""), queryLocal = _b[0], setQeuryLocal = _b[1];
    var _c = react_1.useState(''), label = _c[0], setLabel = _c[1];
    var _d = react_1.useState(''), sortBy = _d[0], setSortBy = _d[1];
    var _e = react_1.useState(1), maxResults = _e[0], setMaxResults = _e[1];
    var uid = react_redux_1.useSelector(function (state) { return state.login.uid; });
    react_1.useEffect(function () {
        firebase_config_1.db.collection('users').doc("" + uid).onSnapshot(function (snapshot) {
            var _a;
            setFavs((_a = snapshot.data()) === null || _a === void 0 ? void 0 : _a.favorites);
        });
    }, []);
    var deleteFavorite = function (value) {
        firebase_config_1.db.collection('users').doc("" + uid).update({
            favorites: firebase_1["default"].firestore.FieldValue.arrayRemove({
                label: value.label,
                query: value.query,
                sortBy: value.sortBy,
                maxResults: value.maxResults
            })
        });
    };
    var onSearch = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var result, videos_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, API_1.getVideos(value, sortBy, maxResults)];
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
                    history.push('/search');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var executeFavorite = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, onSearch(value)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, react_1["default"].createElement(react_router_dom_1.Redirect, { to: '/search' })];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var changeFavorite = function (value) {
        dispatch(search_reducer_1.setIsModalVisible(true));
        form.setFieldsValue({
            query: value.query,
            label: value.label,
            sortBy: value.sortBy,
            maxResults: value.maxResults
        });
        setQeuryLocal(value.query);
        setLabel(value.label);
        setSortBy(value.sortBy);
        setMaxResults(value.maxResults);
    };
    var handleSubmit = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firebase_config_1.db.collection("users").doc("" + uid).update({
                            favorites: firebase_1["default"].firestore.FieldValue.arrayUnion({
                                query: queryLocal,
                                maxResults: maxResults,
                                sortBy: sortBy,
                                label: value.label
                            })
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "favoirtes" },
        react_1["default"].createElement("div", { className: "favorites__container" },
            react_1["default"].createElement(SearchModal_1["default"], { title: '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441', handleSubmit: handleSubmit },
                react_1["default"].createElement("span", { style: { paddingBottom: '10px' } }, "\u0417\u0430\u043F\u0440\u043E\u0441"),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement(antd_1.Input, { onChange: function (value) { return setQeuryLocal(value.target.value); }, size: "large", defaultValue: queryLocal }),
                react_1["default"].createElement(antd_1.Form.Item, { shouldUpdate: true, initialValue: label, label: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435', rules: [{ required: true, message: 'Укажите название запроса' }], name: "label" },
                    react_1["default"].createElement(antd_1.Input, { size: "large", name: "label", id: "label", placeholder: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430" })),
                react_1["default"].createElement(antd_1.Form.Item, { initialValue: sortBy, label: '\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C', id: 'sortBy', name: 'sortBy' },
                    react_1["default"].createElement(antd_1.Select, { size: "large" },
                        react_1["default"].createElement(antd_1.Select.Option, { value: "date" }, "\u0414\u0430\u0442\u0435"),
                        react_1["default"].createElement(antd_1.Select.Option, { value: "rating" }, "\u0420\u0435\u0439\u0442\u0438\u043D\u0433\u0443"),
                        react_1["default"].createElement(antd_1.Select.Option, { value: "relevance" }, "\u0420\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u043E\u0441\u0442\u0438"),
                        react_1["default"].createElement(antd_1.Select.Option, { value: "title" }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u044E"),
                        react_1["default"].createElement(antd_1.Select.Option, { value: "videoCount" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0438\u0434\u0435\u043E"),
                        react_1["default"].createElement(antd_1.Select.Option, { value: "viewCount" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432")))),
            react_1["default"].createElement("h2", { className: "favorites__title" }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"),
            react_1["default"].createElement("ul", { className: "favorites__list" }, favs.map(function (item, index) { return (react_1["default"].createElement("li", { key: index, className: "favorites__item item-favorites" },
                react_1["default"].createElement("div", { className: "item-favorites__text" },
                    react_1["default"].createElement("span", { className: "item-favorites__title" }, item.label)),
                react_1["default"].createElement("div", { className: "item-favorites__options" },
                    react_1["default"].createElement("span", { onClick: function () { return executeFavorite(item.query); }, className: "item-favorites__option item-favorites__option--execute" }, "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C"),
                    react_1["default"].createElement("span", { onClick: function () { return changeFavorite(item); }, className: "item-favorites__option item-favorites__option--change" }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                    react_1["default"].createElement("span", { onClick: function () { return deleteFavorite(item); }, className: "item-favorites__option item-favorites__option--delete" }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); })))));
}
exports["default"] = Favorites;
