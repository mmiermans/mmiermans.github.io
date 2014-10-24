requirejs.config({
    baseUrl: "js/lib",
    shim: {
      "bootstrap": { "deps": ["jquery"] },
      "underscore": { },
    },
    paths: {
      "app": "../app",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
      "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min"
    },
    waitSeconds: 0
});

// Load the main app module to start the app
requirejs(["app/main"]);
