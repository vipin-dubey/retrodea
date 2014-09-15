var mongoose = require('mongoose');

var Project = mongoose.model('Project');

exports.projects = function(req,res){
	Project.find({},function(err,data){
		res.json(data);
	});
console.log("projects route called:"+req);
}

exports.project = function(req,res){
	console.log("Single project route called:"+req);
	Project.findOne({_id:req.params.id},function(err,obj){
		console.log(obj);
		res.json(obj);
	});
}

exports.createProject = function(req,res){
 		
 		var prj = new Project();
 		prj.fullName = req.body.fullName;
 		prj.userEmail = req.body.userEmail;
 		prj.name = req.body.name;
        
    //prj.retros.push({name:req.body.name,owner:req.body.userEmail});

 		console.log(prj);
 		console.log("calling save");
		prj.save(function(err, prj) {
  			if (err) return console.error(err);
  			console.dir(prj);
  			var id = prj._id;
  			console.log(id);
  			res.json(prj);
		});
} 

exports.updateProject = function(req,res){
 		console.log('Request object in update project');
    console.log(req.body);
 	  Project.findByIdAndUpdate(req.body._id, {
    				$set: { retros: req.body.retros}
  				}, { upsert: true },
  					function(err, obj) { 
    				return res.json(obj);
  					});

 		console.log('Update project called');
    //socket.emit('retro:updated',{hello:'word'});
} 

exports.destroyProject = function(req,res){
 		Project.remove({ _id: req.params._id }, function(err) {
    		res.json(true);
  		});
 		console.log('Delete project called');
} 
