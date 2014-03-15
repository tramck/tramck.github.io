TravMcKinney =
  init: ->
    @setUpColors()
    @setUpCanvas()
    if $('body').hasClass 'home'
      @hoverWork()

    if $('body').hasClass 'blog'
      @setUpBlog()    

  setUpColors: ->
    @strokeColor = $('#canvas').data('stroke-color')
    $('body').css
      'background': $('#canvas').data('bg-color')

  setUpCanvas: ->
    self = this
    canvas = document.getElementById 'canvas'
    self.stage = new createjs.Stage canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.onresize = ->
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    window.onresize

    class Vector
      constructor: (@x, @y) ->  
        @angle = Math.floor( Math.random() * 360 )
        @velocity = 0.01
        @iterator = 0

      updatePosition: ->
        if @iterator > 60
          @angle = @angle + (Math.round(Math.random()) * 2 - 1)
          @iterator = 0
        if @x > canvas.width || @x < 0 || @y > canvas.width || @y < 0
          @angle = @angle + 180
        @y = @y + (Math.sin( @angle ) * (180 / Math.PI)) * @velocity
        @x = @x + (Math.cos( @angle ) * (180 / Math.PI)) * @velocity
        @iterator += 1

    points = []

    # svg to coordinates
    # $(document).load '../img/unicorn.svg', (data) ->
    #   coordinates = $(data).find('path').attr('d').match(/-?\d+\.?\d*,\d+\.?\d*/g)
    #   for i in [0...coordinates.length]
    #     xy = coordinates[i].split(',')
    #     point = new createjs.Point(xy[0],xy[1])
    #     point.vector = new Vector(xy[0],xy[1])
    #     points.push point
    #   return
    # setTimeout ->  
    #   console.log points
    # , 250

    for i in [0..10] by 1
      x = Math.floor( Math.random() * canvas.width )
      y = Math.floor( Math.random() * canvas.height )
      point = new createjs.Point(x,y)
      point.vector = new Vector(x,y)
      points.push(point)
		
    drawLinesBetweenPoints = (points) ->
      for i in [0..points.length] by 1
        for x in [i..points.length] by 1
          if points[i] && points[x]
            line = new createjs.Shape()
            line.graphics
              .moveTo(points[x].x, points[x].y)
              .beginStroke(self.strokeColor)
              .lineTo(points[i].x, points[i].y)
            self.stage.addChild(line)

    randomMovePoints = (points) ->
      for point in points
        point.vector.updatePosition()
        point.x = point.vector.x
        point.y = point.vector.y

    handleTick = ->
      self.stage.removeAllChildren()
      unless $('canvas').data('still')
        randomMovePoints(points)
      drawLinesBetweenPoints(points)
      self.stage.update()

    createjs.Ticker.setFPS 24
    createjs.Ticker.addEventListener "tick", handleTick

  hoverWork: ->
    self = this
    $('.change-bg').hover ->
      color = $(this).data 'bg-color'
      self.oldStrokeColor = self.strokeColor
      self.strokeColor = $(this).data 'stroke-color'
      $('body').css
        'background': color
    , ->
      self.strokeColor = self.oldStrokeColor
      $('body').css
        'background': ''

  setUpBlog: ->
    window.disqus_shortname = 'travmckinney'

    do ->
      s = document.createElement('script') 
      s.async = true
      s.type = 'text/javascript'
      s.src = 'http://' + window.disqus_shortname + '.disqus.com/count.js'
      (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s)

TravMcKinney.init()