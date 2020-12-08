"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var login_reducer_1 = require("./login-reducer");
var search_reducer_1 = require("./search-reducer");
exports.store = toolkit_1.configureStore({
    reducer: {
        login: login_reducer_1["default"],
        search: search_reducer_1["default"]
    }
});
