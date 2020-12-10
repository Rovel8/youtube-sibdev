"use strict";
var _a;
exports.__esModule = true;
exports.setIsModalVisible = exports.setQuery = exports.setTotalResults = exports.setVideos = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var searchSlice = toolkit_1.createSlice({
    name: 'search',
    initialState: {
        videos: [],
        totalResults: 0,
        query: '',
        isModalVisible: false
    },
    reducers: {
        setVideos: function (state, action) {
            state.videos = action.payload;
        },
        setTotalResults: function (state, action) {
            state.totalResults = action.payload;
        },
        setQuery: function (state, action) {
            state.query = action.payload;
        },
        setIsModalVisible: function (state, action) {
            state.isModalVisible = action.payload;
        }
    }
});
exports.setVideos = (_a = searchSlice.actions, _a.setVideos), exports.setTotalResults = _a.setTotalResults, exports.setQuery = _a.setQuery, exports.setIsModalVisible = _a.setIsModalVisible;
exports["default"] = searchSlice.reducer;
