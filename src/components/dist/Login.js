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
require("../styles/Login.css");
var sibdev_logo_svg_1 = require("../assets/sibdev-logo.svg");
var react_redux_1 = require("react-redux");
var antd_1 = require("antd");
var formik_1 = require("formik");
var login_reducer_1 = require("../state/login-reducer");
var react_router_dom_1 = require("react-router-dom");
var firebase_config_1 = require("../firebase/firebase-config");
function Login() {
    var _this = this;
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.login.isLoggedIn; });
    var dispatch = react_redux_1.useDispatch();
    var initialValues = {
        login: '',
        password: ''
    };
    var onSubmit = function (_a) {
        var login = _a.login, password = _a.password;
        return __awaiter(_this, void 0, void 0, function () {
            var signIn, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, firebase_config_1.auth.signInWithEmailAndPassword(login, password)];
                    case 1:
                        signIn = _c.sent();
                        console.log(signIn);
                        dispatch(login_reducer_1.setUid((_b = signIn.user) === null || _b === void 0 ? void 0 : _b.uid));
                        dispatch(login_reducer_1.logIn(true));
                        dispatch(login_reducer_1.initializeApp(true));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        console.error(error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    if (isLoggedIn) {
        return react_1["default"].createElement(react_router_dom_1.Redirect, { to: '/' });
    }
    return (react_1["default"].createElement("main", { className: "login" },
        react_1["default"].createElement("div", { className: "login__container" },
            react_1["default"].createElement("section", { className: "logo__header" },
                react_1["default"].createElement("img", { className: "logo__img", src: sibdev_logo_svg_1["default"], alt: "Logo" }),
                react_1["default"].createElement("h1", { className: "logo__title" }, "\u0412\u0445\u043E\u0434")),
            react_1["default"].createElement("section", { className: "logo__form form-logo" },
                react_1["default"].createElement(formik_1.Formik, { initialValues: initialValues, onSubmit: onSubmit },
                    react_1["default"].createElement(formik_1.Form, { className: "form-logo__body" },
                        react_1["default"].createElement(formik_1.Field, { className: "form-logo__field", as: antd_1.Input, name: "login", id: "login", placeholder: "\u041B\u043E\u0433\u0438\u043D" }),
                        react_1["default"].createElement(formik_1.Field, { className: "form-logo__field", as: antd_1.Input.Password, name: "password", id: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
                        react_1["default"].createElement(antd_1.Button, { htmlType: "submit", type: "primary", className: "form-logo__btn" }, "\u0412\u043E\u0439\u0442\u0438")))))));
}
;
exports["default"] = Login;
