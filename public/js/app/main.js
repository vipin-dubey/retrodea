$(document).ready(function(){

	console.log("dom is ready");
    $('.input-likes').hide();
    $('.input-dislikes').hide();
    $('.input-suggestions').hide();
   

	$('.close').click(function(){
		$(this).parent().parent().fadeOut('slow');
	});

});