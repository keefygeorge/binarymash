/*
	Basic logical connections.
	Moongose has the following conventions:

	You need to define your collection, and format for the collection
	this is done via mongoose.Schema. To define a collection inside a databae
	you need to use model's. Models accept the name of the model, the schema 
	and optional collection name. The collection name if not provided is the model's name

	But wait there is more.
	Models can be created, then accessed in three different ways
	1) Using the mongoose.connect (does not return a connection instance)
	2) Using mongoose.createConnection, create a model accessed only by the connection
	3) Using mongoose.createConnection, tie the mongoose model instance to the connection 

	Using the mongoose.connect (does not return a connection instance)
	Using Mongoose connect:
		var mongoose = require('mongoose');
		mongoose.connect('mongodb://localhost/mydb');

		// mongoose.model ties the defined model to the default connection that was created by calling mongoose.connect.
		// doesn't matter before or after!
		var Actor = mongoose.model('Actor', new Schema({ name: String }));
	
	Using mongoose.createConnection, create a model accessed only by the connection
		var mongoose = require('mongoose');
		var db = mongoose.createConnection(..);

		// Db.model ties the model to the connection that was created by calling var db = mongoose.createConnection.
		db.model('Venue', new Schema(..));
		var Ticket = db.model('Ticket', new Schema(..));
		var Venue = db.model('Venue');
	
	Using mongoose.createConnection, tie the mongoose model instance to the connection 
		var mongoose = require('mongoose');
		mongoose.model('Venue', new Schema(..));
		
		var db = mongoose.createConnection(..);

		// Get the mongoose model, and associate it with this connection.
		var VenueModel = db.model('Venue');
		var venu = new VenuModel();


	Unless, multiple connections are used, the best method for connection and model management
	is to use the connect, and to retrive the connection via
	var db = mongoose.connect(....).connection;
*/
var mongoose = require('mongoose');

// Define an TodoModel model with this mongoose instance
var TodoSchema = mongoose.Schema({ name:String , ha:String });
var TodoModel = mongoose.model('todo',TodoSchema);

var db = mongoose.connect('mongodb://localhost/mydb').connection;
db.on('error', function(err){
	console.log("failed to connect:"+ err);
});
db.once('open', function(){
	var user = new TodoModel();
	user.name = "Tim";
	user.save(function(err){
		console.log(err);
	});
	
	MongoTodoModel.find(function(err,item){
		for (var x in item){
			console.log(item[x]);
		}
	});
});

