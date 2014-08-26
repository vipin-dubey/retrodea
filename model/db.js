// Bring Mongoose into the project
var mongoose = require( 'mongoose' );

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



var likeSchema = new mongoos.Schema({
	content:String,
	count:Number
});

// build the like model
mongoose.model( 'Like', likeSchema );

var dislikeSchema = new mongoos.Schema({
	content:String,
	count:Number
});

//build the dislike model
mongoose.model('Dislike',dislikeSchema);

var suggestionSchema = new mongoos.Schema({
	content:String,
	count:Number
});

//build the suggestion model
mongoose.model('Suggestion',suggestionSchema); 

var participantSchema = new mongoos.Schema({
	name:String,
	email:{type:String,unique:true}
});

//build the participant model
mongoose.model('Suggestion',participantSchema); 

var retroSchema = new mongoos.Schema({
	name:String
	createdOn:{type:date,default:Date.now,
	owner:String,
	likes:[likeSchema],
	dislikes[dislikeSchema],
	suggestions:[suggestionSchema],
	participants:[participantSchema]	
	}
})

//build the retro model
mongoose.model('Retro',retroSchema); 

var projectSchema = new mongoos.Schema({
	Name:String,
	createdOn:{type:Date, default:Date.now},
	owner:String
	retros:[retroSchema]
})

//build the project model
mongoose.model('Project',projectSchema); 