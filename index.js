var app = require('express')();
var logfmt = require('logfmt');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 5000;

var BOARD_ROWS = 500;
var BOARD_COLS = 500;
var initBoard = function() {
  var matrix = [];
  for(var row = 0; row < BOARD_ROWS; ++row) {
    var matrixRow = [];
    for(var col = 0; col < BOARD_COLS; ++col) {
      matrixRow.push(false);
    }
    matrix.push(matrixRow);
  }
  return matrix;
};

var paintBoard = initBoard();

var port = Number(process.env.PORT || PORT);

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.sendFile("./index.html", { root: __dirname });
});

io.on('connection', function(socket) {
  //console.log("Client Connected");
  io.emit('newClient', paintBoard);

  socket.on('paint', function(paintCoord) {
    //console.log('paint: [x = ' + paintCoord.x + ", y = " + paintCoord.y + "]");
    paintBoard[paintCoord.x][paintCoord.y] = true;
    socket.broadcast.emit('paint', paintCoord);
  });

  socket.on('debug', function(msg) {
    io.emit('debug', "Echo from the server: " + msg);
  });

  socket.on('clear', function(clearMsg) {
    //console.log('onClear');
    paintBoard = initBoard();
    io.emit('clear', "clear");
  });

  socket.on('disconnect', function(){
    //console.log('Client Disconnected');
  });
});

http.listen(port, function() {
  console.log('Whiteboard server now running on HOST:' + port);
});
