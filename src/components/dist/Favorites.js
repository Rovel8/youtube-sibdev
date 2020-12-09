"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var firebase_config_1 = require("../firebase/firebase-config");
require("../styles/Favorites.css");
function Favorites() {
    var _a = react_1.useState([]), favs = _a[0], setFavs = _a[1];
    var uid = react_redux_1.useSelector(function (state) { return state.login.uid; });
    react_1.useEffect(function () {
        firebase_config_1.db.collection('users').doc("" + uid).onSnapshot(function (snapshot) {
            var _a;
            setFavs((_a = snapshot.data()) === null || _a === void 0 ? void 0 : _a.favorites);
        });
    }, []);
    var deleteFavorite = function () {
    };
    var executeFavorite = function () {
    };
    var changeFavorite = function () {
    };
    console.log(favs);
    return (react_1["default"].createElement("div", { className: "favoirtes" },
        react_1["default"].createElement("div", { className: "favorites__container" },
            react_1["default"].createElement("h2", { className: "favorites__title" }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"),
            react_1["default"].createElement("ul", { className: "favorites__list" }, favs.map(function (item) { return (react_1["default"].createElement("li", { className: "favorites__item item-favorites" },
                react_1["default"].createElement("div", { className: "item-favorites__text" },
                    react_1["default"].createElement("span", { className: "item-favorites__title" }, item.label)),
                react_1["default"].createElement("div", { className: "item-favorites__options" },
                    react_1["default"].createElement("span", { className: "item-favorites__option item-favorites__option--execute" }, "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C"),
                    react_1["default"].createElement("span", { className: "item-favorites__option item-favorites__option--change" }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                    react_1["default"].createElement("span", { className: "item-favorites__option item-favorites__option--delete" }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); })))));
}
exports["default"] = Favorites;
