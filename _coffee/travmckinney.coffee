TravMcKinney =
  init: ->
    this.setUpCanvas()
    this.bindUIActions()

  setUpCanvas: ->
    canvas = document.getElementById 'canvas'
    stage = new createjs.Stage canvas
    window.onresize = ->
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    window.onresize()

    class Vector
      constructor: (@x, @y) ->  
        @angle = Math.floor( Math.random() * 360 )
        @velocity = 0.005
        @iterator = 0

      updatePosition: ->
        self = this
        if self.iterator > 60
          self.angle = self.angle + (Math.round(Math.random()) * 2 - 1)
          self.iterator = 0
        if self.x > canvas.width || self.x < 0 || self.y > canvas.width || self.y < 0
          self.angle = self.angle + 180
        self.y = self.y + (Math.sin( self.angle ) * (180 / Math.PI)) * self.velocity
        self.x = self.x + (Math.cos( self.angle ) * (180 / Math.PI)) * self.velocity
        self.iterator += 1

    points = []

    # svg to coordinates
    $(document).load '../img/unicorn.svg', (data) ->
      coordinates = $(data).find('path').attr('d').match(/-?\d+\.?\d*,\d+\.?\d*/g)
      for i in [0...coordinates.length]
        xy = coordinates[i].split(',')
        point = new createjs.Point(xy[0],xy[1])
        point.vector = new Vector(xy[0],xy[1])
        points.push point
      return
    setTimeout ->  
      console.log points
    , 250
    # for i in [0..10] by 1
    #   x = Math.floor( Math.random() * canvas.width )
    #   y = Math.floor( Math.random() * canvas.height )
    #   point = new createjs.Point(x,y)
    #   point.vector = new Vector(x,y)
    #   points.push(point)
		
    drawLinesBetweenPoints = (points) ->
      for i in [0..points.length] by 1
        for x in [i..points.length] by 1
          if points[i] && points[x]
            line = new createjs.Shape()
            line.graphics
              .moveTo(points[x].x, points[x].y)
              .beginStroke('#444')
              .lineTo(points[i].x, points[i].y)
            stage.addChild(line)

    randomMovePoints = (points) ->
      for point in points
        point.vector.updatePosition()
        point.x = point.vector.x
        point.y = point.vector.y

    handleTick = ->
      stage.removeAllChildren()
      randomMovePoints(points)
      drawLinesBetweenPoints(points)
      stage.update()

    createjs.Ticker.setFPS 24
    createjs.Ticker.addEventListener "tick", handleTick

  bindUIActions: ->
    $('.change-bg').hover ->
      color = $(this).data 'bg-color'
      $('body').css
        'background': color
    , ->
      $('body').css
        'background': ''

TravMcKinney.init()