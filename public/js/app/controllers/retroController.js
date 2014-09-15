
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
               retro.participants = [];
               retro.participants.push({
                        name:project.fullName,
                        email:project.userEmail
               })


                function success(response) {
                    console.log("success", response)
                    // Add retro to the retros array for project 
                    $scope.project.retros.push(response);
                    //console.log("tryind to add retros to project");
                    //console.log($scope.project);
                    $scope.editProject();

                    $cookieStore.put('currUser',project.userEmail);
                    $cookieStore.put('firstLoad',true);
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



AppControllers.controller('RetroController',function($routeParams,$scope,$location,$cookieStore,$route,$resource,Project,Retro,socket){
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

    var currUser = $cookieStore.get('currUser');

    $scope.projectURI = $location.$$absUrl;

    var x = $cookieStore.get('firstLoad');

    if(x===undefined || x==null){
        $scope.firstLoad =  false;

    }else{
        $scope.firstLoad =  true;
    }

    console.log(currUser);

    if(currUser===undefined || currUser==null){
        $scope.userloggedIn = false;
    }else{
        $scope.userloggedIn = true;
    }

    $scope.editRetro = function(){
               function success(response) {
                    console.log("success", response)
                    //$location.path("/projects");
                    socket.emit('updated',{hello:'word'}); 
                }

                function failure(response) {
                     console.log("failure", response);
                 }

                Retro.update($scope.retro, success, failure);
    }
    


    $scope.addParticipant = function(){

         var allParticipants;

           console.log(allParticipants);   
           //console.log("index is :"+allParticipants.indexOf("er.vipindubey@gmail.com"));
           var check = false;

           $scope.retro.$promise.then(function(){

                 allParticipants = $scope.retro.participants;
                 console.log(allParticipants);   
                 
                    $.each(allParticipants, function( index, value ) {
                        console.log(value.email);  
                    if(value.email==$scope.newUserEmail){
                         console.log("User is already a participant");
                         check = true;
                        }
                        });

                   if(check){
                        $cookieStore.put('currUser',$scope.newUserEmail);
                        //$cookieStore.put('currUserName',$scope.newFullName);
                        $route.reload();
                   }else{

                        $scope.add();

                   }

           });
           
             //add a user only if he does not exist for the project as a participant

             $scope.add = function(){

                  console.log("Adding new user as a participant");
                        
                        $scope.retro.participants.push({
                            name:$scope.newUser,
                            email:$scope.newUserEmail
                        });
                        $cookieStore.put('currUser',$scope.newUserEmail);
                        $scope.editRetro(); 
                        $route.reload();
             }
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
        if(event.which == 13 || event.keyCode == 13){
            //console.log('Enter key pressed:'+$scope.newLike);
            $scope.retro.likes.push({
                content:$scope.newLike,
                count:'0',
            });
            nLike.value = '';
            $scope.newLike ='';
            $('.input-likes').hide();
            $scope.editRetro();
           
        }
    }

    $scope.editLike = function(id){
      var newContent = prompt('Enter new content');
        if(newContent && newContent.length>0){
             $scope.retro.likes[id].content = newContent;
             $scope.editRetro();
        }
    }



    $scope.deleteLike = function(id){
        $scope.retro.likes.splice(id,1);
        $scope.editRetro();
    }

    // Controllers for Dislike

    $scope.addDislike = function(event){
      if(event.which == 13 || event.keyCode == 13){
            //console.log('Enter key pressed:'+$scope.newDislike);
            $scope.retro.dislikes.push({
                content:$scope.newDislike,
                count:'0'
            });
            nDislike.value = '';
            $scope.newDislike='';
            $('.input-dislikes').hide();
            $scope.editRetro();

        }
    }

    $scope.editDislike = function(id){
        var newContent = prompt('Enter new content');
        if(newContent && newContent.length>0){
             $scope.retro.dislikes[id].content = newContent;
             $scope.editRetro();
        }
    }



    $scope.deleteDislike = function(id){
        $scope.retro.dislikes.splice(id,1);
        $scope.editRetro();
    
    }

    // Controllers for Suggestions

    $scope.addSuggestion = function(event){
       if(event.which == 13 || event.keyCode == 13){
            //console.log('Enter key pressed:'+$scope.newDislike);
            $scope.retro.suggestions.push({
                content:$scope.newSuggestion,
                count:'0'
            });
            nSuggestion.value = '';
            $scope.newSuggestion='';
            $('.input-suggestions').hide();
            $scope.editRetro();
        }
    }

    $scope.editSuggestion = function(id){
         var newContent = prompt('Enter new content');
         if(newContent && newContent.length>0){
             $scope.retro.suggestions[id].content = newContent;
             $scope.editRetro();
        }
    }



    $scope.deleteSuggestion = function(id){
          $scope.retro.suggestions.splice(id,1);
          $scope.editRetro();
    }

    $scope.countOf = function(text) {
        var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
     return s ? s.length : '';
        };

        $scope.addLikeCount = function(id,section,like_id){

                 var ref

                 if(section=='like-section'){
                    ref = $scope.retro.likes[id];  
                 }else if(section=='dislike-section'){
                    ref =  $scope.retro.dislikes[id];
                 }else{
                    ref = $scope.retro.suggestions[id];
                 }

                    var count = ref.count;
                    var newCount =0;
           
                // console.log("record has count", record.count);
                    var oldCount = count;
                    newCount =parseInt(oldCount) + 1;

                    ref.count = newCount;

                    $scope.editRetro();

                    newCount = 0;
                    var imgClass = '.'+like_id;
                    $(imgClass).children().attr("src","images/icons/16/heart-full.png");
                    $(imgClass).addClass('avoid-clicks');
               
        }

        $scope.closeShare = function(){
            $cookieStore.remove('firstLoad');
        }

        socket.on('RetroUpdated', function (d) {
            $resource("/api/retros/"+key).get().$promise.then(function (result) { 
                $scope.retro = result; 
            });
          //console.log("socket emit recieved from server");
            
        });

    //just playing

    /*$scope.addLikeButton = function(){
        $('.inputs').html('<input id="nLike" placeholder="What did you like" ng-keypress="addLike($event)" ng-model="newLike" autofocus/>');
    }*/
                
});





