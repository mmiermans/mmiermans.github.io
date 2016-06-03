define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'app/views/calendar',
  'app/collections/event',
], function(
  $,
  _,
  Backbone,
  Bootstrap,
  CalendarView,
  EventCollection
) {
  var eventCollection = new EventCollection();

  var calendarView = new CalendarView({
    el: '.calendar-app-view',
    eventCollection: eventCollection,
  });
});
