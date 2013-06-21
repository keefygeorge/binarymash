/*
	Basic logical connections.
	
	Inside mongo, you have collection and relatively no restriction on the format of the data
	inside those collections.

	For Mongoose, and the relational mapping there is some restrictions.

	You no longer have 'collections'. Instead you now have models.

	Models are like single records, that reside inside a collection.
	The model has a schema that defines the format
	{
		id: Number,
		first_name: String,
	}

	When defining a model, you specify the following
	Name , the model name
	Schema, the models schema (aka format)
	Collection, if no collection name is specified the model's name is used for the mongo collection.
		
	To create model you use
	mongoose.model('name',Schema,'collectionName') \\ Collection name being optional
	or 
	connection.model(...)

	Once, a model's been created it cannot be modified. 

	Models can be created, then accessed in three different ways
	1) Using the mongoose.connect 
	2) Using mongoose.createConnection, create a model accessed only by the connection
	3) Using mongoose.createConnection, tie the mongoose model to the connection 

	Using the mongoose.connect (does not return a connection instance)
	Using Mongoose connect:
		var mongoose = require('mongoose');
		mongoose.connect('mongodb://localhost/mydb');

		// mongoose.model ties the defined model to the default connection that was created by calling mongoose.connect.
		var Actor = mongoose.model('Actor', new Schema({ name: String }));
	
	Using mongoose.createConnection, create a model accessed only by the connection
		var mongoose = require('mongoose');
		var db = mongoose.createConnection(..);

		// Db.model ties the model to the connection that was created by calling var db = mongoose.createConnection.
		var VenuModel = db.model('Venue', new Schema(..));
		var venu = new VenuModel();
	
	Using mongoose.createConnection, tie the mongoose created models to the connection 
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



/*
Though it seems like, we deal with documents instead of records...

http://stackoverflow.com/questions/5024787/update-model-with-mongoose-express-nodejs



Once document has been found, just call save to save the document
Model.findOne({ name: 'borne' }, function (err, doc){
  doc.name = 'jason borne';
  doc.visits.$inc();
  doc.save();
});
*/