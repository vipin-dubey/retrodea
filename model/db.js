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

var projectSchema = new mongoose.Schema({
	fullName:String,
	userEmail:String,
	name:String,
	createdOn:{type:Date, default:Date.now},
	retros:[{
			name:String,
			createdOn:{type:Date,default:Date.now},
			owner:String,
			likes:[{content:String,
				count:Number
				  	}],
			dislikes:[{content:String,
					count:Number
				    }],
			suggestions:[{content:String,
					count:Number
				    }],
			participants:[{name:String,
						 	email:String
					}]	
			}],
})

//build the project model
mongoose.model('Project',projectSchema); 
