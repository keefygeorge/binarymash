/**
This is server script not the intended end result!!
More work will be done shortly to include a module router that will split most
of this script into seperate module exports.. This will be broken down for flexibility
**/
// Set up the webserver for taking http static page requests
// Use npm install connect
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);
console.log("Web server loaded on socket 8080");


var data, ws;
// Use npm install ws for better browser support 
var WebSocketServer = require('ws').Server,
	mongo = require('mongoDB.js'),             //import the mongoDB and mongoJS framework
	uac = require('userAccountModule.js');          

	//console.log(uac.userAccountModule());

//.. Now we open up the websocket and bind the message eventlisteners on socket 8081
//.. On successful client connect we execute the mongoDB() module and connect to mongoDB
ws = new WebSocketServer({port: 8081});
console.log("Web Server started on localhost port 8081");
ws.on('connection', function(ws) {
	console.log("Client connected to server");
	
	var db = mongo.mongoDB();
	console.log("mongoDB Database connection success");
	
	ws.on('message', function(message) {
		console.log('received: %s', message);
		if(message==="loaded"){
			var uacMod = JSON.stringify({message:"initialise", mod:uac.userAccountModule()})
			ws.send(uacMod);
		}else{
			var msg = JSON.parse(message);		
			//..###### Keith: Note to self - Please make this modular we don't want this here
			var n = db.users.find({name: msg.name},{name:1,_id:0}, function(err,users){
				if( err || !users) console.log("No account found please register");
				else users.forEach( function(user) {
					console.log(user);
					ws.send(JSON.stringify(user));				
				});
			});	
		}
	});
});

