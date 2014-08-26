// Declare controllers as module with a controller

var AppControllers = angular.module('AppControllers',[]);


AppControllers.controller('MainController','Project',function($scope,$location,$firebase,$cookieStore,Project){
	

	$scope.projects = Project.query();


    $scope.addProject = function(){
     
    }

    $scope.editProject = function(id){
    
    }



    $scope.deleteProject = function(id){

    	
    }

    $scope.showProject = function(id){
 
    } 

				
});



AppControllers.controller('ProjectController',function($scope,$location,$firebase,$cookieStore,$route){
    //CREATE A FIREBASE
    

    var href = $location.$$path;
    //console.log($location);
    var key = href.substr(href.lastIndexOf('/') + 1);
   
    
    

    var currUser = $cookieStore.get('currUser');


    $scope.projectURI = $location.$$absUrl;

    

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





