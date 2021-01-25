"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _tasks = _interopRequireDefault(require("./routes/tasks.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config(); // Routes


// Settings
app.set('port', process.env.PORT || 4000); // Middlewares

app.use(_express["default"].json()); // Routes

app.use(_index["default"]);
app.use('/tasks', _tasks["default"]);
var _default = app;
exports["default"] = _default;