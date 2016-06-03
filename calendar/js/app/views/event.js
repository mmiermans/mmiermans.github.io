// Event view
define([
  'backbone',
  'app/models/event',
  'text!app/templates/event.html',
], function (
  Backbone,
  EventModel,
  EventHtml
) {

  return Backbone.View.extend({
    template: _.template(EventHtml),

    events: {
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    },
  });

});

