TravMcKinney =
	init: ->
		this.bindUIActions()
	bindUIActions: ->
		$('.change-bg').hover ->
			color = $(this).data 'bg-color'
			$('body').css
				'background': color
		, ->
			$('body').css
				'background': ''

TravMcKinney.init()