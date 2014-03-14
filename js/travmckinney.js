(function() {
  var TravMcKinney;

  TravMcKinney = {
    strokeColor: '#444',
    init: function() {
      this.setUpCanvas();
      this.hoverWork();
      return this.openPost();
    },
    setUpCanvas: function() {
      var Vector, canvas, drawLinesBetweenPoints, handleTick, i, point, points, randomMovePoints, self, x, y, _i;
      self = this;
      canvas = document.getElementById('canvas');
      self.stage = new createjs.Stage(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      window.onresize = function() {
        canvas.width = window.innerWidth;
        return canvas.height = window.innerHeight;
      };
      window.onresize;
      Vector = (function() {
        function Vector(x, y) {
          this.x = x;
          this.y = y;
          this.angle = Math.floor(Math.random() * 360);
          this.velocity = 0.01;
          this.iterator = 0;
        }

        Vector.prototype.updatePosition = function() {
          if (this.iterator > 60) {
            this.angle = this.angle + (Math.round(Math.random()) * 2 - 1);
            this.iterator = 0;
          }
          if (this.x > canvas.width || this.x < 0 || this.y > canvas.width || this.y < 0) {
            this.angle = this.angle + 180;
          }
          this.y = this.y + (Math.sin(this.angle) * (180 / Math.PI)) * this.velocity;
          this.x = this.x + (Math.cos(this.angle) * (180 / Math.PI)) * this.velocity;
          return this.iterator += 1;
        };

        return Vector;

      })();
      points = [];
      for (i = _i = 0; _i <= 10; i = _i += 1) {
        x = Math.floor(Math.random() * canvas.width);
        y = Math.floor(Math.random() * canvas.height);
        point = new createjs.Point(x, y);
        point.vector = new Vector(x, y);
        points.push(point);
      }
      drawLinesBetweenPoints = function(points) {
        var line, _j, _ref, _results;
        _results = [];
        for (i = _j = 0, _ref = points.length; _j <= _ref; i = _j += 1) {
          _results.push((function() {
            var _k, _ref1, _results1;
            _results1 = [];
            for (x = _k = i, _ref1 = points.length; _k <= _ref1; x = _k += 1) {
              if (points[i] && points[x]) {
                line = new createjs.Shape();
                line.graphics.moveTo(points[x].x, points[x].y).beginStroke(self.strokeColor).lineTo(points[i].x, points[i].y);
                _results1.push(self.stage.addChild(line));
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
        var _j, _len, _results;
        _results = [];
        for (_j = 0, _len = points.length; _j < _len; _j++) {
          point = points[_j];
          point.vector.updatePosition();
          point.x = point.vector.x;
          _results.push(point.y = point.vector.y);
        }
        return _results;
      };
      handleTick = function() {
        self.stage.removeAllChildren();
        randomMovePoints(points);
        drawLinesBetweenPoints(points);
        return self.stage.update();
      };
      createjs.Ticker.setFPS(24);
      return createjs.Ticker.addEventListener("tick", handleTick);
    },
    hoverWork: function() {
      var self;
      self = this;
      return $('.change-bg').hover(function() {
        var color;
        color = $(this).data('bg-color');
        self.oldStrokeColor = self.strokeColor;
        self.strokeColor = $(this).data('stroke-color');
        return $('body').css({
          'background': color
        });
      }, function() {
        self.strokeColor = self.oldStrokeColor;
        return $('body').css({
          'background': ''
        });
      });
    },
    openPost: function() {
      var self;
      self = this;
      return $('.open-work').on('click', function() {
        var $modal, data, image, imageArray, target, _i, _len;
        target = $(this).attr('href');
        data = posts[target];
        $('body').css({
          'background': ''
        });
        self.strokeColor = self.oldStrokeColor;
        $modal = $('#work-modal');
        $modal.find('.modal-title').text(data.title).end().find('.modal-body').html(data.content).end().modal();
        imageArray = [];
        imageArray.push(data.images);
        for (_i = 0, _len = imageArray.length; _i < _len; _i++) {
          image = imageArray[_i];
          $modal.find('.modal-body').prepend("<img src='/img/work/" + image + "'>");
        }
        return false;
      });
    }
  };

  TravMcKinney.init();

}).call(this);
