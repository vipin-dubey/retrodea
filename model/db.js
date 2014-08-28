// Bring Mongoose into the project
var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'mongodb://localhost:27017/retrodea';

// Create the database connection
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

var likeSchema = new mongoose.Schema({
	content:String,
	count:Number
});

// build the like model
mongoose.model( 'Like', likeSchema );

var dislikeSchema = new mongoose.Schema({
	content:String,
	count:Number
});

//build the dislike model
mongoose.model('Dislike',dislikeSchema);

var suggestionSchema = new mongoose.Schema({
	content:String,
	count:Number
});

//build the suggestion model
mongoose.model('Suggestion',suggestionSchema); 

var participantSchema = new mongoose.Schema({
	name:String,
	email:{type:String,unique:true}
});

//build the participant model
mongoose.model('Participant',participantSchema); 

var retroSchema = new mongoose.Schema({
	name:String,
	createdOn:{type:Date,default:Date.now},
	owner:String,
	likes:[{type:mongoose.Schema.ObjectId,ref:'likeSchema'}],
	dislikes:[{type:mongoose.Schema.ObjectId,ref:'dislikeSchema'}],
	suggestions:[{type:mongoose.Schema.ObjectId,ref:'suggestionSchema'}],
	participants:[{type:mongoose.Schema.ObjectId,ref:'participantSchema'}]	
})

//build the retro model
mongoose.model('Retro',retroSchema); 

var projectSchema = new mongoose.Schema({
	fullName:String,
	userEmail:String,
	name:String,
	createdOn:{type:Date, default:Date.now},
	retros:[{type:mongoose.Schema.ObjectId,ref:'retroSchema'}]
})

//build the project model
mongoose.model('Project',projectSchema); 

var retrodeaAppSchema = new mongoose.Schema({
	projects:[{type:mongoose.Schema.ObjectId,ref:'projectSchema'}]
})

mongoose.model('RetrodeaApp',retrodeaAppSchema); 