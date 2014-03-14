TravMcKinney =
  strokeColor: '#444'
  init: ->
    @setUpCanvas()
    @hoverWork()
    # @openPost()

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

  # openPost: ->
  #   self = this
  #   $('.open-work').on 'click', ->
  #     target = $(this).attr 'href'
  #     data = posts[target]
  #     $('body').css
  #       'background': ''
  #     self.strokeColor = self.oldStrokeColor
  #     $modal = $ '#work-modal'
  #     $modal
  #       .find '.modal-title'
  #         .text data.title
  #         .end()
  #       .find '.modal-body'
  #         .html data.content
  #         .end()
  #       .modal()
  #     imageArray = []
  #     imageArray.push data.images
  #     for image in imageArray
  #       $modal.find '.modal-body'
  #         .prepend "<img src='/img/work/#{image}'>"
  #     return false


TravMcKinney.init()