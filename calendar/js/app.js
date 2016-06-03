requirejs.config({
  baseUrl: 'js/libs',
  paths: {
    app: '../app',
    jquery: 'jquery-2.2.4',
    'bootstrap-datetimepicker': 'bootstrap-datetimepicker',
    'backbone-collectionview': 'backbone.collectionView.min',
    'backbone': 'backbone',
    'bootstrap': 'bootstrap.min',
  },

  shim: {
    bootstrap: {
      deps: ['underscore', 'jquery'],
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone',
    },
  },
});

requirejs(['app/main']);
