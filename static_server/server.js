// Use npm install connect
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(80);