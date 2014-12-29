define([
  'underscore',
  'backbone'
], function(_, Backbone){
  	var User = Backbone.Model.extend({
  		urlRoot: '/admins'
  	});
  	// Return the model for the module
  	return User;
});

