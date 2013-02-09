var navOffset;
var fixed;
function init(){
	if (window.location.hash){
		sendToHash();
	}
	windowResize();
	fixed = false;
}

function sendToHash(){
	var location = window.location.hash.split("/");
	sendToArea(location);
}

function sendToArea(location){
	var currentScroll = $('#scroll').scrollTop();
	var position = currentScroll + $('#' + location[1]).offset().top;
	
	$('#scroll').animate({
		scrollTop: position
	}, 1000);
	
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

	$('#work-title').html(project.title);
	
	$(project.images).each( function(){
		$('#work-images').append('<img src="/images/work/' + this + '">');
	});
	
	$('#work-content').html(project.content);
	
	$('#work-overlay').fadeIn(1000);
	
	$('#work-overlay button.close').click( function(){
		closeWork();
	});
}

function closeWork(){
	window.location.hash = "#/work";
	$('#work-overlay').fadeOut(400);
	setTimeout( function(){
		$('#work-content, #work-images, #work-title').empty();
	}, 400);
}

function openBlog(blogpost){
	console.log(blogpost);
}

function windowResize(){
	navOffset = $('#navigation').offset().top;
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
	
	$('#scroll').scroll( function(){
		var top = $('#scroll').scrollTop();
		if (top > navOffset && !fixed) {
			fixed = true;
			$('body').addClass('fix-nav');
		}
		else if (top < navOffset && fixed){
			fixed = false;
			$('body').removeClass('fix-nav');
		}
	});
	
	$(window).resize( function(){
		windowResize();
	});
});


