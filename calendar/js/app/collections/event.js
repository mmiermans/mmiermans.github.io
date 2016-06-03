// Event Model
define([
  'backbone',
  'backbone.localStorage',
  'app/models/event',
], function (
  Backbone,
  BackboneLocalStorage,
  EventModel
) {
  return Backbone.Collection.extend({

    model: EventModel,

    comparator: function(model) {
      return model.get('date') + model.get('time');
    },

    localStorage: new Backbone.LocalStorage('wonder-events'),

  });
});
