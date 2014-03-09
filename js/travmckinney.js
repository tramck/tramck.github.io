(function() {
  var TravMcKinney;

  TravMcKinney = {
    init: function() {
      return this.bindUIActions();
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
