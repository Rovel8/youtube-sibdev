"use strict";
exports.__esModule = true;
require("./styles/App.css");
var react_router_dom_1 = require("react-router-dom");
var Login_1 = require("./components/Login");
var Home_1 = require("./components/Home");
var react_1 = require("react");
var firebase_config_1 = require("./firebase/firebase-config");
var login_reducer_1 = require("./state/login-reducer");
var react_redux_1 = require("react-redux");
var antd_1 = require("antd");
function App() {
    var dispatch = react_redux_1.useDispatch();
    var isInitialized = react_redux_1.useSelector(function (state) { return state.login.isInitialized; });
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.login.isLoggedIn; });
    react_1.useEffect(function () {
        firebase_config_1.auth.onAuthStateChanged(function (user) {
            if (user) {
                dispatch(login_reducer_1.logIn(true));
                console.log(user);
                dispatch(login_reducer_1.initializeApp(true));
            }
            else {
                console.log('There is no user');
                dispatch(login_reducer_1.logIn(false));
                dispatch(login_reducer_1.initializeApp(true));
            }
        });
    }, []);
    return (React.createElement("div", { className: "app" }, isInitialized ? (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Route, { path: "/", render: function () { return React.createElement(Home_1["default"], null); } }),
        React.createElement(react_router_dom_1.Route, { path: "/login", render: function () { return React.createElement(Login_1["default"], null); } }))) : React.createElement(antd_1.Spin, { className: 'app__loader', size: 'large' })));
}
exports["default"] = App;
