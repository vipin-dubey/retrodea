var mongoose = require('mongoose');

var Project = mongoose.model('Project');

exports.projects = function(req,res){
	Project.find({},function(err,projects){
		res.json(projects);
	});
console.log("projects route called:"+req);
}

exports.project = function(req,res){
	RetrodeaApp.findOne({_id:req.params.id},function(err,obj){
		res.json(obj);
	});
}

exports.createProject = function(req,res){
 		
 		var prj = new Project(req.body);
 		console.log(prj);
		prj.save(function(err, prj) {
  			if (err) return console.error(err);
  			console.dir(prj);
  			var id = prj._id;
  			console.log(id);
  			res.json(prj);
		});
} 
