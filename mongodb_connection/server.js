// Use npm install connect
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);

var databaseUrl = "db"; // "username:password@example.com/mydb"
var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);


var data, ws;
// Use npm install ws
var WebSocketServer = require('ws').Server
	ws = new WebSocketServer({port: 8081});
	ws.on('connection', function(ws) {
	ws.on('message', function(message) {
		switch(message){
			case "findUser":
				db.users.find({name: "Keith"}, function(err, data) {		
					if( err || !data) console.log("No user data found");
					else data.forEach( function(name) {
						console.log(name);
						ws.send(JSON.stringify(name));
					});	
				});
			break;
			case "addUser":
				db.users.save({name: name}, function(err, saved) {
					if( err || !saved ) console.log("User not saved");
					else console.log("User saved");
				});
			break;
			default:
				console.log("Message type not defined" +message);
			break;
		}			
		//console.log(db.data.find());
		console.log('received: %s', message);
	});
});

