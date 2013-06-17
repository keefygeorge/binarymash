var mongoose = require('mongoose');
mongoose.model('users', { name:String , ha:String });

var db = mongoose.createConnection('mongodb://localhost/mydb');
db.on('error', function(err){
	console.log("failed to connect:"+ err);
});
db.once('open', function(){

	// create the model
	var UserModel = db.model('users');

	// Create a new user
	/*
	var user = new UserModel({name:"chad", ha:"lol"});
	user.save(function(err){
		console.log(err);
	});
	*/
	UserModel.find(function(err,item){
		for (var x in item){
			console.log(item[x].ha);
		}
	});
});

