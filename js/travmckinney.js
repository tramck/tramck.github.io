(function() {
  var TravMcKinney;

  TravMcKinney = {
    init: function() {
      this.setUpCanvas();
      return this.bindUIActions();
    },
    setUpCanvas: function() {
      var Vector, canvas, drawLinesBetweenPoints, handleTick, points, randomMovePoints, stage;
      canvas = document.getElementById('canvas');
      stage = new createjs.Stage(canvas);
      window.onresize = function() {
        canvas.width = window.innerWidth;
        return canvas.height = window.innerHeight;
      };
      window.onresize();
      Vector = (function() {
        function Vector(x, y) {
          this.x = x;
          this.y = y;
          this.angle = Math.floor(Math.random() * 360);
          this.velocity = 0.005;
          this.iterator = 0;
        }

        Vector.prototype.updatePosition = function() {
          var self;
          self = this;
          if (self.iterator > 60) {
            self.angle = self.angle + (Math.round(Math.random()) * 2 - 1);
            self.iterator = 0;
          }
          if (self.x > canvas.width || self.x < 0 || self.y > canvas.width || self.y < 0) {
            self.angle = self.angle + 180;
          }
          self.y = self.y + (Math.sin(self.angle) * (180 / Math.PI)) * self.velocity;
          self.x = self.x + (Math.cos(self.angle) * (180 / Math.PI)) * self.velocity;
          return self.iterator += 1;
        };

        return Vector;

      })();
      points = [];
      $(document).load('../img/unicorn.svg', function(data) {
        var coordinates, i, point, xy, _i, _ref;
        coordinates = $(data).find('path').attr('d').match(/-?\d+\.?\d*,\d+\.?\d*/g);
        for (i = _i = 0, _ref = coordinates.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          xy = coordinates[i].split(',');
          point = new createjs.Point(xy[0], xy[1]);
          point.vector = new Vector(xy[0], xy[1]);
          points.push(point);
        }
      });
      setTimeout(function() {
        return console.log(points);
      }, 250);
      drawLinesBetweenPoints = function(points) {
        var i, line, x, _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = points.length; _i <= _ref; i = _i += 1) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (x = _j = i, _ref1 = points.length; _j <= _ref1; x = _j += 1) {
              if (points[i] && points[x]) {
                line = new createjs.Shape();
                line.graphics.moveTo(points[x].x, points[x].y).beginStroke('#444').lineTo(points[i].x, points[i].y);
                _results1.push(stage.addChild(line));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          })());
        }
        return _results;
      };
      randomMovePoints = function(points) {
        var point, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = points.length; _i < _len; _i++) {
          point = points[_i];
          point.vector.updatePosition();
          point.x = point.vector.x;
          _results.push(point.y = point.vector.y);
        }
        return _results;
      };
      handleTick = function() {
        stage.removeAllChildren();
        randomMovePoints(points);
        drawLinesBetweenPoints(points);
        return stage.update();
      };
      createjs.Ticker.setFPS(24);
      return createjs.Ticker.addEventListener("tick", handleTick);
    },
    bindUIActions: function() {
      return $('.change-bg').hover(function() {
        var color;
        color = $(this).data('bg-color');
        return $('body').css({
          'background': color
        });
      }, function() {
        return $('body').css({
          'background': ''
        });
      });
    }
  };

  TravMcKinney.init();

}).call(this);
