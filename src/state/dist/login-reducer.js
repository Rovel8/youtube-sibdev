"use strict";
var _a;
exports.__esModule = true;
exports.setMenu = exports.initializeApp = exports.logIn = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var loginSlice = toolkit_1.createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
        menu: 'search'
    },
    reducers: {
        logIn: function (state, action) {
            state.isLoggedIn = action.payload;
        },
        initializeApp: function (state, action) {
            state.isInitialized = action.payload;
        },
        setMenu: function (state, action) {
            state.menu = action.payload;
        }
    }
});
exports.logIn = (_a = loginSlice.actions, _a.logIn), exports.initializeApp = _a.initializeApp, exports.setMenu = _a.setMenu;
exports["default"] = loginSlice.reducer;
