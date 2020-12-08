"use strict";
exports.__esModule = true;
var react_dom_1 = require("react-dom");
require("./index.css");
var reportWebVitals_1 = require("./reportWebVitals");
var store_1 = require("./state/store");
react_dom_1["default"].render(store_1.store, { store: store_1.store } >
    />
    < /Provider>
    < /BrowserRouter>
    < /React.StrictMode>,, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1["default"]();
