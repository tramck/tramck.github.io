var disqus_shortname = 'travmckinney';
(function() {
	var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

var s,
TravMcKinney = {
	settings: {
		workOpen: false,
		blogOpen: false,
		navLinks: $('#navigation a'),
		scrollSpyTargets: [],
		scrollSpyActive: -1,
		scroll: $('#scroll'),
		body: $('body'),
		navOffset: $('#header').height()
	},
	init: function() {
		s = this.settings;
		if (window.location.hash) {
			this.sendToHash();
		}
		this.bindUIActions();
	},
	bindUIActions: function() {
		var that = this;
		s.navLinks.click( function(e){
			e.preventDefault();
			window.location.hash = $(this).attr('href');
		});

		$('a.projectlink').click( function(e){
			e.preventDefault();
			window.location.hash = $(this).attr('href');
		});

		s.scroll.scroll( function(){
			var top = s.scroll.scrollTop();
			
			if (top > s.navOffset && !s.fixed) {
				s.fixed = true;
				s.body.addClass('fix-nav');
			}
			else if (top < s.navOffset && s.fixed){
				s.fixed = false;
				s.body.removeClass('fix-nav');
			}

			that.scrollSpy();
		});

		$(window).resize( function(){
			that.windowResize();
		});

		$(window).hashchange( function(){
			that.sendToHash();
		});
	},
	sendToHash: function() {
		var location = window.location.hash.split("/");
		this.sendToArea(location); 
	},
	sendToArea: function(location) {
		var currentScroll = $('#scroll').scrollTop();
		var position = currentScroll + $('#' + location[1]).offset().top;
		$('#scroll').animate({
			scrollTop: position - 48
		}, 1000);
		if (s.workOpen) {
			this.closeWork();
		}
		else if (s.blogOpen) {
			this.closeBlog();
		}
		else if (location[2]){
			if (location[1] == "work"){
				this.openWork(work[location[2]]);
			}
			else if (location[1] == "blog"){
				this.openBlog(blog[location[2]]);
			}
		}
	},
	openWork: function(project) {
		document.title = "Travis McKinney | " + project.title;
		s.workOpen = true;
		$('#work-title').html(project.title);
		$(project.images).each( function(){
			$('#work-images').append('<img src="' + this + '">');
		});
		$('#work-content').html(project.content);
		$('#work-overlay').fadeIn(1000);
	},
	closeWork: function(){
		document.title = "Travis McKinney | Brooklyn based designer and developer";
		s.workOpen = false;
		$('#work-overlay').fadeOut(400);
		setTimeout( function(){
			$('#work-content, #work-images, #work-title').empty();
		}, 400);
	},
	openBlog: function(blogpost){
		s.blogOpen = true;
		document.title = "Travis McKinney | " + blogpost.title;
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
	},
	closeBlog: function() {
		document.title = "Travis McKinney | Brooklyn based designer and developer";
		s.blogOpen = false;
		$('#blog-overlay').fadeOut(400);
		setTimeout( function(){
			$('#blog-content, #blog-title').empty();
		}, 400);
	},
	windowResize: function(){
		s.navOffset = $('#header').height();
		this.scrollSpy();
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
	},
	scrollSpy: function(){
		s.navLinks.each( function(i){
			var targetName = $(this).attr('data-spy');
			s.scrollSpyTargets[i] = $(targetName).offset().top;
		});
		if (s.scrollSpyTargets[s.scrollSpyActive+1] < 49) {
			s.scrollSpyActive++;
			this.scrollSpyActivate(s.navLinks[s.scrollSpyActive]);
		}
		else if (s.scrollSpyTargets[s.scrollSpyActive] > 49) {
			s.scrollSpyActive--;
			this.scrollSpyActivate(s.navLinks[s.scrollSpyActive]);
		}
	},
	scrollSpyActivate: function(active){
		$('#navigation .active').removeClass('active');
		$(active).addClass('active');
	}
	
};

TravMcKinney.init();