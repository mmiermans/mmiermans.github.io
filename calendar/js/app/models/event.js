// Event Model
define([
  'backbone',
], function (
  Backbone
) {
  return Backbone.Model.extend({
    defaults: function() {
      var d = new Date();
      return {
        title: '',
        description: '',
        time: d.getHours() + ':' + d.getMinutes(),
      };
    },
  });
});
