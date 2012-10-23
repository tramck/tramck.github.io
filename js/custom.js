var images = ["camping", "Prospect Park", "chillin' in hot tubs", "CAVES", "ice skating on lakes", "his cat (way too much)", "sleeping", "swimming with manatees"];

function likes(){
	var number = Math.ceil(Math.random()*8);
	$('#about-image img').attr('src', '/images/about/' + number + '.jpeg');
	$('#likes').html(images[number-1] + '.<br> What else does Travis like?');
}

$(document).ready(function(){
	likes();
	$('a#about-image').click(function(){
		likes();
	});
});