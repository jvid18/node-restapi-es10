"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _database = require("../database");

var _mongodb = require("mongodb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)(); // Database connection

router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query$outset, _req$query$limit;

    var outset, limit, query, options, db, collection, tasks;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            outset = (_req$query$outset = req.query.outset) !== null && _req$query$outset !== void 0 ? _req$query$outset : 0;
            limit = (_req$query$limit = req.query.limit) !== null && _req$query$limit !== void 0 ? _req$query$limit : 20;
            query = {};
            options = {};
            _context.prev = 4;
            _context.next = 7;
            return (0, _database.connect)();

          case 7:
            db = _context.sent;
            collection = db.collection('tasks');
            _context.next = 11;
            return collection.find(query, options).skip(outset).limit(limit).toArray();

          case 11:
            tasks = _context.sent;
            res.json(tasks);
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);
            res.status(500).json({
              error: "Error trying to get tasks"
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, db, collection, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _database.connect)();

          case 4:
            db = _context2.sent;
            collection = db.collection('tasks');
            _context2.next = 8;
            return collection.findOne({
              _id: (0, _mongodb.ObjectID)(id)
            });

          case 8:
            result = _context2.sent;
            res.json(result);
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);
            res.status(500).json({
              error: "Error trying to get the task"
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var task, db, collection, _yield$collection$ins, result;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            task = {
              title: req.body.title,
              description: req.body.description
            };
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _database.connect)();

          case 4:
            db = _context3.sent;
            collection = db.collection('tasks');
            _context3.next = 8;
            return collection.insertOne(task);

          case 8:
            _yield$collection$ins = _context3.sent;
            result = _yield$collection$ins.ops;
            res.json(result[0]);
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0);
            res.status(500).json({
              error: "Error trying to create task"
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, updateTask, db, collection, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            updateTask = {
              title: req.body.title,
              description: req.body.description
            };
            _context4.prev = 2;
            _context4.next = 5;
            return (0, _database.connect)();

          case 5:
            db = _context4.sent;
            collection = db.collection('tasks');
            _context4.next = 9;
            return collection.findOneAndUpdate({
              _id: (0, _mongodb.ObjectID)(id)
            }, {
              $set: updateTask
            });

          case 9:
            result = _context4.sent;
            res.json({
              message: "Task ".concat(id, " updated"),
              result: result
            });
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);
            console.error(_context4.t0);
            res.status(500).json({
              error: 'Error trying to update the task'
            });

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/:id', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, db, collection, _yield$collection$del, result;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return (0, _database.connect)();

          case 4:
            db = _context5.sent;
            collection = db.collection('tasks');
            _context5.next = 8;
            return collection.deleteOne({
              _id: (0, _mongodb.ObjectID)(id)
            });

          case 8:
            _yield$collection$del = _context5.sent;
            result = _yield$collection$del.result;
            res.json({
              message: "Task ".concat(id, " deleted"),
              result: result
            });
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
            res.status(500).json({
              error: 'Error trying to delete the task'
            });

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;