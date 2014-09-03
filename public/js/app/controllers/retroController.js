// Declare controllers as module with a controller

var AppControllers = angular.module('AppControllers',[]);


AppControllers.controller('ProjectController',function($scope,$location,$cookieStore,$resource,$routeParams,Project,Retro){
	

	$scope.projects = Project.index();

    console.log($scope.projects);

    $scope.project = new Project();
 
 //functions to handle projects           

    $scope.addProject = function(){
               console.log("submit");

                function success(response) {
                    console.log("success", response)
                    $scope.project = response;
                    $scope.addRetro(response);    
                }

                function failure(response) {
                     console.log("failure", response);
                 }

              
                console.log("project data is:"+$scope.project);
                Project.create($scope.project, success, failure);
                //$scope.project = '';
    }

    $scope.editProject = function(){
               function success(response) {
                    console.log("success", response)
                    //$location.path("/projects");
                }

                function failure(response) {
                     console.log("failure", response);
                 }

                Project.update($scope.project, success, failure);
    }



    $scope.deleteProject = function(project){

                function success(response) {
                    console.log("success", response)
                    $location.path("/projects");
                }

                function failure(response) {
                     console.log("failure", response);
                 }

             Project.destroy(project, success, failure);   	
    }

    $scope.showProject = function(project){
        console.log("project id is :"+project._id);
        $location.path("/home/"+project._id);
    } 

    // Functions to hanle retros

    $scope.addRetro = function(project){
               console.log("submit");

               var retro = new Retro();

               retro.name = project.name;
               retro.fullName = project.fullName;
               retro.owner = project.userEmail;

                function success(response) {
                    console.log("success", response)
                    $scope.project.retros.push(response);
                    console.log("tryind to add retros to project");
                    console.log($scope.project);
                    $scope.editProject();
                    $location.path("/home/"+response._id);
                }

                function failure(response) {
                     console.log("failure", response);
                 }

              
                console.log("project data is:"+$scope.project);
                Retro.create(retro, success, failure);
                retro = '';
    }

				
});



AppControllers.controller('RetroController',function($routeParams,$scope,$location,$cookieStore,$route,$resource,Project,Retro){
    //CREATE A FIREBASE
    

    var href = $location.$$path;
    //console.log($location);
    var key = href.substr(href.lastIndexOf('/') + 1);
    console.log(key);
    var currUser = $cookieStore.get('currUser');
    $scope.retro = new Retro();
    $scope.retro = $resource("/api/retros/"+key).get();//Project.show({ id: key });

    $scope.projectURI = $location.$$absUrl;

    
     
    //$scope.project = Project.show({ id: key });
    console.log($scope.retro);
        
    //$scope.project = $scope.aproject.retros;

    $scope.addParticipant = function(){


    }

    $scope.addTextArea = function(value){
            if(value=='add-like'){
                $('.input-likes').show();
            }else if(value=='add-dislike'){
                $('.input-dislikes').show();
            }else{
                $('.input-suggestions').show();
            }
    }

    $scope.addLike = function(event){
      
    }

    $scope.editLike = function(id){
     
    }



    $scope.deleteLike = function(id){

    }

    // Controllers for Dislike

    $scope.addDislike = function(event){
     
    }

    $scope.editDislike = function(id){
    
    }



    $scope.deleteDislike = function(id){

    
    }

    // Controllers for Suggestions

    $scope.addSuggestion = function(event){
      
    }

    $scope.editSuggestion = function(id){
     
    }



    $scope.deleteSuggestion = function(id){

       
    }

    $scope.countOf = function(text) {
        var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
     return s ? s.length : '';
        };

        $scope.addLikeCount = function(id,section){

        }

        $scope.closeShare = function(){
            $cookieStore.remove('firstLoad');
        }

    //just playing

    /*$scope.addLikeButton = function(){
        $('.inputs').html('<input id="nLike" placeholder="What did you like" ng-keypress="addLike($event)" ng-model="newLike" autofocus/>');
    }*/
                
});





