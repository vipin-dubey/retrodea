var mongoose = require('mongoose');

var RetrodeaApp = mongoose.model('RetrodeaApp');

var Project = mongoose.model('Project');

exports.projects = function(req,res){
	RetrodeaApp.find({},function(err,obj){
		res.json(obj);
	});
console.log("projects route called:"+req);
}

exports.project = function(req,res){
	RetrodeaApp.findOne({_id:req.params.id},function(err,obj){
		res.json(obj);
	});
}

exports.createProject = function(req,res){
    Project = new Project(req.body);
    RetrodeaApp = new RetrodeaApp({projects:Project});
    //RetrodeaApp = {projects:Project}
    console.log("project variable :"+Project);
    console.log("RetrodeaApp is :"+RetrodeaApp);
    //RetrodeaApp.projects =  Project;
    //console.log("create project called :"+Project);
	RetrodeaApp.save();
	console.log("project saved in RetrodeaApp model");
	res.json("ok");
	//console.log("project saved");
} 
