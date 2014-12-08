window.app.Router = Backbone.Router.extend({

  routes: {
    '*actions': 'defaultAction'
  },

  defaultAction: function() {
    var weatherView = new window.app.views.WeatherView();
  }

});

$(function(){
  window.router = new window.app.Router();
  Backbone.history.start();
});
