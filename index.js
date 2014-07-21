var app = require('express')();
var logfmt = require('logfmt');
var http = require('http').Server(app);
var io = require('socket.io')(http);
require("collections/shim-array");
require("collections/listen/array-changes");
var paintQueue = require("collections/deque");
var PORT = 5000;

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
  io.emit('newClient', paintBoard);

  /*
  Sent from Client
  paintCoord = {
    "x": 0-BOARD_ROWS,
    "y": 0-BOARD_COLS
  }
  */
  socket.on('paint', function(paintCoord) {
    paintBoard[paintCoord.x][paintCoord.y] = true;
    io.emit('paint', paintCoord);
  });

  socket.on('debug', function(msg) {
    io.emit('debug', "Echo from the server: " + msg);
  });

  socket.on('clear', function(clearMsg) {
    paintBoard = initBoard();
    io.emit('clear', "clear");
  });
});

http.listen(port, function() {
  console.log('Listening on ' + port);
});
