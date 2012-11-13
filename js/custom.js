var images = ["camping", "Prospect Park", "chillin' in hot tubs", "CAVES", "ice skating on lakes", "his cat (way too much)", "sleeping", "swimming with manatees"];

function likes(){
	var number = Math.ceil(Math.random()*8);
	$('#about-image img').attr('src', '/images/about/' + number + '.jpeg');
	$('#likes').html(images[number-1] + '.<br> What else does Travis like?');
}
$(document).ready(function(){
	$('pre').addClass("prettyprint linenums");
	$('code').addClass("prettyprint");
	prettyPrint();
	likes();
	
	$('a#about-image').click(function(){
		likes();
	});
	
	$('.work-accordion a').click(function(e){
		e.preventDefault();
		$('.active').removeClass('active');
		var $this = $(this);
		setTimeout(function(){
			$this.addClass('active');
		}, 250);
		
	});
	
	$('#filters a').click( function(e){
		e.preventDefault();
		$(this).parents('#filters').find('.activework').removeClass('activework');
		$(this).addClass('activework');
		var filterType = $(this).attr('data-filter');
		$('.workitem').addClass('filtered');
		$(filterType).removeClass('filtered');
	});
	var text;
	
	$('.sidebar a').hover( function(e){
		var username = $(this).attr('data-hover');
		text = $(this).html();
		$(this).html(username);
		var eltop = $(this).offset().top;
		var elbottom = eltop + $(this).height();
		var cursor = e.pageY;
		var middle = ($(this).height() / 2) + eltop;
		console.log("bottom " + elbottom);
		console.log("middle " + middle);
		console.log("top " + eltop);
		
		if(cursor < middle){
			$(this).addClass('entertop');
			var that = this;
			setTimeout(function(){
				$(that).removeClass('entertop');
			}, 500);
		}
		else{
			$(this).addClass('enterbottom');
			var that = this;
			setTimeout(function(){
				$(that).removeClass('enterbottom');
			}, 500);
		}
		
	}, function(e){
		$(this).html(text);
		var eltop = $(this).offset().top;
		var elbottom = eltop + $(this).height();
		var cursor = e.pageY;
		
		if(cursor > elbottom){
			$(this).addClass('leavebottom');
			var that = this;
			setTimeout(function(){
				$(that).removeClass('leavebottom');
			}, 500);
		}
		else{
			$(this).addClass('leavetop');
			var that = this;
			setTimeout(function(){
				$(that).removeClass('leavetop');
			}, 500);
		}
		
	});
	
	
});