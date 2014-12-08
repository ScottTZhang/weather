window.app.views.WeatherView = Backbone.View.extend({
  el: $('body'),
  url: '/api/gendata',

  events: {
    "click .submit": "renderResult"
  },

  renderResult: function(){
    var zipcode = $('#zip').val();
    var genDataUrl = this.url + '?zip=' + zipcode;
    var template = JST['app/templates/loading.us']();
    $('#result').html(template);
    $.ajax(genDataUrl, {
      success: function(data, textStatus, xhr){
        template = JST['app/templates/result.us'](data);
        $('#result').html(template);
      },
      error: function(xhr, textStatus, errorThrown) {
        template = JST['app/templates/err.us'](xhr);
        $('#result').html(template);
      }
    });
  }
});
