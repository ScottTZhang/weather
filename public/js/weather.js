$(function() {
  var ListView = Backbone.View.extend({
    el: $('body'),
    url: '/api/gendata',

    events: {
      "click .submit": "renderResult"
    },

    renderResult: function(){
      var zipcode = $('#zip').val();
      var genDataUrl = this.url + '?zip=' + zipcode;
      var template = _.template($('#loading').html());
      $('#result').html(template);
      $.ajax(genDataUrl, {
        success: function(data, textStatus, xhr){
          template = _.template($('#result_tmp').html());
          $('#result').html(template(data));
        },
        error: function(xhr, textStatus, errorThrown) {
          template = _.template($('#result_err').html());
          $('#result').html(template(xhr));
        }
      });
    }
  });
  var listView = new ListView();
});
