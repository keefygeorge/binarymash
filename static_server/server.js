var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);
console.log("Web server loaded on socket 8080");


// ################################
// Mongoose
// Grab the mongoose
var mongoose = require('mongoose');

// Not really required...
var TodoSchema = mongoose.Schema({desc:String});

// Create a model, using the TodoSchema, the collection is 
// Derived off the model name. We name it anyway to be TodoModel
var TodoModel = mongoose.model('todo',TodoSchema);

// Create the connection...
var db = mongoose.createConnection('mongodb://localhost/mydb');

// If there is any error, just log it out and set the db connection to 
// be undefined. Nasty I know
// we assume the connection is working
db.on('error', function(err){
	console.log("failed to connect:"+ err);
	db = undefind;
});
// Normal situation open the connection not really required here.
/*
db.once('open', function(){
	// create the model
	var UserModel = db.model('users', { name:String , ha:String });

	// Create a new user
	var user = new UserModel({name:"chad", ha:"lol"});
	user.save(function(err){
		console.log(err);
	});
	UserModel.find(function(err,item){
		for (var x in item){
			console.log(item[x].ha);
		}
	});
});
*/
// ################################

// Use npm install ws
var WebSocketServer = require('ws').Server
var ws = new WebSocketServer({port: 8081});
ws.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log(message);
		console.log('received: %s', message);
	});
});