"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var antd_2 = require("antd");
var search_reducer_1 = require("../state/search-reducer");
var react_redux_1 = require("react-redux");
var SearchModal = function (_a) {
    var handleSubmit = _a.handleSubmit, title = _a.title, children = _a.children;
    var isModalVisible = react_redux_1.useSelector(function (state) { return state.search.isModalVisible; });
    var _b = react_1.useState(1), results = _b[0], setResults = _b[1];
    var dispatch = react_redux_1.useDispatch();
    var onChange = function (value) {
        setResults(value);
    };
    var handleOk = function () {
        dispatch(search_reducer_1.setIsModalVisible(false));
    };
    var handleCancel = function () {
        dispatch(search_reducer_1.setIsModalVisible(false));
    };
    var buttonStyles = {
        height: '52px',
        width: '210px',
        marginLeft: '15px'
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Modal, { width: 510, title: title, footer: null, visible: isModalVisible, onOk: handleOk, onCancel: handleCancel },
            react_1["default"].createElement(antd_2.Form, { layout: "vertical", name: 'Save', onFinish: handleSubmit },
                children,
                react_1["default"].createElement(antd_1.Row, null,
                    react_1["default"].createElement("span", null, "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E")),
                react_1["default"].createElement(antd_2.Form.Item, null,
                    react_1["default"].createElement(antd_1.Row, null,
                        react_1["default"].createElement(antd_1.Col, { span: 18 },
                            react_1["default"].createElement(antd_2.Form.Item, { name: "maxResults" },
                                react_1["default"].createElement(antd_1.Slider, { min: 1, max: 50, onChange: function (value) { return onChange(value); }, value: results === 0 ? 25 : results }))),
                        react_1["default"].createElement(antd_1.Col, { span: 6 },
                            react_1["default"].createElement(antd_1.InputNumber, { min: 1, max: 50, style: { marginLeft: '22px' }, value: results, onChange: function (value) { return onChange(value); } })))),
                react_1["default"].createElement(antd_1.Row, null,
                    react_1["default"].createElement(antd_2.Form.Item, null,
                        react_1["default"].createElement(antd_2.Button, { style: buttonStyles, onClick: function () { return handleCancel(); } }, "\u0412\u044B\u0439\u0442\u0438")),
                    react_1["default"].createElement(antd_2.Form.Item, null,
                        react_1["default"].createElement(antd_2.Button, { style: buttonStyles, htmlType: "submit", type: "primary", onClick: function () { return handleOk(); } }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")))))));
};
exports["default"] = SearchModal;
