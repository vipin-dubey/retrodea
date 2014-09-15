var mongoose = require( 'mongoose' );
var Retro = mongoose.model( 'Retro' );

exports.retros = function(req,res){
	Retro.find({},function(err,data){
		res.json(data);
	});
console.log("retros route called:"+req);

}

exports.retro = function(req,res){
	console.log("Single project route called:"+req); 
	Retro.findOne({_id:req.params.id},function(err,obj){
		console.log(obj);
		res.json(obj);
	});
}

exports.createRetro = function(req,res){
 		
 		var retro = new Retro(req.body);
        
       //prj.retros.push({name:req.body.name,owner:req.body.userEmail});

 		console.log(retro);
 		console.log("calling save");
		retro.save(function(err, prj) {
  			if (err) return console.error(err);
  			console.dir(retro);
  			var id = retro._id;
  			console.log(id);
  			res.json(retro);
		});
} 

exports.updateRetro = function(req,res){
 		
 		Retro.findByIdAndUpdate(req.body._id, {
    				$set: {likes: req.body.likes,dislikes:req.body.dislikes,suggestions:req.body.suggestions,participants:req.body.participants}
  				}, { upsert: true },
  					function(err, obj) {
            //socket.emit('updated',{hello:'world'});  
    				return res.json(true);
  					});
     
 		console.log('Update Retro called');
} 

exports.destroyRetro = function(req,res){
 		Retro.remove({ _id: req.params.id }, function(err) {
    		res.json(true);
  		});
 		console.log('Delete project called');
} 
