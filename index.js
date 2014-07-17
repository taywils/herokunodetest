var app = require('express')();
var logfmt = require('logfmt');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var paintDeque = require("collections/deque");
require("collections/shim-array");
require("collections/listen/array-changes");

var port = Number(process.env.PORT || 5000);

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var testObj = {"message": "Hello World", "testing": 123};
  res.json(testObj);
  console.log(testObj);
});

http.listen(port, function() {
  console.log('Listening on ' + port);
});
