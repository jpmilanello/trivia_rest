require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app',
  'otherJS'
], function(App,otherJS){
  // The "app" dependency is passed in as "App"
  App.initialize();
});