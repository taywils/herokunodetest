var app = require('express')();
var logfmt = require('logfmt');

var port = Number(process.env.PORT || 5000);

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.json({"message": "Hello World", "testing": 123});
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});
