var s,
TravMcKinney = {
	settings: {
		body: $('body')
	},
	init: function() {
		s = this.settings;
		this.bindUIActions();
	},
	bindUIActions: function() {
		$('.change-bg').hover( function () {
			var color = $(this).data('bg-color');
			s.body.css({'background': color});
		},
		function() {
			s.body.css({'background': ''});
		});
	}
	
};

TravMcKinney.init();