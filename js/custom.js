var disqus_shortname = 'travmckinney';
(function() {
	var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

var navOffset;
var fixed;
var scrollSpyTargets = [];
var navLinks;
var scrollSpyActive;
var workOpen = false;
var blogOpen = false;

function init(){
	if (window.location.hash){
		sendToHash();
	}
	windowResize();
	fixed = false;
	
	navLinks = $('#navigation a');
	scrollSpyActive = -1;
}

function sendToHash(){
	var location = window.location.hash.split("/");
	sendToArea(location);
}

function sendToArea(location){
	var currentScroll = $('#scroll').scrollTop();
	var position = currentScroll + $('#' + location[1]).offset().top;
	
	$('#scroll').animate({
		scrollTop: position - 48
	}, 1000);
	
	if (location[2]){
		if (location[1] == "work"){
			openWork(work[location[2]]);
		}
		else if (location[1] == "blog"){
			openBlog(blog[location[2]]);
		}
	}
	else if (workOpen) {
		closeWork();
	}
	else if (blogOpen) {
		closeBlog();
	}
	
}

function openWork(project){
	workOpen = true;
	$('#work-title').html(project.title);
	
	$(project.images).each( function(){
		$('#work-images').append('<img src="' + this + '">');
	});
	
	$('#work-content').html(project.content);
	
	$('#work-overlay').fadeIn(1000);
	
	$('#work-overlay button.close').click( function(){
		closeWork();
	});
}

function closeWork(){
	workOpen = false;
	window.location.hash = "#/work";
	$('#work-overlay').fadeOut(400);
	setTimeout( function(){
		$('#work-content, #work-images, #work-title').empty();
	}, 400);
}

function openBlog(blogpost){
	blogOpen = true;
	$('#blog-title').html(blogpost.title);
	
	$('#blog-content').html(blogpost.content).prepend('<img src="' + blogpost.image + '">');
	
	$('#blog-content pre').addClass("prettyprint linenums");
	$('#blog-content code').addClass("prettyprint");
	prettyPrint();
	
	setTimeout(function(){
		DISQUS.reset({
		  reload: true,
		  config: function () {  
		    this.page.identifier = window.location.href;  
		    this.page.url = window.location.href;
		  }
		});
	}, 400);
	
	
	$('#blog-overlay').fadeIn(1000);
	
	$('#blog-overlay button.close').click( function(){
		closeBlog();
	});
}

function closeBlog () {
	blogOpen = false;
	window.location.hash = "#/blog";
	$('#blog-overlay').fadeOut(400);
	setTimeout( function(){
		$('#blog-content, #blog-title').empty();
	}, 400);
}
function windowResize(){
	navOffset = $('#header').height();
	scrollSpy();
	
	var wW = $(window).width();
	var $container = $('#blogposts');
	if (wW >= 1200) {
		$container.imagesLoaded(function(){
		  $container.masonry({
		    itemSelector : '.span3',
		    columnWidth : 300
		  });
		});
	}
	else if (wW > 979){
		$container.imagesLoaded(function(){
		  $container.masonry({
		    itemSelector : '.span3',
		    columnWidth : 240
		  });
		});
	}
	else if (wW > 767){
		$container.imagesLoaded(function(){
		  $container.masonry({
		    itemSelector : '.span3',
		    columnWidth : 186
		  });
		});
	}
	
	
	
}

function scrollSpy(){
	$(navLinks).each( function(i){
		var targetName = $(this).attr('data-spy');
		scrollSpyTargets[i] = $(targetName).offset().top;
	});
	if (scrollSpyTargets[scrollSpyActive+1] < 49) {
		scrollSpyActive++;
		scrollSpyActivate(navLinks[scrollSpyActive]);
	}
	else if (scrollSpyTargets[scrollSpyActive] > 49) {
		scrollSpyActive--;
		scrollSpyActivate(navLinks[scrollSpyActive]);
	}
}

function scrollSpyActivate(active){
	$('#navigation .active').removeClass('active');
	$(active).addClass('active');
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
		
		scrollSpy();
	});
	
	$(window).resize( function(){
		windowResize();
	});
	
	// dealing with history
	$(window).hashchange( function(){
		sendToHash();
	});
});


