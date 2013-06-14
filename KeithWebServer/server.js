console.log("loading server socket");

// Use npm install connect
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);



var data, ws;
// Use npm install ws for better browser support
var WebSocketServer = require('ws').Server,
	mongo = require('mongoDB.js');
	
ws = new WebSocketServer({port: 8081});
console.log("Server started on localhost port 8081");
ws.on('connection', function(ws) {
	var db = mongo.mongoDB();
	console.log("mongoDB Database connected on localhost");
	console.log("Client connected to server");
	
	ws.on('message', function(message) {
		console.log('received: %s', message);
		var msg = JSON.parse(message);
		
		var n = db.users.find({name: msg.name},{name:1,_id:0}, function(err,users){
			if( err || !users) console.log("No account found please register");
			else users.forEach( function(user) {
				console.log(user);
				ws.send(JSON.stringify(user));				
			});
		});	
	});
});

