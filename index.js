var app = require('express')();
var logfmt = require('logfmt');
var http = require('http').Server(app);
var io = require('socket.io')(http);
require("collections/shim-array");
require("collections/listen/array-changes");
var paintQueue = require("collections/deque");
var PORT = 5000;

var rgbTriple = {
  "red": 0,
  "green": 0,
  "blue": 0
};

var BOARD_ROWS = 500;
var BOARD_COLS = 500;
var initBoard = function() {
  var matrix = [];
  for(var row = 0; row < BOARD_ROWS; ++row) {
    var matrixRow = [];
    for(var col = 0; col < BOARD_COLS; ++col) {
      matrixRow.push(rgbTriple);
    }
    matrix.push(matrixRow);
  }
  return matrix;
};

var paintBoard = initBoard();

var port = Number(process.env.PORT || PORT);

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var testObj = {"message": "Hello World", "testing": 123};
  res.json(testObj);
  console.log(testObj);
});

io.on('connection', function(socket) {
  /*
  Sent from Client
  coordAndColor = {
    "x": 0-BOARD_ROWS,
    "y": 0-BOARD_COLS,
    "red": 0-255,
    "blue": 0-255,
    "green": 0-255
  }
  */
  socket.on('paint', function(coordAndColor) {
  });

  socket.on('debug', function(msg) {
    io.emit('debug', msg);
  });

  /*
  Sent from Client
  clearMsg = {
    "clear": true
  }
  */
  socket.on('clear', function(clearMsg) {
  });
});

http.listen(port, function() {
  console.log('Listening on ' + port);
});
