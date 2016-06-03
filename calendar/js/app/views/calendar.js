// The Calendar Application
define([
  'backbone',
  'app/models/event',
  'bootstrap-datetimepicker',
  'backbone-collectionview',
  'text!app/templates/calendar.html',
  'app/views/event',
], function (
  Backbone,
  EventModel,
  DateTimePicker,
  BackboneCollectionView,
  CalendarHtml,
  EventView
) {

  return Backbone.View.extend({
    template: _.template(CalendarHtml),

    events: {
      'click .event-add': 'addEvent',
      'click .event-edit': 'editEvent',
    },

    initialize: function (options) {
      this.options = options || {}

      //this.listenTo(app.todos, 'add', this.addOne);

      this.options.eventCollection.fetch({reset: true});

      this.render();
    },

    dateToStr: function(date) {
      return date.format('YYYY-MM-DD');
    },

    getDate: function() {
      return this.$('#datepicker').data("DateTimePicker").date();
    },

    getModelFromEditor() {
      var dateComponent = this.getDate();
      var timeComponent = this.$('#event-timepicker').data("DateTimePicker").date();
      return {
        'date': this.dateToStr(dateComponent),
        'time': timeComponent.format('HH:mm'),
        'title': this.$('.event-editor #event-title').val(), 
        'description': this.$('.event-editor #event-description').val(), 
      };
    },

    addEvent: function() {
      this.options.eventCollection.create(this.getModelFromEditor());
    },

    editEvent: function() {
      this.selectedEvent.save(this.getModelFromEditor());
      this.options.eventCollection.sort();
      this.collectionView.render();
    },

    renderDatepicker: function() {
      var datepicker = this.$('#datepicker').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY',
      });

      datepicker.on('dp.change', function(e) {
        this.selectedDateStr = this.dateToStr(e.date);
        this.renderEventEditor();
        this.collectionView.render();
        console.log(this.selectedDateStr);
      }.bind(this));
      
      this.selectedDateStr = this.dateToStr(this.getDate());
    },

    renderTimepicker: function() {
      this.$('#event-timepicker').datetimepicker({
        inline: true,
        format: 'HH:mm',
      });
    },

    renderEventEditor: function(model) {
      if (!model) {
        model = new EventModel({date: this.dateToStr(this.getDate())});
      }
      this.$('.event-editor #event-title').val(model.get('title'));
      this.$('.event-editor #event-description').val(model.get('description'));
      this.$('#event-timepicker').data("DateTimePicker").date(model.get('time'));

      this.selectedEvent = model;
    },

    createEventList: function() {
      this.collectionView = new Backbone.CollectionView({
        el: this.$("ul.event-list"),
        selectable: true,
        collection: this.options.eventCollection,
        modelView: EventView,
        emptyListCaption: function() {
          return "You have no events planned on " + this.getDate().format("MMMM Do YYYY");
        }.bind(this),
        visibleModelsFilter: function(model) {
          return model.get('date') == this.selectedDateStr;
        }.bind(this), 
      });

      this.collectionView.on('selectionChanged', function(models) {
        var model = _.first(models);
        this.renderEventEditor(model);
      }.bind(this));
    },

    render: function () {
      this.$el.html(this.template());
      this.createEventList();
      this.renderDatepicker();
      this.renderTimepicker();
      this.renderEventEditor();

      this.collectionView.render();
    },
  });

});

