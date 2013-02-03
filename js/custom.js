function init(){
	if (window.location.hash){
		sendToHash();
	}
}

function sendToHash(){
	var location = window.location.hash.split("/");
	sendToArea(location);
}

function sendToArea(location){
	var position = $('#' + location[1]).offset().top;
	$('html, body').animate({
		scrollTop: position
	});
	
	if (location[2]){
		if (location[1] == "work"){
			openWork(work[location[2]]);
		}
		if (location[1] == "blog"){
			openBlog(blog[location[2]]);
		}
	}
	
}

function openWork(project){
	console.log(project);
}

function openBlog(blogpost){
	console.log(blogpost);
}

$(function(){
	init();
	
	$('.navigation a').click( function(e){
		e.preventDefault();
		window.location.hash = $(this).attr('href');
		sendToHash();
	});
	
	$('a.projectlink').click( function(e){
		e.preventDefault();
		window.location.hash = $(this).attr('href');
		sendToHash();
	});
});


