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
var firebase_config_1 = require("../firebase/firebase-config");
var react_redux_1 = require("react-redux");
var login_reducer_1 = require("../state/login-reducer");
var react_router_dom_1 = require("react-router-dom");
var antd_1 = require("antd");
var sibdev_logo_svg_1 = require("../assets/sibdev-logo.svg");
require("../styles/Home.css");
var HomeStart_1 = require("./HomeStart");
var HomeResults_1 = require("./HomeResults");
var Favorites_1 = require("./Favorites");
var Text = antd_1.Typography.Text, Link = antd_1.Typography.Link;
function Home() {
    var _this = this;
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.login.isLoggedIn; });
    var selectedMenu = react_redux_1.useSelector(function (state) { return state.login.menu; });
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var setMenuBookmark = function (value) {
        if (value !== selectedMenu) {
            var elem_1 = document.getElementById("" + selectedMenu);
            elem_1 === null || elem_1 === void 0 ? void 0 : elem_1.classList.remove('active');
        }
        dispatch(login_reducer_1.setMenu(value));
        var elem = document.getElementById("" + value);
        elem === null || elem === void 0 ? void 0 : elem.classList.add('active');
        if (value === 'search') {
            history.push('/');
        }
        else {
            history.push('favorites');
        }
    };
    var logOut = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firebase_config_1.auth.signOut()];
                case 1:
                    _a.sent();
                    dispatch(login_reducer_1.logIn(false));
                    dispatch(login_reducer_1.initializeApp(true));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var _a;
        (_a = document.getElementById("" + selectedMenu)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    }, []);
    if (!isLoggedIn) {
        return react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/login" });
    }
    return (react_1["default"].createElement("div", { className: "home" },
        react_1["default"].createElement("header", { className: "home__header header-home" },
            react_1["default"].createElement("div", { className: "header-home__container" },
                react_1["default"].createElement("section", { className: "header-home__entries" },
                    react_1["default"].createElement("img", { className: "header-home__img", src: sibdev_logo_svg_1["default"], alt: "Logo" }),
                    react_1["default"].createElement("span", { onClick: function () { return setMenuBookmark('search'); }, id: "search", className: "header-home__item" }, "\u041F\u043E\u0438\u0441\u043A"),
                    react_1["default"].createElement("span", { onClick: function () { return setMenuBookmark('favorite'); }, id: "favorite", className: "header-home__item" }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435")),
                react_1["default"].createElement("section", { className: "header-home__exit" },
                    react_1["default"].createElement("span", { className: "header-home__logout", onClick: function () { return logOut(); } }, "\u0412\u044B\u0439\u0442\u0438")))),
        react_1["default"].createElement(react_router_dom_1.Switch, null,
            react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: '/search', render: function () { return react_1["default"].createElement(HomeResults_1["default"], null); } }),
            react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: '/favorites', rendrer: function () { return react_1["default"].createElement(Favorites_1["default"], null); } }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: '/', render: function () { return react_1["default"].createElement(HomeStart_1["default"], null); } }))));
}
exports["default"] = Home;
